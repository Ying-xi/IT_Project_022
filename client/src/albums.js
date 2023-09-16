import React, { Component } from 'react';
import './albums.css';

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: 0,
            backgroundImage: '',
        };
    }

    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        const itemElements = document.querySelectorAll('.item');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        itemElements.forEach((item, index) => {
            const rect = item.getBoundingClientRect();

            const itemCenter = rect.top + (rect.height * 0.5);

            if (itemCenter > windowHeight * 0.4 && itemCenter < windowHeight * 0.5) {
                this.setState({ activeItemIndex: index });

                // set the image of the item now to be the background
                const imgElement = item.querySelector('.img');
                if (imgElement) {
                    const imageUrl = imgElement.getAttribute('src');
                    this.setState({ backgroundImage: `url(${imageUrl})` });
                }
            }
        });
    };

    render() {
        const musicItems = [
            {
                type: 'Realxing Music',
                title: 'Name',
                imageUrl: '/albums/album1.jpg',
                description:
                    'Relaxing music often incorporates natural sounds like flowing water, birdsong, or ocean waves, enhancing the overall calming effect.',
            },
            {
                type: 'White noise',
                title: 'Name',
                imageUrl: '/albums/album2.jpg',
                description:
                    'White noise is often used for its ability to mask other sounds, aiding in concentration, relaxation, or sleep by creating a consistent background noise.',
            },
            {
                type: 'Jazz Music',
                title: 'Name',
                imageUrl: '/albums/album3.jpg',
                description:
                    "Jazz music's ability to blend diverse influences from different cultures and styles creates a rich tapestry of sound.",
            },
            {
                type: 'Classic Music',
                title: 'Name',
                imageUrl: '/albums/album4.jpg',
                description:
                    'Classical music is a timeless genre known for its complexity, emotional depth, and intricate compositions, often performed by orchestras and chamber ensembles.',
            },
        ];

        return (
            <div className="shell" id="shell" style={{ backgroundImage: this.state.backgroundImage }}>
                <div className="header">
                    <h2 className="title">Albums</h2>
                    <h3 className="subtitle">click album cover <br /> to continue</h3>
                </div>
                <div className="musiclist">
                    {musicItems.map((item, index) => (
                        <div
                            key={index}
                            className={`item ${this.state.activeItemIndex === index ? 'item--active' : ''
                                }`}
                            data-text={item.type}
                        >
                            <div className="content">
                                <a href="https://example.com">
                                    <img className="img" src={item.imageUrl} alt={item.type} />
                                </a>
                                <h2 className="content-title">{item.title}</h2>
                                <p className="content-desc">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Albums;
