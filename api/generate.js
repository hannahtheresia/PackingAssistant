// ./api/generate.js
export default async function handler(req, res) {
  const { destination, duration, specialNeeds } = req.body;

  const prompt = `Create a travel packing list for a ${duration}-day trip to ${destination}. 
Include any special items needed for: ${specialNeeds}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
