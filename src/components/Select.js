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
    const enabledOptions = this.props.enabledOptions;
    const options = this.props.options.map((option) => (
      <option disabled={!enabledOptions[option[valueKey]]} value={option[valueKey]}>{option[titleKey]}</option>
    ));

    return(
      <select onChange={this.handleSelectOption}>
        <option value={this.props.value}>{this.props.allTitle}</option>
        {options}
      </select>
    );
  }
}

export default Select;
