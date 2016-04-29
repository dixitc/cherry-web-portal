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



class MemoryGridView extends Component {
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
		return (

          <div className={'memoryGrid'} style={{height:'100%',width:'100%'}} key={memory.id} onClick={this.memoryClick} >
 			<Card >
 			<CardHeader
				className={'memory-card-header'}
 				style={styles.cardHeader}
 				title={<span style={{fontSize:'13px',top:'5px',position:'relative'}}>{memory.owner.name}</span>}
				avatar={<img style={{borderRadius:'50%'}} src={memory.owner.photo} />}
 				titleColor='white' />
<div className={'bottomTitle'}>
	{memory.title}
	<div style={{fontSize:'12px',padding:'5px',color:'#FF5722'}}>
		 {memory.momentsCount} moments</div>
	</div>



 			</Card>
 			</div>


		)

	}
}


MemoryGridView.propTypes = {
	memory : React.PropTypes.object.isRequired
}



export default connect()(MemoryGridView)
