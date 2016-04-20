import React,{Component} from 'react';

//import needs cleanup
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import { push } from 'react-router-redux';
import Avatar from 'material-ui/lib/avatar';
import ListItem from 'material-ui/lib/lists/list-item';
import CircularProgress from 'material-ui/lib/circular-progress';

import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Favourite from 'material-ui/lib/svg-icons/action/favorite';
import IconButton from 'material-ui/lib/icon-button';
import ImageLoader from 'react-imageloader'

const mystyle = {
	listItem : {
		color : '#FFF',
		padding : 0
	}
}
const MomentView = ({ moment , handleLikeCLick , onClick}) => {

	function preloader() {
	  return <div style={{height:'100%',width:'100%',textAlign:'center'}}><CircularProgress size={0.6} style={{marginLeft:'auto',marginRight:'auto'}} /></div>;
	}
		return (


		<GridTile
			cols={1}
			rows={1}
			key={moment.id}
			onClick={onClick}
			title={

		<ListItem

			style={mystyle.listItem}
			className={'inner-grid'}
			innerDivStyle={{paddingLeft:40,paddingBottom:14,paddingTop:17}}
			primaryText={<span style={{color:'#fff',fontSize:'12px'}}>{moment.owner.name}</span>}
			leftAvatar={<Avatar backgroundColor={'transparent'} style={{width:30,height:30,left:0}} src={moment.owner.photo} />}
		>

		</ListItem>}
			titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%)'}
			className='grid-moment'
			actionIcon={<IconButton className={'inner-grid'} onClick={(e) => {e.stopPropagation();handleLikeCLick()}}>{moment.hasLiked ?  <Favourite  color="white"/> : <FavouriteBorder hoverColor={'orange'} style={{height:'12px',width:'12px'}}  color="white"/> }</IconButton>}>

<ImageLoader src={moment.imageUrl}     wrapper={React.DOM.div}
    preloader={preloader}> Image load failed </ImageLoader>



		</GridTile>
	)
}

MomentView.propTypes = {
	moment : React.PropTypes.object.isRequired,
	handleLikeCLick : React.PropTypes.func.isRequired,
	onClick : React.PropTypes.func.isRequired
}

export default MomentView;
