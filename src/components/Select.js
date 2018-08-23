import React, { Component } from 'react';

class Select extends Component {
  constructor(props) {
    super(props);
    this.handleSelectOption = this.handleSelectOption.bind(this);
  }

  handleSelectOption(e) {
    console.log(e.target)
    this.props.onSelect(e);
  }

  render() {
    const valueKey = this.props.valueKey;
    const titleKey = this.props.titleKey;
    const options = this.props.options.map((option) => (
      <option disabled={option["disabled"]} value={option[valueKey]}>{option[titleKey]}</option>
    ));

    return(
      <select onChange={this.handleSelectOption}>
        <option selected={this.props.selectDefault} value={this.props.value}>{this.props.allTitle}</option>
        {options}
      </select>
    );
  }
}

export default Select;
