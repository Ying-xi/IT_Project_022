import React from "react";
import "./homepage.css";

function Homepage() {
    return (
        <div className="homepage">
            <a href="test.html">
                <div className="window c1">
                    <img src="listen_music.jpeg" alt="Image 1" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            </a>
            <a href="page2.html">
                <div className="window c2">
                    <img src="play_music.jpg" alt="Image 2" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            </a>

            <a href="page3.html">
                <div className="window c3">
                    <img src="admin.jpg" alt="Image 3" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
            </a>
        </div>
    );
}

export default Homepage;
