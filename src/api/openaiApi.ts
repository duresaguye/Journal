
//import { OPENAI_API_KEY } from '@.env';

const fetchAIAnalysis = async (entryContent) => {
  try {
    const response = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'text-davinci-003', // Choose the correct model
        prompt: entryContent, // The entry content to analyze
        max_tokens: 100, // Set a reasonable max token length
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const mood = analyzeMood(data.choices[0].text); // Analyze mood based on AI response
    const summary = summarizeContent(data.choices[0].text); // Summarize the content

    return { mood, summary };
  } catch (error) {
    console.error('Error fetching AI analysis:', error);
    return { mood: '', summary: '' };
  }
};

// Function to analyze mood from AI response (you can add your own logic here)
const analyzeMood = (text) => {
  // Example of simple sentiment analysis based on keywords
  if (text.includes('happy') || text.includes('joy')) {
    return '😊'; // Happy mood emoji
  } else if (text.includes('sad') || text.includes('down')) {
    return '😢'; // Sad mood emoji
  } else {
    return '😐'; // Neutral mood emoji
  }
};

// Function to summarize the content (you can customize this logic)
const summarizeContent = (text) => {
  // Truncate or manipulate text to create a summary
  return text.substring(0, 150); // Example summary: first 150 characters
};

export { fetchAIAnalysis };
