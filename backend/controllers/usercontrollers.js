import sql from "../configs/db.js";
import trycatch from "../utils/trycatch.js";


export const getUserCreations= trycatch(async(req,res)=>{

    const {userId}= req.auth();

    const creations= await sql `SELECT * FROM creation WHERE user_id=${userId} ORDER BY created_at DESC`;

    res.json({
        success:true,
        creations
    })
})


export const getPublishedCreations= trycatch(async(req,res)=>{

    const creations= await sql `SELECT * FROM creation WHERE publish= true ORDER BY created_at DESC`;

    res.json({
        success:true,
        creations
    })
})


export const toogleLikeCreations= trycatch(async(req,res)=>{

    const {userId}= req.auth();
    const {id}= req.body;

    const [creation]= await sql `SELECT * FROM creation WHERE id=${id}`;

    if(!creation) {
        return res.json({
            success:false,
            message:"Creation not found"
        })
    }

    const currentLikes= creation.likes;
    const userIDStr= userId.toString();
    let updatedLikes;
    let message;

    if(currentLikes.includes(userIDStr)){
        updatedLikes= currentLikes.filter((user)=>user!==userIDStr);
        message= 'Creation unliked';
    }
    else{
        updatedLikes= [...currentLikes,userIDStr];
        message= 'Creation liked';
    }


    await sql `UPDATE creation SET likes= ${updatedLikes} WHERE id=${id}`;

    res.json({
        success:true,
        message
    })
})

