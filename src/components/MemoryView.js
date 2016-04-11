import React,{Component} from 'react';
import {connect} from 'react-redux';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import StarBorder from 'material-ui/lib/svg-icons/toggle/star-border';
import IconButton from 'material-ui/lib/icon-button';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 400,
    overflowY: 'auto',
    marginBottom: 24,
  },
};

class MemoryView extends Component {
	constructor(props) {
		super(props);

	}
	componentDidMount(){

	}
	render() {
		return (
			<div style={styles.root}>
				
				<GridList
				cellHeight={200}
				style={styles.gridList}
				>
					{this.props.memories.map(function(memory) {
						return <GridTile
							key={memory.title}
							title={memory.title}
							>
							<img src={memory.coverUrl} />
							{memory.title}
						</GridTile>
					})}
				</GridList>

			</div>
		)

	}
}


MemoryView.propTypes = {
	memories : React.PropTypes.array.isRequired

}



export default MemoryView;
