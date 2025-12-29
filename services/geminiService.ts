
import { GoogleGenAI } from "@google/genai";
import { ImageSize } from '../types';

export const generateDoraemonImage = async (prompt: string, size: ImageSize): Promise<string> => {
  // Check for API key presence (usually injected via platform)
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API key is missing.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-image-preview',
      contents: {
        parts: [
          {
            text: `High quality educational illustration for children. Character: Doraemon. Topic: ${prompt}. Bright colors, clear scientific concepts shown simply. Anime style.`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: size
        }
      }
    });

    if (!response.candidates?.[0]?.content?.parts) {
      throw new Error("No image generated in response.");
    }

    const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
    if (imagePart?.inlineData) {
      return `data:image/png;base64,${imagePart.inlineData.data}`;
    }

    throw new Error("Could not find image data in response candidates.");
  } catch (error: any) {
    if (error.message?.includes("Requested entity was not found")) {
      throw new Error("API_KEY_RESET_REQUIRED");
    }
    throw error;
  }
};
