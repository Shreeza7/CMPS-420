# 📝 Blog Writer

A full-stack AI-powered application designed to streamline content generation by automating blog writing and generating accompanying images.
Utilizes advanced NLP and computer vision models from Hugging Face for seamless user experience. A UI/UX focused AI project that generates engaging blog content and visuals based on user prompts.

## 🚀 Features
- AI-generated blog content (LLM-based text generation)

- AI-generated images (Vision-to-image models)

- User registration and login with JWT authentication

- Image and blog post preview before saving

- Notifications via React Toastify

- Responsive and interactive frontend

- Secure API integration with .env configuration

- Type-safe frontend with TypeScript

## 🧱 Technologies Used
**Front End**
- React (Main UI framework)

- TypeScript (Type-safe JavaScript)

- shadcn/ui components

- Lucide React Icons

- React Router for navigation

- React Toastify for notifications

- Inline styles via React CSS-in-JS

**Back End**
- Node.js runtime

- Express.js framework

- JWT (JSON Web Tokens) for authentication

- bcrypt for password hashing

- MongoDB with Mongoose ODM

- RESTful API design

- CORS enabled

- Body-parser for request handling

**AI/ML Integration**
1. Text Generation:

- Llama 3.2-11B-Vision-Instruct-Turbo

- Fine-tuned for blog content generation

2. Image Generation:

- FLUX.1-schnell-Free

- Supports Base64 and URL image formats

- Proxy support for optimized delivery

**Development Tools & Environment**
- Environment Variables (.env)

- Error handling middleware

- CORS for API security

- LocalStorage for client-side data persistence

- TypeScript configuration for type safety

## ⚙️ Setup Instructions
### 1. Clone the Repository
```bash
git clone https://github.com/your-username/blog-writer.git
cd blog-writer

##Install dependencies
```bash
npm install
Configure environment variables
Create a .env file in the root directory:

env
PORT=3000  
MONGO_URI=your-mongodb-uri  
JWT_SECRET=your-secret-key  
Run the app (Development mode)

For development:
npm run dev
