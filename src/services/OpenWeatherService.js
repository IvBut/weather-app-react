import {APP_SETTINGS} from "../constants/ApplicationConfig";
import axios from 'axios'
import moment from 'moment';
import 'moment/locale/ru';

const MEASURMENT_UNITS = {
    metric: 'units=metric',
    imperial: 'units=imperial'
};
const excludeParts = ['current', 'minutely','hourly', 'daily'];

export const currentWeatherResponse = {
    'clouds': 'number',
    'temp': 'number',
    'feels_like': 'number',
    'dt': 'number',
    'weather': 'object'
};

class OpenWeatherService {

    async getWeather(city) {
        let {coord} = city;
        let endPoint = APP_SETTINGS.OPEN_WEATHER.ENDPOINT;
        let apiKey = APP_SETTINGS.API_KEY;

        let params = this._createParamString(coord,MEASURMENT_UNITS.metric, apiKey);
        let url = `${endPoint}/data/2.5/onecall?${params}`;

        const response = await axios.get(url);

        const currentWeather = createCurrentWeatherObj(response.data.current);

        return currentWeather;
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
    for (const [field, type] of Object.entries(currentWeatherResponse)){
       if(obj.hasOwnProperty(field) && typeof(obj[field] === type)){
           result[field] = obj[field];

           if(field === 'clouds'){
               result[field] = obj[field] + '%'
           }

           if (field === 'dt') {
               moment.locale('ru');
               result[field] = moment(obj[field]*1000)
                                .format('DD MMM YYYY, HH:mm');
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


export const openWeatherService = new OpenWeatherService();
