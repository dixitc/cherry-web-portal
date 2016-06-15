import React from 'react';
import {ListItem} from 'material-ui/List';

/*Need to update footer with links*/

const Footer = () => {
	return (
		<footer className={'foot'} style={(window.innerWidth < 400) ? {display:'none'} : {opacity:'1'}} >
			<ListItem
				innerDivStyle={{height:'20px',lineHeight:'20px',paddingTop:'10px',paddingBottom:'10px'}}
        primaryText={<span style={{fontSize:'12px'}}>a <b>Tricon Infotech</b> product</span>}
	rightIcon={<span style={{width:'100px',fontSize:'12px'}}></span>}/>
 </footer>
	)
}

export default Footer;
