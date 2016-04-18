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
var Lightbox = require('react-lightbox-component').Lightbox;
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
		marginTop : 50
    },
    gridList: {

        width: 1000,
        height: '80%',
        overflowY: 'auto',
		margin : 'auto',
        marginBottom: 110
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
			page: 1,
			rp : 10
		}
		this.paginate = this.paginate.bind(this);
	}
    componentDidMount() {
        this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken , page: this.state.page,rp: this.state.rp});
    }
	paginate(){
		console.log('PAGE - 1');
		const newPage = this.state.page +1;
		console.log(newPage);
		this.setState({'page':newPage},function(){

			console.log('PAGE + 1');
			console.log(this.state.page);
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
    /*	handleLike(){

		this.props.dispatch(likeMoment({memoryId : this.props.moment.memoryId , momentId : this.props.moment.id , like : !this.props.moment.hasLiked}));
		//this.handleMomentLike(moment.memoryId , moment.id)
	}*/
    render() {
        const {moments, auth, handleLike} = this.props;
        const {isFetching} = moments;
        console.log(moments);

        const { memory } = this.props.location.state;
        return (
            <div style={styles.root}>

                {!this.props.location.state.memory.coverUrl && <MemoryView memory={this.props.location.state.memory}/>}
                {isFetching &&
					<CircularProgress size={0.8}/>
				}
<div className={'full-width'}>
                <GridList
					cols={4}
					cellHeight={150}
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

                    {moments.moments.map((moment) => {


                            return (

                                <MomentView moment={moment} key={moment.id} onClick={() => handleLike({
                                        memoryId: moment.memoryId,
                                        momentId: moment.id,
                                        like: !moment.hasLiked
                                    })}/>
                                )

                    })}
                </GridList>
			</div>
				<div>
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
