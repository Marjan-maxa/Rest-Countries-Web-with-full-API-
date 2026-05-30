const countryContainer = document.querySelector(".country-container");
const filterByRigionSelect = document.querySelector(".region-filter");
const searchInput = document.querySelector(".search-box input");
const themeSwitcher = document.querySelector(".theme-swicher");
const currentMode = localStorage.getItem("theme");
if (currentMode === "dark") {
  document.body.classList.add("dark");
  if (themeSwitcher) {
    themeSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
  }
} else {
  document.body.classList.remove("dark");
  if (themeSwitcher) {
    themeSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
  }
}
const loader = document.createElement("div");
loader.innerText = "Loading Countries...";
loader.classList.add("loading");
countryContainer.append(loader);
let allCountriesData;
fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,currencies,languages,subregion,tld",
)
  .then((response) => response.json())
  .then((data) => {
    renderCountries(data);
    allCountriesData = data;
  })
  .catch((error) => {
    loader.innerText = "Failed to load data. Please try again later.";
    console.error("Error fetching data:", error);
  });

filterByRigionSelect?.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((response) => response.json())
    .then(renderCountries);
});

// render countries function

function renderCountries(data) {
  {
    loader.remove();
    countryContainer.innerHTML = "";
    data.forEach((country) => {
      const languages = country.languages
        ? Object.values(country.languages).join(", ")
        : "N/A";

      const capital = country.capital ? country.capital.join(", ") : "N/A";

      const countryCard = document.createElement("a");
      countryCard.href = `/country.html?name=${country.name.common}`;
      countryCard.classList.add("country-card");

      countryCard.innerHTML = `
        <img src="${country.flags.svg}" alt="${country.name.common} Flag">
        <h3 class="card-title">${country.name.common}</h3>
        <div class="card-text">
            <p><b>Population: </b>${new Intl.NumberFormat("en-BD").format(country.population)}</p>
            <p><b>Region: </b>${country.region}</p>
            <p><b>Capital: </b>${capital}</p>
            <p><b>Languages: </b>${languages}</p>
        </div>`;

      countryContainer.append(countryCard);
    });
  }
}

//-----------------------------------------------------------------

searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  const filterdCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase()),
  );
  renderCountries(filterdCountries);
});

themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
  } else {
    themeSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
  }
});
