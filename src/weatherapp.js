import React, { useState } from "react";
import Mist from "./mistsky.png";
import Cloud from "./cloudysky.png";
import Clear from "./clearsky.png";
import Haze from "./hazesky.png";
import  Rain from "./rainsky.png";

import { ReactDOM } from "react-dom";
import "./weatherapp.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet,faMagnifyingGlass ,faWind} from '@fortawesome/free-solid-svg-icons'
import { clear } from "@testing-library/user-event/dist/clear";



function App(){
  let [APIkey,methodapikey]=useState("96c202677bc2235ab063c45282da6111")
  let [humidity,methodhumidity]=useState("65");
  let [windspeed,methodwindspeed]=useState("65");
  let [city,methodcity]=useState("");
  let [pic,methodpic]=useState("");
  let [temp,methodtemp]=useState(68);
  let [show,methodshow]=useState("Bhubaneswar");
  function changevalue(event){
    methodcity(event.target.value);
  }
  function work(){
    if(city===""){
      alert("Enter a valid place");
    }
    else{
      methodshow(city);
      methodcity("");
      async function weathercall(city,apikey){

        let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`);
        let maindata=await data.json();
        console.log(maindata);
        methodtemp(Math.floor(maindata.main.temp-273.15))
        methodpic(maindata.weather[0].main);
        methodwindspeed(Math.floor(maindata.wind.speed));
        methodhumidity(maindata.main.humidity);


      }
      weathercall(city,APIkey);
    }
  }
  
  return(
    
    <div className="weatherappbox">
      <div className="navbar">
        <div className="inputbox"><input style={{width:"95%",border:"none",outline:"none"}} onChange={changevalue} value={city}></input></div>
        <div className="searchbar" onClick={work}><FontAwesomeIcon icon={faMagnifyingGlass}/></div> 
      </div>
      {(()=>{
        if(pic==="Haze"){
          return <img src={Haze} className="imagebox"/>
        }
        else if(pic==="Rain"){
          return <img src={Rain} className="imagebox"/>
        }
        else if(pic==="Cloud"){
          return <img src={Cloud} className="imagebox"/>
        }
        else if(pic==="Fog"){
          return <img src={Mist} className="imagebox"/>
        }
        else{
           return <img src={Clear} className="imagebox"/>
        }
      })()}

      
       <br/> <br/> <br/>
       <span style={{fontSize:"40px",color:"white"}}>{temp}°C</span> <br/> 
      <span style={{fontSize:"30px",color:"white"}}>{show}</span>
      <div id="information">
         <div className="left">
          <div className="logo" ><FontAwesomeIcon icon={faDroplet} style={{fontSize:"30px"}}/ ></div>
          <div className="contentbox">
            {humidity}% <br/> Humidity
          </div>
         </div>
         <div className="right">
         <div className="logo"><FontAwesomeIcon icon={faWind} style={{fontSize:"30px"}}/ ></div>
          <div className="contentbox">
            {windspeed}km/hr <br/> Wind speed
          </div>

         </div>
      </div>
    </div>

    
  );
}
export default App;