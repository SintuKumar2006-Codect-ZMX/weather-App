const API_KEY = '17325120d11e455bbf5165025261101';
        const API_URL = 'https://api.weatherapi.com/v1/current.json';

        const cityInput = document.getElementById('cityInput');
        const searchBtn = document.getElementById('searchBtn');
        const weatherInfo = document.getElementById('weatherInfo');
        const errorMsg = document.getElementById('errorMsg');
        const loading = document.getElementById('loading');

        async function getWeather(city) {
            try {
                loading.style.display = 'block';
                weatherInfo.style.display = 'none';
                errorMsg.style.display = 'none';

                const response = await fetch(`${API_URL}?key=${API_KEY}&q=${city}&aqi=yes`);
                
                if (!response.ok) {
                    throw new Error('City not found');
                }

                const data = await response.json();
                displayWeather(data);
                loading.style.display = 'none';
            } catch (error) {
                loading.style.display = 'none';
                errorMsg.textContent = '❌ ' + error.message + '. Please try again.';
                errorMsg.style.display = 'block';
                weatherInfo.style.display = 'none';
            }
        }

        function displayWeather(data) {
            const { location, current } = data;

            document.getElementById('cityName').textContent = location.name;
            document.getElementById('country').textContent = `${location.region}, ${location.country}`;
            document.getElementById('temperature').textContent = `${Math.round(current.temp_c)}°C`;
            document.getElementById('condition').textContent = current.condition.text;
            document.getElementById('weatherIcon').src = `https:${current.condition.icon}`;
            document.getElementById('feelsLike').textContent = `${Math.round(current.feelslike_c)}°C`;
            document.getElementById('humidity').textContent = `${current.humidity}%`;
            document.getElementById('windSpeed').textContent = `${current.wind_kph} km/h`;
            document.getElementById('pressure').textContent = `${current.pressure_mb} mb`;

            weatherInfo.style.display = 'block';
        }

        searchBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        });

        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) {
                    getWeather(city);
                }
            }
        });

        // Load London weather on page load
        getWeather('London');
    