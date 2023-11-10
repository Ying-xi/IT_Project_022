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
        axios.get(`https://skoog-music.onrender.com/albumPlayer/${musicIndex}`)
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

    const [userComment, setUserComment] = useState('');

    const sendCommentToServer = () => {
        if (userComment.length <= maxCharacters) {
            const token = localStorage.getItem('token');
            let headers = {};
            if (token) {
                headers = {
                    Authorization: `Bearer ${token}`,
                };
            }
            // console.log('musicIndex:', musicIndex);
            // console.log('userComment:', userComment);
            axios.post(
                `https://skoog-music.onrender.com/albumPlayer/${musicIndex}`,
                { comment: userComment },
                { headers: headers }
            )
            .then((response) => {
                alert('Comment sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending comment:', error);
            });
            setUserComment('');
        }
    };

    const handleSendComment = () => {
        sendCommentToServer();
        handleSendClick();
    };

    return (
        <div
            className="comments-page"
            style={{
                backgroundImage: `url(https://skoog-music.onrender.com/album/${musicAlbum && musicAlbum.imageName}.jpg)`,
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
                    value={userComment}
                    onChange={(e) => {
                        handleCommentChange(e);
                        setUserComment(e.target.value);
                    }}
                />
                <div className={`comment-counter ${comment.length > maxCharacters ? 'max-exceeded' : ''}`}>
                {comment.length}/{maxCharacters}
                </div>
                <button className="comments-button" onClick={handleSendComment} disabled={comment.length > maxCharacters}>
                    Send
                </button>

                </div>
                <div className="crop">


                    <ul id="card-list" style={{ '--count': 6 }}>

                        {musicAlbum && musicAlbum.comments && musicAlbum.comments.map((comment, index) => (
                            <li key={index}>
                                <div className="comments-cards">
                                        <a href="">
                                            <span className="comments-username">{comment.username}</span>
                                            <span>{comment.content}</span>
                                        </a>
                                </div>
                            </li>
                        ))}

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
