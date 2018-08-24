import React, { Component } from 'react';

class Table extends Component {
  state = {
    startIndex: 0,
    endIndex: 0,
  };

  componentWillReceiveProps(nextProps) {
    const newTotalRows = nextProps.rows.length;
    const newPerPage = nextProps.perPage;

    if (newTotalRows !== this.props.rows.length) {
      this.setState({
        endIndex: newTotalRows < newPerPage ? newTotalRows : newPerPage,
      });
    }
  }

  handlePrevClick = (e) => {
    this.setState({
      startIndex: this.state.startIndex - this.props.perPage,
      endIndex: this.state.endIndex - this.props.perPage,
    });
  };

  handleNextClick = (e) => {
    this.setState({
      startIndex: this.state.startIndex + this.props.perPage,
      endIndex: this.state.endIndex + this.props.perPage,
    });
  };

  setEndIndex = () => {

  };

  render() {
    const format = this.props.format;
    const totalRoutes = this.props.rows.length;
    const startIndex = this.state.startIndex;
    const endIndex = this.state.endIndex;
    const summary = `Showing ${startIndex + 1} - ${endIndex} of ${totalRoutes} routes.`;
    const columnTypes = this.props.columns.map((column) => column.property);
    const columnHeaders = this.props.columns.map((column) => (
      <th key={`tablecolumn-${column.property}`}>{column.name}</th>
    ));

    const rows = this.props.rows.slice(startIndex, endIndex).map((row) => (
      <tr key={`tablerow-${row.airline}-${row.src}-${row.dest}`}>
        <td>{format(columnTypes[0], row)}</td>
        <td>{format(columnTypes[1], row)}</td>
        <td>{format(columnTypes[2], row)}</td>
      </tr>
    ));

    return (
      <div>
        <table className="routes-table">
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
        <div className="pagination">
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
