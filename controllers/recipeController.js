import axios from 'axios';
import Crop from '../models/crop.js'; // Adjust the path as needed

const extractIngredientsFromText = (text) => {
  return text
    .toLowerCase()
    .replace(/[\n•\-]/g, ',') // normalize line bullets
    .split(',')
    .map(i => i.trim())
    .filter(Boolean);
};

export const getMatchedIngredientsFromDB = async (req, res) => {
  const { mealName } = req.body;

  try {
    // Step 1: Ask DeepSeek for ingredients
    const response = await axios.post(
      'https://api.deepseek.com/v1/chat/completions',
      {
        model: 'deepseek-chat',
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
        temperature: 0.5,
        max_tokens: 500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const rawIngredientsText = response.data.choices[0].message.content;
    const extractedIngredients = extractIngredientsFromText(rawIngredientsText);

    // Step 2: Find crops in your DB that match any of these ingredients
    const crops = await Crop.find({
      name: { $in: extractedIngredients }
    });

    res.json({
      matchedIngredients: crops,
      allIngredientsFromAI: extractedIngredients
    });

  } catch (error) {
    console.error('Error in getMatchedIngredientsFromDB:', error.response?.data || error.message);
    res.status(500).json({ error: 'Unable to fetch matching ingredients.' });
  }
};
