import React, { Component } from 'react';
import './App.css';
import DATA from './data.js';
import Table from './components/Table.js';
import Select from './components/Select.js';
import Map from './components/Map.js'

class App extends Component {
  state = {
    airlineFilter: '',
    airportFilter: '',
  }

  formatValue = (property, value) => {
    if (property === 'airline') {
      return DATA.getAirlineById(value[property]);
    } else {
      return DATA.getAirportByCode(value[property]);
    }
  };

  handleFilterRoutesByAirline = (e) => {
    e.preventDefault();
    this.setState({
      airlineFilter: parseInt(e.target.value, 10),
    });
  };

  handleFilterRoutesByAirport = (e) => {
    e.preventDefault();
    this.setState({
      airportFilter: e.target.value,
    });
  };

  filterRoutes = () => {
    let routes = DATA.routes;
    const airlineFilter = this.state.airlineFilter;
    const airportFilter = this.state.airportFilter;

    if (airlineFilter) {
      routes = routes.filter((route) => (
        route.airline === airlineFilter
      ));
    }

    if (airportFilter) {
      routes = routes.filter((route) => (
        route.src === airportFilter || route.dest === airportFilter
      ));
    }

    return routes;
  };

  clearFilters = () => {
    this.setState({
      airlineFilter: '',
      airportFilter: '',
    });
  };

  getCurrentAirlineIds = (currentRoutes) => {
    const ids = {};

    currentRoutes.forEach((row) => {
      if (ids[row.airline]) {
        ids[row.airline] += 1;
      } else {
        ids[row.airline] = 1;
      }
    });

    return ids;
  };

  getCurrentAirportCodes = (currentRoutes) => {
    const codes = {};

    currentRoutes.forEach((row) => {
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

  render() {
    const filteredRoutes = this.filterRoutes();
    const currentAirlineIds = this.getCurrentAirlineIds(filteredRoutes);
    const currentAirportCodes = this.getCurrentAirportCodes(filteredRoutes);

    const filteredAirlines = DATA.airlines.map((airline) => (
      Object.assign({}, airline, {disabled: !currentAirlineIds[airline.id]})
    ));

    const filteredAirports = DATA.airports.map((airport) => (
      Object.assign({}, airport, {disabled: !currentAirportCodes[airport.code]})
    ));

    const mapRoutes = filteredRoutes.map((row) => (
      Object.assign({}, row, {
        srcCoordinates: [
          DATA.airports.filter((airport) => row['src'] === airport.code)[0]['lat'],
          DATA.airports.filter((airport) => row['src'] === airport.code)[0]['long']
        ],
        destCoordinates: [
          DATA.airports.filter((airport) => row['dest'] === airport.code)[0]['lat'],
          DATA.airports.filter((airport) => row['dest'] === airport.code)[0]['long']
        ],
      })
    ));

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

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
              value={this.state.airlineFilter}
              onSelect={this.handleFilterRoutesByAirline}
            />
            flying in or out of
            <Select
              options={filteredAirports}
              valueKey="code"
              titleKey="name"
              allTitle="All Airports"
              value={this.state.airportFilter}
              onSelect={this.handleFilterRoutesByAirport}
            />
            <button onClick={this.clearFilters}>
              Show All Routes
            </button>
          </p>
          <Table
            className="routes-table"
            columns={columns}
            rows={filteredRoutes}
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;
