import React from 'react';
import './App.css';
import Template from './Template.js';
import SingleExchange from './SingleExchange.js';
import MultiExchange from './MultiExchange.js';

function App() {
  return (
    <>
      <Template>
        <SingleExchange />
        <MultiExchange />
      </Template>
    </>
  );
}

export default App;
