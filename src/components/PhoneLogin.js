
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
	getInitialState() {
    return {items: [],registerErrorMessage:'', text: ''};
  }
	handleChange(e){
		console.log('handling change');;
		console.log(e);

	}
	render() {
		return (
			<div >
			</div>
		)
	}
}
