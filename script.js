const API_URL = 'http://127.0.0.1:5000/drinks';

document.addEventListener('DOMContentLoaded', () => {
  loadDrinks();

  document.getElementById('drinkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const ingredients = document.getElementById('ingredients').value;
    const price = parseFloat(document.getElementById('price').value);

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, ingredients, price })
    });

    e.target.reset();
    loadDrinks();
  });
});

async function loadDrinks() {
  const res = await fetch(API_URL);
  const drinks = await res.json();

  const container = document.getElementById('drinksContainer');
  container.innerHTML = '';

  drinks.forEach(drink => {
    const div = document.createElement('div');
    div.className = 'drink';
    div.innerHTML = `
    <div class="drink-info">
      <strong>${drink.name}</strong>
      <span> - R$ ${drink.price?.toFixed(2) || '---'}</span>
      <p><em>${drink.ingredients || 'Sem ingredientes'}</em></p>
    </div>
    <div class="button-container">
      <button onclick="deleteDrink(${drink.id})">Apagar</button>
    </div>
  `;
    container.appendChild(div);
  });
}

async function deleteDrink(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  loadDrinks();
}
