import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeWindowImage = async (base64Image: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image
                }
            },
            {
                text: `Je bent een technische expert van KMP Horren. Analyseer deze foto van een kozijn.
                1. Identificeer het type raam (Draai-kiep, Schuifpui, Naar buiten draaiend, etc.).
                2. Identificeer het materiaal (Kunststof, Hout, Aluminium).
                3. Let op obstakels (ventilatieroosters, lekdorpels, rolluikgeleiders).
                4. Adviseer het specifiek KMP product dat hier het beste past (Inzethor, Rolhor, Plissédeur).
                
                Antwoord in professioneel Nederlands. Wees kort en bondig.`
            }
        ]
      }
    });
    return response.text || "Sorry, ik kon de afbeelding niet analyseren.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Er is een fout opgetreden bij het analyseren van de foto.";
  }
};

export const chatWithAI = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
    try {
        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: {
                systemInstruction: `Je bent de virtuele adviseur van KMP Horren. 
                Jouw toon is: Professioneel, Technisch onderlegd, Behulpzaam en Direct.
                
                Kennisbank:
                - Inzethorren: De standaard voor draai-kiep ramen. Klemmen in het kozijn. Geen boren.
                - Rolhorren: Voor naar buiten draaiende ramen of dakramen.
                - Plissé hordeuren: De beste oplossing voor deuren en schuifpuien.
                - KMP is een Nederlands fabricaat met eigen fabriek.
                - Levertijd: circa 10-15 werkdagen.
                - Garantie: 3 jaar.
                
                Antwoord altijd in het Nederlands. Gebruik u/uw vorm.`,
            },
            history: history
        });

        const result = await chat.sendMessage({ message });
        return result.text || "Ik begrijp het niet helemaal.";
    } catch (error) {
        console.error("Gemini Chat Error:", error);
        return "Er is een technische storing in mijn brein. Probeer het later opnieuw.";
    }
}