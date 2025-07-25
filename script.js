const form = document.getElementById('trip-form');
const packingListDiv = document.getElementById('packing-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  packingListDiv.textContent = 'Generating packing list...';

  const destination = form.destination.value.trim();
  const startDate = form['start-date'].value;
  const endDate = form['end-date'].value;
  const specialNeeds = form['special-needs'].value.trim();

  if (!destination || !startDate || !endDate) {
    packingListDiv.textContent = 'Please fill in all fields.';
    return;
  }

  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ destination, startDate, endDate, specialNeeds }),
    });

    const data = await response.json();

    if (data.result) {
      packingListDiv.textContent = data.result;
    } else {
      packingListDiv.textContent = 'No response from AI. Please try again.';
    }
  } catch (error) {
    packingListDiv.textContent = 'Error generating packing list. Check console.';
    console.error('Fetch error:', error);
  }
});

