import React,{ Component , PropTypes } from 'react';
import {connect} from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
import { fetchMemories} from '../actions/actions';
import MemoryView from './MemoryView';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';


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
const style = {
  container: {
    position: 'relative',
  },
  refresh: {

      position :'absolute',
      margin:'auto',
      top: '15%',
      left: '45%',
      transform: 'translate3d(0, 0, 0)',

  },
};


const masonryOptions = {
    transitionDuration: '0.6s',
	itemSelector: '.grid-item',
	gutter : 4

};


class MyMemoriesView extends Component {
	constructor(props) {
		super(props);


	}
	componentDidMount(){
		this.props.handleFetchMemories(this.props.auth.authToken);
	}

	render() {
        const{ memories } = this.props;
        console.log('ASDASDASDASD');
        console.log(memories.isFetching);

		let childElements = memories.memories.map(function(memory){
			return (
				/*should eventually just import memoryView concisely*/
				<MemoryView memory={memory} className='grid-item' key={memory.id}/>
			)
		});

		return (
			<div>
				{memories.isFetching &&
                    <RefreshIndicator
  size={50}
  left={70}
  top={0}
  loadingColor={"#FF9800"}
  status="loading"
  style={style.refresh}
/>
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


MyMemoriesView.propTypes = {
	memories : React.PropTypes.object.isRequired,
	handleFetchMemories: PropTypes.func.isRequired,
	auth : PropTypes.object.isRequired
}



const mapStateToProps = (state) => {
	const { auth} = state;
	const memories = state.memories;
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

const MemoriesView = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyMemoriesView)



export default MemoriesView;