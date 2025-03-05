import axios from "axios";
import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateImage = async (
  description: string,
  siteName: string,
  keywords: string[],
): Promise<string> => {
  const prompt = `Generate a public AI image related to ${siteName} with elements of ${keywords.join(
    ", ",
  )}. Description: ${description}`;

  const response = await axios.post(
    'https://api.openai.com/v1/images/generations',
    { prompt, n: 1, size: "1024x1024" },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    },
  );
  const imageUrl = response.data.data[0].url;

  const uploadedImage = await cloudinary.uploader.upload(imageUrl, {
    folder: "generated-images"
  });

  return uploadedImage.secure_url;
};
