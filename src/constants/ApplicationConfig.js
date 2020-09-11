
export const APP_SETTINGS = {
    API_KEY : process.env.REACT_APP_WEATHER_API_KEY,
    APP_LOGO_SRC: 'https://rankquality.com/upload/resize_cache/iblock/13a/300_435_1/weather_forecast.png',
    OPEN_WEATHER: {
        ENDPOINT: 'https://api.openweathermap.org',
        ICON_URL: 'http://openweathermap.org/img/wn/'
    }
};

//SETTINGS
export const AVAILABLE_LANGUAGES = {
    'english' : 'en',
    'russian' : 'ru'
};


export const TEMPERATURE_TEMPLATE = {
    'day': 'day',
    'eve': 'eve',
    'max': 'max',
    'min': 'min',
    'morn': 'morn',
    'night': 'night'
};


export const DAILY_WEATHER_TEMPLATE = {
    'pressure': 'daily-weather.pressure',
    'humidity': 'daily-weather.humidity',
    'clouds': 'daily-weather.clouds',
    'pop': 'daily-weather.pop',
    'dt': {
        'dayName': 'day-name.',
        'month': 'month.'
    },
    'temp': {
        'morn': 'daily-weather.temp.morn',
        'day': 'daily-weather.temp.day',
        'eve': 'daily-weather.temp.eve',
        'night': 'daily-weather.temp.night',
        'max': 'daily-weather.temp.max',
        'min': 'daily-weather.temp.min'
    },
    'weather': 'weather',
    'wind_speed': 'daily-weather.wind_speed'
};


export const CURRENT_WEATHER_TEMPLATE = {
    'clouds': 'open-weather-map.current-weather.clouds',
    'temp': 'open-weather-map.current-weather.temp',
    'feels_like': 'open-weather-map.current-weather.feels_like',
    'dt': 'open-weather-map.current-weather.dt',
    'weather': 'open-weather-map.weather-code.id_'
};
