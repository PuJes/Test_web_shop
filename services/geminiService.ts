
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDessertRecommendations = async (userPrompt: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User wants dessert advice based on this: "${userPrompt}". 
      Recommend 3 types of desserts from our categories: Cakes, Cupcakes, or Macarons. 
      Provide a specific flavor recommendation and a brief reason why it fits the occasion.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              dessertType: { type: Type.STRING },
              flavor: { type: Type.STRING },
              reason: { type: Type.STRING },
            },
            required: ["dessertType", "flavor", "reason"],
          },
        },
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
