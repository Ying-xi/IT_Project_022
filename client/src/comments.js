import React from 'react';
import styles from './comments.module.css'; // 导入 CSS 模块文件

function Comments() {
  return (
    <div className={styles.void} id="void">
      <div className={styles.crop}>
        <ul id="card-list" style={{ '--count': 6 }}>
          <li>
            <div className={styles.card}>
              <a href="">
                <span className={styles['model-name']}>2014-2017</span>
                <span>A vibrant tapestry of youth, accompanied by friendship and personal growth.</span>
              </a>
            </div>
          </li>
          <li>
            <div className={styles.card}>
              <a href="">
                <img src="/comments/03.gif" alt="" />
              </a>
            </div>
          </li>
          <li>
            <div className={styles.card}>
              <a href="">
                <span className={styles['model-name']}>2017-2020</span>
                <span>
                  Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.
                </span>
              </a>
            </div>
          </li>
          <li>
            <div className={styles.card}>
              <a href="">
                <img src="/comments/03.gif" alt="" />
              </a>
            </div>
          </li>
          <li>
            <div className={styles.card}>
              <a href="">
                <span className={styles['model-name']}>2020-2024</span>
                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
              </a>
            </div>
          </li>
          <li>
            <div className={styles.card}>
              <a href="">
                <img src="/comments/03.gif" alt="" />
              </a>
            </div>
          </li>
        </ul>
        <div className={styles['last-circle']}></div>
        <div className={styles['second-circle']}></div>
      </div>
      <div className={styles.mask}></div>
      <div className={styles['center-circle']}></div>
    </div>
  );
}

export default Comments;
