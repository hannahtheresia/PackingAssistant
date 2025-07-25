// ./api/generate.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { destination, startDate, endDate, specialNeeds } = req.body;

  const prompt = `
You are a helpful travel assistant for elderly travelers.

Create a detailed packing checklist based on the following:

- Destination: ${destination}
- Travel Dates: From ${startDate} to ${endDate}
- Special Needs: ${specialNeeds || "None"}
Make sure nothing important is forgotten. Include weather-appropriate clothing, medications, documents, tech devices, and comfort items.

Present the packing list as a clear, bullet-point checklist categorized by:
- Clothing
- Toiletries
- Travel Documents
- Medical Essentials
- Technology
- Optional/Comfort Items
`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    res.status(200).json({ result: data.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI API error:', err);
    res.status(500).json({ error: 'Failed to generate packing list.' });
  }
}
