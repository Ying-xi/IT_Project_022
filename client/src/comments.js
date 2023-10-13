// comments.js
import React, { useState, useEffect } from 'react';
import './comments.css';
import { useParams } from 'react-router-dom';
function Comments() {

    const { musicIndex } = useParams();

    let backgroundImage;


    //when jump to this page, start from the top of page:
    useEffect(() => {

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
    //the comments by user:
    const [comment, setComment] = useState('');
    const maxCharacters = 200;

    //to deal the comments from users


    const handleCommentChange = (e) => {
        const text = e.target.value;

        setComment(text);

    };

    const handleSendClick = () => {
        if (comment.length <= maxCharacters) {

            alert(`Comments Sent: ${comment}`);
            // Clear the input box content:
            setComment('');
        } 
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
                overflow: 'hidden'
            }}
        >


            <div className="comments-void" id="comments-void">
                <div className='comments-window'>

                    <h2>
                        Comments
                    </h2>

                    <textarea
                        className="comments-input"
                        placeholder=" Enter your comments here: "


                        value={comment}
                        onChange={handleCommentChange}

                    />
                    <div className={`comment-counter ${comment.length > maxCharacters ? 'max-exceeded' : ''}`}>

                        {comment.length}/{maxCharacters}
                    </div>
                    <button className="comments-button" onClick={handleSendClick} disabled={comment.length > maxCharacters}>
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
        </div >
    );
}

export default Comments;
