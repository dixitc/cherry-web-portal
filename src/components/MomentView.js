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
	},
	hideListItem : {
		display:'none'
	}
}
const MomentView = ({ moment , handleLikeCLick , onClick , showDetail}) => {

	function preloader() {
	  return <div style={{height:'100%',width:'100%',textAlign:'center',backgroundColor:'rgb(103, 103, 103)',zIndex:'1000'}}></div>;
	}
	let customImageLoader;
	if(moment.orientation){

		if(moment.orientation.COMPRESSED == 'LANDSCAPE'){
			customImageLoader = 	<ImageLoader src={moment.imageUrl} className='momentImgDivLandscape' wrapper={React.DOM.div} preloader={preloader}>
				Image load failed
			</ImageLoader>
		}else if(moment.orientation.COMPRESSED == 'PORTRAIT'){
			customImageLoader = 	<ImageLoader src={moment.imageUrl} className='momentImgDivPortrait' wrapper={React.DOM.div} preloader={preloader}>
				Image load failed
			</ImageLoader>
		}
	}else{
		customImageLoader = 	<ImageLoader src={moment.imageUrl} className='momentImgDivPortrait' wrapper={React.DOM.div} preloader={preloader}>
			Image load failed
		</ImageLoader>
	}
		return (


		<GridTile
			cols={1}
			rows={1}
			key={moment.id}
			onClick={onClick}
			title={

		<ListItem

			style={showDetail ? mystyle.listItem : mystyle.listItem}
			className={'inner-grid'}
			innerDivStyle={{paddingLeft:40,paddingBottom:14,paddingTop:17}}
			primaryText={<span style={{color:'#fff',fontSize:'12px'}}>{moment.owner.name}</span>}
			leftAvatar={<Avatar backgroundColor={'transparent'} style={{width:30,height:30,left:0}} src={moment.owner.photo} />}
		>

		</ListItem>}
			titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.9) 100%)'}
			className='grid-moment'
			actionIcon={<IconButton className={'inner-grid'} style={showDetail ? {display:'block'} : {display:'none'}}  onClick={(e) => {e.stopPropagation();handleLikeCLick()}}>{moment.hasLiked ?  <Favourite  color="white"/> : <FavouriteBorder hoverColor={'orange'} style={{height:'12px',width:'12px'}}  color="white"/> }</IconButton>}>

			{customImageLoader}



		</GridTile>
	)
}

MomentView.propTypes = {
	moment : React.PropTypes.object.isRequired,
	handleLikeCLick : React.PropTypes.func.isRequired,
	onClick : React.PropTypes.func.isRequired,
	showDetail : React.PropTypes.bool.isRequired
}

export default MomentView;
