import { Groq } from 'groq-sdk';
import { config } from 'dotenv';
import Crop from '../models/Crops.js';

config(); // Load environment variables

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Basic ingredient extraction function inlined
function extractIngredientsFromText(text) {
  return text
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
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful chef who returns a comma-separated list of ingredients for a given meal.'
        },
        {
          role: 'user',
          content: `List only the ingredients needed for the meal: "${mealName}". Do not add instructions.`
        }
      ],
      model: 'llama-3.1-8b-instant',
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1
    });

    const rawIngredientsText = chatCompletion.choices[0]?.message?.content || '';
    console.log('🧠 AI response:', rawIngredientsText);

    const extractedIngredients = extractIngredientsFromText(rawIngredientsText);
    console.log('🧪 Extracted ingredients:', extractedIngredients);

    const crops = await Crop.find({
      name: { $in: extractedIngredients }
    });

    res.json({
      matchedIngredients: crops,
      allIngredientsFromAI: extractedIngredients
    });

  } catch (error) {
    console.error('❌ Error in getMatchedIngredientsFromDB:', error.response?.data || error.message);

    if (
      error.response?.data?.error?.message?.toLowerCase().includes('insufficient balance') ||
      error.response?.data?.error?.code === 'invalid_request_error'
    ) {
      return res.status(402).json({
        error: 'API quota exceeded or model access issue.'
      });
    }

    res.status(500).json({ error: 'Unable to fetch matching ingredients.' });
  }
};
