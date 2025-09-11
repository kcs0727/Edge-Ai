# Edge.ai – MERN AI SaaS Platform

A full-stack **AI SaaS application** built with the MERN stack, providing free and premium AI features such as blog generation, article writing, image generation, background/object removal, resume review, and a community dashboard.

---

## ✨ Features
-  **Authentication & Subscription** with [Clerk](https://clerk.com)
-  **Modern UI** – React + Tailwind CSS for clean, responsive design.
-  Generate **Blog Titles** (Free – up to 10 trials)  
-  Write **Articles** (Free – up to 10 trials)  
-  Generate **Images** (Premium)  
-  Remove **Image Background** (Premium)  
-  Remove **Objects from Images** (Premium)  
-  AI-powered **Resume Review** (Premium)  
-  **Community and Dashboard** – view and like published creations
-  **Generated images** – Upload images with **Multer** and store on **Cloudinary**.

---

## 🛠️ Tech Stack

**Frontend**
- React + Vite
- Tailwind CSS
- Clerk React

**Backend**
- Express.js
- Clerk Express middleware
- Neon (PostgreSQL)
- Multer + Cloudinary
- Gemini API (Google Generative AI)
- ClipDrop API
- CORS

**Deployment**
- Vercel (Frontend & Backend)

---


## ⚡ Getting Started

1. **Clone the repository**
    - git clone https://github.com/your-username/edge-ai.git
    - cd ./Edge-Ai
   
2. **Install dependencies** (both frontend & backend)
   - cd ./backend && npm install
   - cd ../frontend && npm install
   
3. **Backend environment variables**
   
  - PORT=3000
  - FRONTEND_URL=http://localhost:5173
    
    ***Clerk***
  - CLERK_SECRET_KEY=your_secret
  - CLERK_PUBLISHABLE_KEY=your_publishable
  
    ***Database***
  - DATABASE_URL=your_neon_connection_url
  
  - ***APIs***
  - GEMINI_API_KEY=your_gemini_key
  - CLIPDROP_API_KEY=your_clipdrop_key
  
    ***Cloudinary***
  - CLOUDINARY_CLOUD_NAME=your_cloud
  - CLOUDINARY_API_KEY=your_api_key
  - CLOUDINARY_API_SECRET=your_api_secret


4. **Frontend environment variables**
  - VITE_CLERK_PUBLISHABLE_KEY=your_publishable
  - VITE_BASE_URL=http://localhost:3000

  
5. **Run the app in development**
   - cd ./backend && npm run server
   - cd ../frontend && npm run dev

