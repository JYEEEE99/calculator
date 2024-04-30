document.addEventListener("DOMContentLoaded", function () {
  fetchGasPrices();
});

function fetchGasPrices() {
  const url = "https://openapi.gg.go.kr/GASSTATIONAVGPRICE";
  const key = "bb3c36b5410944f08f6057aaeaf93740";
  const requestURL = `${url}?KEY=${key}&Type=xml&pIndex=1&pSize=100`;

  fetch(requestURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      const parser = new DOMParser();
      const xmlData = parser.parseFromString(data, "application/xml");
      const avgPrices = xmlData.querySelectorAll("AVG_PC");

      const container = document.getElementById("averagePrice");
      container.innerHTML = ""; // Clear previous results

      const fuelTypes = ["고급 휘발유", "경유", "휘발유"]; // Fuel types for index 0, 1, 2

      avgPrices.forEach((avgPrice, index) => {
        if (index === 0 || index === 1 || index === 2) {
          // Only show for index 0, 1, 2
          const price = document.createElement("div");
          const priceValue = Math.floor(avgPrice.textContent); // Remove decimal part
          price.textContent = `${fuelTypes[index]} 평균 가격: ${priceValue}`;

          const button = document.createElement("button");
          button.textContent = "입력";
          button.onclick = function () {
            document.getElementById("fuelPrice").value = priceValue; // Set value to input on button click
          };

          price.appendChild(button);
          container.appendChild(price);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}
