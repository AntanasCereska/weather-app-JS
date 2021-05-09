const api = {
    key: "fb2db0a63dd4b66898fae4de97d6834b",
    base: "https://api.openweathermap.org/data/2.5/"
}


const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    //keyCode 13 = enter key
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date(); //creates date object
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)} °c / ${weather.main.temp_max}°c`

    let deg = document.querySelector('.wind .deg');
    deg.innerHTML = `wind degree/direction: ${weather.wind.deg}° `;

    let direction = document.querySelector('.wind .deg ');
    if (`${weather.wind.deg}` >= 338 && `${weather.wind.deg}` < 23) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ↑ </span>`;
    } else if (`${weather.wind.deg}` >= 23 && `${weather.wind.deg}` < 68) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ↗ </span>`;
    } else if (`${weather.wind.deg}` >= 68 && `${weather.wind.deg}` < 113) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> → </span>`;
    } else if (`${weather.wind.deg}` >= 113 && `${weather.wind.deg}` < 158) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ↘ </span>`;
    } else if (`${weather.wind.deg}` >= 158 && `${weather.wind.deg}` < 203) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ↓ </span>`;
    } else if (`${weather.wind.deg}` >= 203 && `${weather.wind.deg}` < 248) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ↙ </span>`;
    } else if (`${weather.wind.deg}` >= 248 && `${weather.wind.deg}` < 293) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ← </span>`;
    } else if (`${weather.wind.deg}` >= 293 && `${weather.wind.deg}` < 338) {
        direction.innerHTML = `wind degree/direction: ${weather.wind.deg}° <span> ↖ </span>`;
    } else {
        direction.innerHTML += `direction not found`;
    }

    let speed = document.querySelector('.wind .speed');
    speed.innerHTML = `wind speed: ${weather.wind.speed.toFixed(1)} <span> m/s </span>`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}