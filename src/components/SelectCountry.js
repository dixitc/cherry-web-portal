import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import countryCodes from '../constants/country-codes';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

console.log(countryCodes[1]);

const items = [];
for (let i = 0; i < countryCodes.length; i++ ) {

  items.push(<MenuItem value={i} key={i} primaryText={countryCodes[i].code + ' '+countryCodes[i].dial_code}/>);
}

const style= {
	inlineDiv: {
		display: "inline-block",
        width:'100px'
	}
}


export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 87};
  }
    handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div style={style.inlineDiv}>
	  <SelectField floatingLabelText="Country code" value={this.state.value} onChange={this.handleChange} style={style.inlineDiv}>
   {items}
 </SelectField>
        <br />

      </div>
    );
  }
}
