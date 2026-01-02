
import { GoogleGenAI, Type } from "@google/genai";
import { BlockType } from "../types";

export const generatePageWithAI = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Use gemini-3-pro-preview for complex reasoning and layout generation tasks
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Act as a senior e-commerce conversion optimization expert. Create a high-converting landing page structure for the following request: "${prompt}". 
    The response must be a JSON array of blocks. Each block has "type" (one of: ${Object.values(BlockType).join(', ')}) and "content" (relevant text, titles, etc).`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            type: { type: Type.STRING },
            content: { 
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                subtitle: { type: Type.STRING },
                buttonText: { type: Type.STRING },
                items: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING } 
                },
                description: { type: Type.STRING }
              }
            }
          },
          required: ["type", "content"]
        }
      }
    }
  });

  // Extract text using property access as per guidelines
  const jsonStr = response.text?.trim();
  if (!jsonStr) return null;

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return null;
  }
};

export const refineTextWithAI = async (text: string, instruction: string = "make it more persuasive and focused on conversion") => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Refine the following e-commerce copy. Instructions: ${instruction}. 
    Original Text: "${text}"
    Return only the refined text, no preamble.`,
  });

  // Extract text using property access as per guidelines
  return response.text?.trim() || text;
};
