import React, { Component } from 'react';
import './App.css';
import Data from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rows: [],
      airlineFilter: '',
      airportFilter: '',
      allRoutes: [],
      allAirlines: [],
      allAirports: [],
      perPage: 0,
      columns: [],
    }
    
    this.getAirlineById = Data.getAirlineById;
    this.getAirportByCode = Data.getAirportByCode;
    this.filterByAirline = this.filterByAirline.bind(this);
    this.filterByAirport = this.filterByAirport.bind(this);
    this.filterRoutes = this.filterRoutes.bind(this);
    this.formatValue = this.formatValue.bind(this);
  }

  componentDidMount() {
    this.setState({
      rows: Data.routes,
      allRoutes: Data.routes,
      allAirlines: Data.airlines,
      allAirports: Data.airports,
      perPage: 25,
      columns: [
        {name: 'Airline', property: 'airline'},
        {name: 'Source Airport', property: 'src'},
        {name: 'Destination Airport', property: 'dest'},
      ],
    });
  }

  filterByAirline(e) {
    this.filterRoutes({airlineFilter: parseInt(e.target.value, 10)});
  }

  filterByAirport(e) {
    this.filterRoutes({airportFilter: e.target.value});
  }

  filterRoutes({airlineFilter = this.state.airlineFilter, airportFilter = this.state.airportFilter}) {
    let newRows = this.state.allRoutes;

    if (airlineFilter) {
      newRows = newRows.filter((route) => (
        route.airline === airlineFilter
      ));
    }

    if (airportFilter) {
      newRows = newRows.filter((route) => (
        route.src === airportFilter || route.dest === airportFilter
      ));
    }

    this.setState({
      rows: newRows,
      airlineFilter: airlineFilter,
      airportFilter: airportFilter,
    });
  }

  formatValue(property, value) {
    if (property === 'airline') {
      return this.getAirlineById(value[property]);
    } else {
      return this.getAirportByCode(value[property]);
    }
  };

  render() {
    const filteredAirlines = this.state.allAirlines;
    const filteredAirports = this.state.allAirports;

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <div>
            <p>
              Show routes on
              <Select
                options={filteredAirlines}
                valueKey="id"
                titleKey="name"
                allTitle="All Airlines"
                value=""
                onSelect={this.filterByAirline}
              />
              flying in or out of
              <Select
                options={filteredAirports}
                valueKey="code"
                titleKey="name"
                allTitle="All Airports"
                value=""
                onSelect={this.filterByAirport}
              />
            </p>
          </div>
          <Table
            className="routes-table"
            columns={this.state.columns}
            rows={this.state.rows}
            format={this.formatValue}
            perPage={this.state.perPage}
          />
        </section>
      </div>
    );
  }
}

export default App;
