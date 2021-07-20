import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "ui-neumorphism";

import './App.css';

function App() {
  const history = useHistory();
  const [showUploadSection, setShowUploadSection] = useState(false);

  const onTriviaClick: Function = (event: any) => window.open('https://forms.gle/E75ttV9TkV9HiXt68');
  const onHuntClick: Function = (event: any) => console.log('Opening Scavenger Hunt link');
  const onUploadClick: Function = (event: any) => setShowUploadSection(true);

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

  return (
    <>
      {
        !showUploadSection &&
        <>
          <Button rounded color='var(--greyDark)' className="btn-custom" onClick={onTriviaClick}>Trivia</Button>
          <Button rounded color='var(--greyDark)' className="btn-custom" onClick={onHuntClick}>Scavenger Hunt</Button>
          <Button rounded color='var(--greyDark)' className="btn-custom" onClick={onUploadClick}>Upload Pics</Button>
        </>
      }
      {
        showUploadSection &&
        <>
          <div className="btn-div">
            <Button rounded className="btn-custom" onClick={() => onButtonClick('anonymous')}>Anonymously</Button>
            <Button rounded className="btn-custom" onClick={() => onButtonClick('raffle')}>For Raffle</Button>
          </div>
          <Button rounded color='var(--greyDark)' onClick={() => setShowUploadSection(false)}>◀Back</Button>
        </>
      }
    </>
  );
}

export default App;
