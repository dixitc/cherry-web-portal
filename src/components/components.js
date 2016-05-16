	import React , {PropTypes} from 'react';
	import { connect } from 'react-redux';
	import doSomething from '../actions/actions';
	import TextField from 'material-ui/TextField';


	const Message = ({memory , clickHandler}) => (
		<div>
		<p style={{color : 'blue'}} onClick={() => clickHandler(memory)}>default home screen </p>


		</div>
	)






	Message.propTypes = {
		memory :  PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired
		}).isRequired,
		clickHandler : PropTypes.func.isRequired
	}

	//export default Message;



	const mapStateToProps = (state) => {

		return {
			memory: state.memory
		}
	}

	const mapDispatchToProps = (dispatch) => {
		return {
			clickHandler: (memory) => {
				dispatch(doSomething(memory));
			}
		}
	}

	const SmartMessage = connect(
		mapStateToProps,
		mapDispatchToProps
	)(Message) ;

	export default SmartMessage;
