import React from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'
import Carousel from 'react-bootstrap/Carousel'
import Table from 'react-bootstrap/Table'
import {APP_SETTINGS, CURRENT_WEATHER_TEMPLATE, DAILY_WEATHER_TEMPLATE} from "../../constants/ApplicationConfig";
import {useTranslation} from "react-i18next";

const WeatherWidget = ({currentWeather, weatherForecast}) => {




    const {t} = useTranslation('translation');

    return (
       <Container fluid className="bg-secondary">
           <Row>
               <Col lg={6} xs={12}>
                   <Card className="w-100" bg={'dark'} border={'primary'} text={'light'}>
                       <Card.Img variant="top" src={getWeatherImg(currentWeather,4)} />
                       <Card.Body>
                           <Card.Title className="text-center font-weight-bold text-capitalize">{t(`${getWeatherDescription(currentWeather)}`)}</Card.Title>
                           <Card.Subtitle className="mb-2 text-center">
                               {t(CURRENT_WEATHER_TEMPLATE.temp,{value: currentWeather['temp']})}
                           </Card.Subtitle>
                       </Card.Body>
                       <ListGroup className="list-group-flush">
                           <ListGroupItem variant={'dark'} className="text-light text-left">
                               {t(CURRENT_WEATHER_TEMPLATE.dt,{value: getCurrentWeatherDate(currentWeather)})}
                           </ListGroupItem>
                           <ListGroupItem variant={'dark'} className="text-light text-left">
                               {t(CURRENT_WEATHER_TEMPLATE.feels_like,{value: currentWeather['feels_like']})}
                           </ListGroupItem>
                           <ListGroupItem variant={'dark'} className="text-light text-left">
                               {t(CURRENT_WEATHER_TEMPLATE.clouds,{value: currentWeather['clouds']})}
                           </ListGroupItem>
                       </ListGroup>
                   </Card>
               </Col>
               <Col lg={6} xs={12}>
                   <Carousel>
                       {
                           weatherForecast.map((weather,idx) => {
                               return (
                                   <Carousel.Item key={idx}>
                                       <img
                                           className="d-block w-100"
                                           src={getWeatherImg(weather,4)}
                                           alt="Forecast"
                                       />
                                       <Carousel.Caption style={{position:'static'}}>
                                           <h3 style={{marginBottom: '1rem'}}>
                                               {t(`${DAILY_WEATHER_TEMPLATE.dt.dayName}${weather['dt']['dayName']}`)}
                                               {` - ${weather['dt']['dayNumber']} - `}
                                               {t(`${DAILY_WEATHER_TEMPLATE.dt.month}${weather['dt']['month']}`)}
                                           </h3>
                                           <Table striped bordered hover variant={'dark'} size="sm" style={{margin:'1rem auto'}} responsive={true}>
                                               <thead>
                                               <tr>
                                                   <th>{t(DAILY_WEATHER_TEMPLATE.temp.morn)}</th>
                                                   <th>{t(DAILY_WEATHER_TEMPLATE.temp.day)}</th>
                                                   <th>{t(DAILY_WEATHER_TEMPLATE.temp.night)}</th>
                                                   <th>{t(DAILY_WEATHER_TEMPLATE.temp.max)}</th>
                                                   <th>{t(DAILY_WEATHER_TEMPLATE.temp.min)}</th>
                                               </tr>
                                               </thead>
                                               <tbody>
                                               <tr>
                                                   <td>{weather['temp']['morn']}</td>
                                                   <td>{weather['temp']['day']}</td>
                                                   <td>{weather['temp']['night']}</td>
                                                   <td>{weather['temp']['max']}</td>
                                                   <td>{weather['temp']['min']}</td>
                                               </tr>
                                               </tbody>
                                           </Table>
                                       </Carousel.Caption>
                                   </Carousel.Item>
                               )
                           })
                       }
                   </Carousel>
               </Col>
           </Row>
       </Container>
    )
};

//current weather settings
function getCurrentWeatherDate(weatherObj) {
    return weatherObj['dt']
}

function getWeatherDescription(weatherObj) {
    let currentWeatherDescription = weatherObj['weather']['id'];
    return `${CURRENT_WEATHER_TEMPLATE.weather}${currentWeatherDescription}`
}

function getWeatherImg(weatherObj, size) {
    let pathTail = size > 0 ? `@${size}x.png` : `.png`;
    return APP_SETTINGS.OPEN_WEATHER.ICON_URL + weatherObj['weather']['icon'] + pathTail;
}


//forecast settings
function getForecastWeatherDay(weatherObj) {

}

export default WeatherWidget;
