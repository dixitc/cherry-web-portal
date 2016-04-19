import React, {Component, PropTypes} from 'react';
import {fetchMoments} from '../actions/actions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/lib/circular-progress';
import MemoryView from './MemoryView';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FavouriteBorder from 'material-ui/lib/svg-icons/action/favorite-border';
import IconButton from 'material-ui/lib/icon-button';
import MomentView from './MomentView';
import {likeMoment} from '../actions/actions';
import Avatar from 'material-ui/lib/avatar';
//var Lightbox = require('react-lightbox-component').Lightbox;
import Lightbox from 'react-images';
import RaisedButton from 'material-ui/lib/raised-button';


let Masonry = require('react-masonry-component');
const masonryOptions = {
    transitionDuration: '0.6s',
    itemSelector: '.grid-image',
    columnWidth: 200,
    gutter: 4
};
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
		marginTop : 50,
		width:'100%'
    },
    gridList: {

        width: '100%',
		maxWidth:1000,
        height: '80%',
        overflowY: 'auto',
		margin : 'auto',
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
    constructor(props) {
        super(props);
		this.state = {
			page: 0,
			rp : 10,
			lightboxIsOpen: false,
			currentImage: 0
		}
		this.paginate = this.paginate.bind(this);
		this.closeLightbox = this.closeLightbox.bind(this);
this.gotoNext = this.gotoNext.bind(this);
this.gotoPrevious = this.gotoPrevious.bind(this);
this.openLightbox = this.openLightbox.bind(this);
	}
    componentDidMount() {
        this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken , page: this.state.page,rp: this.state.rp});
    }
	openLightbox (index, event) {
		console.log("OPOPOPOPOPOPOPOP");
		event.preventDefault();
		this.setState({
			currentImage: index,
			lightboxIsOpen: true,
		});
	}
	closeLightbox () {
		this.setState({
			currentImage: 0,
			lightboxIsOpen: false,
		});
	}
	gotoPrevious () {
		this.setState({
			currentImage: this.state.currentImage - 1,
		});
	}
	gotoNext () {
		this.setState({
			currentImage: this.state.currentImage + 1,
		});
	}
	paginate(){

		const newPage = this.state.page +1;

		this.setState({'page':newPage},function(){


			this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken , page: this.state.page,rp: this.state.rp})
		});
	}
	populateLightox (){
		const images = this.props.moments.moments.map((moment) => {
			return {
				src : moment.imageUrl,
				title : 'moment',
				description : 'cool moment'
			}
		})
	}
    render() {
        const {moments, auth, handleLike} = this.props;
        const {isFetching} = moments;

        let images = moments.moments.map((moment) => {
			let rObj = {};
			//https://docs.google.com/uc?id=0ByxtQn1WtMnoNmVqM29tQkNPTUE
			rObj['src'] = moment.image.CURRENT_IMAGE

			return rObj;
		});

        const { memory } = this.props.location.state;
        return (
            <div style={styles.root}>

                {!this.props.location.state.memory.coverUrl && <MemoryView memory={this.props.location.state.memory}/>}
                {isFetching &&
					<CircularProgress size={0.8}/>
				}
				 <Lightbox
        images={images}
		currentImage={this.state.currentImage}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
      />
				<div className={'full-width'}>
                <GridList
					cols={4}

					padding={4}
					style={styles.gridList}>
					<GridTile
						key={memory.id}
						title={memory.title}
						titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)'}
						subtitle={<div><span>{memory.members.length} members</span> | <span>{moments.moments.length} moments</span></div>}
						cols={4}
		 				rows={2}
						>

						<img src={memory.coverUrl} />

					</GridTile>





                    {moments.moments.map((moment ,i) => {


                            return (

                                <MomentView moment={moment} key={moment.id} onClick={(event) =>{console.log("OOOOOOOOOOOOOO"); this.openLightbox(i, event)}} handleLikeCLick={() => handleLike({memoryId: moment.memoryId,momentId: moment.id,like: !moment.hasLiked})}/>

                                )

                    })}
                </GridList>
			</div>
				<div style={{marginBottom:100}}>
					<RaisedButton  labelColor="white" disabled={false} primary={true} label={'LOAD MORE MOMENTS'} onClick={this.paginate}/>
</div>
            </div>

        )
    }
}

MyMomentsView.propTypes = {
    moments: React.PropTypes.object.isRequired,
    handleFetchMoments: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    console.log(state)
    const {auth} = state;
    const moments = state.moments;

    return {moments, auth}
}

const mapDispatchToProps = (dispatch) => {
    return {

        handleFetchMoments: (token) => {
            dispatch(fetchMoments(token));
        },
        handleLike: (payload) => {
            dispatch(likeMoment(payload))
        }
    }
}

const MomentsView = connect(mapStateToProps, mapDispatchToProps)(MyMomentsView)

export default MomentsView;
