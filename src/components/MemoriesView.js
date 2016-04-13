import React,{ Component , PropTypes } from 'react';
import {connect} from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import { fetchMemories} from '../actions/actions';


import MemoryView from './MemoryView';

let Masonry = require('react-masonry-component');




const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
  image : {
	  height: '100%',
	  width : '100%',
	  border : 'none'
  },
  gridItem : {
	  padding: '20px 15px'
  },
  cardHeader : {
	  position : 'absolute',
	  zIndex : 10
  },
  overlayContent : {
	  lineHeight : '20px'
  }
};


const masonryOptions = {
    transitionDuration: '0.6s',
	itemSelector: '.grid-item',
	gutter : 4

};


class MemoriesView extends Component {
	constructor(props) {
		super(props);

		console.log("PROPSS");
		console.log(props);
	}
	componentDidMount(){
		this.props.handleFetchMemories(this.props.auth.authToken);
	}

	render() {
		let childElements = this.props.memories.map(function(memory){
			return (
				/*should eventually just import memoryView concisely*/
				<MemoryView memory={memory} className='grid-item' key={memory.id}/>
			)
		});

		return (
			<div>
				{!this.props.memories.length &&
					<p> No memories aka Jason Bourne</p>
				}

			<Masonry
			className={'my-gallery-class'} // default ''
			elementType={'div'} // default 'div'
			options={masonryOptions}
			disableImagesLoaded={false}
			>
				{childElements}
			</Masonry>

			</div>
		)

	}
}


MemoriesView.propTypes = {
	memories : React.PropTypes.array.isRequired,
	handleFetchMemories: PropTypes.func.isRequired,
	auth : PropTypes.object.isRequired
}



const mapStateToProps = (state) => {
	const { auth} = state;
	const memories = state.memories.memories;
	return {
		memories,
		auth
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		handleFetchMemories : (token) => {
			dispatch(fetchMemories(token));
		}
	}
}

const MyMemoriesView = connect(
	mapStateToProps,
	mapDispatchToProps
)(MemoriesView)



export default MyMemoriesView;
