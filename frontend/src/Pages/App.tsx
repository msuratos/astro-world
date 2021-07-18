import { useHistory } from "react-router-dom";
import { 
  Avatar, Button, CardHeader, CardContent, Divider
} from "ui-neumorphism";

import logo from '../assets/images/astro-blue.png';
import './App.css';

function App() {
  const history = useHistory();
  const onButtonClick: Function = (event: any) => {
    const value = event;
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

  const avatar = (<Avatar src={logo} size={125} bgColor='var(--white)' className="avatar-custom" />);

  return (
    <>
      <CardHeader avatar={avatar} className="card-header-custom" rounded />
      <CardContent>
        <div className="title">
          <label className="title-name">ASTRO BLUE</label>
          <label className="title-desc">TURNS ONE!</label>
        </div>
        <Divider dense />
        <label className="app-label-custom"><b>Upload Pics</b></label>
        <div className="btn-div">
          <Button rounded color='var(--greyDark)' className="btn-custom" onClick={() => onButtonClick('anonymous')}>Anonymously</Button>
          <Button rounded color='var(--greyDark)' className="btn-custom" onClick={() => onButtonClick('raffle')}>For Raffle</Button>
        </div>
      </CardContent>
    </>
  );
}

export default App;
