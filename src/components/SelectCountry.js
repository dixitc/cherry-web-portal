import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import countryCodes from '../constants/country-codes';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

console.log(countryCodes[1]);

const items = [];
for (let i = 0; i < countryCodes.length; i++ ) {

  items.push(<MenuItem value={i} key={i} primaryText={countryCodes[i].name}/>);
}

const style= {
	inlineDiv: {
		display: "inline-block",
        
	}
}


export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);

  }
    handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div style={style.inlineDiv}>
	  <SelectField floatingLabelText="Country code" value={this.props.countryValue} onChange={this.props.setCountry} style={style.inlineDiv}>
   {items}
 </SelectField>
        <br />

      </div>
    );
  }
}
