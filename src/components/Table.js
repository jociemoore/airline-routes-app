import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startIndex: 0,
      endIndex: 0,
    };
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      endIndex: this.props.perPage,
    })
  }

  handlePrevClick(e) {
    this.setState({
      startIndex: this.state.startIndex - this.props.perPage,
      endIndex: this.state.endIndex - this.props.perPage,
    });
  }

  handleNextClick(e) {
    this.setState({
      startIndex: this.state.startIndex + this.props.perPage,
      endIndex: this.state.endIndex + this.props.perPage,
    });
  }

  render() {
    const format = this.props.format;
    const totalRoutes = this.props.rows.length;
    const startIndex = this.state.startIndex;
    const endIndex = this.state.endIndex;
    const perPage = this.props.perPage;
    const columnTypes = this.props.columns.map((column) => column.property);
    const columnHeaders = this.props.columns.map((column) => <th>{column.name}</th>);
    const rows = this.props.rows.slice(startIndex, endIndex).map((row) => (
      <tr>
        <td>{format(columnTypes[0], row)}</td>
        <td>{format(columnTypes[1], row)}</td>
        <td>{format(columnTypes[2], row)}</td>
      </tr>
    ));

    const summary = `Showing ${startIndex + 1} - ${startIndex + perPage} of ${totalRoutes} routes.`;

    return (
      <div>
        <table>
          <thead>
            <tr>
              {columnHeaders}
            </tr>
          </thead>
          <tbody>
              {rows}
          </tbody>
        </table>
        <p>{summary}</p>
        <div>
          <button
            disabled={startIndex === 0}
            onClick={this.handlePrevClick}>
            Previous Page
          </button>
          <button
            disabled={endIndex === totalRoutes}
            onClick={this.handleNextClick}>
            Next Page
          </button>
        </div>
      </div>
    );
  }
}

export default Table;
