import React, {Component, PropTypes} from 'react';
import { fetchPublicMoments , fetchPublicMemory } from '../actions/actions';
import {connect} from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import MemoryView from './MemoryView';
import {GridList, GridTile} from 'material-ui/GridList';
import CoverMomentCard from './CoverMomentCard';
import FavouriteBorder from 'material-ui/svg-icons/action/favorite-border';
import IconButton from 'material-ui/IconButton';
import MomentView from './MomentView';
import { likeMoment , setTitle} from '../actions/actions';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import {List, ListItem} from 'material-ui/List';
import Lightbox from 'react-image-lightbox';
import RaisedButton from 'material-ui/RaisedButton';
import ImageLoader from 'react-imageloader';
import MediaQuery from 'react-responsive';
import dummyImg from '../images/selfie-placeholder.jpg';
import Headroom from 'react-headroom';

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
    },refresh: {

        position :'absolute',
        margin:'auto',
        top: '15%',
        left: '45%',
        transform: 'translate3d(0, 0, 0)',

    }
}

class MySimpleMomentsView extends Component {
    constructor(props) {
		props.currentMemory = {
		    isFetching: true,
		    title: '',
			members:[],
		    owner: {
		        name: 'asd',
		        photo: '',
		        id: ''

		    }
		}
		super(props);
		this.state = {
		    page: 0,
		    rp: 40,
		    lightboxIsOpen: false,
		    currentImage: 0,
		    noMoreMoments: false,
		    initialFetch: false

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
		this.props.handleFetchPublicMemory({shortCode:this.props.shortCode});
    }
	componentDidUpdate(){

		if(this.props.currentMemory.id && !this.state.initialFetch){
			this.setState({initialFetch : true})
			this.props.handleFetchPublicMoments({memoryId: this.props.currentMemory.id, page: this.state.page, rp: this.state.rp});
		}
	}
	componentWillUnmount() {
		//this.props.handleIsLoaded({memoryId : this.props.currentMemory.id , isLoaded : false})
	}
    openLightbox(index, event) {
		console.log('lightboxing');
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

            this.props.handleFetchPublicMoments({memoryId: this.props.currentMemory.id, page: this.state.page, rp: this.state.rp})
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
		const  memory = this.props.currentMemory;
        let {isFetching} = moments;
		let bottomElement;

		if(currentMemory.isFullyLoaded){
			bottomElement = <FlatButton label="No more moments" disabled={true} /> ;
		}else if(isFetching){
			bottomElement = <CircularProgress size={0.5} />
		}else{
			bottomElement = <RaisedButton labelColor="white" disabled={false} primary={true} label={'LOAD MORE MOMENTS'} onClick={this.paginate}/>
		}




		let momentChildren;

		let images = moments.moments.map((moment) => {
            let rObj = {};
			if(moment.image){
				if(moment.imageUrl && window.innerWidth < 400){
					console.log('on a mobile screen');
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

		if(moments.moments){
			//populating moments
			 momentChildren = moments.moments.map((moment, i) => {


			return (
				<MomentView moment={moment} showDetail={false} key={moment.id} onClick={(e) => {console.log('open lightbox');this.openLightbox(i, e) } }/>)

			})
		}else{

			 momentChildren = <span>Fetching moments ...</span>
		}
		let simpleLightBox
		if(this.state.lightboxIsOpen){

			simpleLightBox =  <Lightbox
				discourageDownloads={false}
				mainSrc={images[this.state.currentImage % images.length].src}
				nextSrc={images[((this.state.currentImage + 1) % images.length)].src}
				prevSrc={images[((this.state.currentImage + images.length - 1) % images.length)].src}
				onMovePrevRequest={this.gotoPrevious}
				onMoveNextRequest={this.gotoNext}
				onCloseRequest={this.closeLightbox}/>
		}else{
			simpleLightBox = ''
		}

			//imagesloader preloader
			const preloader = () => {
			  return <div style={{height:'100%',width:'100%'}}><CircularProgress /></div>;
			}
        return (
			<div>
				{currentMemory.isPresent &&
					<div>
						<MediaQuery maxWidth={400}>
			<Headroom style={{height:'60px'}}>
							<AppBar
								className={'smooth-transit'}
								style={{zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35',boxShadow:'none'}}
								titleStyle={{height:'60px'}}
								title={<span className='brand'>{currentMemory.title}</span>}
								primary={true}

								iconElementLeft={<span style={{width:'20px',height:'50px'}}></span>}
								/>

						</Headroom>


						</MediaQuery>
						<MediaQuery minWidth={400}>

							<AppBar
								className={'smooth-transit'}
								style={{zIndex:'10',height:'60px',position:'fixed',top:'0',backgroundColor:'#252B35'}}
								titleStyle={{height:'60px'}}
								title={<span className='brand'>{currentMemory.title}</span>}
								primary={true}

							iconElementLeft={<span style={{width:'20px',height:'50px'}}></span>}
							/>



					</MediaQuery>
				

				<div className={'momentsContainer'}>


					{simpleLightBox}

					<div className={'full-width'}>
					<MediaQuery minWidth={800}>
						{currentMemory.isFetching &&

							<RefreshIndicator
								size={50}
								left={70}
								top={0}
								loadingColor={"#FF9800"}
								status="loading"
								style={style.refresh}
								/>
						}
						{!currentMemory.isFetching &&

							<GridList cols={5} padding={4} cellHeight={150} style={styles.gridList}>

								<GridTile
									style={{background:'transparent'}}

									titleBackground={'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.68) 100%)'}

									cols={5}
									rows={2.7}>

										<CoverMomentCard memory={currentMemory} />



								</GridTile>
								{momentChildren}
							</GridList>
						}
						</MediaQuery>
						<MediaQuery maxWidth={600}>
							{currentMemory.isFetching &&
								<RefreshIndicator
									size={30}
									left={70}
									top={0}
									loadingColor={"#FF9800"}
									status="loading"
									style={style.refresh}
									/>
							}
							{!currentMemory.isFetching &&

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
							}
			</MediaQuery>
			{!currentMemory.isFetching &&

				<div style={{marginBottom: 100,textAlign:'center'}}>
					{bottomElement}

				</div>
			}
					</div>

				</div>
			</div>
			}
			{!currentMemory.isPresent &&
				<div style={!currentMemory.isFetching ? {marginBottom: 100,position:'absolute',width:'100%',top:'40%',textAlign:'center'} : {display:'none'}}>
				<FlatButton label='You have no power here' />
				</div>
			}
</div>
        )
    }
}

MySimpleMomentsView.propTypes = {
	currentMemory: React.PropTypes.object.isRequired,
	shortCode: React.PropTypes.string.isRequired,
    moments: React.PropTypes.object.isRequired,
    handleFetchPublicMoments: PropTypes.func.isRequired,
    handleFetchPublicMemory: PropTypes.func.isRequired
}


const mapStateToProps = (state) => {
	console.log(state.memories.currentMemory);
	const currentMemory = state.memories.currentMemory;

	const  { moments } = state;
	const url = state.routing.locationBeforeTransitions.pathname;

	const urlList = url.split('/')
	const shortCode = urlList[4]
// 	const shortCode = url.replace(/memories/public/i,'')
	return { currentMemory , moments , shortCode }
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
