async function fetchFuelPrices() {
  const url =
    "https://data.ex.co.kr/openapi/business/curStateStation?key=test&type=xml&numOfRows=10&pageNo=1";
  try {
    const response = await fetch(url);
    const data = await response.text(); // Get the response as text

    // Parsing the XML response
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "application/xml");

    // Function to find the first valid price
    function findFirstValidPrice(prices) {
      for (let i = 0; i < prices.length; i++) {
        const price = parseFloat(prices[i].textContent.replace(/[^\d.]/g, ""));
        if (!isNaN(price)) {
          return price;
        }
      }
      return null;
    }

    // Extracting and displaying gasoline prices
    const gasolinePrices = xml.getElementsByTagName("gasolinePrice");
    const gasolinePriceElement = document.getElementById("gasolinePrice");
    const gasolinePriceValue = findFirstValidPrice(gasolinePrices);
    gasolinePriceElement.innerHTML =
      "가솔린 가격: " +
      (gasolinePriceValue !== null
        ? `<span>${gasolinePriceValue}원</span>`
        : "<span>정보 없음</span>");
    createInputButton(gasolinePriceElement, "gasoline", gasolinePriceValue);

    // Extracting and displaying diesel prices
    const dieselPrices = xml.getElementsByTagName("diselPrice");
    const dieselPriceElement = document.getElementById("dieselPrice");
    const dieselPriceValue = findFirstValidPrice(dieselPrices);
    dieselPriceElement.innerHTML =
      "디젤 가격: " +
      (dieselPriceValue !== null
        ? `<span>${dieselPriceValue}원</span>`
        : "<span>정보 없음</span>");
    createInputButton(dieselPriceElement, "diesel", dieselPriceValue);

    // Extracting and displaying LPG prices
    const lpgPrices = xml.getElementsByTagName("lpgPrice");
    const lpgPriceElement = document.getElementById("lpgPrice");
    const lpgPriceValue = findFirstValidPrice(lpgPrices);
    lpgPriceElement.innerHTML =
      "LPG 가격: " +
      (lpgPriceValue !== null
        ? `<span>${lpgPriceValue}원</span>`
        : "<span>정보 없음</span>");
    createInputButton(lpgPriceElement, "lpg", lpgPriceValue);
  } catch (error) {
    console.error("Error fetching fuel prices:", error);
    document.getElementById("gasolinePrice").textContent =
      "Failed to load gasoline price";
    document.getElementById("dieselPrice").textContent =
      "Failed to load diesel price";
    document.getElementById("lpgPrice").textContent =
      "Failed to load LPG price";
  }
}

// Function to create input button
function createInputButton(element, fuelType, defaultValue) {
  const inputButton = document.createElement("button");
  inputButton.textContent = "입력";
  inputButton.addEventListener("click", function () {
    // Set input field value
    document.getElementById("fuelPrice").value = defaultValue || "";
  });
  // Move input button to the right
  element.insertAdjacentElement("afterend", inputButton);
}

fetchFuelPrices();
