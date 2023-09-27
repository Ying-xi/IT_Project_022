import React, { Component } from 'react';
import './albums.css';
class Albums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItemIndex: 0,
            backgroundImage: '',
            currentMusicIndex: null,
            musicItems: [
                {
                    type: 'Realxing Music',
                    title: 'Name',
                    imageUrl: '/albums/album1.jpg',
                    lists: [
                        {
                            musicName: 'Song 1',
                            musicUrl: '/songs/AuldLangSyne.mp3'
                        },
                        {
                            musicName: 'Song 2',
                            musicUrl: '/songs/Bleu.mp3'
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
                            musicUrl: '/songs/AuldLangSyne.mp3'
                        },
                        {
                            musicName: 'Song 2',
                            musicUrl: '/songs/Bleu.mp3'
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
                            musicUrl: '/songs/AuldLangSyne.mp3'
                        },
                        {
                            musicName: 'Song 2',
                            musicUrl: '/songs/Bleu.mp3'
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
                            musicUrl: '/songs/AuldLangSyne.mp3'
                        },
                        {
                            musicName: 'Song 2',
                            musicUrl: '/songs/Bleu.mp3'
                        }
                    ]
                },
            ],
        };

    }

    //music play
    //music play
    playMusic = (musicIndex, songIndex) => {
        const { musicItems } = this.state;
        const updatedMusicItems = [...musicItems]; // 创建音乐项的副本

        if (this.state.currentMusicIndex === musicIndex) {
            const audio = this.audioRef;
            if (audio.paused) {
                audio.play();
                updatedMusicItems[musicIndex].lists[songIndex].isPlaying = true; // 更新歌曲的播放状态
            } else {
                audio.pause();
                updatedMusicItems[musicIndex].lists[songIndex].isPlaying = false; // 更新歌曲的播放状态
            }
        } else {
            if (this.audioRef) {
                this.audioRef.pause();
            }

            const audio = new Audio(musicItems[musicIndex].lists[songIndex].musicUrl);
            audio.play();

            audio.addEventListener('ended', () => {
                this.setState({ currentMusicIndex: null });
                updatedMusicItems[musicIndex].lists[songIndex].isPlaying = false; // 更新歌曲的播放状态
            });

            this.setState({ currentMusicIndex: musicIndex });
            updatedMusicItems[musicIndex].lists[songIndex].isPlaying = true; // 更新歌曲的播放状态
            this.audioRef = audio;
        }

        // 更新状态中的音乐项列表
        this.setState({ musicItems: updatedMusicItems });
    };

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

    // the list items on the page:
    // move to backend later:

    // print them on the page:
    render() {
        const { musicItems } = this.state;

        return (
            <div className="shell" id="shell" style={{ backgroundImage: this.state.backgroundImage }}>
                <div className="header">
                    <h2 className="title">Playlist</h2>
                    <h3 className="subtitle">click album cover <br /> to continue</h3>
                </div>
                <div className="musiclist">
                    {musicItems.map((item, musicIndex) => (
                        <div
                            key={musicIndex}
                            className={`item ${this.state.activeItemIndex === musicIndex ? 'item--active' : ''}`}
                            data-text={item.type}
                        >
                            <div className="content">
                                <img className="img" src={item.imageUrl} alt={item.type} />
                                <h2 className="content-title">{item.title}</h2>
                                <p className="content-songs">
                                    {item.lists.map((song, songIndex) => (
                                        <span key={songIndex}>
                                            <span
                                                className={`song-icon ${song.isPlaying ? 'song-icon--active' : ''}`}
                                                onClick={() => this.playMusic(musicIndex, songIndex)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {song.isPlaying ? '⏸️' : '▶️'}
                                            </span>
                                            {song.musicName}
                                            <br />
                                        </span>
                                    ))}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <audio ref={(ref) => (this.audioRef = ref)} controls></audio>
            </div>
        );

    }
}

export default Albums;
