import React, { Component } from 'react';

class Select extends Component {
  render() {
    const valueKey = this.props.valueKey;
    const titleKey = this.props.titleKey;
    const options = this.props.options.map((option) => (
      <option
        key={`select-${option[valueKey]}`}
        disabled={option["disabled"]}
        value={option[valueKey]}>
          {option[titleKey]}
      </option>
    ));

    return(
      <select value={this.props.value} onChange={this.props.onSelect}>
        <option value="default">{this.props.allTitle}</option>
        {options}
      </select>
    );
  }
}

export default Select;
