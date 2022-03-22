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
        this.cityInput = document.querySelector(this.UiSelectors.input);
        this.btn = document.querySelector(this.UiSelectors.btn);
        this.pullWeather();
    }

    addEventListeners(){
        let self = this;
        self.btn.addEventListener('click',() => self.getWeather());
        self.cityInput.addEventListener('keyup', function(e){
            if(e.keyCode == 13){
                self.getWeather();
            }
        })
    }

    async pullWeather() {
        this.apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
        this.cityUrl = `${this.cityName}`;
        this.apiKey = "c7438fc0eda02168241db98cf4d07b02";
        this.fullApiLink = `${this.apiLink}${this.cityUrl}` +"&appid="+ `${this.apiKey}`;
        const { weather } = await this.fetchData(this.fullApiLink);
        const { wind } = await this.fetchData(this.fullApiLink);
        const { name } = await this.fetchData(this.fullApiLink);
        const { main } = await this.fetchData(this.fullApiLink);
        const celciusDegrees = Math.round((main.temp - 273.15) * 1);
        const pertemperature = Math.round((main.feels_like - 273.15) * 1);
        const description = weather[0].description;
        const windSpeed = wind.speed;
        const icon = weather[0].icon;
        this.city.innerText = "Weather in " + name;
        this.temperature.innerText = celciusDegrees + "°C";
        this.pertemperature.innerText = "Perveived temperature: " + pertemperature + "°C";
        this.tempdescription.innerText = description;
        this.wind.innerText = "Wind speed: " + windSpeed + " km/h";
        this.icon.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    }

    async fetchData(url){
        const response = await fetch(url);
        const parseResponse = await response.json();
        return parseResponse 
    }
}