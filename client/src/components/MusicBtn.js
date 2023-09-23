import React, { useRef, useState } from 'react';
import './musicBtn.css';

const MusicBtn = (props) => {
  const face = process.env.PUBLIC_URL + props.face;

  return (
    /* add color frames for the music buttons */
    <div className={`button music-btn-wrap ${props.color}`} onClick={props.onClick}>
      <img src={face} alt="music button" className={`img-face`} />
      <p className="music-item-text">{props.name}</p>
    </div>
  );
};

export default MusicBtn;
