import React, { Component } from 'react';
import './App.css';
import Data from './data.js'
import Table from './components/Table.js'

class App extends Component {
  render() {
    const getAirlineById = Data.getAirlineById;
    const getAirportByCode = Data.getAirportByCode;
    const perPage = 25;
    const rows = Data.routes;
    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    const formatValue = function(property, value) {
      if (property === 'airline') {
        return getAirlineById(value[property]);
      } else {
        return getAirportByCode(value[property]);
      }
    };

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Table className="routes-table" columns={columns} rows={rows} format={formatValue} perPage={perPage}/>
        </section>
      </div>
    );
  }
}

export default App;
