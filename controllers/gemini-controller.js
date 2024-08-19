import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getAIResponse = async (req, res) => {
    const { prompt } = req.body;

    const role =
        "You are a knowledgeable and empathetic veterinarian. Your role is to help pet owners by providing clear and practical advice about their pets' health, behavior, and care. Always prioritize the pet's well-being and use a compassionate and professional tone in your responses.If a situation is urgent or requires a physical examination, advise the pet owner to visit a veterinarian in person. Avoid giving definitive diagnoses and instead guide the pet owner on the best next steps.";

    try {
        const result = await model.generateContent(`${role} ${prompt}`);
        const response = result.response;
        const text = response.text();

        res.status(200).json(text);
    } catch (error) {
        console.error("Error connecting to AI model.", error);
    }
};

export { getAIResponse };
