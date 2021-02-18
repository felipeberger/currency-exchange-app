import React from 'react';
import Flag from './Flag';
import './Table.css';
import CurrencySelect from './CurrencySelect';
import { json, checkStatus } from './Utils';

class Table extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        base: 'USD',
        comparisonOne: 'HKD',
        comparisonTwo: 'AUD',
        comparisonThree: 'GBP',
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
      this.menuSelect = this.menuSelect.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }
  
    fetchData = () => {
  
      let {base, comparisonOne, comparisonTwo, comparisonThree} = this.state;
  
      fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${base}`)
        .then(checkStatus)
        .then(json)
        .then((data) => {
  
          this.setState({rates: data.rates, baseAmount: 1,
            comparisonAmountOne: data.rates[comparisonOne].toFixed(2),
            comparisonAmountTwo: data.rates[comparisonTwo].toFixed(2),
            comparisonAmountThree: data.rates[comparisonThree].toFixed(2),
            comparisonRateOne: data.rates[comparisonOne],
            comparisonRateTwo: data.rates[comparisonTwo],
            comparisonRateThree: data.rates[comparisonThree]});
  
        })
        .catch((error) => {
          console.log(error);
        })
    }
    
    populateTable = () => {

        let {base, rates} = this.state;
        let temp;
        let outputArray = [];

        for (const [currency] of Object.entries(rates)) {

          temp = 1/parseFloat(rates[base]) * parseFloat(rates[currency]);
          temp = temp.toFixed(2);
          outputArray.push(<><th scope='row'><Flag currency={currency} size={'30px'} />  {currency}</th><td>{temp}</td></>);
        }

        return (
          outputArray
        );
    }

    menuSelect(event) {
        this.setState({base: event.target.value});
    }

    componentDidMount () {
      this.fetchData();
    }
  
    render() {

        let {base} = this.state;

        let array = this.populateTable();

        return (
          <>
            <div className="container-fluid pt-0">
              <div className="row">
                <div className="col-9 mx-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col"><Flag currency={base} size={'30px'} /> <CurrencySelect name='baseMenu' value={this.state.base} onChange={this.menuSelect} /></th>
                        <th scope="col">1 {base} </th>
                      </tr>
                    </thead>
                    <tbody>
                      {array.map((pair, i) => <tr key={i}>{pair}</tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )
    }

  }
  
  export default Table;