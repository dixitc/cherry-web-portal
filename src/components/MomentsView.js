import React , { Component , PropTypes } from 'react';
import { fetchMoments } from '../actions/actions';
import {connect} from 'react-redux';
let Masonry = require('react-masonry-component');
import CircularProgress from 'material-ui/lib/circular-progress';
import MemoryView from './MemoryView';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import IconButton from 'material-ui/lib/icon-button';
import MomentView from './MomentView';

const masonryOptions = {
    transitionDuration: '0.6s',
	itemSelector: '.grid-image',
	columnWidth : 200,
	gutter : 4

};
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: '100%',
    overflowY: 'auto',
    marginBottom: 24,
  },
};

const style= {
	momentsWrapper : {
		maxWidth : '500px',
		width :  '500px',
		margin : 'auto'
	}
}

class MyMomentsView extends Component {
	constructor(props) {
		super(props);



	}
	componentDidMount(){
		this.props.handleFetchMoments({memoryId : this.props.location.state.memory.id , token : this.props.auth.authToken});
	}
	render(){
		const {moments , auth} = this.props;
		const { isFetching } = moments;
	console.log(moments);


		let childElements = moments.moments.map((moment) => {
			return (
				<MomentView moment={moment} key={moment.id}/>

			)
		})
		console.log(childElements);

		const { memory } = this.props.location.state;
		return (
			<div style={styles.momentsWrapper}>

				{this.props.location.state.memory.coverUrl &&
					<MemoryView memory={this.props.location.state.memory}/>


				}
				{isFetching &&

					<CircularProgress size={0.8}/>
				}
				<GridList
		      cellHeight={200}
		      style={styles.gridList}
		    >


					{childElements}
				</GridList>
				</div>

		)
	}
}


MyMomentsView.propTypes = {
	moments : React.PropTypes.object.isRequired,
	handleFetchMoments: PropTypes.func.isRequired,
	auth : PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
	console.log(state)
	const { auth} = state;
	const moments = state.moments;

	return {
		moments,
		auth

	}
}



const mapDispatchToProps = (dispatch) => {
	return {

  		handleFetchMoments : (token) => {
  			dispatch(fetchMoments(token));
  		}
  	}
}

const MomentsView = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyMomentsView)


export default MomentsView;
