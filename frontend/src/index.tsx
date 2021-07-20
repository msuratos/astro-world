import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Avatar, Card, CardContent, CardHeader, Divider } from "ui-neumorphism";

import RootContext from './RootContext';
import AstroBackground from './components/AstroBackgroud';
import App from './Pages/App';
import Anonymous from './Pages/Anonymous';
import Raffle from './Pages/Raffle';
import reportWebVitals from './reportWebVitals';
import { getAccessToken } from './api/tokenApi';

import logo from './assets/images/astro-blue.png';

import 'ui-neumorphism/dist/index.css';
import './index.css';

// Get access token first before rendering the application
// This token is used to talk to api
getAccessToken().then((value) => {
  const avatar = (<Avatar src={logo} style={{ width: 'auto' }} size={125} bgColor='var(--white)' className="avatar-custom" />);

  ReactDOM.render(
    <React.StrictMode>
      <>
        <RootContext.Provider value={{ accessToken: value }}>
          <AstroBackground />
          <div style={{ marginTop: '30%', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <Card className="card-custom" rounded>
              <CardHeader avatar={avatar} className="card-header-custom" rounded />
              <CardContent>
                <div className="title">
                  <label className="title-name">ASTRO BLUE</label>
                  <label className="title-desc">TURNS ONE!</label>
                </div>
                <Divider dense />
                <Router>
                  <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/anonymous" component={Anonymous} />
                    <Route exact path="/raffle" component={Raffle} />
                  </Switch>
                </Router>
              </CardContent>
            </Card>
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
