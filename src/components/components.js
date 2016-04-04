import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import doSomething from '../actions/actions';
import TextField from 'material-ui/lib/text-field';










const MessageText = (props) => {

	return (
		<div>
			<span> yolo {props.text} </span>
			<div>
				<MyInputField />
			</div>
		</div>
	)
}



const Message = ({memory , clickHandler}) => (
	<div>
	<p style={{color : 'red'}} onClick={() => clickHandler(memory)}>  {memory.title}  </p>
	<MessageText text={memory.title}>
	</MessageText>

	</div>
)

const MyInputField = () => {
	return (

		<TextField hintText="Hint Text"/>
	)
}


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
