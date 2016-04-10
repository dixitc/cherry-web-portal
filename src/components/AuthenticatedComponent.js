import React , {PropTypes} from 'react';
import { connect } from 'react-redux';
import { SpringGrid } from 'react-stonecutter';
import { CSSGrid, layout } from 'react-stonecutter';
    import style from '../styles/Login';




const Message = () => (
    <CSSGrid
      component="ul"
      columns={4}
      columnWidth={150}
      gutterWidth={20}
      gutterHeight={5}
      layout={layout.pinterest}
      duration={800}
      easing="ease-out"
    >
      <li key="A" itemHeight={150}><img style={style.image} src={'http://www.mapsofindia.com/wallpapers/republic-day/republic-day-photos.jpg'} /></li>
      <li key="B" itemHeight={120}><img style={style.image} src={'http://www.mapsofindia.com/wallpapers/republic-day/republic-day-photos.jpg'} /></li>
      <li key="C" itemHeight={170}><img style={style.image} src={'http://www.mapsofindia.com/wallpapers/republic-day/republic-day-photos.jpg'} /></li>
    </CSSGrid>
)

export default Message;
