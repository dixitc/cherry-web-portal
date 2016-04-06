import React, { Component } from 'react';
import SmartMessage from './components/components';
import AppBar from 'material-ui/lib/app-bar';
import { Link } from 'react-router';



export default class App extends Component {
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
