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
    this.formatValue = this.formatValue.bind(this);;
    this.clearFilters = this.clearFilters.bind(this);
    this.getCurrentAirlineIds = this.getCurrentAirlineIds.bind(this);
    this.getCurrentAirportCodes = this.getCurrentAirportCodes.bind(this);
    this.filterAirlines = this.filterAirlines.bind(this);
    this.filterAirports = this.filterAirports.bind(this);
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

  clearFilters() {
    this.setState({
      rows: this.state.allRoutes,
      airlineFilter: '',
      airportFilter: '',
    });
  }

  getCurrentAirlineIds() {
    const ids = {};

    this.state.rows.forEach((row) => {
      if (ids[row.airline]) {
        ids[row.airline] += 1;
      } else {
        ids[row.airline] = 1;
      }
    });

    return ids;
  }

  getCurrentAirportCodes() {
    const codes = {};

    this.state.rows.forEach((row) => {
      if (codes[row.src]) {
        codes[row.src] += 1;
      } else {
        codes[row.src] = 1;
      }

      if (codes[row.dest]) {
        codes[row.dest] = codes[row.dest] + 1;
      } else {
        codes[row.dest] = 1;
      }
    });

    return codes;
  }

  filterAirlines() {
    const currentAirlineIds = this.getCurrentAirlineIds();

    return this.state.allAirlines.map((airline) => (
      Object.assign({}, airline, {disabled: !currentAirlineIds[airline.id]})
    ));
  }

  filterAirports() {
    const currentAirportCodes = this.getCurrentAirportCodes();

    return this.state.allAirports.map((airport) => (
      Object.assign({}, airport, {disabled: !currentAirportCodes[airport.code]})
    ));
  }

  render() {
    const filteredAirlines = this.filterAirlines();
    const filteredAirports = this.filterAirports();

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
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
            <button onClick={this.clearFilters}>
              Show All Routes
            </button>
          </p>
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
