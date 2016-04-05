
import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import TextField from 'material-ui/lib/text-field';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import {registerRequest} from '../actions/actions';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';



const LoginComponent = ({auth , handleRegisterUser}) => {
	return (
		<div>
			<p>This is the login page</p>
			<TextField hintText="Enter your mobile number"
						errorText=""
      					floatingLabelText="Moble Number"/>
			<FloatingActionButton  mini={true} onClick={() => handleRegisterUser(auth)}>
			   <ContentAdd />
			</FloatingActionButton>
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
