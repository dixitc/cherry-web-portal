import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import countryCodes from '../constants/country-codes';


const countries = countryCodes.map(function(country){
	return country.name + ' ' +country.dial_code;
})





const AutoCompleteCountry = () => (
  <div>
    <AutoComplete
      floatingLabelText="country code"
      filter={AutoComplete.fuzzyFilter}
      dataSource={countries}
	  value={"India"}
    />
    <br/>

  </div>
);

export default AutoCompleteCountry;
