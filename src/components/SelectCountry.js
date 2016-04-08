import React from 'react';

import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import countryCodes from '../constants/country-codes';


console.log(countryCodes[1]);

const items = [];
for (let i = 0; i < countryCodes.length; i++ ) {

  items.push(<MenuItem value={i} key={i} primaryText={countryCodes[i].name}/>);
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
