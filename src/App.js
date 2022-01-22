import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LoginForm from './Components/Auth/LoginForm/LoginForm';
import SchoolCampaign from './Campaigns/School/SchoolCampaign';
import ToysCampaign from './Campaigns/Toys/ToysCampaign';

import BackofficeRouter from './Router/BackofficeRouter';
import PublicRouter from './Router/PublicRouter';

function App() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route component={BackofficeRouter} path="/backoffice" />
          <Route component={SchoolCampaign} path="/school-campaign" />
          <Route component={ToysCampaign} path="/toys-campaign" />
          <Route component={LoginForm} path="/login" />
          <Route component={LoginForm} path="/register" />
          <Route component={PublicRouter} path="/" />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
