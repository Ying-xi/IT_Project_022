import React from 'react';
import styles from './admin.module.css';

function Admin() {
  return (
    <div className={styles.admin}>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <p>This is the left column content.</p>
        </div>
        {/* rightColumn */}
        <div className={styles.rightColumn}>
          <div className={styles.rightContentContainer}>
            <div className={styles.topContent}>
              <div className={styles.topContentInner}>
                {/* 3:2 拆分 */}
                <div className={styles.topContentTop}>
                  {/* 上半空白空间 */}
                </div>
                <div className={styles.topContentBottom}>
                  <h1
                    style={{
                    marginLeft: '4vh',
                    color: 'gray'
                  }}>Music Information</h1>
                </div>
              </div>
            </div>
            <div className={styles.mainContent}>
              <div className={styles.mainContentInner}>
                {/* 3:1:1 拆分 */}
                <div className={styles.mainContentTop}>
                  {/* 上部分，占据3 */}
                  <div className={styles.mainContentTopInner}>
                    <div className={styles.mainContentTopPic}>
                      {/* <img src="/musicFace/CanonInD.jpg" alt="#"/> */}
                    </div>

                    <div className={styles.mainContentTopRight}>
                      {/* 歌曲主要信息 */}
                      <div className={styles.mainContentTopRightInner}>
                        <div className={styles.mainContentTopRightAdd}>
                          {/* Add Button */}
                        </div>
                        <div className={styles.mainContentTopRightName}>
                          {/* Music Name */}
                        </div>
                        <div className={styles.mainContentTopRightType}>
                          <div className={styles.mainContentTopRightTypeInner}>
                            <div className={styles.mainContentTopRightTypeHeader}>
                              <p>Type:</p>
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                              <span
                                style={{
                                marginLeft: '3vh',
                                marginRight: '2vh',
                                color: 'yellow'
                              }}>Type1</span>
                              <span
                                style={{
                                marginLeft: '3vh',
                                marginRight: '2vh',
                                color: 'yellow'
                              }}>Type2</span>
                              <span
                                style={{
                                marginLeft: '3vh',
                                marginRight: '2vh',
                                color: 'yellow'
                              }}>Type3</span>
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                              <span
                                style={{
                                marginLeft: '3vh',
                                marginRight: '2vh',
                                color: 'yellow'
                              }}>Type4</span>
                              <span
                                style={{
                                marginLeft: '3vh',
                                marginRight: '2vh',
                                color: 'yellow'
                              }}>Type5</span>
                              <span
                                style={{
                                marginLeft: '3vh',
                                marginRight: '2vh',
                                color: 'yellow'
                              }}>Type6</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.mainContentMiddle}>
                  {/* 中间部分，占据1 */}
                  <h1 style={{
                    textAlign: 'center'
                  }}>Upload music</h1>
                </div>
                <div className={styles.mainContentBottom}>
                  {/* 下部分，占据1 */}
                  <h1 style={{
                    textAlign: 'center'
                  }}>Playlist</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
