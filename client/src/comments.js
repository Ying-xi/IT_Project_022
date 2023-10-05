// comments.js
import React from 'react';
import './comments.css';
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
            className="app-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '100% 100%',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
                overflow: 'hidden' // 添加 overflow 属性
            }}
        >

      <div className="comments-void" id="comments-void">
            <div className="crop">
                <ul id="card-list" style={{ '--count': 6 }}>
                    <li>
                        <div className="card">
                            <a href="">
                                <span className="model-name">2014-2017</span>
                                <span>A vibrant tapestry of youth, accompanied by friendship and personal growth.</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <a href="">
                                <img src="./03.gif" alt="" />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <a href="">
                                <span className="model-name">2017-2020</span>
                                <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <a href="">
                                <img src="./03.gif" alt="" />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <a href="">
                                <span className="model-name">2020-2024</span>
                                <span>Model for generating highly dimensional, mostly numeric, tabular data</span>
                            </a>
                        </div>
                    </li>
                    <li>
                        <div className="card">
                            <a href="">
                                <img src="./03.gif" alt="" />
                            </a>
                        </div>
                    </li>
                </ul>
                <div className="last-circle"></div>
                <div className="second-circle"></div>
            </div>
            <div className="mask"></div>
            <div className="center-circle"></div>
            </div>
    </div>
    );
}

export default Comments;
