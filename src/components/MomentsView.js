import React, {Component, PropTypes} from 'react';
import { fetchMoments , setIsLoaded } from '../actions/actions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/lib/circular-progress';
import MemoryView from './MemoryView';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import IconButton from 'material-ui/lib/icon-button';
import MomentView from './MomentView';
import { likeMoment , setTitle} from '../actions/actions';
import Avatar from 'material-ui/lib/avatar';
import FlatButton from 'material-ui/lib/flat-button';

import ListItem from 'material-ui/lib/lists/list-item';
//import Lightbox from 'react-images';
import Lightbox from 'react-image-lightbox';
import RaisedButton from 'material-ui/lib/raised-button';
import ImageLoader from 'react-imageloader';
import MediaQuery from 'react-responsive';
import dummyImg from '../images/selfie-placeholder.jpg';

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
			noMoreMoments : false

        }
		//handle pagination
        this.paginate = this.paginate.bind(this);

		//handle lightbox methods
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.openLightbox = this.openLightbox.bind(this);

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
    render() {
        const {moments, auth, handleLike , currentMemory} = this.props;
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


			const  memory = this.props.currentMemory;




		//populating moments
	    const momentChildren =   moments.moments.map((moment, i) => {

	            return (<MomentView moment={moment} key={moment.id} onClick={(event) => {this.openLightbox(i, event)}}
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
        return (
            <div className={'momentsContainer'}>

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
		}
    }
}

const MomentsView = connect(mapStateToProps, mapDispatchToProps)(MyMomentsView)

export default MomentsView;
