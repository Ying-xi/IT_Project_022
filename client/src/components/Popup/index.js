import React from 'react';
import style from './index.module.css';

export default (props) => {
  return (
    <div className={`${style['popup-wrap']} ${props.show ? style['show'] : style['hide']}`}>
      <div onClick={() => props.onHide()} className={style['mask']}></div>

      <div className={style['popup-content']}>{props.children}</div>
    </div>
  );
};
