class Weather {
    constructor () {

        this.UiSelectors = {
            city: '[data-city]',
            temperature: '[data-temperature]',
            pertemperature: '[data-pertemperature]',
            tempdescription: '[data-tempdescription]',
            icon: '[data-icon]',
            wind: '[data-wind]',
            input: '[data-input]',
            btn: '[data-btn]'
        }
    }


    initializeWeather(){
        this.getWeather();
        this.addEventListeners();
    }

    getWeather(){
        this.city = document.querySelector(this.UiSelectors.city);
        this.temperature = document.querySelector(this.UiSelectors.temperature);
        this.pertemperature = document.querySelector(this.UiSelectors.pertemperature);
        this.tempdescription = document.querySelector(this.UiSelectors.tempdescription);
        this.icon = document.querySelector(this.UiSelectors.icon);
        this.wind = document.querySelector(this.UiSelectors.wind);
        this.cityName = document.querySelector(this.UiSelectors.input).value;
        this.btn = document.querySelector(this.UiSelectors.btn);

        this.pullWeather();
    }

    addEventListeners(){
        this.btn.addEventListener('click', () => this.getWeather());
    }

    async pullWeather() {
        this.API = "https://api.openweathermap.org/data/2.5/weather?q=";
        this.city = `${this.cityName}`;
        this.APIKEY = "c7438fc0eda02168241db98cf4d07b02";
        this.APIURL = `${this.API}${this.city}` +"&appid="+ `${this.APIKEY}`;
        const { weather } = await this.fetchData(this.APIURL);
        const { wind } = await this.fetchData(this.APIURL);
        const { name } = await this.fetchData(this.APIURL);
        const { main } = await this.fetchData(this.APIURL);
        const celciusDegrees = Math.round((main.temp - 273.15) * 1);
        const pertemperature = Math.round((main.feels_like - 273.15) * 1);
        const description = weather[0].description;
        const windSpeed = wind.speed;
        const icon = weather[0].icon;
        document.querySelector(".result__city").innerText = "Weather in " + name;
        document.querySelector(".result__temperature").innerText = celciusDegrees + "°C";
        document.querySelector(".result__pertemperature").innerText = "Perveived temperature: " + pertemperature + "°C";
        document.querySelector(".result__tempdescription").innerText = description;
        document.querySelector(".result__wind").innerText = "Wind speed: " + windSpeed + " km/h";
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
    }

    async fetchData(url){
        const response = await fetch(url);
        const parseResponse = await response.json();
        return parseResponse 
    }

}