// comments.js
import React, { useState, useEffect } from 'react';
import './comments.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Comments() {
    const { musicIndex } = useParams();
    const [musicAlbum, setMusicAlbum] = useState(null);
    console.log('musicIndex:', musicIndex);
    useEffect(() => {
        axios.get(`http://localhost:3300/albumPlayer/${musicIndex}`)
            .then((response) => {
                console.log('Data from the backend:', response.data);
                setMusicAlbum(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching music album data:', error);
            });
    }, [musicIndex]);

    // Delete after testing
    console.log('musicAlbum:', musicAlbum);
    
    let backgroundImage;


    //when jump to this page, start from the top of page:
    useEffect(() => {

        window.scrollTo(0, 0);
    }, []);

    //change the background as the index:
    // switch (musicIndex) {
    //     case '0':
    //         backgroundImage = '/albums/album1.jpg';
    //         break;
    //     case '1':
    //         backgroundImage = '/albums/album2.jpg';
    //         break;
    //     case '2':
    //         backgroundImage = '/albums/album3.jpg';
    //         break;
    //     default:
    //         backgroundImage = '/albums/album4.jpg';
    //         break;
    // }

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
                                    <span className="comments-username">PixelWarrior87</span>
                                    <span>Astonishing guitar work and heartfelt lyrics make this song an instant classic. It's a rollercoaster of emotions that keeps you coming back for more.</span>
                                </ac>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">StarGazerKitty</span>
                                    <span>This track is a perfect fusion of indie and electronic vibes. The catchy melody and smooth vocals make it an instant favorite.</span>
                                </ac>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">ByteBard</span>
                                    <span>A beautiful blend of soulful vocals and intricate instrumentals. This song takes you on a journey of passion and love.</span>
                                </ac>
                            </div>
                        </li>


                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">QuantumJester</span>
                                    <span>A true banger! The beat is infectious, and the lyrics are empowering. It's impossible not to dance to this.</span>
                                </ac>
                            </div>
                        </li>

                        <li>
                            <div className="comments-cards ">
                                <ac href="">
                                    <span className="comments-username">LunarScribe</span>
                                    <span>The hauntingly beautiful voice of the singer combined with the haunting melody creates an ethereal atmosphere that's both captivating and haunting.</span>
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
