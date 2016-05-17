import React, {Component, PropTypes} from 'react';
import { fetchMoments , setIsLoaded } from '../actions/actions';
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
import {ListItem} from 'material-ui/List';
//import Lightbox from 'react-images';
import Lightbox from 'react-image-lightbox';
import RaisedButton from 'material-ui/RaisedButton';
import ImageLoader from 'react-imageloader';
import MediaQuery from 'react-responsive';
import dummyImg from '../images/selfie-placeholder.jpg';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Badge from 'material-ui/Badge';
import Done from 'material-ui/svg-icons/action/done';
//import DropzoneComponent from 'react-dropzone-component/lib/react-dropzone';
var Dropzone = require('react-dropzone');

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
			open: false
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
	componentWillUnmount() {
		this.props.handleIsLoaded({memoryId : this.props.currentMemory.id , isLoaded : false})
	}
    openLightbox(index, event) {
        event.preventDefault();
        this.setState({currentImage: index, lightboxIsOpen: true});
    }
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
        this.setState({
            currentImage: this.state.currentImage + 1
        });
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
		return 'https://docs.google.com/uc?id='+ url.substr(url.indexOf('id=')+3,url.length - 1);
	}
	handleOpen = () => {
		this.setState({open: true});
	}

	handleClose = () => {
		this.setState({open: false,files:[]});
	}
	createAndUploadMoments = () => {
		let files = this.state.files;
		let newMoments = files.map((file) => {
			return {
				id : this.generateUUID(),
				memoryId : this.props.currentMemory.id,
				caption:'',
				time : Date.now()
			}
		})
		console.log('CHECK THIS SHIT OUT');
		console.log(newMoments);
		this.props.handleAddMoments({newMoments:newMoments,files:files,memoryId:this.props.currentMemory.id});
		this.handleClose();
	}
	onDrop = (files) => {
		files.map((file) => {
			file.imageSrc =  URL.createObjectURL(file)
		})
		console.log('Received files: ', files);

		this.setState({files : files})
		//this.createAndUploadMoments(files)
	}
    render() {
        const {moments, auth, handleLike , currentMemory , handleAddMoments , handleUploadImage , handlePublishMoments } = this.props;
        let {isFetching} = moments;
		let bottomElement;
		//Populating Lightbox
        let images = moments.moments.map((moment) => {
            let rObj = {};
            rObj['src'] = moment.image.CURRENT_IMAGE;
            rObj['owner'] = moment.owner.name;

            return rObj;
        });

		console.log('CHECKING ISFETCHING');
		console.log(isFetching);

		if(currentMemory.isFullyLoaded){
			bottomElement = <FlatButton label="No more moments" disabled={true} /> ;
		}else if(isFetching){
			bottomElement = <CircularProgress size={0.5} />
		}else{
			bottomElement = <RaisedButton labelColor="white" disabled={false} primary={true} label={'LOAD MORE MOMENTS'} onClick={this.paginate}/>
		}

		let membersList;
		if(currentMemory.members.length > 0){
			membersList = currentMemory.members.map((member) => {

			   return <div style={{display:'inline-block',width:'40px',paddingRight:'5px'}}><ListItem
				   innerDivStyle={{display:'inline-block',width:'40px'}}

					leftAvatar={<Avatar style={{left:0}} src={member.profile ? member.profile.photo : ''} />}
				   ></ListItem></div>
		   })
		}else {
			 membersList = ''
		}


		const  memory = this.props.currentMemory;


		//populating moments
	    const momentChildren =   moments.moments.map((moment, i) => {

	            return (<MomentView moment={moment} showDetail={true} key={moment.id} onClick={(event) => {this.openLightbox(i, event)}}
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
	   label="Upload"
	   primary={true}
	   onClick={this.createAndUploadMoments}/>

   ];
   const componentConfig = {
    iconFiletypes: ['.jpg', '.png', '.gif'],
    showFiletypeIcon: true,
    postUrl: null
};
        return (
            <div className={'momentsContainer'}>
				<Dialog
		          title="Add your moments"
				  titleStyle={{border:'none'}}
				  bodyStyle={{border:'none'}}
				  repositionOnUpdate={true}
		          actions={actions}
		          modal={false}
				  autoScrollBodyContent={true}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
				<Dropzone onDrop={this.onDrop} style={{width:'100%'}}>
					  <div className={"filepicker dropzone dz-clickable dz-started"}>
						  {!this.state.files.length &&

							  <div className={"dz-default dz-message"} style={{display:'block'}}>Try dropping some files here, or click to select files to upload.</div>
						  }
						  {this.state.files.map((file) => {

							  return (							  <Badge
							    badgeContent={<Done color={'white'}/>}
							    secondary={true}
							    badgeStyle={{top: 20, right: 20,zIndex:10}}
							  ><div className={"dz-preview dz-processing dz-image-preview dz-success dz-complete"}>


							  			<Paper zIndex={3} className={"dz-image center-cropped"} style={{backgroundImage:'url('+file.imageSrc+')',borderRadius:'0px'}}>
										</Paper>

										<div className={"dz-details"}>
										</div>
									</div></Badge>)
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
					<FloatingActionButton style={{position:'fixed',bottom:'60px',right:'40px',zIndex:'4'}} zDepth={2} onTouchTap={this.handleOpen} >
						<ContentAdd tooltip={'add moments'} />
					</FloatingActionButton>
					<MediaQuery minWidth={800}>
	                    <GridList cols={5} padding={4} cellHeight={150} style={styles.gridList}>

	                        <GridTile
								style={{background:'grey'}}
								title={
									<ListItem
										style={mystyle.listItem}
										key={memory.id}
										innerDivStyle={{paddingLeft:50,paddingBottom:10,paddingTop:17}}
										primaryText={<span className={'white-text'}>{memory.owner.name}</span>}
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

								titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.68) 100%)'}

								cols={5}
								rows={2}>
		                        {memory.coverUrl &&
									<img style={{width:'100%'}} src={this.parseCoverUrl(memory.coverUrl)} />
								}
								{!memory.coverUrl &&
									<img src={dummyImg} style={{height:'auto',width:'100%',position:'absolute',top:'-228px'}} />
								}

	                        </GridTile>

							{momentChildren}
	                    </GridList>
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


	let currentMemoryId = (state.routing.locationBeforeTransitions.pathname).replace('/memory/','')
	//console.log(state.routing.locationBeforeTransitions.pathname);
	//console.log(currentMemoryId);
	//console.log(location);
	let currentMemory = getCurrentMemory(state.memories.memories , currentMemoryId);
	if(currentMemory.title){
		currentMemory.isPresent = true ;
	}else{
		currentMemory = {
			isPresent : false
		}
	}
    return {moments, auth ,title , currentMemory}
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
		}
    }
}

const MomentsView = connect(mapStateToProps, mapDispatchToProps)(MyMomentsView)

export default MomentsView;
