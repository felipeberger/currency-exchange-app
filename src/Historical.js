import React from 'react';
import Flag from './Flag';
import Chart from 'chart.js';
import CurrencySelect from './CurrencySelect';
import { json, checkStatus } from './Utils';

class Historical extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            base: 'USD',
            comparison: 'HKD',
            startDate: '',
            endDate: '',
            rates:''
        }

        this.chartRef = React.createRef();
    }

    fetchHistoricalRates = () => {

        let {base, comparison} = this.state;
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    

        fetch(`https://api.exchangeratesapi.io/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${comparison}`)
          .then(checkStatus)
          .then(json)
          .then((data) => {
            console.log(data);
    
            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[comparison]);
            const chartLabel = `${base}/${comparison}`;
            this.buildChart(chartLabels, chartData, chartLabel);    
          })
          .catch((error) => {
            console.log(error);
          })
      }


    buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");

        if (typeof this.chart !== "undefined") {
            this.chart.destroy();
        }

        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
            type: 'line',
            data: {
              labels,
              datasets: [
                {
                  label: label,
                  data,
                  fill: false,
                  tension: 0,
                }
              ]
            },
            options: {
              responsive: true,
            }
          })
        }


    componentDidMount() {
        this.fetchHistoricalRates();
    }


    render() {

        const {base, comparison} = this.state; 

        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-sm-5 py-4 text-center">
                        <Flag currency={base} size={'120px'} />
                        <div className="py-2">
                        <CurrencySelect name='baseMenu' value={this.state.value} onChange={this.menuSelect} />
                        </div>
                    </div>

                    <div className="d-none d-sm-block col-2" >
                        <h1 className="align-middle text-center" id="equals"><i className="fas fa-equals"></i></h1>
                    </div>

                    <div className="col-12 col-sm-5 py-4 text-center">
                        <Flag currency={comparison} size={'120px'} />
                        <div className="py-2">
                        <CurrencySelect name='comparisonMenu' value={this.state.value} onChange={this.menuSelect} />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 text-center">
                        <div className="d-inline px-2">
                            <button type="button" className="btn btn-outline-dark active" aria-pressed="true" onClick={null}>1 Month</button>
                        </div>
                        <div className="d-inline px-2">
                            <button type="button" className="btn btn-outline-dark" onClick={null}>3 Months</button>
                        </div>
                        <div className="d-inline px-2">
                            <button type="button" className="btn btn-outline-dark" onClick={null}>6 Months</button>
                        </div>
                        <div className="d-inline px-2">
                            <button type="button" className="btn btn-outline-dark" onClick={null}>1 year</button>
                        </div>
                    </div>
                </div>   

                <div className="row">
                    <div className="col-12 py-4 text-center">
                        <canvas ref={this.chartRef} />
                    </div>

                </div>

            </div>



            
        )
    }

}


export default Historical;