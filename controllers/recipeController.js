export const getMatchedIngredientsFromDB = async (req, res) => {
  const { mealName } = req.body;

  try {
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

    const crops = await Crop.find({
      name: { $in: extractedIngredients }
    });

    res.json({
      matchedIngredients: crops,
      allIngredientsFromAI: extractedIngredients
    });

  } catch (error) {
    console.error('Error in getMatchedIngredientsFromDB:', error.response?.data || error.message);

    
    if (
      error.response?.data?.error?.message?.toLowerCase().includes('insufficient balance') ||
      error.response?.data?.error?.code === 'invalid_request_error'
    ) {
      return res.status(402).json({
        error: 'API quota exceeded or insufficient balance on DeepSeek API key.'
      });
    }

   
    res.status(500).json({ error: 'Unable to fetch matching ingredients.' });
  }
};
