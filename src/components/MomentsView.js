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
        justifyContent: 'space-around'
    },
    gridList: {

        width: 1000,
        height: '100%',
        overflowY: 'auto',
		margin : 'auto',
        marginBottom: 24
    }
};

const style = {
    momentsWrapper: {
        maxWidth: 700,
        width: 700,
        margin: 'auto'
    }
}

class MyMomentsView extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.props.handleFetchMoments({memoryId: this.props.location.state.memory.id, token: this.props.auth.authToken});
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
            <div style={styles.momentsWrapper}>

                {!this.props.location.state.memory.coverUrl && <MemoryView memory={this.props.location.state.memory}/>}
                {isFetching && <CircularProgress size={0.8}/>
}
                <GridList
					cols={3}
					cellHeight={200}
					style={styles.gridList}>
					<GridTile
						key={memory.id}
						title={memory.title}
						subtitle={<div><span>{memory.members.length} members</span> | <span>{moments.moments.length} moments</span></div>}
						cols={2}
		 				rows={2}
						>

						<img src={memory.coverUrl} />

					</GridTile>

                    {moments.moments.map((moment) => {
                        if(moment.memoryId == memory.id){

                            return (

                                <MomentView moment={moment} key={moment.id} onClick={() => handleLike({
                                        memoryId: moment.memoryId,
                                        momentId: moment.id,
                                        like: !moment.hasLiked
                                    })}/>
                                )
                        }else{
                            return ;
                        }
                    })}
                </GridList>
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
