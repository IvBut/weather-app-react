import {APP_SETTINGS} from "../constants/ApplicationConfig";
import axios from 'axios'

const MEASURMENT_UNITS = {
    metric: 'units=metric',
    imperial: 'units=imperial'
};
const excludeParts = ['current', 'minutely','hourly', 'daily'];

class OpenWeatherService {

    async getWeather(city) {
        let {coord} = city;
        let endPoint = APP_SETTINGS.OPEN_WEATHER.ENDPOINT;
        let apiKey = APP_SETTINGS.API_KEY;

        let params = this._createParamString(coord,MEASURMENT_UNITS.metric, apiKey);
        let url = `${endPoint}/data/2.5/onecall?${params}`;

        const response = await axios.get(url);
        const currentWeather = response.current;

        return response;
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

export const openWeatherService = new OpenWeatherService();