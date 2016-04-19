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
import { likeMoment , setTitle} from '../actions/actions';
import Avatar from 'material-ui/lib/avatar';
import ListItem from 'material-ui/lib/lists/list-item';
//import Lightbox from 'react-images';
import Lightbox from 'react-image-lightbox';
import RaisedButton from 'material-ui/lib/raised-button';

let Masonry = require('react-masonry-component');
const masonryOptions = {
    transitionDuration: '0.6s',
    itemSelector: '.grid-image',
    columnWidth: 200,
    gutter: 4
};

const mystyle = {
	listItem : {
		color : '#FFF',
		padding : 0
	}
}
const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 50,
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
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rp: 20,
            lightboxIsOpen: false,
            currentImage: 0,
			noMoreMoments : false
        }
        this.paginate = this.paginate.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.gotoNext = this.gotoNext.bind(this);
        this.gotoPrevious = this.gotoPrevious.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
        this.parseCoverUrl = this.parseCoverUrl.bind(this);
    }
    componentDidMount() {
        this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken, page: this.state.page, rp: this.state.rp});
        this.props.handleSetTitle(this.props.location.state.memory.title);
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

            this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken, page: this.state.page, rp: this.state.rp})
        });
    }
    populateLightox() {
        const images = this.props.moments.moments.map((moment) => {
            return {src: moment.imageUrl, title: 'moment', description: 'cool moment'}
        })
    }
		parseCoverUrl(url){
		console.log('parseCoverUrl');
		console.log(url);
		return 'https://docs.google.com/uc?id='+ url.substr(url.indexOf('id=')+3,url.length - 1);
		//https://drive.google.com/thumbnail?authuser=0&sz=w360&id=0ByxtQn1WtMnoZ1VIUzZ3Zmd5RVE
		//return url;
	}
    render() {
        const {moments, auth, handleLike} = this.props;
        const {isFetching} = moments;

		//Populating Lightbox
        let images = moments.moments.map((moment) => {
            let rObj = {};
            //https://docs.google.com/uc?id=0ByxtQn1WtMnodC1JSi1GWXhiUEE
            rObj['src'] = moment.image.CURRENT_IMAGE;
            rObj['owner'] = moment.owner.name;

            return rObj;
        });

        const { memory } = this.props.location.state;

		//populating moments
	    const momentChildren =   moments.moments.map((moment, i) => {

	            return (<MomentView moment={moment} key={moment.id} onClick={(event) => {this.openLightbox(i, event)}}
				 handleLikeCLick={() => handleLike({
	                memoryId: moment.memoryId,
	                momentId: moment.id,
	                like: !moment.hasLiked
	            })}/>)

	        })

        return (
            <div style={styles.root}>



                {!this.props.location.state.memory.coverUrl && <MemoryView memory={this.props.location.state.memory}/>}

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
                    <GridList cols={5} padding={4} cellHeight={150} style={styles.gridList}>

                        <GridTile
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
											<span style={{color:'#FF5722'}}>{memory.members.length} members</span> | <span>{moments.moments.length} moments</span>
										< /ListItem>}
									leftAvatar={<Avatar style={{backgroundColor:'transparent',width:35,height:35,left:0}} src={memory.owner.photo} />}
								>

								</ListItem>
							}

							titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 100%)'}

						cols={5}
						rows={2}>
                        {memory.coverUrl &&
                            <img src={this.parseCoverUrl(memory.coverUrl)}/>
                        }

                        </GridTile>
						{momentChildren}
                    </GridList>
                </div>
                <div style={{
                    marginBottom: 100
                }}>
				{!isFetching &&

					<RaisedButton labelColor="white" disabled={false} primary={true} label={'LOAD MORE MOMENTS'} onClick={this.paginate}/>
					}

				{isFetching &&
					<CircularProgress size={0.5} />
				}
			</div>
            </div>

        )
    }
}

MyMomentsView.propTypes = {
    moments: React.PropTypes.object.isRequired,
    handleFetchMoments: PropTypes.func.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleSetTitle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired

}

const mapStateToProps = (state) => {

    const {auth , title} = state;
    const moments = state.moments;
    return {moments, auth ,title}
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
        }
    }
}

const MomentsView = connect(mapStateToProps, mapDispatchToProps)(MyMomentsView)

export default MomentsView;
