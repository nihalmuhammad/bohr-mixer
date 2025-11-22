import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const explainAtom = async (
  elementName: string,
  protons: number,
  neutrons: number,
  electrons: number,
  mood: string
): Promise<string> => {
  const client = getClient();
  if (!client) return "I need an API key to start teaching!";

  const prompt = `
    You are Professor Proton, a wacky, enthusiastic, and fun science teacher for kids.
    Explain the current atom state:
    - Element: ${elementName}
    - Protons: ${protons}
    - Neutrons: ${neutrons}
    - Electrons: ${electrons}
    - The atom is feeling: ${mood}

    Rules:
    1. Keep it under 50 words.
    2. Use emojis.
    3. Explain WHY the atom is feeling that way (e.g., "It's grumpy because it lost an electron!").
    4. Be encouraging.
  `;

  try {
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text || "My notebook is stuck! Try again.";
  } catch (error) {
    console.error("Gemini error:", error);
    return "Oops! My lab equipment is fuzzy. Try again later!";
  }
};
