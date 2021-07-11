import React from 'react';
import logo from '../assets/images/astro-blue.png';
import './App.css';
import AstroBackground from '../components/AstroBackgroud';

function App() {
  const onButtonClick = (event:any) => {
    console.log(event.target.value);
  };

  return (
    <div className="App">
      <AstroBackground />
      <div className="container">
        <div className="App-logo" >
          <img src={logo} alt="Astro Pic" title="Astro Pic" />
        </div>
        <section>
          <div className="title">ASTRO BLUE <br />TURNS ONE!</div>
          <label><b>Upload Pics</b></label>
          <button className="btn btn__secondary" value="anonymous" onClick={onButtonClick}>Anonymously</button>
          <button className="btn btn__secondary" value="raffle" onClick={onButtonClick}>For Raffle</button>
        </section>
      </div>
    </div>
  );
}

export default App;
