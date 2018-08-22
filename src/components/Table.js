import React, { Component } from 'react';

class Table extends Component {
  render() {
    const format = this.props.format;
    const columnTypes = this.props.columns.map((column) => (column.property));
    const columnHeaders = this.props.columns.map((column) => (
      <th>{column.name}</th>
    ));

    const rows = this.props.rows.map((row) => (
      <tr>
        <td>{format(columnTypes[0], row)}</td>
        <td>{format(columnTypes[1], row)}</td>
        <td>{format(columnTypes[2], row)}</td>
      </tr>
    ));

    return (
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
    );
  }
}

export default Table;
