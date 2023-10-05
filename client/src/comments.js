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
            className="comments-page"
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
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username1</span>
                                    <span>A vibrant tapestry of youth, accompanied by friendship and personal growth.</span>
                                </a>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username2</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprinaaaaaaaaaaa aaaaaaaaaaa aaaaaaaat.</span>
                                </a>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username3</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>

                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>
                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </a>
                            </div>
                        </li>                        <li>
                            <div className="comments-cards ">
                                <a href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
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
