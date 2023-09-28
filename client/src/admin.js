import React, {useEffect, useState } from 'react';
import styles from './admin.module.css';
import Dropzone from 'react-dropzone';
import MusicList from './components/MusicList';
import axios from 'axios'


function Admin() {
  //parameters state
  const [selectedMusicId, setSelectedMusicId] = useState(null); 
  const [selectedMusicFile, setSelectedMusicFile] = useState(null); 
  const [selectedMusicName, setSelectedMusicName] = useState('');
  const [selectedMusicTag, setSelectedMusicTag] = useState('');
  const [selectedMusicPicture, setSelectedMusicPicture] = useState('');

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
      
      // 更新活动标签为音乐的标签
      setActiveTags(selectedMusic.tags.filter(tag => tag !== 'All'));
      setSelectedMusicPicture(selectedMusic.picture || '');
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


  // 添加音乐




  // State for the uploaded file
  const [uploadedFile, setUploadedFile] = useState(null);
  // State for the uploaded image
  const [uploadedImage, setUploadedImage] = useState(null);
  // State for the music name input
  const [musicName, setMusicName] = useState('');

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

  // State for toggle buttons
  const [type1Active, setType1Active] = useState(false);
  const [type2Active, setType2Active] = useState(false);
  const [type3Active, setType3Active] = useState(false);
  const [type4Active, setType4Active] = useState(false);
  const [type5Active, setType5Active] = useState(false);
  const [type6Active, setType6Active] = useState(false);

  // Toggle button handlers
  const toggleType1 = () => {
    setType1Active(!type1Active);
  };

  const toggleType2 = () => {
    setType2Active(!type2Active);
  };

  const toggleType3 = () => {
    setType3Active(!type3Active);
  };

  const toggleType4 = () => {
    setType4Active(!type4Active);
  };

  const toggleType5 = () => {
    setType5Active(!type5Active);
  };

  const toggleType6 = () => {
    setType6Active(!type6Active);
  };



  // 主动刷新页面
  const [shouldRefresh, setShouldRefresh] = useState(false);  
  useEffect(() => {  
    if (shouldRefresh) {  
      window.location.reload();
      setShouldRefresh(false);
    }  
  }, [shouldRefresh]);

  // 绑定 tag状态
  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
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
                    Admin page
                  </h1>
                </div>
              </div>
            </div>
            <div className={styles.leftMainContent}>
              <div className={styles.musicWrap}>
                <main>
                  <div className={styles.musicMainHead}>
                    <div>Music Management</div>
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
                  <h1
                    style={{
                    marginLeft: '4vh',
                    color: 'gray'
                  }}>Music Information</h1>
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
                            <button className={styles.addButton}>Add</button>
                          )}
                        </div>

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
                            // display uploaded music
                            <input
                              type="text"
                              placeholder="Enter Music Name"
                              value={musicName}
                              onChange={(e) => setMusicName(e.target.value)}
                              style={{ 
                                border: 'none', 
                                backgroundColor: '#F0F3F4', 
                                width: '25vh', height: '7vh',
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
                            <div className={styles.mainContentTopRightTypeRow}>
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={() => toggleTag('Vocal')}
                                  className={`${styles.typeButton1} ${activeTags.includes('Vocal') ? styles.activeType1 : ''}`}
                                >
                                  Vocal
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={() => toggleTag('Ensembles')}
                                  className={`${styles.typeButton2} ${activeTags.includes('Ensembles') ? styles.activeType2 : ''}`}
                                >
                                  Ensembles
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={() => toggleTag('Slow Smoothing')}
                                  className={`${styles.typeButton3} ${activeTags.includes('Slow Smoothing') ? styles.activeType3 : ''}`}
                                >
                                  Slow Smoothing
                                </button>
                              )}
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={() => toggleTag('Classical')}
                                  className={`${styles.typeButton4} ${activeTags.includes('Classical') ? styles.activeType4 : ''}`}
                                >
                                  Classical
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={() => toggleTag('Rhythmic')}
                                  className={`${styles.typeButton5} ${activeTags.includes('Rhythmic') ? styles.activeType5 : ''}`}
                                >
                                  Rhythmic
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={() => toggleTag('Natural Sound')}
                                  className={`${styles.typeButton6} ${activeTags.includes('Natural Sound') ? styles.activeType6 : ''}`}
                                >
                                  Natural Sound
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>


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
                    <div className={styles.audioContainer}>
                      <h1 style={{ marginTop: '2vh', textAlign: 'center' }}>Audio Play</h1>
                      {selectedMusicFile ? (
                        <audio controls>
                          <source src={`/${selectedMusicFile}`} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
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
