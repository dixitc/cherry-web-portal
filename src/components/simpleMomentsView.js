import React, {Component, PropTypes} from 'react';
import { fetchPublicMoments , fetchPublicMemory } from '../actions/actions';
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
import AppBar from 'material-ui/lib/app-bar';

import ListItem from 'material-ui/lib/lists/list-item';
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

class MySimpleMomentsView extends Component {
	static defaultProps = {
	 moments: {
		 isFetching : false,
		 moments:[]
	 },
	 currentMemory: {
		isFetching : false,
		title : '',
		owner : {
			profile :
			{
				name : '',
				photo : '',
				id:''
			}
		}
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
			initialFetch:false

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
		this.props.handleFetchPublicMemory({shortCode:'8YrkPA'});
		console.log('HANDLING FETCH PUBLIC MOMENTS 1');
        //this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken, page: this.state.page, rp: this.state.rp});
    }
	componentDidUpdate(){

		console.log('HANDLING FETCH PUBLIC MOMENTS 2');
		console.log(this.props.currentMemory.id);
		if(!this.state.initialFetch){
			this.setState({initialFetch : true})
			this.props.handleFetchPublicMoments({memoryId: this.props.currentMemory.id, page: this.state.page, rp: this.state.rp});
		}
	}
	componentWillUnmount() {
		//this.props.handleIsLoaded({memoryId : this.props.currentMemory.id , isLoaded : false})
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
        const {moments ,  currentMemory} = this.props;
        let {isFetching} = moments;
		let bottomElement;
		//Populating Lightbox
        /*let images = moments.moments.map((moment) => {
            let rObj = {};
            rObj['src'] = moment.image.CURRENT_IMAGE;
            rObj['owner'] = moment.owner.name;

            return rObj;
        }); */
		console.log('CHECKING ISFETCHING');
		console.log(moments);

		if(currentMemory.isFullyLoaded){
			bottomElement = <FlatButton label="No more moments" disabled={true} /> ;
		}else if(isFetching){
			bottomElement = <CircularProgress size={0.5} />
		}else{
			bottomElement = <RaisedButton labelColor="white" disabled={false} primary={true} label={'LOAD MORE MOMENTS'} onClick={this.paginate}/>
		}


			const  memory = this.props.currentMemory;




		//populating moments
	    /*const momentChildren =   moments.moments.map((moment, i) => {

	            return (<MomentView moment={moment} key={moment.id} onClick={(event) => {this.openLightbox(i, event)}}
				 handleLikeCLick={() => handleLike({
	                memoryId: moment.memoryId,
	                momentId: moment.id,
	                like: !moment.hasLiked
	            })}/>)

	        })*/

			//imagesloader preloader
			const preloader = () => {
			  return <div style={{height:'100%',width:'100%'}}><CircularProgress /></div>;
			}
        return (
    <div>
		<AppBar
			style={{zIndex:2}}
			className={'smooth-transit'}
			title={<span className='brand'>{currentMemory.title}</span>}
			primary={true}

			iconElementLeft={<span></span>}
		/>
	<p> Nothing to see here . Move on sir</p>

	</div>

        )
    }
}

MySimpleMomentsView.propTypes = {
	currentMemory: React.PropTypes.object.isRequired,
    moments: React.PropTypes.object.isRequired,
    handleFetchPublicMoments: PropTypes.func.isRequired,
    handleFetchPublicMemory: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {

    const { currentMemory} = state.memories;
	const { moments } = state.moments;
	console.log('currentMemorycurrentMemorycurrentMemory');
	console.log(currentMemory);

	return { currentMemory , moments }
}

const mapDispatchToProps = (dispatch) => {
    return {
		handleFetchPublicMoments: (payload) => {
            dispatch(fetchPublicMoments(payload));
        },
		handleFetchPublicMemory: (shortCode) => {
			dispatch(fetchPublicMemory(shortCode))
		}
    }
}




 const simpleMomentsView = connect(mapStateToProps,mapDispatchToProps)(MySimpleMomentsView)
//const simpleMomentsView = connect(mapDispatchToProps)(MySimpleMomentsView)

export default simpleMomentsView;
