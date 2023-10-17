import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './admin.module.css';
import Dropzone from 'react-dropzone';
import MusicList from './components/MusicList';
import axios from 'axios'
// An alternative way for audio control
import AudioPlayer from 'react-audio-player';

function Admin() {
    /*
        http://localhost:3300/music/Bleu.mp3
        http://localhost:3300/images/album1.jpg
        upload file to backend (binary file)
    */

  //parameters state
  const [selectedMusicType, setSelectedMusicType] = useState('');
  const [selectedMusicId, setSelectedMusicId] = useState(null); 
  const [selectedMusicFile, setSelectedMusicFile] = useState(null); 
  const [selectedMusicName, setSelectedMusicName] = useState('');
  const [selectedMusicTag, setSelectedMusicTag] = useState('');
  const [selectedMusicPicture, setSelectedMusicPicture] = useState('');
  // store the mp3 file in the state for testing
  const [selectedMusicMP3, setSelectedMusicMP3] = useState(null);

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
      setSelectedMusicName(selectedMusic.name || '');
      setSelectedMusicTag(selectedMusic.tags.filter(tag => tag !== 'All'));
      setSelectedMusicPicture(`http://localhost:3300/images/${selectedMusic.name}.jpg`);
      setSelectedMusicFile(`http://localhost:3300/music/${selectedMusic.name}.mp3`);

      // Debugging
      // console.log('--------')
      // console.log(selectedMusicTag)
      // console.log('--------')
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
    // console.log(token)

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // confirm dialogue
    const isConfirmed = window.confirm('Are you sure you want to update this music?');

    // console.log('FormData:', formData);

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

  const handleMusicAdd = () => {

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found. Please log in.');
      return;
    }
  
    // Initialize FormData
    const formData = new FormData();
    formData.append('name', selectedMusicName);
    formData.append('tags', ['All', selectedMusicTag]);

    // Append the uploaded file to the form data if it exists
    if (uploadedFile) {
      formData.append('file', uploadedFile);
    } else {
      alert('Please select a music file.');
      return;
    }
  
    // Append the uploaded image to the form data if it exists
    if (uploadedImage) {
      formData.append('picture', uploadedImage);
    } else {
      alert('Please select a music picture.');
      return;
    }
  
    // request header
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    };

    // Debugging
    for (const entry of formData.entries()) {
      const [name, value] = entry;
      console.log(`${name}: ${value}`);
    }
    console.log('FormData:', formData);
    // POST Request to Back-end
    axios.post('http://localhost:3300/admin', formData, { headers })
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
    if (acceptedFiles.length > 0) {
      setUploadedImage(acceptedFiles[0]);
    }
  };

  // actively refresh the page
  const [shouldRefresh, setShouldRefresh] = useState(false);  
  useEffect(() => {  
    if (shouldRefresh) {  
      window.location.reload();
      setShouldRefresh(false);
    }  
  }, [shouldRefresh]);


  // const [activeTag, setActiveTag] = useState(null);
  // bind the tag to the music
  const toggleTag = (tag) => {
    if (selectedMusicTag == tag) {
      setSelectedMusicTag(null);
    } else {
      setSelectedMusicTag(tag);
    }
  };


  const handleRedirect = () => {
    window.location.href = '/admin_playlist';
  };

  return (
    <div className={styles.admin}>
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
                    Admin Management
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles.leftMainContent}>
              <div className={styles.musicWrap}>
                <main>
                  <div className={styles.musicMainHead}>
                    <div onClick={handleRedirect}>Music List</div>
                    <div>
                      Type:
                      <select
                        className={styles.customSelect}
                        value={selectedMusicType}
                        onChange={(e) => setSelectedMusicType(e.target.value)}
                      >
                        <option value="All">All</option>
                        <option value="Vocal">Vocal</option>
                        <option value="Ensembles">Ensembles</option>
                        <option value="Slow Smoothing">Slow Smoothing</option>
                        <option value="Classical">Classical</option>
                        <option value="Rhythmic">Rhythmic</option>
                        <option value="Natural Sound">Natural Sound</option>
                      </select>
                    </div>
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
                  <Link to="/admin_playlist" className={styles.linkWithHover}>
                    <h1
                      style={{
                      marginLeft: '4vh',
                      marginRight: '8vh',
                      color: 'gray',
                    }}>Switch to Playlist Management</h1>
                  </Link>
                  <h1
                    style={{
                    marginLeft: '4vh',
                    color: 'white'
                  }}>Music Information</h1>
                </div>
              </div>
            </div>
            <div className={styles.rightMainContent}>
              <div className={styles.mainContentInner}>
                {/* 3:1:1 split */}
                <div className={styles.mainContentTop}>
                  <div className={styles.mainContentTopInner}>

                    {/* show the music cover or upload cover */}
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
                            <div>
                              <button className={styles.addButton} onClick={handleMusicAdd}>Add</button>
                            </div>
                          )}
                        </div>

                        <div className={styles.mainContentTopRightName}>
                          {selectedMusicFile ? (
                            <div 
                              style={{
                                marginLeft: '2vw',
                                marginRight: '2vw',
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
                                outline: 'None',
                                backgroundColor: '#F0F3F4',
                                width: '25vh',
                                height: '7vh',
                              }}
                            />
                          )}
                        </div>
                        <div className={styles.mainContentTopRightType}>
                          {/*the division of type button*/}
                          <div className={styles.mainContentTopRightTypeInner}>
                            <div className={styles.mainContentTopRightTypeHeader}>
                              <p>Type:</p>
                            </div>
                            {selectedMusicTag ? (
                              <>
                                <div className={styles.mainContentTopRightTypeRow}>
                                  <button
                                  onClick={() => {
                                    toggleTag('Vocal');
                                    console.log(selectedMusicTag);
                                  }}
                                  className={`${styles.typeButton1} ${selectedMusicTag == 'Vocal' ? styles.activeType1 : ''}`}
                                  >
                                  Vocal
                                  </button>
                                  <button
                                    onClick={() => {
                                      toggleTag('Ensembles');
                                      console.log(selectedMusicTag);
                                    }}
                                    className={`${styles.typeButton2} ${selectedMusicTag == 'Ensembles' ? styles.activeType2 : ''}`}
                                  >
                                    Ensembles
                                  </button>
                                  <button
                                    onClick={() => toggleTag('Slow Smoothing')}
                                    className={`${styles.typeButton3} ${selectedMusicTag == 'Slow Smoothing' ? styles.activeType3 : ''}`}
                                  >
                                    Slow Smoothing
                                  </button>
                                  <button
                                    onClick={() => toggleTag('Classical')}
                                    className={`${styles.typeButton4} ${selectedMusicTag == 'Classical' ? styles.activeType4 : ''}`}
                                  >
                                    Classical
                                  </button>
                                  <button
                                    onClick={() => toggleTag('Rhythmic')}
                                    className={`${styles.typeButton5} ${selectedMusicTag == 'Rhythmic' ? styles.activeType5 : ''}`}
                                  >
                                    Rhythmic
                                  </button>
                                  <button
                                    onClick={() => toggleTag('Natural Sound')}
                                    className={`${styles.typeButton6} ${selectedMusicTag == 'Natural Sound' ? styles.activeType6 : ''}`}
                                  >
                                    Natural Sound
                                  </button>
                                </div>
                              </>
                            ) : (
                              <div className={styles.mainContentTopRightTypeRow}>
                                <button
                                  onClick={() => {
                                    toggleTag('Vocal');
                                    // setSelectedMusicTag('Vocal');
                                  }}
                                  className={`${styles.typeButton1} ${selectedMusicTag == 'Vocal' ? styles.activeType1 : ''}`}
                                >
                                  Vocal
                                </button>
                                <button
                                  onClick={() => {
                                    toggleTag('Ensembles');
                                    // setSelectedMusicTag('Ensembles');
                                  }}
                                  className={`${styles.typeButton2} ${selectedMusicTag == 'Ensembles' ? styles.activeType2 : ''}`}
                                >
                                  Ensembles
                                </button>
                                <button
                                  onClick={() => {
                                    toggleTag('Slow Smoothing');
                                    setSelectedMusicTag('Slow Smoothing');
                                  }}
                                  className={`${styles.typeButton3} ${selectedMusicTag == 'Slow Smoothing' ? styles.activeType3 : ''}`}
                                >
                                  Slow Smoothing
                                </button>
                                <button
                                  onClick={() => {
                                    toggleTag('Classical');
                                    setSelectedMusicTag('Classical');
                                  }}
                                  className={`${styles.typeButton4} ${selectedMusicTag == 'Classical' ? styles.activeType4 : ''}`}
                                >
                                  Classical
                                </button>
                                <button
                                  onClick={() => {
                                    toggleTag('Rhythmic');
                                    setSelectedMusicTag('Rhythmic');
                                  }}
                                  className={`${styles.typeButton5} ${selectedMusicTag == 'Rhythmic' ? styles.activeType5 : ''}`}
                                >
                                  Rhythmic
                                </button>
                                <button
                                  onClick={() => {
                                    toggleTag('Natural Sound');
                                    setSelectedMusicTag('Natural Sound');
                                  }}
                                  className={`${styles.typeButton6} ${selectedMusicTag == 'Natural Sound' ? styles.activeType6 : ''}`}
                                >
                                  Natural Sound
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload music */}
                <div className={styles.mainContentMiddle}>
                  {/* mid content part */}
                  <div className={styles.dropzoneWrapper}>
                    <div className={styles.topDivision}></div>
                    {/* Dropzone */}
                    <Dropzone onDrop={handleFileDrop}>
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.dropzone}>
                          <input {...getInputProps()} />
                          {uploadedFile ? (
                            <div className={styles.uploadedFile}>
                              {uploadedFile.name}
                              <button
                                className={styles.deleteButton}
                                onClick={handleFileDelete}
                              >
                                Delete
                              </button>
                            </div>
                          ) : (
                            <p>+UPLOAD MUSIC+</p>
                          )}
                        </div>
                      )}
                    </Dropzone>

                    {/* lower division */}
                    <div className={styles.bottomDivision}></div>
                  </div>
                </div>
                <div className={styles.mainContentBottom}>
                  <div key={selectedMusicFile} className={styles.audioContainerWrapper}>
                    <div className={styles.audioContainer} style={{ height: '100%' }}>
                      <h1 style={{ marginTop: '2vh', textAlign: 'center' }}>Audio Play</h1>
                      {selectedMusicFile ? (
                        <>
                        <audio controls>
                          <source src={selectedMusicFile} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                        {/* <h1>{selectedMusicFile}</h1> */}
                        </>
                      ) : (
                        <p>No audio selected.</p>
                      )}
                    </div>
                  </div>


                  {/* lower division */}
                  <div className={styles.bottomDivisionBottom}></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Admin;
