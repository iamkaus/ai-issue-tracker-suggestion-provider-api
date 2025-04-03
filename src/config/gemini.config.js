import { GoogleGenAI } from "@google/genai";
import { GEMINI_API_KEY } from "./env.config.js";

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function generateSuggestion(issueDescription) {
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: `Based on this issue description, provide a helpful suggestion for resolution: "${issueDescription}".Provide a concise and practical suggestion.`,
        });
        return response.text;
    } catch ( error ) {
        console.error("Error generating AI suggestion:", error);
        throw new Error("Failed to generate suggestion");
    }
}

await generateSuggestion();