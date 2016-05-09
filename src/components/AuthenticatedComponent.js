import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import { logOutUser , fetchMemories} from '../actions/actions';
import RaisedButton from 'material-ui/lib/raised-button';
import MemoriesView from './MemoriesView';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Avatar from 'material-ui/lib/avatar';
import style from '../styles/Login';
import FontIcon from 'material-ui/lib/font-icon';
import { browserHistory , hashHistory } from 'react-router';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import { Link } from 'react-router';

const baseStyle = {
	refresh: {

		position :'absolute',
		margin:'auto',
		top: '15%',
		left: '45%',
		transform: 'translate3d(0, 0, 0)',

	}
}

class AuthenticatedComponent extends React.Component {
	constructor(props){
		super(props);
		this.backToMemories = this.backToMemories.bind(this);

	}
	backToMemories(){
		//browserHistory.replace('/memories');
		hashHistory.replace('/memories');
	}
	componentDidMount(){
		this.props.handleFetchMemories(this.props.auth.authToken);
	}
	render(){
		const { handleLogout , handleFetchMemories , memories , auth , title} = this.props;
		//const { currentMemory } = memories;
		let myIconElement;
		let myChildren;
		if(title === 'Cherry'){
			myIconElement = <IconButton className='smooth-transit' style={{opacity:0}} onClick={this.backToMemories}><ArrowBack /></IconButton>
		}else{
			myIconElement = <IconButton className='smooth-transit' onClick={this.backToMemories}><ArrowBack /></IconButton>
		}
		if(this.props.memories.length > 0){
			myChildren = this.props.children
			console.log('MEMEMEMEMEMEMEMEM');
		}else{
			myChildren =                     <RefreshIndicator
			  size={40}
			  left={70}
			  top={0}
			  loadingColor={"#FF9800"}
			  status="loading"
			  style={baseStyle.refresh}
			/>
			console.log('NONONONONONONONO');
		}
		console.log(myChildren);
		return(
			<div style={{height:'100%'}}>
			<AppBar
				style={{zIndex:'2',height:'60px',position:'fixed',top:'0'}}
				titleStyle={{height:'60px'}}
				className={'smooth-transit'}
				title={<span className='brand'>{title}</span>}
				primary={true}

				iconElementLeft={myIconElement}

				iconElementRight={<IconMenu

        iconButtonElement={<div>
			<span style={{fontSize:'10px',color:'white',position:'relative',top:'-14px',padding:'10px'}}>{auth.profile.name}</span>
          <IconButton style={style.avatarButton} tooltip='settings'
      tooltipPosition="bottom-right">

			  {auth.profile.photo &&

				  <Avatar style={style.noBorder} backgroundColor={'transparent'} src={auth.profile.photo} size={32}/>
			  }
			  {!auth.profile.photo &&
				  <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
			  }
      </IconButton>
  </div>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText='Refresh' onClick={() => handleFetchMemories(auth.authToken)}/>
        <MenuItem primaryText='Help' />
        <MenuItem primaryText='Log Out' onClick={() => handleLogout()} />

      </IconMenu>}
			/>
		<div style={{height:'100px'}}></div>
		{myChildren}



			</div>
		)
	}
}

AuthenticatedComponent.propTypes = {
	handleLogout: PropTypes.func.isRequired,
	handleFetchMemories: PropTypes.func.isRequired,
	memories : PropTypes.array.isRequired,
	auth : PropTypes.object.isRequired,
	title: PropTypes.string.isRequired
}


const mapStateToProps = (state) => {
	const { auth} = state;
	const memories = state.memories.memories;
	const title = state.title;
	return {
		memories,
		auth,
		title
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
