const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Function to generate LLM response
const generateResponseFromLLM = async (message) => {
  try {
    const result = await hf.textGeneration({
      model: 'EleutherAI/gpt-neo-2.7B',
      inputs: message,
    });
    return result.generated_text.trim();
  } catch (error) {
    console.error('Failed to generate LLM response:', error);
    return 'Sorry, I could not understand the query.';
  }
};

module.exports = { generateResponseFromLLM };
