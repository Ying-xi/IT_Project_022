import React, { useEffect, useState } from 'react';
import styles from './admin_playlist.module.css';
import Dropzone from 'react-dropzone';
import MusicList from './components/MusicList';
import axios from 'axios';
import { Link } from 'react-router-dom';
// The component of select is based on https://react-select.com/home#getting-started
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

function Admin_Playlist() {
  const animatedComponents = makeAnimated();
  //parameters state
  const [selectedPlaylistId, setselectedPlaylistId] = useState(null);
  const [selectedPlaylistName, setselectedPlaylistName] = useState('');
  const [selectedPlaylistDescription, setselectedPlaylistDescription] = useState('');
  const [selectedPlaylistPictureName, setselectedPlaylistPictureName] = useState('');
  // Playlist details, defined by lists in backend data
  const [multiSelected, setMultiSelected] = useState([]);
  const [optionsTmp, setOptionsTmp] = useState([]);
  const [musicOptions, setMusicOptions] = useState([]);
  const [musicOptionsTmp, setMusicOptionsTmp] = useState([]);
  // Add new music options
  const [newMusicOptions, setNewMusicOptions] = useState([]);


  const maxCharCount = 75;
  const [descriptionLength, setDescriptionLength] = useState(selectedPlaylistDescription.length);

  const handleSelectChange = (selected) => {
    if (selected.length <= 5) {
      setOptionsTmp(selected);
    }
    console.log('selected:', selected);
  };

  const handleSelectAdd = (selected) => {
    if (selected.length <= 5) {
      setNewMusicOptions(selected);
    }
    console.log('selected:', selected);
  };

  // listen the change of newMusicOptions
  useEffect(() => {
    console.log('newMusicOptions updated:', newMusicOptions);
  }, [newMusicOptions]);

  // Receive all music, store it in musicOptions
  useEffect(() => {
    axios.get('https://skoog-music-backend.onrender.com/musicPlayer')
      .then((response) => {
        const musicOptionsData = response.data.data.map((item) => ({
          value: item.name,
          label: item.name,
        }));
        setMusicOptionsTmp(musicOptionsData);
      })
      .catch((error) => {
        console.error('Error fetching data from backend:', error);
      });
  }, []);



  // Handle music/playlist click event
  const handlePlaylistClick = (playlistId) => {
    setMusicOptions(musicOptionsTmp);
    // Reset state when a new music item is selected
    setselectedPlaylistId(null);
    setselectedPlaylistName('');
    setselectedPlaylistPictureName('');
    setselectedPlaylistDescription('');
    setOptionsTmp([]);
    // Set the selected music based on the clicked item
    setselectedPlaylistId(playlistId);
    // Fetch details for the selected music
    const backendDataPlaylist = backendData.data.find((playlist) => playlist._id === playlistId);

    if (backendDataPlaylist) {
      setselectedPlaylistName(backendDataPlaylist.name || '');
      setselectedPlaylistPictureName(`https://skoog-music-backend.onrender.com/album/${backendDataPlaylist.imageName}.jpg`);
      setselectedPlaylistDescription(backendDataPlaylist.description || '');
      setMultiSelected([]);

      backendDataPlaylist.lists.forEach((item) => {
        multiSelected.push({
          value: item.musicName,
          label: item.musicName,
        });
      });

      
      // Delete after testing
      console.log('-----!!---');
      console.log(musicOptions);
      console.log('-----!!---');
      console.log(multiSelected);
      console.log('-----!!---');

      // Remove the selected music from musicOptions
      if (multiSelected.length > 0 && musicOptions.length > 0) {
        setOptionsTmp(multiSelected);
      }
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
      axios.get('https://skoog-music-backend.onrender.com/albumAdmin', { headers })
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
      axios.put(`https://skoog-music-backend.onrender.com/admin/${selectedPlaylistId}`, updatedMusic, { headers })
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
    // const musicFile = `../Default_music/Musics/${selectedPlaylistName}.mp3`;
    // const musicPicture = `../Default_music/Images/${selectedPlaylistName}.jpg`;
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found. Please log in.');
      return;
    }
    // request header
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    // Initialize FormData
    const formData = new FormData();
    formData.append('name', selectedPlaylistName);
    formData.append('description', selectedPlaylistDescription);

    // combination lists into a single array
    const combinationLists = [];
    for (let i = 0; i < newMusicOptions.length; i++) {
      combinationLists.push(newMusicOptions[i].value);
    }

    // Append the consolidated lists to the form data
    formData.append('lists', JSON.stringify(combinationLists));


    // Append the uploaded image to the form data if it exists
    if (uploadedImage) {
      formData.append('picture', uploadedImage);
    } else {
      alert('Please select a music picture.');
      return;
    }

    // Debugging
    for (const entry of formData.entries()) {
      const [name, value] = entry;
      console.log(`${name}: ${value}`);
    }

    // Send POST to backend
    axios.post(`https://skoog-music-backend.onrender.com/albumAdmin`, formData, { headers })
      .then((response) => {
        console.log('Playlist added successfully:', response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error adding music:', error);
      });
  };



  // Delete music from DB
  const handleAlbumDelete = () => {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const isConfirmed = window.confirm('Are you sure you want to delete this album?');

    if (isConfirmed) {
      axios.delete(`https://skoog-music-backend.onrender.com/albumAdmin/${selectedPlaylistId}`, { headers })
        .then((response) => {
          console.log('Album deleted successfully:', response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error deleting music:', error);
        });
    }
  };

  // State for the uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);
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
                <div className={styles.topContentTop}>{/* blank space */}</div>
                <div className={styles.topContentBottom}>
                  <h1 className={styles.musicHeader}>Playlist Management</h1>
                </div>
              </div>
            </div>
            <div className={styles.leftMainContent}>
              <div className={styles.musicWrap}>
                <main>
                  <div className={styles.musicMainHead}>
                    <div onClick={handleRedirect}>Custom Playlist</div>
                    {/* <div>Type</div> */}
                    <div onClick={() => setShouldRefresh(true)}>Add+</div>
                  </div>

                  {isLoading ? (
                    <h3
                      style={{
                        textAlign: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: '2vh',
                      }}
                    >
                      Loading...
                    </h3>
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
                <div className={styles.topContentTop}>{/* blank space */}</div>
                <div className={styles.topContentBottom}>
                  <Link to="/admin" className={styles.linkWithHover}>
                    <h1
                      style={{
                        marginLeft: '4vh',
                        color: 'gray',
                      }}
                    >
                      Switch to Music Management
                    </h1>
                  </Link>
                  <h1
                    style={{
                      marginLeft: '4vh',
                      color: 'white',
                    }}
                  >
                    Playlist Information
                  </h1>
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
                          {selectedPlaylistId ? (
                            <>
                              {/* <button className={styles.addButton} onClick={handleMusicUpdate}>Update</button> */}
                              <button className={styles.deleteButton} onClick={handleAlbumDelete}>
                                Delete
                              </button>
                            </>
                          ) : (
                            <button
                              className={styles.addButton}
                              onClick={handleMusicAdd}
                              disabled={descriptionLength > maxCharCount}
                            >
                              Add
                            </button>

                          )}
                        </div>
                        {/*
                                                    Music Name Editor
                                                */}
                        {/* <div className={styles.mainContentTopRightName}> */}
                        {selectedPlaylistId ? (
                          <div
                            style={{
                              marginLeft: '2vh',
                              marginRight: '2vh',
                              marginTop: '2vh',
                              marginBottom: '2vh',
                            }}
                          >
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
                              borderRadius: '6px',
                              padding: '0 10px',
                              display: 'block',
                              boxSizing: 'border-box',
                              marginLeft: '1vw',
                              fontSize: '5vh',
                            }}
                          />
                        )}
                        {/* </div> */}
                        {/* Music Tags */}
                        <div className={styles.mainContentTopRightType}>
                          {/*the division of type button*/}
                          <div className={styles.mainContentTopRightTypeInner}>
                            <div className={styles.mainContentTopRightTypeHeader}>
                              <p style={{ color: 'blue' }}>Description: ({descriptionLength} / {maxCharCount})</p>
                            </div>
                            {selectedPlaylistId ? (
                              <>
                                <div className={styles.mainContentTopRightTypeRow}>
                                  <label className={styles.customField}>
                                    <textarea
                                      type="text"
                                      value={selectedPlaylistDescription}
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        setselectedPlaylistDescription(value);
                                        setDescriptionLength(value.length);
                                      }}
                                      className={styles.descriptionInput}
                                      style={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'auto',
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
                                    value={selectedPlaylistDescription}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      setselectedPlaylistDescription(value);
                                      console.log('musicDescription:', value);
                                      setDescriptionLength(value.length);
                                    }}

                                    className={styles.descriptionInput}
                                    style={{
                                      width: '100%',
                                      height: '100%',
                                      overflow: 'auto',
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
                {musicOptions.length > 0 ? (
                  <div className={styles.mainContentMiddleAndBottom}>
                    <div className={styles.middleBottomContainer}>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={musicOptions}
                        value={optionsTmp}
                        onChange={handleSelectChange}
                        maxMenuHeight={200}
                        menuIsOpen={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.mainContentMiddleAndBottom}>
                    <div className={styles.middleBottomContainer}>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={musicOptionsTmp}
                        value={newMusicOptions}
                        onChange={handleSelectAdd}
                        maxMenuHeight={200}
                        menuIsOpen={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin_Playlist;
