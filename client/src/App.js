import React, { Component } from 'react';
import './App.css';
import StartJobPage from './components/start-job-page.component';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFoundPage from './components/not-found-page.component';
import TermsOfUsePage from './components/terms-of-use.component';
import AboutPage from './components/about-page.component';
import StopJobPage from './components/stop-job.component';
import Header from './components/header.component';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />

          <Switch>
            <Route path="/" exact component={StartJobPage} />
            <Route path="/terms" exact component={TermsOfUsePage} />
            <Route path="/about" exact component={AboutPage} />
            <Route path="/stop-a-job" exact component={StopJobPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
