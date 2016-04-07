import React, { Component } from 'react';
import SmartMessage from './components/components';
import AppBar from 'material-ui/lib/app-bar';
import { Link } from 'react-router';

import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';
import MyRawTheme from './Themes/cherryTheme';




export default class App extends Component {
	getChildContext () {
  return { muiTheme:  getMuiTheme(MyRawTheme),};
}
  render() {
	console.log(this.props);
    return (
		<div>
			{/*<AppBar
				title="Cherry react"
				iconClassNameRight="muidocs-icon-navigation-expand-more"
			/>*/}

			<Link to="/">home</Link>
			<br/>
			<Link to="/login">login</Link>
			<br/>
			<Link to="/authenticated">authenticated</Link>
			<br/>
			{this.props.children}
	  </div>
    );
  }
  componentDidMount() {
 console.log("App initialized. (App component mounted , do some fetching data)");
}
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object
};
