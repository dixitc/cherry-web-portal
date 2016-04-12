import React,{Component} from 'react';
import {connect} from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';


import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';

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


var masonryOptions = {
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
	memories : React.PropTypes.array.isRequired

}



export default MemoriesView;
