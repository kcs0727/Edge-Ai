import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary';
import pdf from 'pdf-parse/lib/pdf-parse.js';
import FormData from "form-data";
import trycatch from "../utils/trycatch.js";
import getdataurl from "../utils/urlgenerator.js";


const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});



export const generateArticle = trycatch(async (req, res) => {

    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
        return res.json({
            success: false,
            message: "Limit reached. Upgrade to continue."
        })
    }

    
    const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: length+500,
    });
    const content = response.choices[0].message.content;


    await sql`INSERT INTO creation (user_id, prompt,content, type)
        VALUES (${userId},${prompt},${content},'article')`


    if (plan != 'premium') {
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: { free_usage: free_usage + 1 }
        })
    }
    res.json({
        success: true,
        content
    })    
})


export const generateBlogTitles = trycatch(async (req, res) => {

    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== 'premium' && free_usage >= 10) {
        return res.json({
            success: false,
            message: "Limit reached. Upgrade to continue."
        })
    }


    const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
    });
    const content = response.choices[0].message.content;


    await sql`INSERT INTO creation (user_id, prompt, content, type)
        VALUES (${userId},${prompt},${content},'blog-titles')`


    if (plan != 'premium') {
        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: { free_usage: free_usage + 1 }
        })
    }
    res.json({
        success: true,
        content
    })
})


export const generateImage = trycatch(async (req, res) => {

    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== 'premium') {
        return res.json({
            success: false,
            message: "This feature is only available for premium subscriptions."
        })
    }


    const formData = new FormData();
    formData.append('prompt', prompt);
    const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
        headers: { 'x-api-key': process.env.CLIPDROP_API_KEY, },
        responseType: "arraybuffer",
    })
    const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;


    const { secure_url } = await cloudinary.uploader.upload(base64Image);


    await sql`INSERT INTO creation (user_id, prompt,content, type, publish)
        VALUES (${userId},${prompt},${secure_url},'image',${publish ?? false})`

    res.json({
        success: true,
        content: secure_url
    })
})


export const removeImageBackground = trycatch(async (req, res) => {

    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== 'premium') {
        return res.json({
            success: false,
            message: "This feature is only available for premium subscriptions."
        })
    }
    

    const imageurl = getdataurl(image).content;
    const { secure_url } = await cloudinary.uploader.upload(imageurl, {
        transformation: [
            {
                effect: 'background_removal',
                background_removal: 'remove_the_background'
            }
        ]
    });

    console.log("db start");
    

    await sql`INSERT INTO creation (user_id, prompt,content, type)
        VALUES (${userId},'Remove background from image',${secure_url},'image')`

    res.json({
        success: true,
        content: secure_url
    })
})


export const removeImageObject = trycatch(async (req, res) => {

    const { userId } = req.auth();
    const image = req.file;
    const { object } = req.body;
    const plan = req.plan;

    if (plan !== 'premium') {
        return res.json({
            success: false,
            message: "This feature is only available for premium subscriptions."
        })
    }


    const imageurl = getdataurl(image).content;
    const { secure_url } = await cloudinary.uploader.upload(imageurl, {
        transformation: [{ effect: `gen_remove:${object}` }]
    });
    

    await sql`INSERT INTO creation (user_id, prompt,content, type)
        VALUES (${userId},${`Remove ${object} from image`},${secure_url},'image')`


    res.json({
        success: true,
        content: secure_url
    })
})


export const reviewResume = trycatch(async (req, res) => {

    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    if (plan !== 'premium') {
        return res.json({
            success: false,
            message: "This feature is only available for premium subscriptions."
        })
    }
    if (resume.size > 5 * 1024 * 1024) {
        return res.json({
            success: false,
            message: 'Resume file size exceeds allowed size (5MB)'
        })
    }


    const pdfData = await pdf(resume.buffer);
    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume Content:\n\n${pdfData.text}`;

    const response = await AI.chat.completions.create({
        model: "gemini-2.0-flash",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
        max_tokens: 2000,
    });
    const content = response.choices[0].message.content;


    await sql`INSERT INTO creation (user_id, prompt,content, type)
        VALUES (${userId},'Review the uploaded resume',${content},'review-resume')`;


    res.json({
        success: true,
        content
    })
})
