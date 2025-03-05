import axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();

export const rewriteText = async (text: string, siteName: string, keywords: string[]): Promise<string> => {
    try {
        const prompt = `Rewrite this text to match the theme of ${siteName} and include relevant keywords: ${keywords.join(', ')}\n\nOriginal: ${text}`;
  
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
          },
          { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' } }
        );
      
        return response.data.choices[0].message.content.trim();

    } catch (error) {
        console.error('Error rewriting text with OpenAI:', error);
        return text; // Return the original text in case of an error
    }
};