import { useHistory } from "react-router-dom";
import logo from '../assets/images/astro-blue.png';
import './App.css';

function App() {
  const history = useHistory();
  const onButtonClick = (event: any) => {
    const value = event.target.value;
    switch (value) {
      case 'anonymous':
        history.push('/anonymous');
        break;
      case 'raffle':
        history.push('/raffle');
        break;    
      default:
        console.log(`Button with value (${value}) has been clicked`);
        break;
    }
  };

  return (
    <div className="App">
      <div className="App-logo" >
        <img src={logo} alt="Astro Pic" title="Astro Pic" />
      </div>
      <section className="App-details">
        <div className="title">
          <section className="title-name">ASTRO BLUE</section>
          <section className="title-desc">TURNS ONE!</section>
        </div>
        <label><b>Upload Pics</b></label>
        <button className="btn btn__secondary" value="anonymous" onClick={onButtonClick}>Anonymously</button>
        <button className="btn btn__secondary" value="raffle" onClick={onButtonClick}>For Raffle</button>
      </section>
    </div>
  );
}

export default App;
