// comments.js
import React, { useState, useEffect } from 'react';
import './comments.css';
import { useParams } from 'react-router-dom';
function Comments() {

    const { musicIndex } = useParams();

    let backgroundImage;


    //when jump to this page, start from the top of page:
    useEffect(() => {
        // 在页面加载后滚动到页面顶部
        window.scrollTo(0, 0);
      }, []);

    //change the background as the index:
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

    //send comments:


    const [comment, setComment] = useState(''); // 用于存储用户输入的评论

    // 处理用户输入的评论
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    // 处理发送按钮点击事件
    const handleSendClick = () => {
        // 在这里可以执行发送评论的操作，可以将评论发送到后端或执行其他逻辑
        alert(`发送评论: ${comment}`);
        setComment(''); // 清空输入框内容
    };

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
                <div className='comments-window'>

                    <h2>
                        Comments
                    </h2>

                    <textarea
                        className="comments-input"
<<<<<<< HEAD
                        placeholder=" input your comments here: "
=======
                        placeholder="Enter your comments..."
>>>>>>> ae27999fe3e3c7b60857b7df847ecc012fdf83c1
                        value={comment}
                        onChange={handleCommentChange}
                        
                    />
                    <button className="comments-button" onClick={handleSendClick}>
                        Send
                    </button>
                    
                </div>
                <div className="crop">


                    <ul id="card-list" style={{ '--count': 6 }}>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">Username1</span>
                                    <span>A vibrant tapestry of youth, accompanied by friendship and personal growth.</span>
                                </ac>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">Username2</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprinaaaaaaaaaaa aaaaaaaaaaa aaaaaaaat.</span>
                                </ac>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">Username3</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </ac>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.Freedom and responsibility intertwine, painting a magnificent </span>
                                </ac>
                            </div>
                        </li>

                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">Username4</span>
                                    <span>Model for generating Freedom and responsibility intertwine, painting a magnificent canvas to shape life's blueprint.</span>
                                </ac>
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
