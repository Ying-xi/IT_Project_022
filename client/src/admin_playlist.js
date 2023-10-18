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
    /*
        http://localhost:3300/music/Bleu.mp3
        http://localhost:3300/images/album1.jpg
        upload file to backend (binary file)
    */

    const animatedComponents = makeAnimated();

    const handleSelectChange = (selected) => {
        if (selected.length <= 5) {
            setMultiSelected(selected);
        }
    };

    //parameters state
    const [selectedPlaylistId, setselectedPlaylistId] = useState(null);
    const [selectedPlaylistName, setselectedPlaylistName] = useState('');
    const [selectedPlaylistDescription, setselectedPlaylistDescription] = useState('');
    const [selectedPlaylistPictureName, setselectedPlaylistPictureName] = useState('');

    // Playlist details, defined by lists in backend data
    const [selectedPlaylist, setSelectedPlaylist] = useState([]);
    const [multiSelected, setMultiSelected] = useState([]);
    // {
    // "_id": {
    //     "$oid": "6527d84fec4088689a0397cf"
    // },
    // "name": "Jazz Music",
    // "description": "Name",
    // "lists": [
    //     {
    //     "musicName": "Auld Lang Syne",
    //     },
    //     {
    //     "musicName": "Winter Bokeh",
    //     }
    // ],
    // "imageName": "album1"
    // }


    // const options = [];
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

    // Handle music/playlist click event
    const handlePlaylistClick = (playlistId) => {
        // Reset state when a new music item is selected
        setselectedPlaylistId(null);
        setselectedPlaylistName('');
        setselectedPlaylistPictureName('');
        setselectedPlaylistDescription('');

        // Set the selected music based on the clicked item
        setselectedPlaylistId(playlistId);

        // Fetch details for the selected music
        const backendDataPlaylist = backendData.data.find((playlist) => playlist._id === playlistId);

        if (backendDataPlaylist) {
            setselectedPlaylistName(backendDataPlaylist.name || '');
            // setselectedPlaylistPictureName(backendDataPlaylist.imageName || '');
            setselectedPlaylistPictureName(`http://localhost:3300/images/${backendDataPlaylist.imageName}.jpg`);
            setselectedPlaylistDescription(backendDataPlaylist.description || '');
            setSelectedPlaylist(backendDataPlaylist.lists || []);

            // 等待后端合并发送musicName list，再重新给options赋值
            selectedPlaylist.forEach((item) => {
                options.push({
                    value: item.musicName,
                    label: item.musicName,
                });
            });
            // 遍历输出selectedPlaylist
            selectedPlaylist.forEach((item) => {
                console.log(item.musicName);
            });
            console.log('-----!!---')
            console.log(options);
            console.log('-----!!---')


            console.log('--------')
            console.log(selectedPlaylistName)
            console.log(selectedPlaylistPictureName)
            console.log(selectedPlaylistDescription)
            console.log(selectedPlaylist)
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
        // console.log(token);

        if (token) {
            const headers = {
                Authorization: `Bearer ${token}`,
            };

            axios
                .get('http://localhost:3300/albumAdmin', { headers })
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
            name: selectedPlaylistName,
        };

        const token = localStorage.getItem('token');
        // console.log(token)

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        // confirm dialogue
        const isConfirmed = window.confirm('Are you sure you want to update this music?');

        if (isConfirmed) {
            axios.put(`http://localhost:3300/admin/${selectedPlaylistId}`, updatedMusic, { headers })
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

        const musicFile = `../Default_music/Musics/${selectedPlaylistName}.mp3`;
        const musicPicture = `../Default_music/Images/${selectedPlaylistName}.jpg`;


        const newMusic = {
            // reconstruct to form-data
            name: selectedPlaylistName,
            file: musicFile,
            picture: musicPicture,
        };

        const token = localStorage.getItem('token');
        // console.log(token);

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
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const isConfirmed = window.confirm('Are you sure you want to delete this music?');

        if (isConfirmed) {
            axios.delete(`http://localhost:3300/admin/${selectedPlaylistId}`, { headers })
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


    // help to switch page
    const handleRedirect = () => {
        window.location.href = '/admin';
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
                                        <div onClick={handleRedirect}>Custom Playlist</div>
                                        {/* <div>Type</div> */}
                                        <div 
                                            // onClick={() => setShouldRefresh(true)}
                                        >
                                                Add+
                                        </div>
                                    </div>

                                    {isLoading ? (
                                        <h3 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '2vh' }}>Loading...</h3>
                                    ) : (
                                        <MusicList musicData={backendData.data} onMusicClick={handlePlaylistClick} />
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
                                            {selectedPlaylistPictureName ? (
                                                <img
                                                    src={selectedPlaylistPictureName}
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

                                                    { selectedPlaylistId ? (
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
                                                    {selectedPlaylistName ? (
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
                                                                value={selectedPlaylistName}
                                                                onChange={(e) => setselectedPlaylistName(e.target.value)}
                                                                className={styles.customInput}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Music Name"
                                                            value={selectedPlaylistName}
                                                            onChange={(e) => {
                                                                setselectedPlaylistName(e.target.value);
                                                                console.log('musicName:', e.target.value);
                                                            }}
                                                            style={{
                                                                border: 'none',
                                                                outline: 'None',
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
                                                        {selectedPlaylistDescription ? (
                                                            <>
                                                                <div className={styles.mainContentTopRightTypeRow}>
                                                                    <label className={styles.customField}>
                                                                        <textarea
                                                                            type="text"
                                                                            value={selectedPlaylistDescription}
                                                                            // onChange={(e) => setselectedPlaylistDescription(e.target.value)}
                                                                            className={styles.descriptionInput}
                                                                            style={{
                                                                                width: '100%',
                                                                                height: '100%',
                                                                                overflow: 'hidden',
                                                                                fontSize: '1.5vh',
                                                                                textAlign: 'left',
                                                                                wordWrap: 'break-word',
                                                                                whiteSpace: 'pre-wrap',
                                                                                backgroundColor: '#F0F3F4',
                                                                            }}
                                                                        />
                                                                    </label>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className={styles.mainContentTopRightTypeRow}>
                                                                <label className={styles.customField}>
                                                                    <textarea
                                                                        type="text"
                                                                        // value={selectedPlaylistDescription}
                                                                        // onChange={(e) => setselectedPlaylistDescription(e.target.value)}
                                                                        className={styles.descriptionInput}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: '100%',
                                                                            overflow: 'hidden',
                                                                            fontSize: '1.5vh',
                                                                            textAlign: 'left',
                                                                            wordWrap: 'break-word',
                                                                            whiteSpace: 'pre-wrap',
                                                                            backgroundColor: '#F0F3F4',
                                                                        }}
                                                                    />
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
                                            menuIsOpen={true}
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
