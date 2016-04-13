import React, { Component } from 'react';
import SmartMessage from './components/components';
import { Link } from 'react-router';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MyRawTheme from './Themes/cherryTheme';
import Snackbar from 'material-ui/lib/snackbar';


/*
NOTES :
	-can enable app wide theme here
*/


export default class App extends Component {
getChildContext () {
  return { muiTheme:  getMuiTheme(MyRawTheme),};
}
  render() {
	console.log(this.props);
    return (
		<div>


			{this.props.children}
			<Snackbar
   open={false}
   message='your message'
   action='undo'
   autoHideDuration={2000}
 />
	  </div>
    );
  }
  componentDidMount() {
 console.log('App initialized. (App component mounted , do some fetching data)');
}
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
