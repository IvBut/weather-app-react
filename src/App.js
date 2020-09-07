import React from 'react';
import './App.css';
import {Button} from "react-bootstrap";
import SearchComponent from "./components/SearchComponent";
import data from './assets/city.list.min';

function App() {
    let arr = data.splice(0,1000);
    console.log(arr)
    return (
    <div className="App">
      <Button variant="primary">Primary</Button>
        <img src="http://openweathermap.org/img/wn/01n@2x.png" alt=""/>
        <div>
            <SearchComponent searchField='name' dataArray={arr}/>
        </div>
    </div>
  );
}

export default App;
