import {APP_SETTINGS} from "../constants/ApplicationConfig";
import axios from 'axios'
import moment from 'moment';


const MEASURMENT_UNITS = {
    metric: 'units=metric',
    imperial: 'units=imperial'
};
const excludeParts = ['current', 'minutely','hourly', 'daily'];

const currentWeatherResponseTemplate = {
    'clouds': 'number',
    'temp': 'number',
    'feels_like': 'number',
    'dt': 'number',
    'weather': 'object'
};

const dailyWeatherForecastTemplate = {
    'clouds': 'number',
    'dt': 'number',
    'humidity': 'number',
    'pressure': 'number',
    'rain': 'number',
    'temp': 'object',
    'weather': 'object',
    'wind_speed': 'number'
};

class OpenWeatherService {

    async getWeather(city) {
        let {coord} = city;
        let endPoint = APP_SETTINGS.OPEN_WEATHER.ENDPOINT;
        let apiKey = APP_SETTINGS.API_KEY;

        let params = this._createParamString(coord,MEASURMENT_UNITS.metric, apiKey);
        let url = `${endPoint}/data/2.5/onecall?${params}`;

        const response = await axios.get(url);

        const currentWeather = response.data['current'] ? createCurrentWeatherObj(response.data['current']) : null;
        const weatherForecast = response.data['daily']? createWeatherForecast(response.data['daily']) : null;

        return {currentWeather, weatherForecast};
    }

    _createParamString(coord,metric, apikey){
        let queryParams = [];
        queryParams.push(Object.entries(coord).map(value => value.join('=')).join('&'));
        queryParams.push(metric);
        queryParams.push(`exclude=minutely,hourly`);
        queryParams.push(`appid=${apikey}`);
        return queryParams.join('&');
    }

}

function createCurrentWeatherObj(obj) {
   let result  = {};
    for (const [field, type] of Object.entries(currentWeatherResponseTemplate)){
       if(obj.hasOwnProperty(field) && typeof(obj[field] === type)){
           result[field] = obj[field];

           if(field === 'clouds'){
               result[field] = obj[field] + '%'
           }

           if (field === 'dt') {
               result[field] = moment(obj[field]*1000).format('DD-MM-YYYY, HH:mm');
           }

           if( field === 'weather' && Array.isArray(obj[field])){
               result[field] = {
                   ...obj[field][0]
               }
           }


       }
   }
   return result;
}

function createWeatherForecast(forecast){
    let result = [];
    let template = new Map(Object.entries(dailyWeatherForecastTemplate));

    //приводим response к шаблону dailyWeatherForecastTemplate
    forecast.forEach((weather) => {
        let filteredObj = {};
        for(const [field, value] of Object.entries(weather)){
           if(template.has(field) && typeof(weather[field]) === template.get(field)){
               filteredObj[field] = value;
           }
        }
        result.push(filteredObj);
    });


    //готовим итоговый обьект для отображения
    result = result.map(weather => {
        let time = weather['dt'] * 1000;
        return {
            ...weather,
            dt: (moment(time).format('DD MMMM') + ',' + moment(time).format('dddd')).toUpperCase(),
            weather: weather['weather'][0],
            clouds: weather['clouds'] + '%'
        }
    });

    return result;
}


export const openWeatherService = new OpenWeatherService();
