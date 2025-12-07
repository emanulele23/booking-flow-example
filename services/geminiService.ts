import { GoogleGenAI, Type } from "@google/genai";
import { SERVICES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const recommendService = async (userQuery: string): Promise<string | null> => {
  try {
    const serviceListString = SERVICES.map(s => `ID: ${s.id}, Name: ${s.name}, Description: ${s.description}`).join('\n');

    const prompt = `
      You are a helpful booking assistant for a wellness center.
      The user has the following problem or need: "${userQuery}".
      
      Here are the available services:
      ${serviceListString}

      Based on the user's need, select the single most appropriate service ID.
      If none seem relevant, return null.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedServiceId: {
              type: Type.STRING,
              description: "The ID of the recommended service, or null if no match found."
            },
            reasoning: {
              type: Type.STRING,
              description: "Short explanation for the user."
            }
          }
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result.recommendedServiceId || null;
  } catch (error) {
    console.error("Error recommending service:", error);
    return null;
  }
};
