import React,{Component} from 'react';

//import needs cleanup
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';

import { push } from 'react-router-redux';
import Avatar from 'material-ui/Avatar';
import dummyImg from '../images/selfie-placeholder.jpg';
import CircularProgress from 'material-ui/CircularProgress';
import {Popover, PopoverAnimationVertical} from 'material-ui/Popover';
import {List , ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';

import {GridTile} from 'material-ui/GridList';
import FavouriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favourite from 'material-ui/svg-icons/action/favorite';
import IconButton from 'material-ui/IconButton';
import ImageLoader from 'react-imageloader'

const mystyle = {
	listItem : {
		color : '#FFF',
		padding : 0
	},
	hideListItem : {
		display:'none'
	}
}

	class CoverMomentCard extends Component {

	    constructor(props) {
	        super(props);
	        this.state = {

				memberViewOpen: false,
				anchorEl : '',
				currentUser:null,
				open:false
			}

	        this.openMemberView = this.openMemberView.bind(this);
	        this.closeMemberView = this.closeMemberView.bind(this);
	        this.handleOpen = this.handleOpen.bind(this);
	        this.handleClose = this.handleClose.bind(this);
	        this.closeMemberView = this.closeMemberView.bind(this);

			//parsing coverUrl to ewnder optimal image
	        //this.parseCoverUrl = this.parseCoverUrl.bind(this);

	    }

	openMemberView = (event) => {
  // This prevents ghost click.
  event.preventDefault();

  this.setState({
	memberViewOpen: true,
	anchorEl: event.currentTarget,
  });
};
closeMemberView = () => {
	if(this.state.open){

		this.setState({open:false,
			currentUser:null

		});
	}else{
		this.setState({
			memberViewOpen: false

		})
	}
};
handleOpen = (i) => {
	console.log('opening');
	console.log(this.props.memory.members[i]);
	this.setState({currentUser:this.props.memory.members[i],open: true});
}

handleClose = () => {
	this.setState({open: false});
}
render(){
	const memory = this.props.memory;
	const parseCoverUrl = (url) => {
		if(url){
			return 'https://docs.google.com/uc?id='+ url.substr(url.indexOf('id=')+3,url.length - 1);
		}else{
			return dummyImg;
		}
	}
	return (

		<Card containerStyle={{height:'100%',position:'relative',zIndex:'5'}} style={{height:'99%',width:'99%',margin:'0px auto',overflow:'hidden'}}>
			<Dialog

				titleStyle={{border:'none'}}
				bodyStyle={{padding:'0px 2px'}}
				contentStyle={{border:'none',width:'260px',margin:'0px auto'}}
				actionsContainerStyle={{border:'none'}}
				repositionOnUpdate={true}

				modal={false}
				autoScrollBodyContent={true}
				open={this.state.open}
				onRequestClose={this.handleClose}
				>
				<div style={{width:'200px',margin:'auto',height:'120px',textAlign:'center',padding:'20px'}}>
					<Avatar size={50} src={this.state.currentUser ? this.state.currentUser.profile.photo : ''} />
					<ListItem
						style={{padding:'0px 5px'}}
						 primaryText={this.state.currentUser ? this.state.currentUser.profile.name : ''}>

					</ListItem>

					<div style={{fontSize:'12px'}}>
						<span style={{marginRight:'10px'}}>memories : {this.state.currentUser ? this.state.currentUser.profile.extraInfo.memoryCount : ''}</span>

						<span>moments : {this.state.currentUser ? this.state.currentUser.profile.extraInfo.momentCount : ''}</span>
					</div>
				</div>
			</Dialog>
			<CardMedia mediaStyle={{height:'100%',width:'100%'}}  style={{height:'80%',overflow:'hidden'}}>

				<div className={'center-cropped'} style={{backgroundImage:'url('+parseCoverUrl(memory.coverUrl)+')',height:'100%',width:'100%'}}></div>
			</CardMedia>
			<CardTitle title={
					<div>
						{memory.title}
						<span style={{float:'right',maxWidth:'70%',height:'100%'}}>
							{memory.members.map((member,i) => {
								if(i < 6){

									return <IconButton onClick={()=>{this.handleOpen(i)}} tooltip={member.profile ? member.profile.name : 'unknown'} tooltipPosition={'top-right'} style={{padding:'0px',height:'35px',width:'35px'}}> <Avatar style={{margin:'0px 2px'}} size={30} src={member.profile ? member.profile.photo : ''} /></IconButton>
								}else if(i == 7){

									return (<IconButton onClick={this.openMemberView}   onMouseEnter={()=>{console.log("MOUSE ENTERING");}} tooltip={member.profile ? memory.members.length-7+' more' : 'unknown'} tooltipPosition={'top-right'} style={{padding:'0px',height:'35px',width:'35px',top:'-10px	'}}>
									<Avatar  style={{margin:'0px 2px',color:'#FF5722',fontSize:'12px',backgroundColor:'rgba(37, 35, 35, 0.19)'}} size={30} src={'' } >
										+{memory.members.length - 7}
									</Avatar>
									<Popover
										open={ this.state.memberViewOpen }
										anchorEl={ this.state.anchorEl }
										anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
										targetOrigin={{horizontal: 'right', vertical: 'top'}}
										onRequestClose={this.closeMemberView}
										canAutoPosition={true}
										>
										<List>
											{memory.members.map((member,i) => {
												return <ListItem
													onClick={()=>{this.handleOpen(i)}} tooltip={member.profile ? member.profile.name : 'unknown'}
													style={{padding:'0px 5px'}}
													primaryText={member.profile ? member.profile.name : 'unknown'}
													leftAvatar={<Avatar src={member.profile ? member.profile.photo : ''} />}/>
											})}
										</List>
									</Popover>
								</IconButton>)

							}
						})}
					</span>



				</div>} subtitleStyle={{height:'30px'}} subtitle={memory.owner.name} />

			</Card>

		)
}
}

CoverMomentCard.propTypes = {
	memory : React.PropTypes.object.isRequired
}

export default CoverMomentCard;
