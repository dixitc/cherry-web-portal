import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import countryCodes from '../constants/country-codes';




const items = [];

for (let i = 0; i < countryCodes.length; i++ ) {

  items.push(<MenuItem value={i} key={i} primaryText={countryCodes[i].name + '   '+ countryCodes[i].dial_code}  />);
}



export default class SelectFieldExampleSimple extends React.Component {

    constructor(props) {
    super(props);

  }
    handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
        <div >


            <SelectField
                primary={true}
                value={this.props.countryValue}
                onChange={this.props.setCountry}
                floatingLabelText='Country code'
            >

                {items}
            </SelectField>

            <br />


        </div>
    );
  }
}
