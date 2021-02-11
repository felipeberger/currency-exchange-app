import React from 'react';
import {getAllCountriesByCurrencyOrSymbol} from 'iso-country-currency';

const Flag = (props) => {

  const {currency, size} = props;
  let country_full;

  switch (currency) {
    case 'USD':
      country_full = 'united-states-of-america';
      break;
    case 'GBP':
      country_full = 'united-kingdom';
      break;
    case 'EUR':
      country_full = 'european-union';
      break;
    case 'AUD':
      country_full = 'australia';
      break;
    case 'DKK':
      country_full = 'denmark';
      break;
    case 'NOK':
      country_full = 'norway';
      break;
    case 'NZD':
      country_full = 'new-zealand';
      break;
    case 'CHF':
      country_full = 'switzerland';
      break;
    case 'ILS':
      country_full = 'israel';
      break;
    default:
      country_full = getAllCountriesByCurrencyOrSymbol('currency', currency).toString().toLowerCase();
      country_full = country_full.replace(' ', '-');
  }

  // const imageName = require(`../public/Pictures/${country_full}.png`);

  return (<img src={`${process.env.PUBLIC_URL}/Pictures/${country_full}.png`} alt="country icon" width={size}/>);
  
}

export default Flag;
