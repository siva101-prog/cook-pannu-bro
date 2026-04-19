import { GoogleGenAI, Modality } from "@google/genai";

// Standard Free-tier / Project key for general content
const getStandardAI = () => new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

// Paid key for advanced models like Veo
const getPaidAI = () => new GoogleGenAI({
  apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY || ""
});

export interface BroAdvice {
  recipeName: string;
  ingredients: string[];
  steps: string[];
  broTip: string;
  estimateCost: string;
}

export interface RelatedRecipe {
  name: string;
  cost: string;
  time: string;
}

export async function getBroAdvice(ingredients: string[]): Promise<BroAdvice> {
  const prompt = `Bro, I have these ingredients: ${ingredients.join(", ")}. 
  Suggest a killer recipe that's easy for a student. 
  Keep the tone cool, using casual Indian student slang like 'Bro', 'Scene', 'Da', 'Maca'. 
  Provide the result in the following JSON format:
  {
    "recipeName": "string",
    "ingredients": ["string"],
    "steps": ["string"],
    "broTip": "string (A tip about saving money or making it better)",
    "estimateCost": "string (e.g. ₹40)"
  }`;

  try {
    const ai = getStandardAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text || "{}";
    
    // Robust parsing: extract valid JSON if AI included extra commentary
    let cleanedText = text.trim();
    if (cleanedText.includes('```json')) {
      cleanedText = cleanedText.split('```json')[1].split('```')[0].trim();
    } else if (cleanedText.includes('```')) {
      cleanedText = cleanedText.split('```')[1].trim();
    }
    
    // If it still fails, try to find the first '{' and last '}'
    try {
      return JSON.parse(cleanedText);
    } catch (parseError) {
      const firstBrace = cleanedText.indexOf('{');
      const lastBrace = cleanedText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        return JSON.parse(cleanedText.slice(firstBrace, lastBrace + 1));
      }
      throw parseError;
    }
  } catch (error) {
    console.error("Bro, Gemini failed us:", error);
    return {
      recipeName: "Bro's Instant Maggi+",
      ingredients: ["Maggi", "Onion", "Tomato", "Love"],
      steps: ["Boil water", "Add masala", "Add veggies", "Eat like a king"],
      broTip: "Bro, even if Gemini is down, Maggi never lets you down. It costs like ₹14 only!",
      estimateCost: "₹20"
    };
  }
}

export async function getBroSpeech(text: string): Promise<string | null> {
  if (!text) return null;
  
  try {
    const ai = getStandardAI();
    // Primary approach using the specialized TTS model
    const response = await ai.models.generateContent({
      model: "gemini-3.1-flash-tts-preview",
      contents: [{ 
        parts: [{ 
          text: `Read this in a cool, casual Indian student voice: ${text}` 
        }] 
      }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Puck" },
          },
        },
      },
    });

    const data = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
    if (data) return data;
    
    // Fallback to Live model if primary TTS doesn't return data
    console.warn("Primary TTS returned no data, attempting fallback...");
    const fallbackResponse = await ai.models.generateContent({
      model: "gemini-3.1-flash-live-preview",
      contents: [{ 
        parts: [{ 
          text: `Read this text: ${text}` 
        }] 
      }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    return fallbackResponse.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data || null;

  } catch (error: any) {
    console.error("Bro, voice failed us:", error?.message || error);
    return null;
  }
}

export async function getRecipeImage(recipeName: string): Promise<string | null> {
  try {
    const ai = getPaidAI();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{
        parts: [{
          text: `A professional, appetizing food photography shot of ${recipeName}. 
          Vibrant colors, shallow depth of field, natural lighting, served in a cool student dorm style yet looking delicious.`
        }]
      }],
      config: {
        imageConfig: {
          aspectRatio: "16:9",
        }
      }
    });

    const base64Data = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
    if (base64Data) {
      return `data:image/png;base64,${base64Data}`;
    }
    return null;
  } catch (error) {
    console.error("Bro, image generation failed:", error);
    return null;
  }
}

export async function generateRecipeVideo(recipeName: string, steps: string[], imageBase64?: string | null) {
  try {
    const ai = getPaidAI();
    const prompt = `A high-quality, professional food commercial style video of cooking ${recipeName}. 
    Dynamic shots showing these actions: ${steps.slice(0, 3).join(", ")}. 
    Vibrant colors, cinematic lighting, 4k detail feel, steam rising, very appetizing.`;

    // Extract base64 part if it's a data URL
    const cleanBase64 = imageBase64?.split('base64,')[1] || imageBase64;

    const operation = await ai.models.generateVideos({
      model: 'veo-3.1-lite-generate-preview',
      prompt: prompt,
      ...(cleanBase64 ? {
        image: {
          imageBytes: cleanBase64,
          mimeType: 'image/png'
        }
      } : {}),
      config: {
        numberOfVideos: 1,
        resolution: '720p',
        aspectRatio: '16:9'
      }
    });

    return operation;
  } catch (error) {
    console.error("Bro, video starting failed:", error);
    throw error;
  }
}

export async function checkVideoOperation(operation: any) {
  try {
    const ai = getPaidAI();
    const nextOperation = await ai.operations.getVideosOperation({ operation });
    return nextOperation;
  } catch (error) {
    console.error("Bro, checking video failed:", error);
    throw error;
  }
}

export async function getRelatedRecipes(ingredients: string[]): Promise<RelatedRecipe[]> {
  const prompt = `Bro, I have these ingredients: ${ingredients.join(", ")}. 
  Suggest 3 DIFFERENT related recipes that can be made with similar ingredients. 
  Keep the tone cool and casual.
  Provide ONLY a JSON array of objects with "name", "cost", and "time" fields.
  Example result:
  [
    {"name": "Masala Egg Toast", "cost": "₹25", "time": "10m"},
    {"name": "Lazy Maggi Stir Fry", "cost": "₹20", "time": "8m"}
  ]`;

  try {
    const ai = getStandardAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "[]");
  } catch (error) {
    console.error("Bro, related recipes failed:", error);
    return [
      { name: "Kitchen Sink Omelette", cost: "₹30", time: "10m" },
      { name: "Hostel Fried Rice", cost: "₹45", time: "15m" }
    ];
  }
}
