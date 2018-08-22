import React, { Component } from 'react';
import './App.css';
import Data from './data.js'

class App extends Component {
  render() {
    const allRoutes = Data.routes.map((rt) => (
      <tr>
        <td>{rt.airline}</td>
        <td>{rt.src}</td>
        <td>{rt.dest}</td>
      </tr>
    ));
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <table>
            {allRoutes}
          </table>
        </section>
      </div>
    );
  }
}

export default App;
