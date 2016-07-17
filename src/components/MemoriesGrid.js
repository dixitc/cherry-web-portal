//var ReactGridLayout = require('react-grid-layout');
import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import ReactGridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { fetchMemories , createMemory , setTitle , logOutUser} from '../actions/actions';
import MemoryView from './MemoryView';
import MemoryGridView from './MemoryGridView';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import dummyImg from '../images/selfie-placeholder.jpg';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
let Dropzone = require('react-dropzone');
import Badge from 'material-ui/Badge';
import Done from 'material-ui/svg-icons/action/done';
import Paper from 'material-ui/Paper';
import {ListItem} from 'material-ui/List';
import Clear from 'material-ui/svg-icons/content/clear';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import style from '../styles/Login';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory , hashHistory } from 'react-router';
import Link from 'material-ui/svg-icons/content/link';
//import { Link } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import MediaQuery from 'react-responsive';
import Headroom from 'react-headroom';

const ResponsiveReactGridLayout = WidthProvider(Responsive);



class MyMemoriesGrid extends Component {
	constructor(props) {
		props = {
		    className: "layout",
		    rowHeight: 300,
		    cols: {
		        lg: 12,
		        md: 10,
		        sm: 6,
		        xs: 1,
		        xxs: 1
		    }
		};
		super(props);

		this.state = {
		    currentBreakpoint: 'lg',
		    mounted: false,
			currentRowHeight : 150,
			open:false,
			files:[],
			newTitle:'',
			Xmargin : 10,
			Ymargin : 10
		};
		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.handleOpen = this.handleOpen.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.generateDimensions = this.generateDimensions.bind(this);
		this.breakPointChanged = this.breakPointChanged.bind(this);
		this.generateMargin = this.generateMargin.bind(this);
	}
	componentDidMount() {
	    this.setState({
	        mounted: true
	    });
		this.props.handleSetTitle('Memories');
	}
	handleOpen = () => {
		this.setState({open: true});
	}
	handleClose = () => {
		this.setState({open: false,files:[],newTitle:''});
	}
	onDrop = (files) => {
		console.log('FILES');
		console.log(files);
		files.map((file) => {
			file.imageSrc =  file.preview;
			file.isSelected = true;
		})
		//manually checking and restricting file type , more efficient implementation ?
		let curatedFiles = files.filter((file) => {
			if(file.type.split('/')[1] == 'jpeg' || file.type.split('/')[1] == 'png' || file.type.split('/')[1] == 'gif' || file.type.split('/')[1] == 'webm'){
				file.imageSrc =  file.preview;
				file.isSelected = true;
				return file;
			}
		})
		//console.log(curatedFiles);


		this.setState({files : curatedFiles})

	}
	fileSelect = (index , e) => {

		let newFiles = this.state.files;
		newFiles[index].isSelected = !newFiles[index].isSelected;
		this.setState({files:newFiles})
		e.stopPropagation();
		e.nativeEvent.stopImmediatePropagation();
	}
	onBreakpointChange = (breakpoint) => {
	    this.setState({
	        currentBreakpoint: breakpoint
	    });
	}
    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    }
	breakPointChanged = (newBreakPoint , newCols) => {
	//	this.setState({currentBreakpoint : newBreakPoint})
		switch (newBreakPoint) {
			case 'lg':
				this.setState({currentRowHeight : 150})
				this.setState({Xmargin : 25})
				this.setState({Ymargin : 25})
				break;
			case 'md':
				this.setState({currentRowHeight : 100})
				this.setState({Xmargin : 12})
				this.setState({Ymargin : 12})
				break;
			case 'sm':
				this.setState({currentRowHeight : 80})
				this.setState({Xmargin : 10})
				this.setState({Ymargin : 10})
				break;
			case 'xs':
				this.setState({currentRowHeight : 80})
				this.setState({Xmargin : 7})
				this.setState({Ymargin : 7})
				break;
			case 'xxs':
				this.setState({currentRowHeight : 80})
				this.setState({Xmargin : 7})
				this.setState({Ymargin : 7})
				break;
			default:
				this.setState({currentRowHeight : 100})

		}
	}
	generateMargin = () => {
		return [25,25];
	}
	generateUUID = () => {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (d + Math.random()*16)%16 | 0;
			d = Math.floor(d/16);
			return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	}
	createMemoryAndUploadMoments = () => {
		let sortedFiles = this.state.files.filter((file) => {return file.isSelected});

		let newMemory = {
				id : this.generateUUID(),
				title : this.state.newTitle,
				time : Date.now()
			}

			let newMoments = sortedFiles.map((file) => {

				return {
					id : this.generateUUID(),
					spot:[0.0,0.0],
					caption:'',
					time : Date.now(),
					imageUrl:''
				}
			})



		this.props.handleCreateMemory({memory:newMemory,files:sortedFiles,moments:newMoments});
		this.handleClose();
	}
	generateDimensions = (index , breakPoint) => {
		let x ;
		let y ;
		let w ;
		let h ;
		const numOfCols = 6;
		const numOfElements = 3;
		const rowHeight = 2;

		switch (index%3) {
			case 0:
				x = 2
				break;
			case 1:
				x = 0;
				break;
			case 2:
				x = 4;
				break;
			default:
				x = 0;
		}

		return {
			x : x,
			y : (Math.floor(index/numOfElements)*rowHeight),
			w : numOfCols/numOfElements,
			h : rowHeight
		}
	}
	render(){
		const{ memories , title , auth , handleLogout} = this.props;
		const layout = {
			lg : []
		};
		const actions = [
 <FlatButton
   label="Cancel"
   primary={true}
   onTouchTap={this.handleClose}
 />,
 <FlatButton
	disabled={this.state.newTitle ? false : true}
   label="Create"
   primary={true}
   onClick={this.createMemoryAndUploadMoments}/>

];

let myIconElement;
if(title === 'Memories'){
	myIconElement = <IconButton className='smooth-transit' style={{opacity:0,cursor:'default'}} ><ArrowBack /></IconButton>
}else{
	myIconElement = <IconButton className='smooth-transit' onClick={this.backToMemories}><ArrowBack /></IconButton>
}
		let memoryChildren = memories.memories.map((memory , i) => {

			if(memory.coverUrl){

				return (
					<div key={memory.id}  _grid={this.generateDimensions(i , this.state.currentBreakpoint)} style={{backgroundImage:'url('+memory.coverUrl+'&mem=true'+')'}} className='center-cropped'>
						<MemoryGridView memory={memory} key={memory.title}/>
					</div>
				)
			}else{
				return (
					<div key={memory.id}  _grid={this.generateDimensions(i)} style={{backgroundImage:'url('+location.origin+'/'+location.pathname.split('/')[1]+dummyImg+')'}} className='center-cropped'>
						<MemoryGridView memory={memory} key={memory.title}/>
					</div>
				)
			}
		})
		if(memories.memories.length == 0){
			memoryChildren = <p>No memories</p>
			console.log('REQUEST COMPLETED : NO MEMORIES PRESENT');
		}
		return (
			<div>
				<MediaQuery maxWidth={400}>
					<Headroom style={{height:'60px'}}>
							<AppBar
								style={title == 'Memories' ? {zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35'} : {zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35',boxShadow:'none'}}
								titleStyle={{height:'60px'}}
								className={'smooth-transit'}
								title={<span className='brand'>{title}</span>}
								primary={true}

								iconElementLeft={myIconElement}

								iconElementRight={title=='Memories' ? <div>

									<IconMenu

				        iconButtonElement={<div>
							<span style={{fontSize:'10px',color:'white',position:'relative',top:'-12px',padding:'10px'}}>{auth.profile.name}</span>
				          <IconButton style={style.avatarButton} >

							  {auth.profile.photo &&

								  <Avatar style={style.noBorder} backgroundColor={'transparent'} src={auth.profile.photo+'&mem=true'} size={32}/>
							  }
							  {!auth.profile.photo &&
								  <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
							  }
				      </IconButton>
				  </div>
				        }
				        targetOrigin={{horizontal: 'right', vertical: 'top'}}
				        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
				      >
				        <MenuItem primaryText='Refresh'/>
				        <MenuItem primaryText='Help' />
				        <MenuItem primaryText='Log Out' onClick={() => handleLogout()} />

				      </IconMenu></div> : <div><IconButton style={style.avatarButton} >
						  <Link style={{height:'20px',width:'20px',top:'10px'}} color={'white'} size={32}/>
					  </IconButton></div>}
							/>

						{title == 'Memories' &&
							<div className={'navBufferDiv'}></div>
						}
				</Headroom>
					</MediaQuery>
					<MediaQuery minWidth={400}>
								<AppBar
									style={{zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35'}}
									titleStyle={{height:'60px'}}
									className={'smooth-transit'}
									title={<span className='brand'>{title}</span>}
									primary={true}

									iconElementLeft={myIconElement}

									iconElementRight={<IconMenu

					        iconButtonElement={<div>
								<span style={{fontSize:'10px',color:'white',position:'relative',top:'-12px',padding:'10px'}}>{auth.profile.name}</span>
					          <IconButton style={style.avatarButton} >

								  {auth.profile.photo &&

									  <Avatar style={style.noBorder} backgroundColor={'transparent'} src={auth.profile.photo} size={32}/>
								  }
								  {!auth.profile.photo &&
									  <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
								  }
					      </IconButton>
					  </div>
					        }
					        targetOrigin={{horizontal: 'right', vertical: 'top'}}
					        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					      >
					        <MenuItem primaryText='Refresh'/>
					        <MenuItem primaryText='Help' />
					        <MenuItem primaryText='Log Out' onClick={() => handleLogout()} />

					      </IconMenu>}
								/>

							{title == 'Memories' &&
								<div className={'navBufferDiv'}></div>
							}

						</MediaQuery>
				<Dialog
		          title={<TextField hintText={'add a title'}
	  					style={style.textField}

	  					value={this.state.newTitle}
	  					onChange={(e)=>{this.setState({newTitle: e.target.value});}}
	  					onSelect={this.checkForTab}

	  					onEnterKeyDown={() => {handleRegisterUser(this.state.formattedNumber,this.state.dial_code)}}
	  					underlineFocusStyle={style.cherry}


	  					id="phoneText"
	  					/>}
				  titleStyle={{border:'none',padding:'0px'}}
				  bodyStyle={{padding:'0px 2px',border:'none'}}
				  contentStyle={{border:'none',width:'90%',margin:'0px auto'}}
				  actionsContainerStyle={{border:'none'}}
				  repositionOnUpdate={true}
				  actions={actions}
		          modal={false}
				  autoScrollBodyContent={true}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
				<div>


			</div>
				<Dropzone onDrop={this.onDrop} style={{width:'100%'}} accept={'image/*'}>
					  <div className={"filepicker dropzone dz-clickable dz-started"} style={{border:'none',background:'transparent'}}>
						  {!this.state.files.length &&

							  <div className={"dz-default dz-message"} style={{display:'block'}}>Try dropping some files here, or click to select files to upload.</div>
						  }
				{this.state.files.map((file, i) => {

			        return (
				            <div className={"dz-preview dz-processing dz-image-preview dz-success dz-complete"} onClick={(event) => {this.fileSelect(i, event)}} style={{background: 'transparent'}}>
				                <Badge badgeContent={file.isSelected
				                    ? <Done style={{height:'20px',width:'20px',fill:'#1B4CEC'}} color={'white'}/>
								: <span></span>} secondary={true} badgeStyle={file.isSelected ? {
				                    top: 12,
				                    right: 12,
				                    zIndex: 10,
									backgroundColor:'rgba(34, 255, 89, 0.49)'
				                } : {
				                    top: 12,
				                    right: 12,
				                    zIndex: 10,
									backgroundColor:'rgba(255, 87, 34, 0.34)'
				                }}
								>

				                    <Paper zIndex={3} className={"dz-image center-cropped"}  style={{
				                        backgroundImage: 'url(' + file.imageSrc + ')',
				                        borderRadius: '0px'
				                    }}></Paper>

				                    <div className={"dz-details"}></div>
				                </Badge>
				            </div>
			        	)
			    	})
				}
					  </div>
		            </Dropzone>
		        </Dialog>
				<ResponsiveReactGridLayout
					className={'layout'}
					rowHeight={this.state.currentRowHeight}
					margin = {[this.state.Xmargin , this.state.Ymargin]}
					breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
					cols={{lg: 6, md: 4, sm: 4, xs: 1, xxs: 1}}
					onBreakpointChange={this.breakPointChanged}
					isDraggable={false}>

					{memoryChildren}

	         	</ResponsiveReactGridLayout>
				<FloatingActionButton style={window.innerWidth < 400 ? {position:'fixed',bottom:'10px',right:'20px',zIndex:'9'}:{position:'fixed',bottom:'60px',right:'40px',zIndex:'9'}} zDepth={2} onTouchTap={this.handleOpen}>
					<ContentAdd tooltip={'create memory'} />
				</FloatingActionButton>
			</div>
		)
	}
}



MyMemoriesGrid.propTypes = {
	onLayoutChange: React.PropTypes.func.isRequired,
	memories : React.PropTypes.object.isRequired,
	handleFetchMemories: PropTypes.func.isRequired,
	auth : PropTypes.object.isRequired
}



const mapStateToProps = (state) => {
	const { auth , title } = state;
	const memories = state.memories;
	return {
		memories,
		auth,
        title
	}
}


const mapDispatchToProps = (dispatch) => {
	return {
		handleFetchMemories : (token) => {
			dispatch(fetchMemories(token));
		},
		handleCreateMemory : (data) => {
			dispatch(createMemory(data));
		},
        handleSetTitle: (title) => {
            dispatch(setTitle(title))
        },
		handleLogout : () => {
			dispatch(logOutUser());
		}
	}
}

const MemoriesGrid = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyMemoriesGrid)

export default MemoriesGrid;
