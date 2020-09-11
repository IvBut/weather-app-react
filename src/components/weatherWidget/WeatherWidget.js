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
       <Container>
           <Row className="justify-content-center align-items-stretch">
               <Col lg={4} xs={12}>
                   <Card bg={'dark'} border={'primary'} text={'light'}>
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
               <Col lg={4} xs={12}>
                   <Carousel className="border border-primary bg-secondary">
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
                                           <h3 style={{margin: '1rem auto'}}>
                                               {t(`${DAILY_WEATHER_TEMPLATE.dt.dayName}${weather['dt']['dayName']}`)}
                                               {` - ${weather['dt']['dayNumber']} - `}
                                               {t(`${DAILY_WEATHER_TEMPLATE.dt.month}${weather['dt']['month']}`)}
                                           </h3>
                                           <h3 style={{margin: '1rem auto'}}>
                                               {t(`${getWeatherDescription(weather)}`)}
                                           </h3>
                                           <Table striped bordered hover variant={'dark'} size="sm" style={{margin:'1rem auto'}} responsive={true}>
                                               <tbody>
                                                   {Object.keys(DAILY_WEATHER_TEMPLATE.temp).map( (key,idx) => (
                                                     <tr key={key + '-' + idx}>
                                                         <td className="text-primary text-center">{t(DAILY_WEATHER_TEMPLATE.temp[key])}</td>
                                                         <td>{weather['temp'][key]}</td>
                                                     </tr>
                                                   ))}
                                                   {
                                                       Object.keys(DAILY_WEATHER_TEMPLATE)
                                                           .filter(key => key !== 'temp' && key!== 'weather' && key !== 'dt' )
                                                           .map(key => (
                                                               <tr key={DAILY_WEATHER_TEMPLATE[key]}>
                                                                   <td className="text-primary text-center">{t(DAILY_WEATHER_TEMPLATE[key])}</td>
                                                                   <td>{weather[key]}</td>
                                                               </tr>
                                                           ))
                                                   }
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

export default WeatherWidget;
