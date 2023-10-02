// comments.js
import React from 'react';
import styles from './comments.module.css'; 
import { useParams } from 'react-router-dom';


function Comments() {

    const { musicIndex } = useParams();

    let backgroundImage;

    switch (musicIndex) {
        case '0':
            backgroundImage = '/albums/album1.jpg'; 
            break;
        case '1':
            backgroundImage = '/albums/album2.jpg'; 
            break;
        case '2':
            backgroundImage = '/albums/album3.jpg'; 
            break;
        default:
            backgroundImage = '/albums/album4.jpg'; 
            break;
    }

    return (
        //background:
        <div
            className={`comments-void ${styles.void}`}
            id="void"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '100% 100%', 
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center'
            }}
        >

            <div className={styles.crop}>
                <ul id="card-list" style={{ '--count': 6 }}>
                    <li className={`comments-li ${styles.li}`}>
                        <div className={`comments-card ${styles.card}`}>
                            <a href="" className={`comments-link ${styles.link}`}>
                                <span className={`comments-model-name ${styles['model-name']}`}>2014-2017</span>
                                <span>A vibrant tapestry of youth, accompanied by friendship and personal growth.</span>
                            </a>
                        </div>
                    </li>
                    <li className={`comments-li ${styles.li}`}>
                        <div className={`comments-card ${styles.card}`}>
                            <a href="" className={`comments-link ${styles.link}`}>
                                <img src="/comments/03.gif" alt="" />
                            </a>
                        </div>
                    </li>
                    <li className={`comments-li ${styles.li}`}>
                        <div className={`comments-card ${styles.card}`}>
                            <a href="" className={`comments-link ${styles.link}`}>
                                <span className={`comments-model-name ${styles['model-name']}`}>2017-2020</span>
                                <span>
                                    Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.
                                </span>
                            </a>
                        </div>
                    </li>
                    <li className={`comments-li ${styles.li}`}>
                        <div className={`comments-card ${styles.card}`}>
                            <a href="" className={`comments-link ${styles.link}`}>
                                <img src="/comments/03.gif" alt="" />
                            </a>
                        </div>
                    </li>
                    <li className={`comments-li ${styles.li}`}>
                        <div className={`comments-card ${styles.card}`}>
                            <a href="" className={`comments-link ${styles.link}`}>
                                <span className={`comments-model-name ${styles['model-name']}`}>2020-2024</span>
                                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
                            </a>
                        </div>
                    </li>
                    <li className={`comments-li ${styles.li}`}>
                        <div className={`comments-card ${styles.card}`}>
                            <a href="" className={`comments-link ${styles.link}`}>
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
