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
import { push } from 'react-router-redux';
//this.props.dispatch(push('/some/path'));


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



class MemoryView extends Component {
	constructor(props) {
		super(props);
		this.memoryClick = this.memoryClick.bind(this);

	}
	componentDidMount(){

	}
	memoryClick(){
		console.log("CLICKETY CLICK");
		let ep =  this.props.memory.title.replace(/[^A-Z0-9]/ig, "_");
		console.log(this.props.memory.title);

		this.props.dispatch(push({pathname :'/memory/'+ep,state: { memory : this.props.memory}}));
	}
	render() {
		const { memory } = this.props;

		let memoryImg;
		if(memory.coverUrl){
			 memoryImg = <img src={memory.coverUrl} />
		 }else{
			memoryImg = <img src='https://lh3.googleusercontent.com/EpTpqq7q1vQ6LYPJIzeFPCTnVeG4E2MXWJKt3_wKnDiP-KgVjqBNHWJ2xp11pSev9pkXcQ=w90' />
		}

		return (

			/*should eventually just import memoryView concisely*/
 		   <div className='grid-item' key={memory.id} onClick={this.memoryClick}>
 			<Card >
 			<CardHeader
 			style={styles.cardHeader}
 			title={memory.owner.name}
			avatar={memory.owner.photo}
 			titleColor='white' />
 			<CardMedia
 	         overlay={<CardTitle title={memory.title} subtitle={memory.momentsCount + ' moments' }
 			 overlayContentStyle={styles.overlayContent} />}
 	       >
		   {memoryImg}


 	       </CardMedia>



 			</Card>
 			</div>


		)

	}
}


MemoryView.propTypes = {
	memory : React.PropTypes.object.isRequired

}



export default connect()(MemoryView)
