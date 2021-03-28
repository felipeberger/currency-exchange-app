import React from 'react';
import './App.css';
import Template from './Template.js';
import SingleExchange from './SingleExchange.js';
import MultiExchange from './MultiExchange.js';
import Table from './Table.js';
import { BrowserRouter as Router, Route, Switch, withRouter } from "react-router-dom";
import Historical from './Historical.js';


const NotFound = () => {
  return <h2>404 Not Found</h2>
}

const Comparison = () => {
  return (
    <>
      <div className={"content"}>
      <SingleExchange />
      <MultiExchange />
      </div>
    </>
  )
}

const RatesTable = () => {
  return (
    <>
      <Table />
    </>
  )
}

const HistoricalRates = () => {
  return (
    <>
      <div className={"content"}>
      <Historical />
      </div>
    </>
  )
}

function App() {
  return (
    <>
        <Router>
          <Template>
            <Switch>
              <Route path="/" exact component={withRouter(Comparison)} />
              <Route path="/comparison" component={withRouter(Comparison)} />
              <Route path="/table" component={withRouter(RatesTable)} />
              <Route path="/historical" component={withRouter(HistoricalRates)} />
              <Route component={NotFound} />
            </Switch>
          </Template>
        </Router>
    </>
  );
}

export default App;
