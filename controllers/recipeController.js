import { Groq } from 'groq-sdk';
import { config } from 'dotenv';
import Crop from '../models/Crops.js';

config(); // Load environment variables

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// ✅ Improved ingredient extractor
function extractIngredientsFromText(text) {
  return text
    .replace(/[^a-zA-Z0-9, ]/g, '') // Remove punctuation
    .split(',')
    .map(item => item.trim().toLowerCase())
    .filter(item => item.length > 0);
}

export const getMatchedIngredientsFromDB = async (req, res) => {
  const { mealName } = req.body;

  if (!mealName || typeof mealName !== 'string' || mealName.trim().length < 3) {
    return res.status(400).json({ error: 'Invalid or missing meal name.' });
  }

  try {
    console.log('📥 Received meal name:', mealName);

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'Return only a comma-separated list of raw ingredients with no explanation, no instructions.'
        },
        {
          role: 'user',
          content: `Give only ingredients for "${mealName}". Like: paneer, tomato, onion, garlic. No extra words.`
        }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1
    });

    const rawIngredientsText = chatCompletion.choices[0]?.message?.content || '';
    console.log('🧠 AI raw response:', rawIngredientsText);

    const extractedIngredients = extractIngredientsFromText(rawIngredientsText);
    console.log('🧪 Extracted ingredients:', extractedIngredients);

    const crops = await Crop.find({
      name: { $in: extractedIngredients }
    });

    console.log('🌾 Matched crops from DB:', crops);

    res.json({
      matchedIngredients: crops,
      allIngredientsFromAI: extractedIngredients
    });

  } catch (error) {
    const errData = error.response?.data || error.message;
    console.error('❌ Error in getMatchedIngredientsFromDB:', errData);

    if (
      errData?.error?.message?.toLowerCase().includes('insufficient balance') ||
      errData?.error?.code === 'invalid_request_error'
    ) {
      return res.status(402).json({
        error: 'API quota exceeded or model access issue.'
      });
    }

    res.status(500).json({ error: 'Unable to fetch matching ingredients.' });
  }
};
