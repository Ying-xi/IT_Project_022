import React, {useEffect, useState } from 'react';
import styles from './admin.module.css';
import Dropzone from 'react-dropzone';
import MusicList from './components/MusicList';
import axios from 'axios'


function Admin() {
  const [selectedMusicId, setSelectedMusicId] = useState(null); 
  const [selectedMusicFile, setSelectedMusicFile] = useState(null); 
  const [selectedMusicName, setSelectedMusicName] = useState('');
  const [selectedMusicTag, setSelectedMusicTag] = useState('');
  const [selectedMusicPicture, setSelectedMusicPicture] = useState('');

  const handleMusicClick = (musicId) => {
    setSelectedMusicId(null);
    setSelectedMusicFile(null);
    setSelectedMusicName('');
    setSelectedMusicTag('');
    setSelectedMusicPicture('');

    setSelectedMusicId(musicId);

    const selectedMusic = backendData.find((music) => music._id === musicId);

    if (selectedMusic) {
      setSelectedMusicFile(selectedMusic.file);
      setSelectedMusicName(selectedMusic.name || '');
      setSelectedMusicTag(selectedMusic.tag || '');
      setSelectedMusicPicture(selectedMusic.picture || '');
    }
  };

  const [isLoading, setIsLoading] = useState(true);
  const [backendData, setBackendData] = useState({
    data: [],
    activeId: null,
  });

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3300/musicPlayer')
  //     .then((response) => {
  //       console.log('Received data from backend:', response.data);
  //       setBackendData(response.data);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data from backend:', error);
  //       setIsLoading(false);
  //     });
  // }, []);




  useEffect(() => {
    // 读取本地 JSON 文件
    fetch('/music_therapy.music_info.json')
      .then((response) => response.json())
      .then((data) => {
        console.log('Received data from JSON file:', data);
  
        // 输出 _id
        if (Array.isArray(data) && data.length > 0) {
          console.log('First item _id:', data[0]._id);
        } else {
          console.log('No data or _id available.');
        }
  
        setBackendData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data from JSON file:', error);
        setIsLoading(false);
      });
  }, []);





  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  // State for the music name input
  const [musicName, setMusicName] = useState('');

  const handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      // Set the uploaded file to the first accepted file.
      setUploadedFile(acceptedFiles[0]);
    }
  };

  const handleFileDelete = () => {
    // Clear the uploaded file when the delete button is clicked.
    setUploadedFile(null);
  };

  const handleImageUpload = (acceptedFiles) => {
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

  return (
    <div className={styles.admin}>
      {/* left hand side */}
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.leftContentContainer}>
            <div className={styles.topContent}>
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
                    <div>Add+</div>
                  </div>

                  {isLoading ? (
                    <h3 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '2vh' }}>Loading...</h3>
                  ) : (
                    <MusicList musicData={backendData} onMusicClick={handleMusicClick} />
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
            <div className={styles.mainContent}>
              <div className={styles.mainContentInner}>
                {/* 3:1:1 拆分 */}
                <div className={styles.mainContentTop}>
                  {/* 上部分，占据3 */}
                  <div className={styles.mainContentTopInner}>


                    <div className={styles.mainContentTopPic}>
                      {selectedMusicPicture ? (
                        // 异步加载图片
                        <img
                            src={selectedMusicPicture}
                            alt="Music Picture"
                            className={styles.uploadedImage}
                          />
                      ) : (
                        // 显示上传图片的功能
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
                      {/* 歌曲主要信息 */}
                      <div className={styles.mainContentTopRightInner}>
                        <div className={styles.mainContentTopRightAdd}>
                          {/* Add Button */}
                          <button className={styles.addButton}>Add</button>
                        </div>
                        

                        <div className={styles.mainContentTopRightName}>
                          {selectedMusicFile ? (
                            <div 
                              style={{
                                marginLeft: '2vh',
                                marginRight: '2vh',
                                marginTop: '2vh',
                                marginBottom: '2vh',
                                background: 'rgba(255, 255, 255, 0.8)',
                                backdropFilter: 'blur(5px)',
                                borderRadius: '5px',
                                textAlign: 'center',
                              }}>
                              <h3 style={{ textAlign: 'center' }}>Music Name: {selectedMusicName}</h3>
                              {/* <h4 style={{ textAlign: 'center' }}>{selectedMusicName}</h4> */}
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
                                width: '35vh', height: '7vh',
                              }}
                            />
                          )}
                        </div>




                        <div className={styles.mainContentTopRightType}>
                          <div className={styles.mainContentTopRightTypeInner}>
                            <div className={styles.mainContentTopRightTypeHeader}>
                              <p>Type:</p>
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={toggleType1}
                                  className={`${styles.typeButton1} ${type1Active ? styles.activeType1 : ''}`}
                                  style={{ backgroundColor: selectedMusicTag === 'Vocal' ? 'green' : 'transparent' }}
                                >
                                  Vocal
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={toggleType2}
                                  className={`${styles.typeButton2} ${type2Active ? styles.activeType2 : ''}`}
                                  style={{ backgroundColor: selectedMusicTag === 'Ensembles' ? 'blue' : 'transparent' }}
                                >
                                  Ensembles
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={toggleType3}
                                  className={`${styles.typeButton3} ${type3Active ? styles.activeType3 : ''}`}
                                  style={{ backgroundColor: selectedMusicTag === 'Slow Soothing' ? 'blue' : 'transparent' }}
                                >
                                  Slow Soothing
                                </button>
                              )}
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={toggleType4}
                                  className={`${styles.typeButton4} ${type4Active ? styles.activeType4 : ''}`}
                                  style={{ backgroundColor: selectedMusicTag === 'Classical' ? 'blue' : 'transparent' }}
                                >
                                  Classical
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={toggleType5}
                                  className={`${styles.typeButton5} ${type5Active ? styles.activeType5 : ''}`}
                                  style={{ backgroundColor: selectedMusicTag === 'Rhythmic' ? 'blue' : 'transparent' }}
                                >
                                  Rhythmic
                                </button>
                              )}
                              {selectedMusicTag !== 'All' && (
                                <button
                                  onClick={toggleType6}
                                  className={`${styles.typeButton6} ${type6Active ? styles.activeType6 : ''}`}
                                  style={{ backgroundColor: selectedMusicTag === 'Natural Sound' ? 'blue' : 'transparent' }}
                                >
                                  Natural Sound
                                </button>
                              )}
                            </div>
                          </div>
                        </div>





