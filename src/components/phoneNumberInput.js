import React , {Component , PropTypes} from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import SelectFieldExampleSimple from './SelectCountry';


const phoneNumberInput = () => {
	return (
		<div>
		<div style={style.wrapperDiv}>

			<div style={style.inlineDiv}>

				<SelectFieldExampleSimple countryValue={this.state.countryCode}  setCountry={this.setDialCode} />

			</div>
			<div  style={style.inlineDiv}>
				<TextField hintText={this.state.formattedNumber.length ? 'Enter your mobile number' : ''}
					style={style.textField}
					errorText={errorMessage}
					value={this.formatNumber(this.state.formattedNumber)}
					onKeyDown={this.handleChange}
					onSelect={this.checkForTab}
					errorStyle={style.errorStyle}
					underlineFocusStyle={style.cherry}
					floatingLabelStyle={(errorMessage) ? style.cherry : style.red}
					floatingLabelText="Mobile Number"
					id="phoneText"
					/>
			</div>
		</div>

		<div>

			{isFetching &&
				<CircularProgress size={0.8}/>
			}
			{!isFetching &&
				<RaisedButton style={style.button} labelColor="white" disabled={false} primary={true} label={isRegistered ? 'VERIFY' : 'GET OTP'} onClick={() => handleRegisterUser(this.state.formattedNumber,this.state.dial_code)}/>
			}

		</div>

	</div>
	)
}


phoneNumberInput.propTypes = {
	formattedNumber : React.PropTypes.string.isRequired,
	errorMessage : React.PropTypes.string.isRequired,
	countryCode : React.PropTypes.string.isRequired,
	setDialCode : React.PropTypes.func.isRequired,
	style : React.PropTypes.object.isRequired,
	handleRegisterUser : React.PropTypes.func.isRequired
}

export default phoneNumberInput;
