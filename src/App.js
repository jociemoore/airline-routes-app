import React, { Component } from 'react';
import './App.css';
import Data from './data.js'

class App extends Component {
  render() {
    const routes = Data.routes;
    const getAirlineById = Data.getAirlineById;
    const getAirportByCode = Data.getAirportByCode;
    const allRoutes = routes.map((rt) => (
      <tr>
        <td>{getAirlineById(rt.airline)}</td>
        <td>{getAirportByCode(rt.src)}</td>
        <td>{getAirportByCode(rt.dest)}</td>
      </tr>
    ));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table>
            <tbody>
              <tr>
                <th>Airline</th>
                <th>Source Airport</th>
                <th>Destination Airport</th>
                </tr>
                {allRoutes}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
