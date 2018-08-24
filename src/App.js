import React, { Component } from 'react';
import './App.css';
import Data from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';
import Map from './components/Map.js'

class App extends Component {
  state = {
    rows: [],
    airlineFilter: '',
    airportFilter: '',
    allRoutes: [],
    allAirlines: [],
    allAirports: [],
    perPage: 0,
    columns: [],
    airlineSelectValue: '',
    airportSelectValue: '',
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
      airlineSelectValue: 'default',
      airportSelectValue: 'default',
    });
  }

  formatValue = (property, value) => {
    const getAirlineById = Data.getAirlineById;
    const getAirportByCode = Data.getAirportByCode;

    if (property === 'airline') {
      return getAirlineById(value[property]);
    } else {
      return getAirportByCode(value[property]);
    }
  };

  getCurrentAirlineIds = () => {
    const ids = {};

    this.state.rows.forEach((row) => {
      if (ids[row.airline]) {
        ids[row.airline] += 1;
      } else {
        ids[row.airline] = 1;
      }
    });

    return ids;
  };

  getCurrentAirportCodes = () => {
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
  };

  handleFilterRoutesByAirline = (e) => {
    this.filterRoutes({airlineFilter: parseInt(e.target.value, 10)});
  };

  handleFilterRoutesByAirport = (e) => {
    this.filterRoutes({airportFilter: e.target.value});
  };

  filterRoutes = ({airlineFilter = this.state.airlineFilter, airportFilter = this.state.airportFilter}) => {
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
      airlineSelectValue: airlineFilter,
      airportSelectValue: airportFilter,
    });
  };

  filterAirlines = () => {
    const currentAirlineIds = this.getCurrentAirlineIds();

    return this.state.allAirlines.map((airline) => (
      Object.assign({}, airline, {disabled: !currentAirlineIds[airline.id]})
    ));
  };

  filterAirports = () => {
    const currentAirportCodes = this.getCurrentAirportCodes();

    return this.state.allAirports.map((airport) => (
      Object.assign({}, airport, {disabled: !currentAirportCodes[airport.code]})
    ));
  };

  clearFilters = () => {
    this.setState({
      rows: this.state.allRoutes,
      airlineFilter: '',
      airportFilter: '',
      airlineSelectValue: 'default',
      airportSelectValue: 'default',
    });
  };

  render() {
    const filteredAirlines = this.filterAirlines();
    const filteredAirports = this.filterAirports();
    const mapRoutes = this.state.rows.map((row) => (
      Object.assign({}, row, {
        srcCoordinates: [this.state.allAirports.filter((airport) => row['src'] === airport.code)[0]['lat'],
                        this.state.allAirports.filter((airport) => row['src'] === airport.code)[0]['long']],
        destCoordinates: [this.state.allAirports.filter((airport) => row['dest'] === airport.code)[0]['lat'],
                         this.state.allAirports.filter((airport) => row['dest'] === airport.code)[0]['long']],
      })
    ));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <Map routes={mapRoutes}/>
          <p>
            Show routes on
            <Select
              options={filteredAirlines}
              valueKey="id"
              titleKey="name"
              allTitle="All Airlines"
              value={this.state.airlineSelectValue}
              onSelect={this.handleFilterRoutesByAirline}
            />
            flying in or out of
            <Select
              options={filteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airportSelectValue}
              onSelect={this.handleFilterRoutesByAirport}
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
