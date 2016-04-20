import React from 'react';
import ListItem from 'material-ui/lib/lists/list-item';

const Footer = () => {
	return (
		<footer>
			<ListItem
				innerDivStyle={{height:'20px',lineHeight:'20px',paddingTop:'10px',paddingBottom:'10px'}}
        primaryText={<span style={{fontSize:'12px'}}>a <b>Tricon Infotech</b> product</span>}
	rightIcon={<span style={{width:'100px',fontSize:'12px'}}></span>}/>
 </footer>
	)
}

export default Footer;
