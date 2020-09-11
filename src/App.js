import React, {useEffect, useState} from 'react';
import './App.css';
import {Button, NavDropdown, Navbar, Nav, Form, FormControl, Spinner} from "react-bootstrap";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import SearchComponent from "./components/searchComponent/SearchComponent";
import data from './assets/city.list.min';
import {APP_SETTINGS, AVAILABLE_LANGUAGES} from "./constants/ApplicationConfig";
import {changeLanguage} from "./store/actions/languageActionCreator";
import {connect} from "react-redux";
import {useTranslation} from "react-i18next";
import {fetchWeatherStarted} from "./store/actions/weatherActionCreator";
import {getCurrentWeather, getWeatherForecast} from "./store/reducers/weatherReducer";
import WeatherWidget from "./components/weatherWidget/WeatherWidget";
import {getError} from "./store/reducers/errorReducer";
import AlertComponent from "./components/alert/alertComponent";
import {HIDE_ERROR_MESSAGE} from "./constants/actionTypes";



function App({onLanguageChange,onWeatherSearch, isActive, weatherForecast, currentWeather, error, onErrorReset}) {

    const {t} = useTranslation('translation');
    const spinner =  <div className="app-spinner-wrapper"><Spinner className="app-spinner" animation="border"  variant="primary" /></div>;
    const [city, SetCity] = useState({
       coord: {
           lat: 53.6884,
           lon: 23.8258
       } ,
        name: 'Hrodno',
        id: 627904,
        state: '',
        country: 'BY'
    });

    const handleWeatherSearch = (city) => {
        SetCity((prevState => {
            return {
                ...city
            }
        }));
        onWeatherSearch(city);
    };

    const handleChangeLanguage = (lang) => {
        onLanguageChange(AVAILABLE_LANGUAGES[lang]);
    };


    useEffect(()=> {
       onWeatherSearch(city)
    },[]);

    return (
    <>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top" style={{marginBottom: 0}}>
            <Navbar.Brand>
                <img src={APP_SETTINGS.APP_LOGO_SRC}
                     width="60"
                     height="60"
                     alt="logo"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-around">
                <Nav className="mr-auto">
                    <DropdownButton id="dropdown-basic-button" title={t('language-btn.name')}>
                        {
                            Object.keys(AVAILABLE_LANGUAGES).map((lang,idx) =>{
                                return (
                                    <Dropdown.Item key={`${lang}-${idx}`} onClick={() => handleChangeLanguage(lang)}>{t(`language-btn.options.${lang}`)}</Dropdown.Item>
                                )
                            })
                        }
                    </DropdownButton>
                </Nav>
                    <SearchComponent searchField='name' dataArray={data} onSearch={handleWeatherSearch}/>
            </Navbar.Collapse>
        </Navbar>
        <section>
            <h1 className="text-center">{city.name}</h1>
            {(!isActive && currentWeather && weatherForecast.length > 0) ?
                <WeatherWidget currentWeather={currentWeather}
                               weatherForecast={weatherForecast}
                />
                : <h1 className="text-capitalize text-center">{t('no-search-results')}</h1>
            }
        </section>
        {
            isActive && spinner
        }
        {
            error && <AlertComponent message={error.message} time={5000}  onAlert={() => onErrorReset()}/>
        }
    </>
  );
}

function mapStateToProps(state) {
    return {
        isActive: state.appStatusReducer.isPending,
        currentWeather: getCurrentWeather(state),
        weatherForecast: getWeatherForecast(state),
        error: getError(state)
    }
}

function mapDispatchToProps(dispatch){
    return {
        onLanguageChange: (languageName) => dispatch(changeLanguage(languageName)),
        onWeatherSearch: (city) => dispatch(fetchWeatherStarted(city)),
        onErrorReset: () => dispatch({type: HIDE_ERROR_MESSAGE})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
