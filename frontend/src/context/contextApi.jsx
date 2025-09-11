import { createContext, useState, useContext } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";


const ContextAPI = createContext();
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export const ContextProvider = ({ children }) => {

    const { getToken } = useAuth();

    const [buttonLoading, setButtonLoading] = useState(false);


    async function writearticle(input, selectedLen, setLoading, setContent) {
        setLoading(true);
        setButtonLoading(true);
        try {
            const prompt = `Write an article about ${input} in ${selectedLen.text}`;
            const length = selectedLen.length;

            const { data } = await axios.post('/api/ai/generate-article', { prompt, length }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setButtonLoading(false);
        }
    }


    async function blogtitles(input, selectedCategory, setLoading, setContent) {
        setLoading(true);
        setButtonLoading(true);
        try {
            const prompt = `Generate the blog title for the keyword ${input} in the category ${selectedCategory}`;

            const { data } = await axios.post('/api/ai/generate-blog-titles', { prompt }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setButtonLoading(false);
        }
    }


    async function generateimg(input, publish, selectedStyle, setLoading, setContent) {
        setLoading(true);
        setButtonLoading(true);
        try {
            const prompt = `Generate an image of ${input} in the style of ${selectedStyle}`;

            const { data } = await axios.post('/api/ai/generate-image', { prompt, publish }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setButtonLoading(false);
        }
    }


    async function removebg(input, setLoading, setContent) {
        setLoading(true);
        setButtonLoading(true);
        try {
            const formData = new FormData();
            formData.append("image", input);

            const { data } = await axios.post('/api/ai/remove-image-background', formData, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setButtonLoading(false);
        }
    }


    async function removeobj(input, obj, setLoading, setContent) {
        setLoading(true);
        setButtonLoading(true);
        try {
            const object = obj.trim();
            if (object.split(' ').length > 1) {
                return toast.error('please enter only one object name');
            }
            const formData = new FormData();
            formData.append("image", input);
            formData.append("object", object);

            const { data } = await axios.post('/api/ai/remove-image-object', formData, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setButtonLoading(false);
        }
    }


    async function reviewresume(input, setLoading, setContent) {
        setLoading(true);
        setButtonLoading(true);
        try {
            const formData = new FormData();
            formData.append("resume", input);

            const { data } = await axios.post('/api/ai/review-resume', formData, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setContent(data.content);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
            setButtonLoading(false);
        }
    }


    async function fetchcreations(setCreations, setLoading) {
        try {
            const { data } = await axios.get('/api/user/get-published-creations', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setCreations(data.creations);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function tooglelikes(id, userId, setCreations) {
        try {
            const userIDStr = userId.toString();
            setCreations((prev) => prev.map(c => (
                c.id === id ?
                    {
                        ...c,
                        likes: c.likes.includes(userIDStr)
                            ? c.likes.filter(u => u !== userIDStr)
                            : [...c.likes, userIDStr]
                    }
                    : c
                ))
            );

            const { data } = await axios.post('/api/user/toogle-liked-creations', { id }, {
                headers: { Authorization: `Bearer ${await getToken()}`}
            })

            if(data.success){
                toast.success(data.message);
            }
            else{
                toast.error(data.message);
                fetchcreations(setCreations, ()=>{});
            }
        }
        catch (error) {
            toast.error(error.message);
            fetchcreations(setCreations, ()=>{});
        }
    }


    async function getdashboarddata(setCreations, setLoading) {
        try {
            const { data } = await axios.get('/api/user/get-user-creations', {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })

            if (data.success) {
                setCreations(data.creations);
            }
            else {
                toast.error(data.message);
            }
        }
        catch (error) {
            toast.error(error.message);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <ContextAPI.Provider value={{
            buttonLoading, writearticle, blogtitles, generateimg, removebg, removeobj, reviewresume, fetchcreations, tooglelikes, getdashboarddata
        }}>
            {children}
        </ContextAPI.Provider>
    )
}

export const ApiData = () => useContext(ContextAPI);