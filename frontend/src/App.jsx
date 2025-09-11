import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import Blogtitles from "./pages/Blogtitles";
import Community from "./pages/Community";
import GenerateImg from "./pages/GenerateImg";
import RemoveObj from "./pages/RemoveObj";
import ReviewResume from "./pages/ReviewResume";
import {Toaster} from 'react-hot-toast';
import { useUser, SignIn, useAuth} from "@clerk/clerk-react";
import { useEffect } from "react";
import RemoveBg from "./pages/Removebg";



function App() {

  const {user}= useUser();
  // const {getToken} =useAuth();
  // useEffect(()=>{
  //   getToken().then((token)=>console.log(token))
  // })
 
  return (
    <div>
      <Toaster/>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/ai" element={user?<Layout /> : <div className='flex items-center justify-center h-screen'> <SignIn/> </div>}>

          <Route index element={<Dashboard />} />

          <Route path="write-article" element={<WriteArticle />} />

          <Route path="blog-titles" element={<Blogtitles />} />

          <Route path="generate-image" element={<GenerateImg />} />

          <Route path="remove-background" element={<RemoveBg />} />

          <Route path="remove-object" element={<RemoveObj />} />

          <Route path="review-resume" element={<ReviewResume />} />

          <Route path="community" element={<Community />} />

        </Route>

      </Routes>
    </div>
  )
}

export default App;