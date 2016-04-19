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

import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Favourite from 'material-ui/lib/svg-icons/action/favorite';
import IconButton from 'material-ui/lib/icon-button';

const mystyle = {
	listItem : {
		color : '#FFF',
		padding : 0
	}
}
const MomentView = ({ moment , handleLikeCLick , onClick}) => {


		return (


		<GridTile
			key={moment.id}
			onClick={onClick}
			title={

		<ListItem
			style={mystyle.listItem}
			className={'inner-grid'}
			innerDivStyle={{paddingLeft:60,paddingBottom:14,paddingTop:17}}
			primaryText={<span className={'white-text'}>{moment.owner.name}</span>}
			leftAvatar={<Avatar backgroundColor={'transparent'} style={{width:30,height:30}} src={moment.owner.photo} />}
		>

		</ListItem>}
			titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)'}
			className='grid-moment'
			actionIcon={<IconButton onClick={(e) => {console.log(e);console.log('IMPIMPIMPIMP');e.stopPropagation();handleLikeCLick()}}>{moment.hasLiked ?  <Favourite  color="white"/> : <FavouriteBorder hoverColor={'orange'} color="white"/> }</IconButton>}>
<img src={moment.imageUrl} />


		</GridTile>
	)
}

MomentView.propTypes = {
	moment : React.PropTypes.object.isRequired,
	handleLikeCLick : React.PropTypes.func.isRequired,
	onClick : React.PropTypes.func.isRequired
}

export default MomentView;