{/* 
                        <div className={styles.mainContentTopRightType}>
                          <div className={styles.mainContentTopRightTypeInner}>
                            <div className={styles.mainContentTopRightTypeHeader}>
                              <p>Type:</p>
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                              <button
                                onClick={toggleType1}
                                className={`${styles.typeButton1} ${type1Active ? styles.activeType1 : ''}`}
                              >
                                Vocal
                              </button>
                              <button
                                onClick={toggleType2}
                                className={`${styles.typeButton2} ${type2Active ? styles.activeType2 : ''}`}
                              >
                                Ensembles
                              </button>
                              <button
                                onClick={toggleType3}
                                className={`${styles.typeButton3} ${type3Active ? styles.activeType3 : ''}`}
                              >
                                Slow Soothing
                              </button>
                            </div>
                            <div className={styles.mainContentTopRightTypeRow}>
                            <button
                                onClick={toggleType4}
                                className={`${styles.typeButton4} ${type4Active ? styles.activeType4 : ''}`}
                              >
                                Classical
                              </button>
                              <button
                                onClick={toggleType5}
                                className={`${styles.typeButton5} ${type5Active ? styles.activeType5 : ''}`}
                              >
                                Rhythmic
                              </button>
                              <button
                                onClick={toggleType6}
                                className={`${styles.typeButton6} ${type6Active ? styles.activeType6 : ''}`}
                              >
                                Natural Sound
                              </button>
                            </div>
                          </div>
                        </div>
 */}













                      </div>
                    </div>
                  </div>
                </div>


                <div className={styles.mainContentMiddle}>
                  {/* 中间部分，占据1 */}
                  <div className={styles.dropzoneWrapper}> {/* 新增的包装 <div> */}
                    {/* 上面的 division */}
                    <div className={styles.topDivision}></div>
                    
                    {/* Dropzone */}
                    <Dropzone onDrop={handleFileDrop} /*accept="audio/*"*/>
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

                    {/* 下面的 division */}
                    <div className={styles.bottomDivision}></div>
                  </div>
                </div>

                <div className={styles.mainContentBottom}>

                  <div key={selectedMusicFile} className={styles.audioContainerWrapper}>
                    <div className={styles.audioContainer}>
                      <h1 style={{ textAlign: 'center' }}>Audio Play</h1>
                      {selectedMusicFile ? (
                        <audio controls>
                          <source src={`data:audio/mpeg;base64,${selectedMusicFile}`} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <p>No audio selected.</p>
                      )}
                    </div>
                  </div>


                  {/* 下面的 division */}
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
