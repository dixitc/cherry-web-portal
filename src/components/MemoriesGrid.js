//var ReactGridLayout = require('react-grid-layout');
import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import ReactGridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {connect} from 'react-redux';
import IconButton from 'material-ui/IconButton';
import { fetchMemories , setTitle} from '../actions/actions';
import MemoryView from './MemoryView';
import MemoryGridView from './MemoryGridView';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import dummyImg from '../images/selfie-placeholder.jpg';

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
			Xmargin : 10,
			Ymargin : 10
		};
		this.onLayoutChange = this.onLayoutChange.bind(this);
		this.generateDimensions = this.generateDimensions.bind(this);
		this.breakPointChanged = this.breakPointChanged.bind(this);
		this.generateMargin = this.generateMargin.bind(this);
	}
	componentDidMount() {
	    this.setState({
	        mounted: true
	    });
		this.props.handleSetTitle('Cherry');
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
		const{ memories } = this.props;
		const layout = {
			lg : []
		};
		let memoryChildren = memories.memories.map((memory , i) => {

			if(memory.coverUrl){

				return (
					<div key={memory.id}  _grid={this.generateDimensions(i , this.state.currentBreakpoint)} style={{backgroundImage:'url('+memory.coverUrl+')'}} className='center-cropped'>
						<MemoryGridView memory={memory} key={memory.title}/>
					</div>
				)
			}else{
				return (
					<div key={memory.id}  _grid={this.generateDimensions(i)} style={{backgroundImage:'url('+dummyImg+')'}} className='center-cropped'>
						<MemoryGridView memory={memory} key={memory.title}/>
					</div>
				)
			}
		})
		return (
			<div>

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
        handleSetTitle: (title) => {
            dispatch(setTitle(title))
        }
	}
}

const MemoriesGrid = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyMemoriesGrid)

export default MemoriesGrid;
