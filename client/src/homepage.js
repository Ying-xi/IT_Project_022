import React from "react";
import { Link } from 'react-router-dom';
import "./homepage.css";



function Homepage() {
    return (
        <div className="homepage">
            <Link to="/music" className="window c1">
                <img src={'../public/musicPlayer/rain.jpg'} alt="Rain" />
                <div>Music</div>
            </Link>
            <Link to="/page2" className="window c2">
                <img src={'/rain.jpg'} alt="Rain" />
                <div>Page 2</div>
            </Link>
            <Link to="/page3" className="window c3">
                <img src={'/rain.jpg'} alt="Rain" />
                <div>Page 3</div>
            </Link>
        </div>
    );
}

export default Homepage;
