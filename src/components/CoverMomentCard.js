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
				anchorEl : ''

			}

	        this.openMemberView = this.openMemberView.bind(this);
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
  this.setState({
	memberViewOpen: false,
  });
};
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
			<CardMedia mediaStyle={{height:'100%',width:'100%'}}  style={{height:'80%',overflow:'hidden'}}>

				<div className={'center-cropped'} style={{backgroundImage:'url('+parseCoverUrl(memory.coverUrl)+')',height:'100%',width:'100%'}}></div>

			</CardMedia>
			<CardTitle title={
					<div>
						{memory.title}
						<span style={{float:'right',maxWidth:'70%',height:'100%'}}>
							{memory.members.map((member,i) => {
								if(i < 6){

									return <IconButton tooltip={member.profile ? member.profile.name : 'unknown'} tooltipPosition={'top-right'} style={{padding:'0px',height:'35px',width:'35px'}}> <Avatar style={{margin:'0px 2px'}} size={30} src={member.profile ? member.profile.photo : ''} /></IconButton>
								}else if(i == 7){

									return (<IconButton  onClick={this.openMemberView} onMouseEnter={()=>{console.log("MOUSE ENTERING");}} tooltip={member.profile ? memory.members.length-7+' more' : 'unknown'} tooltipPosition={'top-right'} style={{padding:'0px',height:'35px',width:'35px',top:'-10px	'}}>
									<Avatar style={{margin:'0px 2px'}} size={30} src={member.profile ? member.profile.photo : '' } >
										{memory.members.length - 7}
									</Avatar>
									<Popover
										open={this.state.memberViewOpen}
										anchorEl={this.state.anchorEl}
										anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
										targetOrigin={{horizontal: 'right', vertical: 'top'}}
										onRequestClose={this.closeMemberView}
										canAutoPosition={true}
										>
										<List>
											{memory.members.map((member,i) => {
												return <ListItem
													style={{padding:'0px 5px'}}
													primaryText={member.profile ? member.profile.name : 'unknown'}
													leftAvatar={<Avatar size={25} src={member.profile ? member.profile.photo : ''} />}/>
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
