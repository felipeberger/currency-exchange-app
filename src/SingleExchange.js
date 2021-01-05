import React from 'react';
import Flag from './Flag';
import CurrencySelect from './CurrencySelect';
import './SingleExchange.css';
import { json, checkStatus } from './Utils';

class SingleExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      comparison: 'HKD',
      date: '',
      rates: '',
      baseAmount: '',
      comparisonAmount: '',
      comparisonRate: '',
      error: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.menuSelect = this.menuSelect.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {

    let {base, comparison} = this.state;

    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);

        this.setState({rates: data.rates, baseAmount: 1, comparisonAmount: data.rates[comparison].toFixed(2), comparisonRate: data.rates[comparison]});

      })
      .catch((error) => {
        console.log(error);
      })
  }

  handleChange(event) {

    console.log(this.state.baseAmount, this.state.comparisonAmount);

    if (event.target.name === "baseInput") {
      this.setState({baseAmount: event.target.value});
      this.calcComparison(event.target.value);

    } else {
      this.setState({comparisonAmount: event.target.value});
      this.calcBase(event.target.value);

    }
  }

  calcComparison = (baseValue) => {

    let {comparisonRate} = this.state;
    let temp;

    temp = parseFloat(baseValue) * comparisonRate;
    this.setState({comparisonAmount: temp.toFixed(2)});

  }

  calcBase = (comparisonValue) => {

    const {comparisonRate} = this.state;
    let temp;

    temp = parseFloat(comparisonValue) * 1/comparisonRate;
    this.setState({baseAmount: temp.toFixed(2)});

  }

  menuSelect(event) {

    let {rates, comparison} = this.state;
    let temp;

    if (event.target.name === "baseMenu") {
      this.setState({base: event.target.value});
      temp = 1/rates[event.target.value] * parseFloat(rates[comparison]);
      this.setState({baseAmount: 1.00, comparisonAmount: temp.toFixed(2), comparisonRate: temp});

    } else {
      this.setState({comparison: event.target.value});
      temp = 1/rates[event.target.value];
      this.setState({baseAmount: temp.toFixed(2), comparisonAmount: 1.00, comparisonRate: temp});
    }



    // temp = 1/rates[base] * parseFloat(rates[comparison]);
    //
    // this.setState({baseAmount: 1, comparisonAmount: temp});
  }

  componentDidMount () {
    this.fetchData();
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
