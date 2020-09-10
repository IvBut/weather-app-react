import React from 'react';
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



function App({onLanguageChange,onWeatherSearch, isActive, weatherForecast, currentWeather}) {

    const {t} = useTranslation('translation');
    const spinner =  <div className="app-spinner-wrapper"><Spinner className="app-spinner" animation="border"  variant="primary" /></div>

    const handleWeatherSearch = (city) => {
        onWeatherSearch(city);
    };

    const handleChangeLanguage = (lang) => {
        onLanguageChange(AVAILABLE_LANGUAGES[lang]);
    };

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
            <Navbar.Collapse id="basic-navbar-nav">
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
                <div className="mr-1">
                    <SearchComponent searchField='name' dataArray={data} onSearch={handleWeatherSearch}/>
                </div>
            </Navbar.Collapse>
        </Navbar>
        <section>
            {(!isActive && currentWeather && weatherForecast.length > 0) ?
                <WeatherWidget currentWeather={currentWeather}
                               weatherForecast={weatherForecast}
                />
                : null
            }
        </section>
        {
            isActive && spinner
        }
    </>
  );
}

function mapStateToProps(state) {
    return {
        isActive: state.appStatusReducer.isPending,
        currentWeather: getCurrentWeather(state),
        weatherForecast: getWeatherForecast(state)
    }
}

function mapDispatchToProps(dispatch){
    return {
        onLanguageChange: (languageName) => dispatch(changeLanguage(languageName)),
        onWeatherSearch: (city) => dispatch(fetchWeatherStarted(city))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
