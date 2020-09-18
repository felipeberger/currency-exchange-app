import React from 'react';
import Flag from './Flag';
import CurrencySelect from './CurrencySelect';
import './SingleExchange.css';

class SingleExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      comparison: 'HKD',
      date: '',
      rates: {HKD: 1.3},
      baseAmount: 1,
      comparisonAmount: 1.3
    }
    this.handleChange = this.handleChange.bind(this);
    this.menuSelect = this.menuSelect.bind(this);
  }

  handleChange(event) {
    const {rates, comparison} = this.state;
    let temp;

    if (event.target.value === '') {
      this.setState({baseAmount: 1})
      return;
    }

    if (event.target.name === "baseInput") {
      temp = event.target.value * rates[comparison];
      this.setState({baseAmount: event.target.value, comparisonAmount: temp.toFixed(2)});
    } else {
      temp = event.target.value * 1/rates[comparison];
      this.setState({baseAmount: temp.toFixed(2), comparisonAmount: event.target.value});
    }
  }

  menuSelect(event) {
    console.log(event);

    if (event.target.name === "baseMenu") {
      this.setState({base: event.target.value});
    } else {
      this.setState({comparison: event.target.value});
    }    
  }


  render() {
    const {base, comparison, baseAmount, comparisonAmount} = this.state;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-5 py-4 text-center">
            <Flag currency={base} />
            <div className="py-2">
            <CurrencySelect name='baseMenu' value={this.state.value} onChange={this.menuSelect} />
            </div>
            <input
            type="number"
            name="baseInput"
            value={baseAmount}
            onChange={this.handleChange}
            />
          </div>

          <div className="col-2" >
            <h1 className="align-middle text-center" id="equals"><i className="fas fa-equals"></i></h1>
          </div>

          <div className="col-5 py-4 text-center">
            <Flag currency={comparison} />
            <div className="py-2">
            <CurrencySelect name='comparisonMenu' value={this.state.value} onChange={this.menuSelect} />
            </div>
            <input
            type="number"
            name="comparisonInput"
            value={comparisonAmount}
            onChange={this.handleChange}
            />
          </div>

        </div>
      </div>
    );
  }
}

export default SingleExchange;
