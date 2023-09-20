// import React from 'react';
// import style from './index.module.css';

// const MusicItem = (props) => {
//   return (
//     <div className={style['music-item-wrap']}>
//       <div>{props.info?.name}</div>
//       <div className={style['tags']}>
//         {props.info?.tags.map((tag, index) => (
//           <div className={style['tag']} key={index}>
//             {tag}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MusicItem;



import React from 'react';
import style from './index.module.css';

const MusicItem = (props) => {
  return (
    <div className={style['music-item-wrap']}>
      <div className={style['music-info']}>
        <div className={style['music-name']}>{props.info?.name}</div>
        <div className={style['tags']}>
          {props.info?.tags.map((tag, index) => (
            <div className={style['tag']} key={index}>
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicItem;
