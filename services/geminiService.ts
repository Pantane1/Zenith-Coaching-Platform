import { GoogleGenAI, Type } from "@google/genai";
import { Coach, AiRecommendation } from "../types";

// Initialize Gemini
// Note: API Key comes from process.env.API_KEY automatically in this environment
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Analyzes a user's goal and recommends the best matching coach from the list.
 */
export const getCoachRecommendation = async (
  userGoal: string,
  availableCoaches: Coach[]
): Promise<AiRecommendation | null> => {
  try {
    const model = "gemini-2.5-flash";
    
    // Construct a context-aware prompt
    const coachDescriptions = availableCoaches.map(c => 
      `ID: ${c.id}, Name: ${c.name}, Specialty: ${c.specialty}, Tags: ${c.tags.join(', ')}, Description: ${c.description}`
    ).join('\n');

    const prompt = `
      You are an expert coaching matchmaker. 
      The user has the following goal: "${userGoal}"
      
      Here are the available coaches:
      ${coachDescriptions}
      
      Analyze the user's goal and select the ONE best matching coach ID.
      Provide a brief, encouraging reasoning for why this coach is the best fit.
      
      Return JSON.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coachId: { type: Type.STRING },
            reasoning: { type: Type.STRING }
          },
          required: ["coachId", "reasoning"]
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;

    return JSON.parse(jsonText) as AiRecommendation;

  } catch (error) {
    console.error("Gemini recommendation failed:", error);
    return null;
  }
};

/**
 * Generates a personalized welcome message for the dashboard.
 */
export const generateWelcomeMessage = async (userName: string, lastBooking?: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a short, motivating welcome back message for a user named ${userName}. ${lastBooking ? `They have a session coming up on ${lastBooking}.` : 'Encourage them to book their first session.'} Keep it under 20 words.`,
    });
    return response.text || `Welcome back, ${userName}!`;
  } catch (e) {
    return `Welcome back, ${userName}!`;
  }
};