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

import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Favourite from 'material-ui/lib/svg-icons/action/favorite';
import IconButton from 'material-ui/lib/icon-button';


const MomentView = ({ moment , onClick}) => {

	return (

		<GridTile
			key={moment.id}
			title={moment.owner.name}
			subtitle={<span></span>}
			cols={1}
			rows={1}
			className='grid-moment'
			actionIcon={<IconButton onClick={onClick}>{moment.hasLiked ?  <Favourite color="white"/> : <FavouriteBorder color="white"/> }</IconButton>}>
<a href={moment.imageUrl} data-lightbox="roadtrip"><img src={moment.imageUrl} /></a>


		</GridTile>
	)
}

MomentView.propTypes = {
	moment : React.PropTypes.object.isRequired,
	onClick : React.PropTypes.func.isRequired
}

export default MomentView;
