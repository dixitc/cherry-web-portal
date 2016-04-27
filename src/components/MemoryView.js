import React,{Component} from 'react';
import {connect} from 'react-redux';



import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import { push } from 'react-router-redux';
import dummyImg from '../images/test.png';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import IconButton from 'material-ui/lib/icon-button';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import Favourite from 'material-ui/lib/svg-icons/action/favorite';

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
	  zIndex : 10,
	  width : '100%',
	  background : 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)'
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
		//let ep =  this.props.memory.title.replace(/[^A-Z0-9]/ig, '_');
		let ep =  this.props.memory.id;
		this.props.dispatch(push({pathname :'/memory/'+ep,state: { memory : this.props.memory}}));
	}
	render() {
		const { memory } = this.props;

		let memoryImg;
		if(memory.coverUrl){

			 memoryImg = <img style={{minHeight:200,width:'auto'}} src={memory.coverUrl} />
		 }else{

			memoryImg = <img src={dummyImg} />
		}

        /*should eventually just import memoryView concisely*/
        /* <div className='grid-item' style={{width:'31%',minWidth:220}} key={memory.id} onClick={this.memoryClick}> */
		return (

          <div className='grid-item' key={memory.id} onClick={this.memoryClick} >
 			<Card >
 			<CardHeader
				className={'memory-card-header'}
 			style={styles.cardHeader}
 			title={memory.owner.name}
			avatar={memory.owner.photo}
 			titleColor='white' />
 			<CardMedia
				overlayContainerStyle={{background:'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)'}}
				overlayStyle={{background:'transparent',overFlow:'hidden'}}
				overlayContentStyle={{background:'transparent'}}
 	         overlay={<CardTitle style={{background:'transparent',fontSize:'20px'}} title={<span className={'memory-title'}>{memory.title}</span>} subtitle={memory.momentsCount + ' moments' }
 		/>}
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
