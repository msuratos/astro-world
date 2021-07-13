import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AstroBackground from './components/AstroBackgroud';
import App from './Pages/App';
import Raffle from './Pages/Raffle';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <>
      <AstroBackground />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/raffle" component={Raffle} />
          </Switch>
        </Router>
      </div>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
