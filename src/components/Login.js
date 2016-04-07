
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
import style from '../styles/Login';

let AsYouTypeFormatter = require('google-libphonenumber').AsYouTypeFormatter;
let formatter = new AsYouTypeFormatter('IN');


/*let phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
let phoneNumber = phoneUtil.parse('9849086210', 'IN');
console.log(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL));*/

/*NOTES
Done pretty much handling all kinds

*/



class LoginComponent extends React.Component {
	constructor(props) {
      super(props);
      this.state = {
          isRegistered: false,
          isFetching: false,
          errorMessage: "",
          dial_code: "+91",
          countryCode: 87,
          formattedNumber: ""
      };

      this.handleChange = this.handleChange.bind(this)
      this.setDialCode = this.setDialCode.bind(this)
    }
	formatNumber(number){
		formatter.clear();
		let stringNumber = number.toString();
		for (var i = 0; i < stringNumber.length; i++) {
			formatter.inputDigit(stringNumber[i]);
		}
		return this.state.dial_code+' '+formatter.currentOutput_;

	}
	handleChange(e){
		switch (true) {
		case (e.keyCode >= 48 && e.keyCode <= 57):
		let updatedFormattedNumber;
			{/*console.log(formatter.currentOutput_);
			formatter.inputDigit(String.fromCharCode(e.keyCode));
			console.log(formatter.currentOutput_);*/}
			console.log(e.nativeEvent.selectionStart);
			console.log(e.selectionStart);
			console.log(e.location);
			console.log(this.state.formattedNumber);
			updatedFormattedNumber = this.state.formattedNumber+(String.fromCharCode(e.keyCode)).toString() ;
		    this.setState({
		        formattedNumber: updatedFormattedNumber
		    });

		    break;
		case (e.keyCode == 8):
		console.log(this.state.formattedNumber);
			let newNumber = this.state.formattedNumber.substr(0, this.state.formattedNumber.length - 1);
			console.log(newNumber);
		    this.setState({
		        formattedNumber: newNumber
		    })

		    break;
		default:

		    break;
		}

	}
	setDialCode(event, index, value){

		this.setState({countryCode :index})
		this.setState({dial_code :cc[index].dial_code})
		//this.setState({formattedNumber : ""})
		formatter.clear();
		formatter = new AsYouTypeFormatter((cc[index].code).toString());
	}
	checkForTab(e){
		console.log(e.nativeEvent);
	}
	render(){


		const  {isRegistered , dial_code , formattedNumber, countryCode, isFetching , handleRegisterUser , handleVerifyUser , errorMessage  } = this.props;
		return (
			<div style={style.Login}>

			{isFetching &&

				<RefreshIndicator
				size={50}
				left={70}
				top={0}
				loadingColor={"#FF9800"}
				status={isFetching ?'loading' : 'hide'}
				style={style.refresh}
				/>
			}
			{/*<AutoCompleteCountry value={4} />*/}


			<div >
			<div>
		{/*	<ReactPhoneInput defaultCountry={'us'} /> */}
			<SelectFieldExampleSimple countryValue={this.state.countryCode}  setCountry={this.setDialCode}/>
			<TextField hintText={formattedNumber.length ? "Enter your mobile number" : ""}
			style={style.textField}
			errorText={errorMessage}
			value={this.formatNumber(this.state.formattedNumber)}
			onKeyDown={this.handleChange}
			onSelect={this.checkForTab}
			errorStyle={style.errorStyle}
			underlineFocusStyle={style.cherry}
			floatingLabelText="Mobile Number" />
			</div>

			<div>
			<RaisedButton style={style.button} disabled={false} label="REGISTER" primary={true} onClick={() => handleRegisterUser()}/>
			</div>
			</div>

				</div>
			)
		}
}

LoginComponent.propTypes = {
    handleRegisterUser: PropTypes.func.isRequired,
    handleVerifyUser: PropTypes.func.isRequired,
	isRegistered: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
	errorMessage: PropTypes.string,
    formattedNumber: PropTypes.string,
    dial_code: PropTypes.string,
    countryCode: PropTypes.number
}


const mapStateToProps = (state) => {
	const { auth } = state;
	const{ isRegistered , errorMessage , isFetching } = auth;
	const formattedNumber = "";
	const dial_code = "";
	const countryCode = 0;
	return {
		isRegistered,
		errorMessage,
		isFetching,
		formattedNumber,
		dial_code,
		countryCode
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRegisterUser: () => {
			let creds = {
				identifier : "%2b919620418303",
				identifierType : "PHONE",
				verificationMode : "OTP_MSG"

			}
			dispatch(registerUser(creds))
			//dispatch(registerRequest(auth));
		},
		handleVerifyUser : (auth) => {
			dispatch(verifyUser())
		}
	}
}


const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent)

export default Login;
