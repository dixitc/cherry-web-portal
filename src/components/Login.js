
import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import {registerRequest} from '../actions/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';


const style = {
	Login: {

		textAlign : 'center'
	},
	container: {
		position: 'relative',
	},
	refresh: {
		display: 'block',
		position: 'relative',
	}
}



const LoginComponent = ({auth , handleRegisterUser}) => {
	return (
		<div style={style.Login}>

			<p>We will send an OTP on this mobile number</p>
			{!auth.isRegistered &&
				<div>
				<TextField hintText="Enter your mobile number"
				errorText=""
				floatingLabelText="Mobile Number"/>
				<RaisedButton label="REGISTER" primary={true} onClick={() => handleRegisterUser(auth)}/>
				</div>
			}
			{auth.isRegistered &&
				<div>
				<TextField hintText="Enter OTP here"
				errorText=""
				/>
				<RaisedButton label="VERIFY OTP" primary={true} onClick={() => handleRegisterUser(auth)}/>
				</div>
			}
			<RefreshIndicator
				 size={50}
				 left={70}
				 top={0}
				 loadingColor={"#FF9800"}
				 status={auth.isFetching ?'loading' : 'hide'}
				 style={style.refresh}
			/>
			{/* Need to have some UI here explaining how this works */}
		</div>
	)
}

LoginComponent.propTypes = {
	handleRegisterUser : PropTypes.func.isRequired,
	auth : PropTypes.shape({
		authToken : PropTypes.number,
		isAuthenticated : PropTypes.bool.isRequired,
		profile : PropTypes.object
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
			dispatch(registerRequest(auth));
		}
	}
}


const Login = connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginComponent)

export default Login;
