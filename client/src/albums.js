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
    const updatedMusicItems = [...musicItems]; 

    // Get the current audio element
    const audio = this.audioRef;

    // If music is currently playing
    if (this.state.currentMusicIndex !== null) {
        // Pause the currently playing music first
        audio.pause();

        // Update the status of the currently playing music to not playing
        updatedMusicItems[this.state.currentMusicIndex].lists.forEach((song) => {
            song.isPlaying = false;
        });
    }

    // Set a new audio source and play it
    audio.src = musicItems[musicIndex].lists[songIndex].musicUrl;

    // Add an event listener for when audio can play
    audio.addEventListener('canplay', () => {
        
        if (!audio.paused) {
            audio.pause(); 
        }
        
        audio.play();
    });

    // Add an event listener for when audio playback ends
    audio.addEventListener('ended', () => {
        // Automatically play the next song of the same music
        const nextSongIndex = (songIndex + 1) % musicItems[musicIndex].lists.length;
    
        if (nextSongIndex === 0) {
            // If there's no next song, play the first song of the current music
            this.playMusic(musicIndex, 0, false);
        } else {
            // Otherwise, play the next song
            if (!audio.paused) { 
                audio.pause(); 
            }
            this.playMusic(musicIndex, nextSongIndex, false);
        }
    
        
        updatedMusicItems[musicIndex].lists[songIndex].isPlaying = false;
    });

    this.setState({ currentMusicIndex: musicIndex });

    updatedMusicItems[musicIndex].lists[songIndex].isPlaying = true;

    // Update the music items in the state
    this.setState({ musicItems: updatedMusicItems });
};

// When the user is scrolling on the screen:
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

        // When the top of the item enters this range of the viewport:
        if (itemTop > windowHeight * 0.2 && itemTop < windowHeight * 0.4) {
            this.setState({ activeItemIndex: index });

            // Set the image of the item as the background now
            const imgElement = item.querySelector('.img');
            if (imgElement) {
                const imageUrl = imgElement.getAttribute('src');
                this.setState({ backgroundImage: `url(${imageUrl})` });
            }
        }

        // Check if we are near the bottom of the page
        const isNearBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight * 0.985;
        // If near the bottom, activate the last item
        if (isNearBottom) {
            const lastIndex = itemElements.length - 1;
            this.setState({ activeItemIndex: lastIndex });

            // Set the background image of the last item
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
                                                {song.isPlaying ? '🔄' : '▶️'}
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
