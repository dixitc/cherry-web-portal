
import React , {PropTypes} from 'react';
import { connect } from 'react-redux';

const Login = (auth) => {
	return (
		<div>
		{auth.isAuthenticated}
			Login
		</div>
	)
}

Login.propTypes = {
	auth : PropTypes.shape({
		isAuthenticated : PropTypes.bool.isRequired,
		profile : PropTypes.object.isRequired
	}).isRequired
}



export default Login;
