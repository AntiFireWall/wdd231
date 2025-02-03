const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");

const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=40.18&lon=44.51&units=metric&appid=5d1c0c5bee12319e55c8ec2262b7e99b"
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=40.18&lon=44.51&units=metric&appid=5d1c0c5bee12319e55c8ec2262b7e99b"

async function apiFetch(url)
{
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

// https://openweathermap.org/img/w/${data.weather[0].icon}.png

async function displayCurrentWeather()
{
    const data = await apiFetch(currentWeatherUrl);
    const sunriseTime = new Date(data.sys.sunrise * 1000)
    const sunsetTime = new Date(data.sys.sunset * 1000)
    const weatherIcon = document.createElement("img");
    const weatherInfo = document.createElement("div");

    let desc = `${data.weather[0].description}`;
    weatherInfo.setAttribute("id", "weather-info");
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", desc);

    const tempNumber = document.createElement("p");
    const weatherDesc = document.createElement("p");
    const tempHigh = document.createElement("p");
    const tempLow = document.createElement("p");
    const humidity = document.createElement("p");
    const sunrise = document.createElement("p");
    const sunset = document.createElement("p");

    weatherDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    tempNumber.innerHTML = `<b>${data.main.temp}</b>&deg;C`;
    tempHigh.innerHTML = `High: <b>${data.main.temp_max}</b>&deg;`;
    tempLow.innerHTML = `Low: <b>${data.main.temp_min}</b>&deg;`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    sunrise.textContent = `Sunrise: ${sunriseTime.getHours()}:${sunriseTime.getMinutes()<10 ?
         "0" + sunriseTime.getMinutes() : sunriseTime.getMinutes()}`;
    sunset.textContent = `Sunrise: ${sunsetTime.getHours()}:${sunsetTime.getMinutes()<10 ?
         "0" + sunsetTime.getMinutes() : sunsetTime.getMinutes()}`;

    weatherInfo.appendChild(tempNumber);
    weatherInfo.appendChild(weatherDesc);
    weatherInfo.appendChild(tempHigh);
    weatherInfo.appendChild(tempLow);
    weatherInfo.appendChild(humidity);
    weatherInfo.appendChild(sunrise);
    weatherInfo.appendChild(sunset);
    currentWeather.appendChild(weatherIcon);
    currentWeather.appendChild(weatherInfo);
}

async function displayForecast() {
    const data = await apiFetch(forecastUrl);
    const data2 = await apiFetch(currentWeatherUrl);
    const listOfData = data.list;
    const today = new Date();
    const tomorrow = new Date();
    const afterTomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    afterTomorrow.setDate(today.getDate() + 2);
    const todayTemp = data2.main.temp;
    const tomorrowTemp = returnTemp(tomorrow.getDate(), listOfData);
    const afterTomorrowTemp = returnTemp(afterTomorrow.getDate(), listOfData);

    const todayDisplay = document.createElement("p");
    const tomorrowDisplay = document.createElement("p");
    const afterTomorrowDisplay = document.createElement("p");

    todayDisplay.innerHTML = `Today: <b>${todayTemp}&deg;C</b>`
    tomorrowDisplay.innerHTML = `${getWeekdayName(tomorrow.getDay())}: <b>${tomorrowTemp}&deg;C</b>`
    afterTomorrowDisplay.innerHTML = `${getWeekdayName(afterTomorrow.getDay())}: <b>${afterTomorrowTemp}&deg;C</b>`
    
    forecast.appendChild(todayDisplay);
    forecast.appendChild(tomorrowDisplay);
    forecast.appendChild(afterTomorrowDisplay);
}

function returnTemp(date, list)
{
    let returnInfo = ""
    list.forEach(item => {
        let ymd = item.dt_txt.split(" ")[0]
        let time = item.dt_txt.split(" ")[1]
        if(ymd.split("-")[2].includes(date) && time.includes("12:00:00"))
        {
            returnInfo = item.main.temp
        }
    });
    return returnInfo
}

function getWeekdayName(day)
{
    const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",]
    return dayNames[day-1]
}

apiFetch(forecastUrl);
displayCurrentWeather();
displayForecast();
// apiFetch(url2);