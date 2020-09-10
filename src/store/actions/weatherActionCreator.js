import {changeAppStatus} from "./appStatusActionCreator";
import {openWeatherService} from "../../services/OpenWeatherService";
import {FETCHING_WEATHER_SUCCESS} from "../../constants/actionTypes";

export function fetchWeatherStarted(city){
    return (dispatch) => {
        dispatch(changeAppStatus(true));
        openWeatherService.getWeather(city)
            .then((resp)=>{
                dispatch(fetchWeatherSuccess(resp))
            })
            .catch(err=> {
                console.log(err)
            })
            .finally(() => {
                dispatch(changeAppStatus(false))
            })
    }
}

export function fetchWeatherSuccess({currentWeather, weatherForecast}){
    return {
        type: FETCHING_WEATHER_SUCCESS,
        payload: {
            currentWeather,
            weatherForecast
        }
    }
}