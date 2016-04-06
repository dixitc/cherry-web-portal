import React from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import countryCodes from '../constants/country-codes';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

console.log(countryCodes[1]);

export default class SelectFieldExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 2};
  }
    handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <div>
        <SelectField menuItems={countryCodes} onChange={this.handleChange}/>


		<DropDownMenu value={this.state.value} onChange={this.handleChange}>
   <MenuItem value={1} primaryText="Never"/>
   <MenuItem value={2} primaryText="Every Night"/>
   <MenuItem value={3} primaryText="Weeknights"/>
   <MenuItem value={4} primaryText="Weekends"/>
   <MenuItem value={5} primaryText="Weekly"/>
 </DropDownMenu>
        <br />

      </div>
    );
  }
}
