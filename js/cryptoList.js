const coinContainer = document.querySelector(".main-coin-container");

async function showCoin() {
  try {
    coinContainer.innerHTML =
      "<p style='color:white;padding:10px'>Loading...</p>";

    const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr";
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("API error");
    }

    const data = await response.json();

    let coinList = "";

    data.forEach((item, index) => {

      // 🔹 SAFE values (null protection)
      const price =
        item.current_price !== null
          ? "₹ " + item.current_price.toLocaleString("en-IN")
          : "N/A";

      const volume =
        item.total_volume !== null
          ? "₹ " + item.total_volume.toLocaleString("en-IN")
          : "N/A";

      const marketCap =
        item.market_cap !== null
          ? "₹ " + item.market_cap.toLocaleString("en-IN")
          : "N/A";

      const change = item.price_change_percentage_24h;

      const changeClass =
        change === null ? "" : change >= 0 ? "green" : "red";

      const sign =
        change === null ? "" : change >= 0 ? "+" : "";

      const changeText =
        change !== null ? sign + change.toFixed(2) + "%" : "N/A";

      coinList += `
        <div class="coin-container">

          <!-- LEFT -->
          <div class="coin">
            <ul>
              <li>${index + 1}</li>
              <li>${item.name}</li>
            </ul>
          </div>

          <!-- RIGHT -->
          <div class="coin-detail">
            <ul>
              <li>${price}</li>
              <li class="${changeClass}">${changeText}</li>
              <li>${volume}</li>
              <li>${marketCap}</li>
              <li>
                <img src="${item.image}" width="30" />
              </li>
            </ul>
          </div>

        </div>
      `;
    });

    coinContainer.innerHTML = coinList;

  } catch (err) {
    console.error(err);
    coinContainer.innerHTML =
      "<p style='color:red;padding:10px'>Error fetching coins</p>";
  }
}

// Run once
showCoin();

// Refresh every 15 seconds (safe for CoinGecko)
setInterval(showCoin, 15000);
