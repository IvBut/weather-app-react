import {changeAppStatus} from "./appStatusActionCreator";
import {openWeatherService} from "../../services/OpenWeatherService";
import {FETCHING_WEATHER_FAIL, FETCHING_WEATHER_SUCCESS, SHOW_ERROR_MESSAGE} from "../../constants/actionTypes";

export function fetchWeatherStarted(city){
    return (dispatch) => {
        dispatch(changeAppStatus(true));
        openWeatherService.getWeather(city)
            .then((resp)=>{
                dispatch(fetchWeatherSuccess(resp))
            })
            .catch(err=> {
                dispatch(fetchWeatherFailed());
                dispatch({type: SHOW_ERROR_MESSAGE, payload: {message: err.message}})

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

export function fetchWeatherFailed() {
    return {
        type: FETCHING_WEATHER_FAIL
    }
}