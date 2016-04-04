import React, { Component } from 'react';
import SmartMessage from './components/components';
import AppBar from 'material-ui/lib/app-bar';
import RefreshIndicator from 'material-ui/lib/refresh-indicator';
import { Link } from 'react-router';

const style = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'block',
    position: 'relative',
  },
};

export default class App extends Component {
  render() {
console.log(this.props);
    return (
		<div>
		<AppBar
  title="Cherry react"
  iconClassNameRight="muidocs-icon-navigation-expand-more"
/>
<RefreshIndicator
	 size={50}
	 left={70}
	 top={0}
	 loadingColor={"#FF9800"}
	 status={this.props.isFetching ?'loading' : 'hide'}
	 style={style.refresh}
   />
<Link to="/">home</Link>
<br/>
<Link to="/foo">foo</Link>
<br/>
<Link to="/bar">bar</Link>
<br/>
      <h1 style={{color:'blue'}} >Cherry react</h1>
	  {this.props.children}
	  </div>
    );
  }
}
