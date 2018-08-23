import React, { Component } from 'react';
import './App.css';
import Data from './data.js'
import Table from './components/Table.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
    }

    this.filterByAirline = this.filterByAirline().bind(this);
  }

  componentDidMount() {
    this.setState({
      rows: Data.routes,
    });
  }

  filterByAirline() {
    const allRows = Data.routes;

    return function(e) {
      const newRows = allRows.filter((row) => {
        return Data.getAirlineById(row.airline) === e.target.value
      });

      this.setState({
        rows: newRows.length === 0 ? allRows : newRows,
      });
    }
  }

  render() {
    const getAirlineById = Data.getAirlineById;
    const getAirportByCode = Data.getAirportByCode;
    const perPage = 25;
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
          <Table
            className="routes-table"
            columns={columns}
            rows={this.state.rows}
            format={formatValue}
            perPage={perPage}
            airlines={Data.airlines}
            filterByAirline={this.filterByAirline}
          />
        </section>
      </div>
    );
  }
}

export default App;
