import React,{Component} from 'react';
import {connect} from 'react-redux';



import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import dummyImg from '../images/test.png';
import { GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import FavouriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Favourite from 'material-ui/svg-icons/action/favorite';
import ImageIcon from 'material-ui/svg-icons/image/image';
import MemberIcon from 'material-ui/svg-icons/action/face';
import * as customGa from '../analytics/ga';
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
	  display:'none',
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
		let gaPayload = {
			category : 'MEMORY',
			action:'MEMORY_CARD_CLICK',
			label:this.props.memory.id
		}
		customGa.event(gaPayload);
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
	<div style={{fontSize:'12px',padding:'5px',color:'whitesmoke'}}>
	<ImageIcon style={{fontSize:'12px',height:'14px',position:'relative',top:'2px',left:'-8px'}} color={'#E6E668'}/><span style={{position:'relative',left:'-6px'}}>{memory.momentsCount}</span>
	 <MemberIcon tooltip='asdf' style={{paddingLeft:'20px',paddingRight:'0px',fontSize:'12px',height:'14px',position:'relative',top:'2px',left:'-5px'}} color={'#E6E668'}/>
	 <span style={{position:'relative',left:'-2px'}}>{memory.members.length}</span>
	</div>
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
