import React, {useEffect, useState } from 'react';
import styles from './admin_playlist.module.css';
import Dropzone from 'react-dropzone';
import MusicList from './components/MusicList';
import axios from 'axios'
import { Link } from 'react-router-dom';
// The component of select is based on https://react-select.com/home#getting-started
import Select from 'react-select';
import makeAnimated from 'react-select/animated';


function Admin_Playlist() {

    const options = [
        { label: "Option 1", value: "option1" },
        { label: "Option 2", value: "option2" },
        { label: "Option 3", value: "option3" },
        { label: "Option 4", value: "option4" },
        { label: "Option 5", value: "option5" },
        { label: "Option 6", value: "option6" },
        { label: "Option 7", value: "option7" },
        { label: "Option 8", value: "option8" },
    ];
    const animatedComponents = makeAnimated();

    const handleSelectChange = (selected) => {
        if (selected.length <= 5) {
            setMultiSelected(selected);
        }
    };


    //parameters state
    const [selectedMusicId, setSelectedMusicId] = useState(null);
    const [selectedMusicFile, setSelectedMusicFile] = useState(null);
    const [selectedMusicName, setSelectedMusicName] = useState('');
    const [selectedMusicTag, setSelectedMusicTag] = useState('');
    const [selectedMusicPicture, setSelectedMusicPicture] = useState('');
    const [selectedPlaylist, setSelectedPlaylist] = useState(options);
    const [multiSelected, setMultiSelected] = useState([]);

    // Handle music click event
    const handleMusicClick = (musicId) => {
        // Reset state when a new music item is selected
        setSelectedMusicId(null);
        setSelectedMusicFile(null);
        setSelectedMusicName('');
        setSelectedMusicTag('');
        setSelectedMusicPicture('');

        // Set the selected music based on the clicked item
        setSelectedMusicId(musicId);

        // Fetch details for the selected music
        const selectedMusic = backendData.data.find((music) => music._id === musicId);

        if (selectedMusic) {
            setSelectedMusicFile(selectedMusic.file);
            setSelectedMusicName(selectedMusic.name || '');
            setSelectedMusicTag(selectedMusic.tags.filter(tag => tag !== 'All'));
            setSelectedMusicPicture(selectedMusic.picture || '');

            console.log('--------')
            console.log(selectedMusicFile)
            console.log(selectedMusicPicture)
            console.log(selectedMusicTag)
            console.log('--------')
        }
    };

    // State for loading data
    const [isLoading, setIsLoading] = useState(true);

    // State for backend data
    const [backendData, setBackendData] = useState({
        data: [],
        activeId: null,
    });


    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log(token);

        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get('http://localhost:3300/admin', { headers })
                .then((response) => {
                    console.log('Received data from backend:', response.data);
                    setBackendData(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching data from backend:', error);
                    setIsLoading(false);
                });
        }
    }, []);


    // Update music from DB
    const handleMusicUpdate = () => {
        const updatedMusic = {
            name: selectedMusicName,
        };

        const token = localStorage.getItem('token');
        console.log(token)

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // confirm dialogue
        const isConfirmed = window.confirm('Are you sure you want to update this music?');

        if (isConfirmed) {
            axios.put(`http://localhost:3300/admin/${selectedMusicId}`, updatedMusic, { headers })
                .then((response) => {
                    console.log('Music updated successfully:', response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error updating music:', error);
                });
        }
    };


    // Add music to DB
    const handleMusicAdd = () => {

        const musicFile = `../Default_music/Musics/${selectedMusicName}.mp3`;
        const musicPicture = `../Default_music/Images/${selectedMusicName}.jpg`;

        console.log(selectedMusicTag)

        const newMusic = {
            // 音乐名字
            // 音乐Tags
            // 音乐音频
            // 音乐图片
            name: selectedMusicName,
            tags: ['All', selectedMusicTag],
            file: musicFile,
            picture: musicPicture,
        };

        const token = localStorage.getItem('token');
        console.log(token);

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // Send POST to backend
        axios.post('http://localhost:3300/admin', newMusic, { headers })
            .then((response) => {
                console.log('Music added successfully:', response.data);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error adding music:', error);
            });
    };



    // Delete music from DB
    const handleMusicDelete = () => {
        const token = localStorage.getItem('token');
        console.log(token)
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const isConfirmed = window.confirm('Are you sure you want to delete this music?');

        if (isConfirmed) {
            axios.delete(`http://localhost:3300/admin/${selectedMusicId}`, { headers })
                .then((response) => {
                    console.log('Music deleted successfully:', response.data);
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Error deleting music:', error);
                });
        }
    };



    // State for the uploaded file
    const [uploadedFile, setUploadedFile] = useState(null);
    // State for the uploaded image
    const [uploadedImage, setUploadedImage] = useState(null);

    // Handle file drop event
    const handleFileDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            // Set the uploaded file to the first accepted file.
            setUploadedFile(acceptedFiles[0]);
        }
    };

    // Handle file delete event
    const handleFileDelete = () => {
        // Clear the uploaded file when the delete button is clicked.
        setUploadedFile(null);
    };

    // Handle image upload event
    const handleImageUpload = (acceptedFiles) => {
        //upload image from local to backend
        if (acceptedFiles.length > 0) {
            setUploadedImage(acceptedFiles[0]);
        }
    };

    // Refresh webpage
    const [shouldRefresh, setShouldRefresh] = useState(false);
    useEffect(() => {
        if (shouldRefresh) {
            window.location.reload();
            setShouldRefresh(false);
        }
    }, [shouldRefresh]);


    // const [activeTag, setActiveTag] = useState(null);
    // binding tag status
    const toggleTag = (tag) => {
        if (selectedMusicTag == tag) {
            setSelectedMusicTag(null);
        } else {
            setSelectedMusicTag(tag);
        }
    };




    return (
        <div className={styles.adminPlaylist}>
            {/* left hand side */}
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    <div className={styles.leftContentContainer}>
                        <div className={styles.leftTopContent}>
                            <div className={styles.topContentInner}>
                                {/* 3:2 split */}
                                <div className={styles.topContentTop}>
                                    {/* blank space */}
                                </div>
                                <div className={styles.topContentBottom}>
                                    <h1 className={styles.musicHeader}>
                                        Playlist Management
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className={styles.leftMainContent}>
                            <div className={styles.musicWrap}>
                                <main>
                                    <div className={styles.musicMainHead}>
                                        <div>Custom Playlist</div>
                                        <div>Type</div>
                                        <div onClick={() => setShouldRefresh(true)}>Add+</div>
                                    </div>

                                    {isLoading ? (
                                        <h3 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '2vh' }}>Loading...</h3>
                                    ) : (
                                        <MusicList musicData={backendData.data} onMusicClick={handleMusicClick} />
                                    )}
                                </main>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right hand side */}
                <div className={styles.rightColumn}>
                    <div className={styles.rightContentContainer}>
                        <div className={styles.rightTopContent}>
                            <div className={styles.topContentInner}>
                                {/* 3:2 Split */}
                                <div className={styles.topContentTop}>
                                    {/* blank space */}
                                </div>
                                <div className={styles.topContentBottom}>
                                    <Link to="/admin" className={styles.linkWithHover}>
                                        <h1
                                        style={{
                                        marginLeft: '4vh',
                                        color: 'gray',
                                        }}>Switch to Music Management</h1>
                                    </Link>
                                    <h1
                                        style={{
                                            marginLeft: '4vh',
                                            color: 'white'
                                        }}>Playlist Information</h1>
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightMainContent}>
                            <div className={styles.mainContentInner}>
                                {/* 3:1:1 split */}
                                <div className={styles.mainContentTop}>
                                    <div className={styles.mainContentTopInner}>


                                        <div className={styles.mainContentTopPic}>
                                            {selectedMusicPicture ? (
                                                <img
                                                    src={selectedMusicPicture}
                                                    alt="Music Picture"
                                                    className={styles.uploadedImage}
                                                />
                                            ) : (
                                                // display upload picture
                                                <Dropzone onDrop={handleImageUpload}>
                                                    {({ getRootProps, getInputProps }) => (
                                                        <div {...getRootProps()} className={styles.imageDropzone}>
                                                            <input {...getInputProps()} />
                                                            {uploadedImage ? (
                                                                <img
                                                                    src={URL.createObjectURL(uploadedImage)}
                                                                    alt="Uploaded"
                                                                    className={styles.uploadedImage}
                                                                />
                                                            ) : (
                                                                <p>+UPLOAD IMAGE+</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </Dropzone>
                                            )}
                                        </div>

                                        <div className={styles.mainContentTopRight}>
                                            {/* Main information for music */}
                                            <div className={styles.mainContentTopRightInner}>
                                                <div className={styles.mainContentTopRightAdd}>

                                                    { selectedMusicId ? (
                                                        <>
                                                            <button className={styles.addButton} onClick={handleMusicUpdate}>Update</button>
                                                            <button className={styles.deleteButton} onClick={handleMusicDelete}>Delete</button>
                                                        </>
                                                    ): (
                                                        <button className={styles.addButton} onClick={handleMusicAdd}>Add</button>
                                                    )}
                                                </div>
                                                {/*
                                                    Music Name Editor
                                                */}
                                                <div className={styles.mainContentTopRightName}>
                                                    {selectedMusicFile ? (
                                                        <div
                                                            style={{
                                                                marginLeft: '2vh',
                                                                marginRight: '2vh',
                                                                marginTop: '2vh',
                                                                marginBottom: '2vh',
                                                            }}>
                                                            <h3>Music Name:</h3>

                                                            <input
                                                                type="text"
                                                                value={selectedMusicName}
                                                                onChange={(e) => setSelectedMusicName(e.target.value)}
                                                                className={styles.customInput}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Music Name"
                                                            value={selectedMusicName}
                                                            onChange={(e) => {
                                                                setSelectedMusicName(e.target.value);
                                                                console.log('musicName:', e.target.value);
                                                            }}
                                                            style={{
                                                                border: 'none',
                                                                backgroundColor: '#F0F3F4',
                                                                width: '25vh',
                                                                height: '7vh',
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                {/* Music Tags */}
                                                <div className={styles.mainContentTopRightType}>
                                                    {/*the division of type button*/}
                                                    <div className={styles.mainContentTopRightTypeInner}>
                                                        <div className={styles.mainContentTopRightTypeHeader}>
                                                            <p style={{ color: 'blue' }}>Description:</p>
                                                        </div>
                                                        {selectedMusicTag ? (
                                                            <>
                                                                <div className={styles.mainContentTopRightTypeRow}>
                                                                    <label className={styles.customField}>
                                                                        <input type="text" placeholder=" " />
                                                                        <span className={styles.placeholder}>Enter Text</span>
                                                                    </label>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className={styles.mainContentTopRightTypeRow}>
                                                                <label className={styles.customField}>
                                                                    <input type="text" placeholder=" " />
                                                                    <span className={styles.placeholder}>Enter Text</span>
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/*
                                    occupy the area middle and bottom
                                */}
                                <div className={styles.mainContentMiddleAndBottom}>
                                    <div className={styles.middleBottomContainer}>
                                        <Select
                                            closeMenuOnSelect={false}
                                            components={animatedComponents}
                                            isMulti
                                            options={options}
                                            value={multiSelected}
                                            onChange={handleSelectChange}
                                            maxMenuHeight={200}
                                            // extra
                                            // getOptionLabel={(option) => option.label}
                                            // getOptionValue={(option) => option.value}
                                        />
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin_Playlist;
