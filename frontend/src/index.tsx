import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import RootContext from './RootContext';
import AstroBackground from './components/AstroBackgroud';
import App from './Pages/App';
import Anonymous from './Pages/Anonymous';
import Raffle from './Pages/Raffle';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { getAccessToken } from './api/tokenApi';

// Get access token first before rendering the application
// This token is used to talk to api
getAccessToken().then((value) => {
  ReactDOM.render(
    <React.StrictMode>
      <>
        <RootContext.Provider value={{ accessToken: value }}>
          <AstroBackground />
          <div className="container">
            <Router>
              <Switch>
                <Route exact path="/" component={App} />
                <Route exact path="/anonymous" component={Anonymous} />
                <Route exact path="/raffle" component={Raffle} />
              </Switch>
            </Router>
          </div>
        </RootContext.Provider>
      </>
    </React.StrictMode>,
    document.getElementById('root')
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
});
