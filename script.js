const cityNameElement = document.querySelector("header > div > h2");
const currentTemperatureInTheCity = document.querySelector("header > div > p");
const searchNewCityButton = document.querySelector("[data-crawler='crawler'] > button");
const loader = document.querySelector("[data-loader='loader']");
const newCityInfoSearch = (event) => {
    const inputCityName = document.querySelector("[data-crawler='crawler'] > input").value;
    event.preventDefault();
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCityName}&appid=3bccf97076b507b7ee7eef2f91955e8e`)
        .then(response => response.json(),)
        .then(response => {
            loader.style.display = "inline-block"
            if (response.cod === 200) {
                loader.style.display = "none";
                componentsInfoUpdate (response);
            } else {
                handleError(response);
            }
        })
        .catch(error => {
            cityNameElement.textContent = `Check your internet connection`;
            currentTemperatureInTheCity.style.display="none"
        });
}
searchNewCityButton.addEventListener("click", (event) => newCityInfoSearch(event));
const componentsInfoUpdate = (response) => {
    cityNameElement.textContent = response.name;
    currentTemperatureInTheCity.textContent = `${Math.floor(response.main.temp - 273.15)}°C`;
}
const handleError = (response) => {
    cityNameElement.textContent = `Sorry, that is because ${response.cod}`;
    currentTemperatureInTheCity.style.display="none";
    loader.style.display = "none";
}