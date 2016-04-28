//var ReactGridLayout = require('react-grid-layout');
import React, {Component, PropTypes} from 'react';
import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
import ReactGridLayout from 'react-grid-layout';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {connect} from 'react-redux';
import IconButton from 'material-ui/lib/icon-button';
import { fetchMemories , setTitle} from '../actions/actions';
import MemoryView from './MemoryView';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';

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
		    layouts: {
		        lg:  [{
				    i: 'a',
				    x: 0,
				    y: 0,
				    w: 1,
				    h: 2
				}, {
				    i: 'b',
				    x: 1,
				    y: 0,
				    w: 3,
				    h: 2,
				    minW: 2,
				    maxW: 4
				}, {
				    i: 'c',
				    x: 4,
				    y: 0,
				    w: 1,
				    h: 2
				}]
		    },
		};
		this.onLayoutChange = this.onLayoutChange.bind(this);

	}
	componentDidMount() {
	    this.setState({
	        mounted: true
	    });
	}
	onBreakpointChange = (breakpoint) => {
	    this.setState({
	        currentBreakpoint: breakpoint
	    });
	}
    onLayoutChange = (layout, layouts) => {
        this.props.onLayoutChange(layout, layouts);
    };
	render(){
		const{ memories } = this.props;
		const layout = {
			lg : []
		};

		return (
			<div>
				<ResponsiveReactGridLayout
					className={'layout'}
					rowHeight={100}
					breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
					cols={{lg: 8, md: 6, sm: 4, xs: 1, xxs: 1}}
					isDraggable={false}>

		           <div key={'a'}  _grid={{x: 0, y: 0, w: 6, h: 4, static: true}} style={{backgroundImage:'url("https://lh6.googleusercontent.com/le05fcL0tRojIjBFV9Lpxj1BPPvfz6U5z4XXnxaMQpZJ-4vPiI0LPIqSNBGZBBrHq_-2Dg=w90")'}} className='center-cropped'></div>
		           <div key={'b'} _grid={{x: 6, y: 0, w: 2, h: 2, minW: 2, maxW: 4}} style={{backgroundImage:'url("https://lh6.googleusercontent.com/le05fcL0tRojIjBFV9Lpxj1BPPvfz6U5z4XXnxaMQpZJ-4vPiI0LPIqSNBGZBBrHq_-2Dg=w90")'}} className='center-cropped'></div>
		           <div key={'c'} _grid={{x: 6, y: 2, w: 2, h: 2}} style={{backgroundImage:'url("https://lh6.googleusercontent.com/le05fcL0tRojIjBFV9Lpxj1BPPvfz6U5z4XXnxaMQpZJ-4vPiI0LPIqSNBGZBBrHq_-2Dg=w90")'}} className='center-cropped'></div>
		           <div key={'e'} _grid={{x: 0, y: 4, w: 2, h: 2}} style={{backgroundImage:'url("https://lh6.googleusercontent.com/le05fcL0tRojIjBFV9Lpxj1BPPvfz6U5z4XXnxaMQpZJ-4vPiI0LPIqSNBGZBBrHq_-2Dg=w90")'}} className='center-cropped'></div>
		           <div key={'f'} _grid={{x: 2, y: 4, w: 2, h: 2}} style={{backgroundImage:'url("https://lh6.googleusercontent.com/le05fcL0tRojIjBFV9Lpxj1BPPvfz6U5z4XXnxaMQpZJ-4vPiI0LPIqSNBGZBBrHq_-2Dg=w90")'}} className='center-cropped'></div>

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
