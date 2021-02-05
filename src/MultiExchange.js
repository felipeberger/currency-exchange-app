import React from 'react';
import Flag from './Flag';
import CurrencySelect from './CurrencySelect';
import { json, checkStatus } from './Utils';

class MultiExchange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      comparisonOne: 'HKD',
      comparisonTwo: 'AUD',
      comparisonThree: 'GBP',
      comparisonFour: 'CNY',
      rates: '',
      baseAmount: '',
      comparisonAmountOne: '',
      comparisonAmountTwo: '',
      comparisonAmountThree: '',
      comparisonRateOne: '',
      comparisonRateTwo: '',
      comparisonRateThree: '',
      error: '',
    }
    // this.handleChange = this.handleChange.bind(this);
    this.menuSelect = this.menuSelect.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = () => {

    let {base, comparisonOne, comparisonTwo, comparisonThree, comparisonFour} = this.state;

    fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        console.log(data);

        this.setState({rates: data.rates, baseAmount: 1, comparisonAmountOne: data.rates[comparisonOne].toFixed(2), comparisonAmountTwo: data.rates[comparisonTwo].toFixed(2), comparisonAmountThree: data.rates[comparisonThree].toFixed(2), comparisonAmountFour: data.rates[comparisonFour].toFixed(2), comparisonRateOne: data.rates[comparisonOne], comparisonRateTwo: data.rates[comparisonTwo], comparisonRateThree: data.rates[comparisonThree], comparisonRateFour: data.rates[comparisonFour]});

      })
      .catch((error) => {
        console.log(error);
      })
  }

  menuSelect(event) {

    let {rates, base, comparisonOne, comparisonTwo, comparisonThree} = this.state;
    let tempOne, tempTwo, tempThree;

    if (event.target.name === "baseMenu") {
      this.setState({base: event.target.value});
      tempOne = 1/parseFloat(rates[event.target.value]) * parseFloat(rates[comparisonOne]);
      tempTwo = 1/parseFloat(rates[event.target.value]) * parseFloat(rates[comparisonTwo]);
      tempThree = 1/parseFloat(rates[event.target.value]) * parseFloat(rates[comparisonThree]);
      this.setState({baseAmount: 1.00,
        comparisonAmountOne: tempOne.toFixed(2), comparisonRateOne: tempOne, comparisonAmountTwo: tempTwo.toFixed(2), comparisonRateTwo: tempTwo, comparisonAmountThree: tempThree.toFixed(2), comparisonRateThree: tempThree});
      }

    // else if (event.target.name === "comparisonOneMenu") {
    //   this.setState({comparisonOne: event.target.value});
    //   temp = rates[event.target.value];
    //   this.setState({baseAmount: 1.00, comparisonAmountOne: temp.toFixed(2), comparisonRateOne: temp});
    // }
  }

  componentDidMount () {
    this.fetchData();
  }

  render() {

    let {base, comparisonOne, comparisonTwo, comparisonThree, baseAmount, comparisonAmountOne, comparisonAmountTwo, comparisonAmountThree} = this.state;

    return (
      <div className="container-fluid my-5 border rounded">

        <div className="row mt-4">
          <div className="col-3 text-center">
            <Flag currency={base} size={'100px'} />
            <div className="py-2">
              <CurrencySelect name='baseMenu' value={this.state.value} onChange={this.menuSelect} />
            </div>
            <div className="pb-4">
              <input
              type="number"
              name="baseInput"
              value={baseAmount}
              onChange={this.handleChange}
              />
            </div>
          </div>

          <div className="col-3 text-center">
            <Flag currency={comparisonOne} size={'100px'} />
            <div className="py-2">
              <CurrencySelect name='comparisonOneMenu' value={this.state.comparisonOne} onChange={this.menuSelect} />
            </div>
            <div className="pb-4">
              {comparisonAmountOne}
            </div>
          </div>

          <div className="col-3 text-center">
            <Flag currency={comparisonTwo} size={'100px'} />
            <div className="py-2">
              <CurrencySelect name='comparisonTwoMenu' value={this.state.comparisonTwo} onChange={this.menuSelect} />
            </div>
            <div className="pb-4">
              {comparisonAmountTwo}
            </div>
          </div>

          <div className="col-3 text-center">
            <Flag currency={comparisonThree} size={'100px'} />
            <div className="py-2">
              <CurrencySelect name='comparisonThreeMenu' value={this.state.comparisonThree} onChange={this.menuSelect} />
            </div>
            <div className="pb-4">
              {comparisonAmountThree}
            </div>
          </div>

        </div>
      </div>
    )

  }
}

export default MultiExchange;
