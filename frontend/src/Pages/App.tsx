import React from 'react';
import logo from '../logo.svg';
import './App.css';

function App() {
  const onButtonClick = (event:any) => {
    console.log(event.target.value);
  };

  return (
    <div className="App">
      <div className="container">
        <img src={logo} className="App-logo" alt="logo" />
        <section>
          <div className="title">ASTRO BLUE'S 1<sup>ST</sup> BIRTHDAY!</div>
          <label><b>Upload Pics</b></label>
          <button className="btn btn__secondary" value="anonymous" onClick={onButtonClick}>Anonymously</button>
          <button className="btn btn__secondary" value="raffle" onClick={onButtonClick}>For Raffle</button>
        </section>
      </div>
    </div>
  );
}

export default App;
