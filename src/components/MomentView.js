import React,{Component} from 'react';
import {connect} from 'react-redux';



import { likeMoment } from '../actions/actions';
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






class MomentView extends Component {
	constructor(props) {
		super(props);
		this.verifyUserLike = this.verifyUserLike.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.state = {
			toggle:false
		}
	}
	componentDidMount(){

	}
	verifyUserLike(){

	}
	handleLike(){
		// /this.setState({toggle : !this.state.toggle});
		this.props.dispatch(likeMoment({memoryId : this.props.moment.memoryId , momentId : this.props.moment.id , like : !this.props.moment.hasLiked}));
		//this.handleMomentLike(moment.memoryId , moment.id)
	}
	render() {
		const { moment } = this.props;

		return (

			/*should eventually just import memoryView concisely*/

	<GridTile
	   key={moment.id}
	   title={moment.owner.name}
	   subtitle={<span></span>}
	   actionIcon={<IconButton onClick={this.handleLike}>{moment.hasLiked ?  <Favourite color="white"/> : <FavouriteBorder color="white"/> }</IconButton>}>
	   <img src={moment.imageUrl} />
	</GridTile>



		)

	}
}


MomentView.propTypes = {
	moment : React.PropTypes.object.isRequired

}



export default connect()(MomentView)
