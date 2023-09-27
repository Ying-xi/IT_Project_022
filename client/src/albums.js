import React, { Component } from 'react';
import './albums.css';

class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: 0,
            backgroundImage: '',
            musicList: [], // 新增音乐列表
            currentTrackIndex: -1, // 当前播放的音乐索引
        };
    }


    // when the user scolling on the screen:
    componentDidMount() {
        this.handleScroll();
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = () => {
        // Get the total number of timeline items
        const itemElements = document.querySelectorAll('.item');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        itemElements.forEach((item, index) => {
            const rect = item.getBoundingClientRect();

            const itemTop = rect.top;


            // when the top of the item goes in to this range of of the viewport:
            if (itemTop > windowHeight * 0.2 && itemTop < windowHeight * 0.4) {
                this.setState({ activeItemIndex: index });

                // set the image of the item now to be the background
                const imgElement = item.querySelector('.img');
                if (imgElement) {
                    const imageUrl = imgElement.getAttribute('src');
                    this.setState({ backgroundImage: `url(${imageUrl})` });
                }
            }

            // check if we are near the bottom of the page
            const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.985;
            // if near the bottom, activate the last item
            if (isNearBottom) {
                const lastIndex = itemElements.length - 1;
                this.setState({ activeItemIndex: lastIndex });

                // set the background image of the last item
                const lastImgElement = itemElements[lastIndex].querySelector('.img');
                if (lastImgElement) {
                    const lastImageUrl = lastImgElement.getAttribute('src');
                    this.setState({ backgroundImage: `url(${lastImageUrl})` });
                }
            }
        });
    };
    handleMusicClick = (index) => {
        // 设置当前播放的音乐索引
        this.setState({ currentTrackIndex: index });
    };
    // the list items on the page:
    // move to backend later:
    render() {
        const musicItems = [
            {
                type: 'Realxing Music',
                title: 'Name',
                imageUrl: '/albums/album1.jpg',
                lists: [
                    {
                        musicName: 'Song 1',
                        musicUrl: 'https://example.com/song1.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    }
                ],
            },
            {
                type: 'White noise',
                title: 'Name',
                imageUrl: '/albums/album2.jpg',
                lists: [
                    {
                        musicName: 'Song 1',
                        musicUrl: 'https://example.com/song1.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    }
                ],
            },
            {
                type: 'Jazz Music',
                title: 'Name',
                imageUrl: '/albums/album3.jpg',
                lists: [
                    {
                        musicName: 'Song 1',
                        musicUrl: 'https://example.com/song1.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    }
                ]
            },
            {
                type: 'Classic Music',
                title: 'Name',
                imageUrl: '/albums/album4.jpg',
                lists: [
                    {
                        musicName: 'Song 1',
                        musicUrl: 'https://example.com/song1.mp3'
                    },
                    {
                        musicName: 'Song 2',
                        musicUrl: 'https://example.com/song2.mp3'
                    }
                ]
            },
        ];

        // print them on the page:
        return (
            <div className="shell" id="shell" style={{ backgroundImage: this.state.backgroundImage }}>
                <div className="header">
                    <h2 className="title">Playlist</h2>
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
                                <img className="img" src={item.imageUrl} alt={item.type} />
                                <h2 className="content-title">{item.title}</h2>
                                <p className="content-desc">
                                    {item.lists.map((song, songIndex) => (
                                        <span key={songIndex}>
                                            <a href={song.musicUrl} target="_blank" rel="noopener noreferrer">
                                                {song.musicName}
                                            </a>
                                            <br /> {/* 这里插入一个 <br /> 元素 */}
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Albums;
