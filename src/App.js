import logo from './logo.svg';
import './App.css';
import Addnotes from './Components/Addnotes'
import Shownotes from './Components/Shownotes'
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function App() {
  const [value, setValue] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleButtonClick=()=>{
    setShow(!show)
  }
  const handleCalendarChange=(e,res)=>{
    setValue(e)
    setShow(!show)
  }
  return (
    <div>
      <div style={{backgroundColor: "#4056A1",height: "100px"}}>
        <h1 style={{display: "flex", justifyContent: "center", color: "white"}}>Note</h1>
        <div>
          <Button style={{position: "absolute", right: "0"}} variant="contained" color="primary" onClick={()=>handleButtonClick()}>
            {/*value.getDate() + "/" + (value.getMonth() + 1) + "/" + value.getFullYear()*/}
            {value.toDateString()}
          </Button>
        </div>
      </div>
      <div style={{position: "absolute", right: "0", zIndex: 1}}>
        {show && <Calendar
          onChange={(e,res)=>handleCalendarChange(e,res)}
          value={value}
        />}
      </div>
      <div>
        <div style={{display: "flex", justifyContent: "center",alignItems: "center"}}>
          <Addnotes value={value}/>
        </div>
        <br/>
        <br/>
        <div>
          <Shownotes value={value}/>
        </div>
      </div>

    </div>
  );
}

export default App;
