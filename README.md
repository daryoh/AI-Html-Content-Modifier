# AI HTML Modifier API

## Overview

The **AI HTML Modifier API** is a backend service that processes HTML content, rewrites text using AI, and modifies images based on keywords and a site name. This ensures content aligns with the given context and branding.

## Features

- **Text Rewriting:** Uses AI to modify HTML text.
- **Image Generation:** Replaces images with AI-generated versions based on context.
- **RESTful API:** Well-structured endpoints for easy integration.
- **Swagger Documentation:** API documentation available.
- **Deployed-Ready:** Works locally and in production.

---

## Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/daryoh/AI-Html-Content-Modifier.git
cd AI-Html-Content-Modifier

### 2️⃣ Install Dependencies

- Run `npm install` to install all required dependencies.

### 3️⃣ Create `.env` File

Create a `.env` file in the project root and configure your API keys:

```env
SERVER_URL=http://localhost:3000
NODE_ENV=development
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4️⃣ Start the Server

#### **For Development**

`npm run dev`

#### **For Production**

`npm run build`
`npm start`

---

## API Endpoints

### **1️⃣ Process Content**

**Endpoint:** `POST /api/process-content`

#### **Request Body:**

```json
{
  "content": "<html><body><h1>Welcome to My Site</h1><p>This is a test page.</p><img src='old-image.jpg' alt='a technology student'></body></html>",
  "siteName": "Tech Blog",
  "keywords": ["AI", "Machine Learning", "Technology"]
}
```

#### **Response:**

```json
{
  "processedContent": "<html><head></head><body><h1>Welcome to My Tech Blog: Your Ultimate Hub for AI, Machine Learning &amp; Cutting-Edge Technology!</h1><p>Welcome to our tech blog, the ultimate hub for the most recent advancements in Artificial Intelligence (AI), Machine Learning, and all things Technology. This is your go-to page to stay updated with the revolutionary transformation and quantum leaps in the tech universe.</p><img src=\"https://cloudinary.com/modified-image.jpg\" alt=\"a technology student\"></body></html>"
}
```

---

## Swagger API Documentation

After starting the server, visit [**http://localhost:3000/api-docs**](http://localhost:3000/api-docs) to explore the API documentation.

---

## Design Decisons and Trade-offs

- Decison: I used `Node.js Express and Typescript ` for the backend instead of NestJs. I chose Express and Typescript because they are lightweight and easy to set up, while NestJs is more opinionated and requires more configuration
- Trade-off: NestJs offers some out of the box features like dependency injection, and error handling.

- Decision: I used `Cloudinary` for image storage and management. I chose Cloudinary because it provides a simple and efficient way to store, manage, and deliver images.

---

## Challenges faced and Solutions

1.  The AI image generated using OpenAI API was not publicly accessible.
    I  had to use cloudinary to store the image and then use the public URL to display it in the HTML.
    
2.  I initailly used the `src` attribute of the `image` tag to generate the
    image in the prompt. But this was not working accurately. I had to use the `alt` attribute to generate the image as it was a text that the prompt could clearly understand.

---

## License

This project is licensed under the MIT License.
