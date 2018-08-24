import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.handleSelectOption = this.handleSelectOption.bind(this);
  }

  handleSelectOption(e) {
    this.props.onSelect(e);
  }

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
      <select value={this.props.value} onChange={this.handleSelectOption}>
        <option value="default">{this.props.allTitle}</option>
        {options}
      </select>
    );
  }
}

export default Select;
