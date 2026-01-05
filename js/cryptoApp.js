const coinList = document.querySelector(".coin-list");

async function showPrice() {
  try {
    coinList.innerHTML = "<p>Loading...</p>";

    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";
    const response = await fetch(url);
    const data = await response.json();

    coinList.innerHTML = data.slice(0, 3).map(coin => `
      <div class="bg-slate-800 p-4 rounded-lg flex items-center gap-4">
        <img src="${coin.image}" class="w-10">
        <div>
          <h2 class="font-bold">₹ ${coin.current_price}</h2>
          <p class="text-sm text-gray-400">${coin.name}</p>
        </div>
      </div>
    `).join("");

  } catch (error) {
    coinList.innerHTML = "<p class='text-red-500'>Error loading data</p>";
  }
}

showPrice();
setInterval(showPrice, 10000);

