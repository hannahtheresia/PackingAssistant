// script.js


const form = document.getElementById('trip-form');
const packingListDiv = document.getElementById('packing-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  packingListDiv.textContent = 'Generating packing list...';

  const destination = form.destination.value.trim();
  const startDate = form['start-date'].value;
  const endDate = form['end-date'].value;
const specialNeeds = form['special-needs'].value.trim();

  // You can add a special needs field if you want, then include it here in prompt

  if (!destination || !startDate || !endDate) {
    packingListDiv.textContent = 'Please fill in all fields.';
    return;
  }

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
        'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      packingListDiv.textContent = data.choices[0].message.content.trim();
    } else {
      packingListDiv.textContent = 'No response from AI. Please try again.';
    }
  } catch (error) {
    packingListDiv.textContent = 'Error generating packing list. Check console.';
    console.error(error);
  }
});
