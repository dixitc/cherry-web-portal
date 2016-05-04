import React, { Component } from 'react';
import SmartMessage from './components/components';
import { Link } from 'react-router';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MyRawTheme from './Themes/cherryTheme';
import Snackbar from 'material-ui/lib/snackbar';
import Footer from './components/Footer';
import backGroundImg from './images/geometry2.png';
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
		<div style={{height:'100%',width:'100%'}}>


			{this.props.children}
<Footer />

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
