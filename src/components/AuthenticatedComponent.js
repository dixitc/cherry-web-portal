import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import { logOutUser , fetchMemories} from '../actions/actions';
import RaisedButton from 'material-ui/RaisedButton';
import MemoriesView from './MemoriesView';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import style from '../styles/Login';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory , hashHistory } from 'react-router';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Link from 'material-ui/svg-icons/content/link';
//import { Link } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MediaQuery from 'react-responsive';
import Headroom from 'react-headroom';

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
		const { handleLogout , handleFetchMemories , memories , auth , title , uploaderStatus} = this.props;

		const { currentMemory } = memories;
		let myChildren;
		let myIconElement;
		if(title === 'Memories'){
			myIconElement = <IconButton className='smooth-transit' style={{opacity:0,cursor:'default'}} ><ArrowBack /></IconButton>
		}else{
			myIconElement = <IconButton className='smooth-transit' onClick={this.backToMemories}><ArrowBack /></IconButton>
		}

		console.log('NONONONONONONONO');
		console.log(memories);
		if(this.props.memories.memories.length > 0){
			myChildren = this.props.children
		}else if(memories.isFetching){
			myChildren =
			<RefreshIndicator
			  size={40}
			  left={70}
			  top={0}
			  loadingColor={"#FF9800"}
			  status="loading"
			  style={baseStyle.refresh}
			/>
	}else{
		myChildren = <p style={{textAlign:'center'}}>No memories yet.</p>
	}
	//	console.log(myChildren);
		return(
			<div style={{height:'100%'}}>


		{myChildren}

{uploaderStatus.isUploading &&

	<Paper style={{position:'fixed',bottom:'60px',width:'300px',right:'20px',zIndex:'3',background:'white'}}>

			<ListItem style={{height:'50px'}} className={'fader'} innerDivStyle={{fontSize:'14px',paddingTop:'16px'}} primaryText={<span style={{fontSize:'14px'}}>{uploaderStatus.finishedUploadCount == 0 ? 'Moments being added' : 'Images uploading'}</span>} innerDivStyle={{paddingTop:'20px'}}>
			</ListItem>

		{uploaderStatus.finishedUploadCount != 0 &&

			<ListItem style={{height:'50px'}} className={'fader'} innerDivStyle={{paddingTop:'16px'}}  rightIcon={<span style={{paddingTop:'3px',fontSize:'10px',width:'20%'}}>{uploaderStatus.finishedUploadCount} / {uploaderStatus.toUploadCount}</span>}>
				<LinearProgress  mode="determinate" value={uploaderStatus.finishedUploadCount*100/uploaderStatus.toUploadCount} style={{width:'80%',margin:'auto',float:'left'}}/>
			</ListItem>
		}
	</Paper>
}

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
	const memories = state.memories;
	const title = state.title;
	const uploaderStatus = state.moments.uploaderStatus;
	return {
		memories,
		auth,
		title,
		uploaderStatus
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
