import React, { Component } from 'react';
import './App.css';

class App extends Component {

    state = {
        rates: [
            {
                label: "EUR",
                value: 1,
                percentage: 1,
            },
        ],
        base: "EUR",
    };


    componentDidMount = (ev) => {
        this.onRefresh();
    }

    onRefresh = () => {
        let newBase = document.querySelector('#baseCurrency').value
        let url = 'https://api.exchangeratesapi.io/latest?base=' + newBase
        console.log(url)
        fetch(url)
          .then(response => response.json())
          .then(data => {
              const newRates = [];
              let percentage = 1;
              for (const [key, value] of Object.entries(data.rates)) {
                  percentage = (1/value) * 50;
                  newRates.push({
                      number: value,
                      label: key,
                      percentage: percentage,
                  })
              }


            this.setState({
                rates: newRates,
                base: newBase
            })
            console.log('this is from onRefresh')
              console.log(newRates)


            });

        };

  render() {
    return (
      <div className="App">
        <div className="MainContent">
              <div className="MainTitle">
                  <h1 className="MainTitle--title">The Exchanger - Base: {this.state.base}</h1>
                  <p className="MainTitle--baseInfo">Select your base currency:</p>
                  <select className="MainTitle--baseInfo" id="baseCurrency" value={this.state.base} onChange={this.onRefresh}>
                  {this.state.rates.map(function(item) {
                      return(
                      <option value={item.label}>{item.label}</option>
                  )})}
                  </select>
            </div>
            <div className="GraphArea">
                    {this.state.rates.map(function(item) {
                        return(
                            <div className="GraphArea--barChart" style={{height: item.percentage + "%"}}>{item.label} : {item.number}</div>
                        )
                    })}

            </div>
        </div>

      </div>

    );
  }
}

export default App;
