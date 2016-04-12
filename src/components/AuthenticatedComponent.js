import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import { logOutUser , fetchMemories} from '../actions/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import MemoriesView from './MemoriesView';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Avatar from 'material-ui/lib/avatar';
import style from '../styles/Login';
import { Link } from 'react-router';

class AuthenticatedComponent extends React.Component {
	constructor(props){
		super(props);

	}
	componentDidMount(){
		this.props.handleFetchMemories(this.props.auth.authToken);
	}
	render(){
		const { handleLogout , memories , auth} = this.props;

		return(
			<div>
			<AppBar
				title={auth.profile.name}
				primary={true}
				iconElementRight={ <IconMenu
        iconButtonElement={
          <IconButton style={style.avatarButton}>
        <Avatar src={auth.profile.photo}/>
      </IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Refresh' />
        <MenuItem primaryText='Help' />
        <MenuItem primaryText='Log Out' onClick={() => handleLogout()} />
      </IconMenu>}
			/>
			<ul>

				   <li><Link to="memory/asdf34">asdf34</Link></li>
				 </ul>



			<MemoriesView memories={memories} />
			</div>
		)
	}
}

AuthenticatedComponent.propTypes = {
	handleLogout: PropTypes.func.isRequired,
	handleFetchMemories: PropTypes.func.isRequired,
	memories : PropTypes.array.isRequired,
	auth : PropTypes.object.isRequired
}


const mapStateToProps = (state) => {
	const { auth} = state;
	const memories = state.memories.memories;
	return {
		memories,
		auth
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		handleLogout : () => {
			dispatch(logOutUser());
		},
		handleFetchMemories : (token) => {
			dispatch(fetchMemories(token));
		}
	}
}

const AuthenticatedComponentView = connect(
	mapStateToProps,
	mapDispatchToProps
)(AuthenticatedComponent)


export default AuthenticatedComponentView;
