import React, { Component } from 'react';
import SmartMessage from './components/components';
import { Link } from 'react-router';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MyRawTheme from './Themes/cherryTheme';
import Snackbar from 'material-ui/Snackbar';
import Footer from './components/Footer';
import backGroundImg from './images/geometry2.png';
import LinearProgress from 'material-ui/LinearProgress';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

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
            <Paper style={{position:'fixed',top:'60px',width:'95%',left:'2.5%',zIndex:'3',background:'white'}}>
                <ListItem style={{height:'50px'}} innerDivStyle={{paddingTop:'22px'}}>
            <LinearProgress  mode="determinate" value={6} style={{width:'95%',margin:'auto'}}/>
            </ListItem>
            </Paper>
<Footer >
</Footer>

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
