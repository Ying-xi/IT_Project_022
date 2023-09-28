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
                            musicName: 'AuldLangSyne',
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
    playMusic = (musicIndex, songIndex, isManual = true) => {
        const { musicItems } = this.state;
        const updatedMusicItems = [...musicItems]; // 创建音乐项的副本

        // 获取当前音频元素
        const audio = this.audioRef;

        // 如果当前有音乐正在播放
        if (this.state.currentMusicIndex !== null) {
            // 先暂停当前正在播放的音乐
            audio.pause();

            // 更新当前正在播放的音乐的状态为未播放
            updatedMusicItems[this.state.currentMusicIndex].lists.forEach((song) => {
                song.isPlaying = false;
            });
        }

        // 设置新的音频源并播放
        audio.src = musicItems[musicIndex].lists[songIndex].musicUrl;
        audio.play();

        // 添加音频结束事件监听器
        audio.addEventListener('ended', () => {

            // 自动播放同一个音乐的下一首歌曲
            const nextSongIndex = (songIndex + 1) % musicItems[musicIndex].lists.length;

            if (nextSongIndex === 0) {
                // 如果没有下一首歌曲，播放当前音乐的第一首歌曲
                this.playMusic(musicIndex, 0, false);
            } else {
                // 否则，播放下一首歌曲
                this.playMusic(musicIndex, nextSongIndex, false);
            }

            // 更新歌曲的播放状态
            updatedMusicItems[musicIndex].lists[songIndex].isPlaying = false;
        });

        // 更新当前播放的音乐索引和歌曲索引
        this.setState({ currentMusicIndex: musicIndex });

        // 更新新点击的音乐的播放状态为播放中
        updatedMusicItems[musicIndex].lists[songIndex].isPlaying = true;

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
                                            <span className={`song-name ${song.isPlaying ? 'playing-song' : ''}`}>
                                                {song.musicName}
                                            </span>
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
