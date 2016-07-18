import React, {Component, PropTypes} from 'react';
import { fetchMoments , setIsLoaded , toggleWebLink } from '../actions/actions';
import CoverMomentCard from './CoverMomentCard';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import MemoryView from './MemoryView';
import {GridList , GridTile} from 'material-ui/GridList';
import FavouriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import MomentView from './MomentView';
import { likeMoment , setTitle , addMoments , uploadImage , publishMoments} from '../actions/actions';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
//import Lightbox from 'react-images';
import Lightbox from 'react-image-lightbox';
import {ListItem , List} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import ImageLoader from 'react-imageloader';
import MediaQuery from 'react-responsive';
import dummyImg from '../images/selfie-placeholder.jpg';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import AddPhoto from 'material-ui/svg-icons/image/add-a-photo';
import Link from 'material-ui/svg-icons/content/link';
//import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
let Dropzone = require('react-dropzone');
import ReactGridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Toggle from 'material-ui/Toggle';

let ReactCSSTransitionGroup = require('react-addons-css-transition-group');

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory , hashHistory } from 'react-router';
//import { Link } from 'react-router';
import LinearProgress from 'material-ui/LinearProgress';
import Headroom from 'react-headroom';
import Subheader from 'material-ui/Subheader';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const mystyle = {
	listItem : {
		color:'#fff',
		padding:0
	}
}
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 30,
        width: '100%'
    },
    gridList: {

        width: '100%',
        maxWidth: 1000,
        height: '80%',
        overflowY: 'auto',
        margin: 'auto',
        marginBottom: 20
    }
};

const style = {
    momentsWrapper: {
        maxWidth: 700,
        width: 700,
        marginTop: 100,
        margin: 'auto'
    }
}

