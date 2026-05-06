import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not defined. AI features will be limited.");
}

export const genAI = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateAIImage(prompt: string) {
  if (!genAI) throw new Error("AI Service not initialized");
  
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: [{ parts: [{ text: prompt }] }],
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image generated");
}

export async function generateAIVideo(prompt: string) {
  // Since video generation can take minutes, we might want to use a mock or a long-running process
  // For the purpose of this demo SaaS, we'll simulate it with a promise that resolves to a placeholder
  // or use Gemini to describe the video.
  
  // Real implementation for Veo would go here if user provides API key.
  // For now, we'll return a cinematic placeholder or a pre-generated asset.
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"); // Placeholder video
    }, 5000);
  });
}
