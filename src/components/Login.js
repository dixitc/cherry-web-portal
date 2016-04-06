
import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import {registerRequest ,registerUser } from '../actions/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import cc from '../constants/country-codes';
import SelectFieldExampleSimple from './SelectCountry';
import AutoCompleteCountry from './AutoCompleteCountry';





const style = {
	Login: {

		textAlign : 'center',
		marginTop:'100px'
	},
	errorStyle: {
		textAlign : 'left'
	},
	container: {
		position: 'relative',
	},
	refresh: {
		display: 'block',
		position: 'relative',
		transform: 'none',
		margin : '0px',
		margin: 'auto',
		left: '0px',
		top: '0px'
	},
	inlineDiv: {
		display:'inline-block'
	},
	textField: {
		display:'inline-block',
		top:'8px',
		marginLeft:'10px'
	},
	button : {
		margin:'10px'
	}
}


const LoginComponent = ({auth , handleRegisterUser , handleVerifyUser}) => {
	let conditionalDisplay;
	if(!auth.isFetching){

		if(!auth.isRegistered){
			conditionalDisplay = (<div >

				<SelectFieldExampleSimple value={100} />
				<TextField hintText="Enter your mobile number"
				style={style.textField}
				errorText={auth.isRegistered?"asdf":""}

				  errorStyle={style.errorStyle}
				floatingLabelText="Mobile Number"/>
				<div>
				<RaisedButton style={style.button} label="REGISTER" primary={true} onClick={() => handleRegisterUser(auth)}/>
				</div>
				</div>)
			}else {
				conditionalDisplay = (				<div>
					<TextField hintText="Enter OTP here"
					errorText={auth.isRegistered?"asdf":""}
					  errorStyle={style.errorStyle}
					/><div>
					<RaisedButton style={style.button} label="VERIFY OTP" primary={true} onClick={() => handleVerifyUser(auth)}/>
					</div>
					</div>)
				}
	}
	return (
		<div style={style.Login}>

			{auth.isFetching &&

				<RefreshIndicator
				size={50}
				left={70}
				top={0}
				loadingColor={"#FF9800"}
				status={auth.isFetching ?'loading' : 'hide'}
				style={style.refresh}
				/>
			}
{/*<AutoCompleteCountry value={4} />*/}


				{conditionalDisplay}




			{/* Need to have some UI here explaining how this works */}
		</div>
	)
}

LoginComponent.propTypes = {
	handleRegisterUser : PropTypes.func.isRequired,
	handleVerifyUser : PropTypes.func.isRequired,
	auth : PropTypes.shape({
		authToken : PropTypes.number,
		isAuthenticated : PropTypes.bool.isRequired,
		profile : PropTypes.object,
		errorMessage : PropTypes.string
	}).isRequired
}


const mapStateToProps = (state) => {
	return {
		auth: state.auth
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		handleRegisterUser: (auth) => {
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