class MyMomentsView extends Component {
	static defaultProps = {
	 moments: {
		 isFetching : true
	 }
 };
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rp: 40,
            lightboxIsOpen: false,
            currentImage: 0,
			noMoreMoments : false,
			files: [],
			memberViewOpen: false,
			anchorEl : '',
			open: false,
			openLink :false,
			currentBreakpoint: 'lg',
			mounted: false,
			currentRowHeight : 80,
			instaSrc:'',
			instaOpen:false,
			Xmargin : 8,
			Ymargin : 8
		}
		//handle pagination
        this.paginate = this.paginate.bind(this);

		//handle lightbox methods
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.createAndUploadMoments = this.createAndUploadMoments.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.fileSelect = this.fileSelect.bind(this);
        this.openMemberView = this.openMemberView.bind(this);
        this.closeMemberView = this.closeMemberView.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);

		this.openWeblinkNew = this.openWeblinkNew.bind(this);
		this.closeWeblinkNew = this.closeWeblinkNew.bind(this);



		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.generateDimensions = this.generateDimensions.bind(this);
		this.breakPointChanged = this.breakPointChanged.bind(this);
		this.generateMargin = this.generateMargin.bind(this);

		//parsing coverUrl to ewnder optimal image
        this.parseCoverUrl = this.parseCoverUrl.bind(this);

    }
    componentDidMount() {

		if(this.props.currentMemory.id){

			this.props.handleFetchMoments({memoryId: this.props.currentMemory.id, token: this.props.auth.authToken, page: this.state.page, rp: this.state.rp});
		}
		//this.props.handleSetTitle(this.state.currentMemory.title);
		this.props.handleSetTitle(this.props.currentMemory.title);

		this.props.moments.isFetching = true;
        //this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken, page: this.state.page, rp: this.state.rp});
    }
	openWeblinkNew = () => {
		console.log('openng weblink dialog');
		this.setState({openLink : true})
	}
	closeWeblinkNew = () => {
		console.log('openng weblink dialog');
		this.setState({openLink : false})
	}
	backToMemories(){
		//browserHistory.replace('/memories');
		hashHistory.replace('/memories');
	}
	componentWillUnmount() {
		this.props.handleIsLoaded({memoryId : this.props.currentMemory.id , isLoaded : false})
	}
	onBreakpointChange = (breakpoint) => {
		this.setState({
			currentBreakpoint: breakpoint
		});
	}
	onTouchStart = (src , e) => {
		console.log('touch start');
		console.log(src);
		e.preventDefault();
		e.stopPropagation();
		this.setState({
			instaSrc: src
		});
		this.setState({
			instaOpen : true
		})
	}
	onTouchEnd = (src , e) => {
		console.log('touch end');
		console.log(e);
		console.log(e.target);
		e.stopPropagation();
		this.setState({
			instaSrc: ''
		});
		this.setState({
			instaOpen : false
		})
	}
	onLayoutChange = (layout, layouts) => {
		this.props.onLayoutChange(layout, layouts);
	}
	breakPointChanged = (newBreakPoint , newCols) => {
	//	this.setState({currentBreakpoint : newBreakPoint})
		switch (newBreakPoint) {
			case 'lg':
				this.setState({currentRowHeight : 80})
				this.setState({Xmargin : 10})
				this.setState({Ymargin : 10})
				break;
			case 'md':
				this.setState({currentRowHeight : 80})
				this.setState({Xmargin : 10})
				this.setState({Ymargin : 10})
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
				this.setState({currentRowHeight : 80})

		}
	}
	generateMargin = () => {
		return [25,25];
	}
	generateDimensions = (index , breakPoint) => {
		//console.log(index);
		let x ;
		let y ;
		let w ;
		let h ;
		const numOfCols = 16;
		const numOfElements = 8;
		const rowHeight = 2;


		switch (index%8) {
			case 0:
				x = 0
				break;
			case 1:
				x = 2;
				break;
			case 2:
				x = 4;
				break;
			case 3 :
				x = 6;
				break;
			case 4 :
				x = 8;
				break;
				case 5 :
					x = 10;
					break;
			case 6 :
				x = 12;
				break;
				case 7 :
					x = 14;
					break;
			default:
				x = 0;
		}
		if(index == 0){

			return {
				x : x,
				y : (Math.floor(index/numOfElements)*rowHeight),
				w : numOfCols/numOfElements +4,
				h : rowHeight + 4
			}
		}else{


			return {
				x : x,
				y : (Math.floor(index/numOfElements)*rowHeight),
				w : numOfCols/numOfElements,
				h : rowHeight
			}
		}

	}
    openLightbox(index, event) {
        event.preventDefault();
        this.setState({currentImage: index, lightboxIsOpen: true});
    }
	openMemberView = (event) => {
  // This prevents ghost click.

  event.preventDefault();

  this.setState({
	memberViewOpen: true,
	anchorEl: event.currentTarget,
  });
};
closeMemberView = () => {
  this.setState({
	memberViewOpen: false,
  });
};
    closeLightbox() {
        this.setState({currentImage: 0, lightboxIsOpen: false});
    }
    gotoPrevious() {
		if(this.state.currentImage !== 0){
	        this.setState({

					currentImage: this.state.currentImage - 1
	        });
		}
    }
    gotoNext() {
		if(this.state.currentImage + 1 !== this.props.moments.moments.length){
			this.setState({
				currentImage: this.state.currentImage + 1
			});
		}
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
    paginate() {

        const newPage = this.state.page + 1;

        this.setState({
            'page': newPage
        }, function() {

            this.props.handleFetchMoments({memoryId: this.props.currentMemory.id, token: this.props.auth.authToken, page: this.state.page, rp: this.state.rp})
        });
    }
    populateLightox() {
        const images = this.props.moments.moments.map((moment) => {
            return {src: moment.imageUrl, title: 'moment', description: 'cool moment'}
        })
    }
	parseCoverUrl(url){
		return 'https://docs.google.com/uc?id='+ url.substr(url.indexOf('id=')+3,url.length - 1)+'&mom=true';
	}
	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false,files:[]});
	}
	createAndUploadMoments = () => {
		let sortedFiles = this.state.files.filter((file) => {return file.isSelected});

		let newMoments = sortedFiles.map((file) => {

			return {
				id : this.generateUUID(),
				memoryId : this.props.currentMemory.id,
				caption:'',
				time : Date.now(),
				owner:{
					name:'',
					photo : ''
				},
				imageUrl:''
			}
		})


		this.props.handleAddMoments({newMoments:newMoments,files:sortedFiles,memoryId:this.props.currentMemory.id});
		this.handleClose();
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
    render() {
        const {moments, auth, handleLike , currentMemory , handleAddMoments , handleUploadImage , handlePublishMoments , uploaderStatus , handleToggleWebLink} = this.props;
        let {isFetching} = moments;
		let bottomElement;
		//Populating Lightbox
		console.log('LOGGING MOMENTS ON RENDER');
		console.log(moments.moments);
		console.log(currentMemory);
        let images = moments.moments.map((moment) => {
            let rObj = {};
			if(moment.image){
				if(moment.imageUrl && window.innerWidth < 400){
					var a = moment.imageUrl
					var b = a.split('sz=w');
					var c = b[1].split('&');
					c[0] = window.innerWidth;
					b[1] = c.join('&');
					rObj['src'] = b.join('sz=w')
				}else{

					rObj['src'] = moment.image.CURRENT_IMAGE;
				}
			}
			if(moment.owner){
				rObj['owner'] = moment.owner.name;
			}

            return rObj;
        });



		if(currentMemory.isFullyLoaded){
			bottomElement = <FlatButton label="No more moments" disabled={true} /> ;
		}else if(isFetching){
			bottomElement = <CircularProgress size={0.5} />
		}else{
			bottomElement = <RaisedButton labelColor="white" disabled={false} primary={true} label={'LOAD MORE MOMENTS'} onClick={this.paginate}/>
		}

		const  memory = this.props.currentMemory;

		//populating moments
	    const momentChildren =   moments.moments.map((moment, i) => {

	            return (<MomentView moment={moment} showDetail={true} key={moment.id} onTouchStart={(event) => {this.onTouchStart(moment.imageUrl+'&mom=true', event)}}
				 onClick={(e) => {console.log('open lightbox');this.openLightbox(i, e) }}
				onTouchEnd={(event) => {this.onTouchEnd(moment.src, event)}}
				 handleLikeCLick={() => handleLike({
	                memoryId: moment.memoryId,
	                momentId: moment.id,
	                like: !moment.hasLiked
	            })}/>)

	        })

			//imagesloader preloader
			const preloader = () => {
			  return <div style={{height:'100%',width:'100%'}}><CircularProgress /></div>;
			}
			const actions = [
	 <FlatButton
	   label="Cancel"
	   primary={true}
	   onTouchTap={this.handleClose}
	 />,
	 <FlatButton
		disabled={this.state.files.length > 0 ? false : true}
	   label="Upload"
	   primary={true}
	   onClick={this.createAndUploadMoments}/>

   ];

   const weblinkActions = [
   <FlatButton
   label="Share"
	data-action="share/whatsapp/share"
	    linkButton={true}
	href={currentMemory.webLink ? 'whatsapp://send?text='+location.origin+'/#/memories/public/'+currentMemory.title+'/'+currentMemory.webLink.shortCode : ''}
   primary={true}
	disabled={currentMemory.webLink ? !currentMemory.webLink.enabled : true}
   />,
   <FlatButton
   label="Copy"
   primary={true}


   disabled={currentMemory.webLink ? !currentMemory.webLink.enabled : true}
   onClick={() => { if (window.clipboardData) { // Internet Explorer
        window.clipboardData.setData('Text', 'text');
    }}}
   />

   ];

   const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: null
};
let myIconElement;
let myLinkElement;

	myIconElement = <IconButton className='smooth-transit' onClick={this.backToMemories}><ArrowBack /></IconButton>
	myLinkElement =  <IconButton onClick={this.openWeblink}>
<Link />
</IconButton>

        return (
            <div className={'momentsContainer'}>
				<MediaQuery maxWidth={400}>

					<AppBar
						style={{zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35',boxShadow:'none'}}
						titleStyle={{height:'60px'}}
						className={'smooth-transit'}
						title={<span className='brand'>{currentMemory.title}</span>}
						primary={true}

						iconElementLeft={myIconElement}

							   iconElementRight={<IconButton onClick={this.openWeblinkNew}><Link color={currentMemory.webLink && currentMemory.webLink.enabled ? '#FF5722':'white'} /> </IconButton>}
						/>



				</MediaQuery>
				<MediaQuery minWidth={400}>
					<AppBar
						style={{zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35'}}
						titleStyle={{height:'60px'}}
						className={'smooth-transit'}
						title={<span className='brand'>{currentMemory.title}</span>}
						primary={true}

						iconElementLeft={myIconElement}

						iconElementRight={ <IconButton className='smooth-transit' onClick={this.openWeblinkNew} >
						<Link color={currentMemory.webLink && currentMemory.webLink.enabled ? '#FF5722':'white'}  />
					</IconButton>}
					/>



			</MediaQuery>
				<ReactCSSTransitionGroup transitionName="instaOverlay" transitionEnterTimeout={300} transitionLeaveTimeout={300}>

  <div className={'insta-overlay'} style={this.state.instaOpen ?{height:'100%',width:'100%',position:'fixed',backgroundColor:'transparent',zIndex:'100',transform:'scale(1)',opacity:'1',transition:'all ease-in 0.2s'} :{height:'100%',width:'100%',position:'absolute',backgroundColor:'transparent',zIndex:'0',transform:'scale(0.6)',opacity:'0',transition:'all ease-in 0.2s'}}>
	  <div style={{    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',backgroundColor:'white'}}>
	  	<img src={this.state.instaSrc} style={{position: 'absolute',
    top: '0',
    bottom: '0',
    margin: 'auto',
    maxWidth: '100%',
    maxHeight: '100%',
    transform: 'scale3d(1,1,1)',
    left: '0',
    right: '0'}}  />
	  </div>
  </div>
</ReactCSSTransitionGroup>
<Dialog
  title={<ListItem disabled={true} />}
  titleStyle={{border:'none',padding:'0px'}}
  bodyStyle={{padding:'0px 2px',border:'none'}}
  contentStyle={{border:'none',maxWidth:'500px',width:'90%',margin:'0px auto'}}
  actionsContainerStyle={{border:'none'}}
  repositionOnUpdate={true}
  actions={weblinkActions}
  modal={false}
  autoScrollBodyContent={true}
  open={this.state.openLink}
  onRequestClose={this.closeWeblinkNew}
>


<ListItem primaryText={'Weblink '}  rightToggle={<Toggle style={{display:'inline-block'}}  toggled={currentMemory.webLink ? currentMemory.webLink.enabled : false} onToggle={(e) => {console.log('toggling');console.log(e.target.value);this.props.handleToggleWebLink({ 'memoryId' : currentMemory.id , 'webLinkBool' : currentMemory.webLink ? !currentMemory.webLink.enabled : true})}}/>}  />

	{currentMemory.webLink && currentMemory.webLink.enabled &&

		<Subheader style={{wordWrap:'break-word',padding:'10px',lineHeight:'20px'}}>{location.origin+'/#/memories/public/'+currentMemory.title+'/'+currentMemory.webLink.shortCode}</Subheader>
	}

</Dialog>
				<Dialog
		          title={<ListItem primaryText={'Add your moments '}  rightIconButton={<IconButton  onClick={ this.handleClose} style={{top:'8px'}} tooltip="Close"><Clear /></IconButton>} secondaryText={this.state.files.length > 0 ? (this.state.files.filter((file)=>{return file.isSelected})).length + ((this.state.files.filter((file)=>{return file.isSelected})).length == 1 ? ' moment':' moments') : ''} />}
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
                {this.state.lightboxIsOpen &&
					<Lightbox
						mainSrc={images[this.state.currentImage % images.length].src}
						nextSrc={images[((this.state.currentImage + 1) % images.length)].src}
						prevSrc={images[((this.state.currentImage + images.length - 1) % images.length)].src}
						onMovePrevRequest={this.gotoPrevious}
						onMoveNextRequest={this.gotoNext}
						onCloseRequest={this.closeLightbox}/>
				}

                <div className={'full-width'}>
					{!uploaderStatus.isUploading &&

						<FloatingActionButton style={window.innerWidth < 400 ? {position:'fixed',bottom:'10px',right:'20px',zIndex:'9'}:{position:'fixed',bottom:'60px',right:'40px',zIndex:'9'}} zDepth={2} onTouchTap={this.handleOpen}>
							<AddPhoto tooltip={'add moments'} />
						</FloatingActionButton>
					}
					<MediaQuery minWidth={400}>

						<GridList cols={5} padding={4} cellHeight={150} style={styles.gridList}>
	                        <GridTile
								style={{background:'transparent'}}

								titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.68) 100%)'}

								cols={5}
								rows={2.7}>

									<CoverMomentCard memory={memory} />



	                        </GridTile>
						</GridList>


						<ResponsiveReactGridLayout
							className={'layout'}
							rowHeight={this.state.currentRowHeight}
							margin = {[this.state.Xmargin , this.state.Ymargin]}
							breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
							cols={{lg: 16, md: 12, sm: 12, xs: 1, xxs: 1}}
							onBreakpointChange={this.breakPointChanged}
							isDraggable={false}>


							{moments.moments.map((moment , i) => {
								return (
									<div onClick={(event) => {this.openLightbox(i, event)}} key={moment.id}  _grid={this.generateDimensions(i , this.state.currentBreakpoint)} style={{backgroundImage:'url('+moment.imageUrl+')',cursor:'pointer'}} className='center-cropped'>

									</div>
								)
							})}

						</ResponsiveReactGridLayout>
					</MediaQuery>
					<MediaQuery maxWidth={600}>
						<GridList cols={3} padding={2} cellHeight={100} style={styles.gridList}>

							<GridTile
							style={{height:'200px',background:'grey'}}
							title={
								<ListItem
									style={mystyle.listItem}
									key={memory.id}
									innerDivStyle={{paddingLeft:50,paddingBottom:10,paddingTop:17}}
									primaryText={<span style={{color:'white'}}>{memory.owner.name}</span>}
									secondaryText={	< ListItem
										innerDivStyle={{paddingLeft:0,paddingBottom:15,paddingTop:5}}
										style={{color:'#FFF',fontSize:'13px'}}
										>
											<span style={{color:'#FF5722',marginRight:5}}>{memory.members.length} {memory.members.length == 1 ? 'member' :  'members'}  </span> | <span style={{marginLeft:5}}>  {memory.momentsCount} {memory.momentsCount == 1 ? 'moment' :  'moments'}</span>
										</ListItem>}
									leftAvatar={<Avatar style={{backgroundColor:'transparent',width:35,height:35,left:0}} src={memory.owner.photo} />}
								>

								</ListItem>
							}

							titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 100%)'}

							cols={3}
							rows={2}>
							{memory.coverUrl &&
								<img src={this.parseCoverUrl(memory.coverUrl)} />
							}
							{!memory.coverUrl &&
								<img src={dummyImg} style={{height:'auto',width:'100%',position:'absolute',top:'-68px'}} />
							}
							</GridTile>

								{momentChildren}
						</GridList>
					</MediaQuery>

					<div style={{marginBottom: 100,textAlign:'center'}}>
						{bottomElement}
					</div>

                </div>

				{!currentMemory.isPresent &&
					<p> You have no power here </p>
				}
            </div>

        )
    }
}

MyMomentsView.propTypes = {
	currentMemory: React.PropTypes.object.isRequired,
    moments: React.PropTypes.object.isRequired,
    handleFetchMoments: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleIsLoaded: PropTypes.func.isRequired,
    handleSetTitle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired

}

const mapStateToProps = (state) => {

    const {auth , title} = state;
    const moments = state.moments;
	const uploaderStatus = moments.uploaderStatus;

	let currentMemoryId = (state.routing.locationBeforeTransitions.pathname).replace('/memory/','')
	//console.log(state.routing.locationBeforeTransitions.pathname);
	//console.log(currentMemoryId);
	//console.log(location);
	let currentMemory = getCurrentMemory(state.memories.memories , currentMemoryId);
	if(currentMemory){
		currentMemory.isPresent = true ;
		console.log(currentMemory);
	}else{
		currentMemory = {
			isPresent : false,
			webLink : {
				enabled : false,
				shortCode : ''
			},
			owner:{
				name:'',
				photo:''
			},
			members:[]
		}
	}
    return {moments, auth ,title , currentMemory , uploaderStatus}
}

const getCurrentMemory = (memories , memoryId) => {
let filteredMemory = memories.filter((memory) => {
		if(memory.id ==memoryId){
			return memory;
		}
	})

	return filteredMemory[0];
}

const mapDispatchToProps = (dispatch) => {
    return {

        handleFetchMoments: (token) => {
            dispatch(fetchMoments(token));
        },
        handleLike: (payload) => {
            dispatch(likeMoment(payload))
        },
        handleSetTitle: (title) => {
            dispatch(setTitle(title))
        },
		handleIsLoaded: (memoryId) => {
			dispatch(setIsLoaded(memoryId))
		},
		handleAddMoments: (payload) => {
			dispatch(addMoments(payload))
		},
		handleUploadImage: (payload) => {
			dispatch(uploadImage(payload))
		},
		handlePublishMoments: (payload) => {
			dispatch(publishMoments(payload))
		},
		handleToggleWebLink: (payload) => {
			dispatch(toggleWebLink(payload))
		}
    }
}

const MomentsView = connect(mapStateToProps, mapDispatchToProps)(MyMomentsView)

export default MomentsView;
