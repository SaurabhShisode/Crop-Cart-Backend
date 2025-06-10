import { Groq } from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // <== Make sure key is loaded

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
      model: 'llama3-8b-8192', // ✅ FIXED MODEL
      temperature: 0.5,
      max_tokens: 500,
      top_p: 1
    });

    const rawIngredientsText = chatCompletion.choices[0]?.message?.content || '';
    const extractedIngredients = extractIngredientsFromText(rawIngredientsText);

    const crops = await Crop.find({
      name: { $in: extractedIngredients }
    });

    res.json({
      matchedIngredients: crops,
      allIngredientsFromAI: extractedIngredients
    });

  } catch (error) {
    console.error('Error in getMatchedIngredientsFromDB:', error);

    const apiError = error?.response?.data?.error?.message;

    if (apiError?.toLowerCase().includes('insufficient balance') || error?.code === 'model_not_found') {
      return res.status(402).json({ error: 'API quota exceeded or model not found.' });
    }

    return res.status(500).json({ error: 'Unable to fetch matching ingredients.' });
  }
};
