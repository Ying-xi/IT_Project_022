import React, { useEffect, useState } from 'react';
import './albums.css';
//strange bug:
function Albums() {
    const [activeItem, setActiveItem] = useState(0);

    useEffect(() => {

    }, []);

    return (
        <div className="shell" id="shell">
            <div className="header">
                <h2 className="title">Albums</h2>
                <h3 className="subtitle">
                    <h3 className="subtitle">click album cover <br /> to continue</h3>
                </h3>
            </div>
            <div className="timeline">
                <div className="item" data-text="Relaxing Music">
                    <div className="content">
                        <a href="https://example.com">
                            <img className="img" src="./album1.jpg" alt="Album 1" />
                        </a>
                        <h2 className="content-title">Name</h2>
                        <p className="content-desc">
                            "Relaxing music often incorporates natural sounds like flowing water, birdsong, or ocean waves,
                            enhancing the overall calming effect."
                        </p>
                    </div>
                </div>
                <div className="item" data-text="White noise">
                    <div className="content">
                        <a href="https://example.com">
                            <img className="img" src="./album2.jpg" alt="Album 2" />
                        </a>
                        <h2 className="content-title">Name</h2>
                        <p className="content-desc">
                            "White noise is often used for its ability to mask other sounds, aiding in concentration,
                            relaxation, or sleep by creating a consistent background noise."
                        </p>
                    </div>
                </div>
                <div className="item" data-text="Jazz Music">
                    <div className="content">
                        <a href="https://example.com">
                            <img className="img" src="./album3.jpg" alt="Album 3" />
                        </a>
                        <h2 className="content-title">Name</h2>
                        <p className="content-desc">
                            "Jazz music's ability to blend diverse influences from different cultures and styles creates a
                            rich tapestry of sound."
                        </p>
                    </div>
                </div>
                <div className="item" data-text="Classical Music">
                    <div className="content">
                        <a href="https://example.com">
                            <img className="img" src="./album4.jpg" alt="Album 4" />
                        </a>
                        <h2 className="content-title">Name</h2>
                        <p className="content-desc">
                            "Classical music is a timeless genre known for its complexity, emotional depth, and intricate
                            compositions, often performed by orchestras and chamber ensembles."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Albums;
