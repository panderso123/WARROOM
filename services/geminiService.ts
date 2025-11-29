import { GoogleGenAI } from "@google/genai";
import { Persona } from "../types";
import { KNOWLEDGE_BASE, PERSONA_PROMPTS } from "../constants";

const getSystemInstruction = (persona: Persona) => {
  return `${PERSONA_PROMPTS[persona]}
  
  You are assisting the user in building the "Veteran’s Estate & Divorce Protection" business.
  
  KNOWLEDGE BASE:
  ${KNOWLEDGE_BASE}
  
  RULES:
  1. Be concise and high-impact.
  2. Use the tone of the selected persona strictly.
  3. When generating copy, use the specific details from the Knowledge Base.
  4. Do not offer legal advice, always add disclaimers where appropriate.
  `;
};

export const generateAIResponse = async (
  prompt: string,
  persona: Persona
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return "ERROR: API_KEY is missing in environment variables. I cannot operate without fuel.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(persona),
        temperature: 0.8, // High creativity for copy, slightly aggressive
      }
    });

    return response.text || "No response generated. The oracle is silent.";
  } catch (error) {
    console.error("AI Error:", error);
    return "FAILURE. The system encountered an error. Check your connection and try again.";
  }
};
