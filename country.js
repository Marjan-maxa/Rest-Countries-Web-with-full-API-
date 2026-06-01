const contryName = new URLSearchParams(location.search).get("name");

const nativeName = document.querySelector(".native-Name");
const populationNumber = document.querySelector(".population-Number");
const regionName = document.querySelector(".region-Name");
const subRegionName = document.querySelector(".subregion-Name");
const capitalName = document.querySelector(".capital-Name");
const todomainName = document.querySelector(".todomain-Name");
const currenciesName = document.querySelector(".currencies-Name");
const languageName = document.querySelector(".language-Name");
const flagImg = document.querySelector(".country-detais img");
const countryTitleh1 = document.querySelector(
  ".country-detais .text-details h1",
);
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

const borderCountriesContainer = document.querySelector(".border-section");
fetch(`https://restcountries.com/v3.1/name/${contryName}?fullText=true`)
  .then((res) => res.json())

  .then((data) => {
    const country = data[0];
    flagImg.src = country.flags.svg;
    countryTitleh1.innerText = country.name.common;
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }
    populationNumber.innerText = new Intl.NumberFormat("en-BD").format(
      country.population,
    );
    regionName.innerText = country.region;
    if (country.subregion) {
      subRegionName.innerText = country.subregion;
    }
    if (country.capital) {
      capitalName.innerText = country.capital.join(", ");
    }
    todomainName.innerText = country.tld.join(", ");
    if (country.currencies) {
      currenciesName.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }
    if (country.languages) {
      languageName.innerText = Object.values(country.languages).join(", ");
    }
    if (country.borders) {
      country.borders.forEach((border) => {
        console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then((borderCountries) => {
            console.log(borderCountries);
            const borderBtn = document.createElement("a");
            borderBtn.classList.add("border-country-btn");
            borderBtn.innerText = borderCountries[0].name.common;
            borderBtn.href = `country.html?name=${borderCountries[0].name.common}`;
            console.log(borderBtn);
            borderCountriesContainer.append(borderBtn);
          });
      });
    }
  });

themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeSwitcher.innerHTML = `<i class="fa-regular fa-sun"></i>&nbsp;Light Mode`;
  } else {
    localStorage.setItem("theme", "light");
    themeSwitcher.innerHTML = `<i class="fa-regular fa-moon"></i>&nbsp;Dark Mode`;
  }
});
