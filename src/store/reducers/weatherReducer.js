import {FETCHING_WEATHER_FAIL, FETCHING_WEATHER_STARTED, FETCHING_WEATHER_SUCCESS} from "../../constants/actionTypes";

let initialState = {
    currentWeather: null,
    weatherForecast: []
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_WEATHER_STARTED:
            return {
                ...state
            };
        case FETCHING_WEATHER_SUCCESS:
            return {
                ...state,
                currentWeather: action.payload.currentWeather,
                weatherForecast: action.payload.weatherForecast
            };
        case FETCHING_WEATHER_FAIL:
            return {
                ...state,
                currentWeather: null,
                weatherForecast: []
            };

        default: return state;
    }
};

export const getCurrentWeather = state => state.weatherReducer.currentWeather;
export const getWeatherForecast = state => state.weatherReducer.weatherForecast;

export default weatherReducer;