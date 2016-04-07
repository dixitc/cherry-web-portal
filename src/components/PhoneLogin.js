
import React , {Component , PropTypes} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import {registerRequest ,registerUser } from '../actions/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import cc from '../constants/country-codes';
import SelectFieldExampleSimple from './SelectCountry';
import AutoCompleteCountry from './AutoCompleteCountry';
import IntlTelInput from 'react-intl-tel-input';
import PNF from 'google-libphonenumber/dist/browser/libphonenumber';
import ReactPhoneInput from 'react-phone-input';


export default class PhoneLogin extends Component {
	getInitialState: function() {
    return {items: [],registerErrorMessage:'', text: ''};
  }
	handleChange(e){
		console.log("handling change");;
		console.log(e);

	}
	render() {
		return (
			<div >
<div>
<ReactPhoneInput defaultCountry={'us'} />
				<SelectFieldExampleSimple value={105} />
				<TextField hintText="Enter your mobile number"
				style={style.textField}
				errorText={this.state.registerErrorMessage}
				value={this.state.text}
				onChange={handleChange}
				errorStyle={style.errorStyle}
				floatingLabelText="Mobile Number" />
				</div>
				<p>{mobileNo}</p>
				<div>
				<RaisedButton style={style.button} disabled={false} label="REGISTER" primary={true} onClick={() => handleRegisterUser(auth)}/>
				</div>
				</div>
		)
	}
}
