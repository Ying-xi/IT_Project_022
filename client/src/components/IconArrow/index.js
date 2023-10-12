import React from 'react';
import style from './index.module.css';

export default (props) => {
  return (
    <svg
      t="1696757631947"
      className={`${style['up-arrow']} ${props.down && style['up-arrow-down']}`}
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="3993"
      width="200"
      height="200"
      onClick={() => props.onClick()}
    >
      <path
        d="M573.056 272l308.8 404.608A76.8 76.8 0 0 1 820.736 800H203.232a76.8 76.8 0 0 1-61.056-123.392L450.976 272a76.8 76.8 0 0 1 122.08 0z"
        fill={props.color || '#000'}
        p-id="3994"
      ></path>
    </svg>
  );
};
