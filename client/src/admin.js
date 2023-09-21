import React, {useEffect, useState } from 'react';
import styles from './admin.module.css';
import Dropzone from 'react-dropzone';
import MusicList from './components/MusicList';
import axios from 'axios'


function Admin() {

  // 添加 isLoading 状态
  const [isLoading, setIsLoading] = useState(true); 
  const [backendData, setBackendData] = useState({
    data: [],
    activeId: null,
  });

  useEffect(() => {
    axios
      .get('http://localhost:3300/musicPlayer')
      .then(response => {
        console.log('Received data from backend:', response.data);
        setBackendData(response.data);
        setIsLoading(false); // 数据加载完成后设置isLoading为false
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
        setIsLoading(false); // 发生错误时也要设置isLoading为false
      });
  }, []);
  


  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [musicName, setMusicName] = useState(''); // State for the music name input

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
                {/* 3:2 拆分 */}
                <div className={styles.topContentTop}>
                  {/* 上半空白空间 */}
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
                  {/* 标头 */}
                  <div className={styles.musicMainHead}>
                    <div>Music Management</div>
                    <div>Type</div>
                    <div>Add+</div>
                  </div>

                  {isLoading ? (
                    <h3 style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', marginTop: '2vh' }}>Loading...</h3>
                  ) : (
                    <MusicList musicData={backendData.data}/>
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
                {/* 3:2 拆分 */}
                <div className={styles.topContentTop}>
                  {/* 上半空白空间 */}
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
                      {/* <img src="/musicFace/CanonInD.jpg" alt="#"/> */}
                      <Dropzone onDrop={handleImageUpload} /*accept="image/*"*/>
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
                    </div>

                    <div className={styles.mainContentTopRight}>
                      {/* 歌曲主要信息 */}
                      <div className={styles.mainContentTopRightInner}>
                        <div className={styles.mainContentTopRightAdd}>
                          {/* Add Button */}
                          <button className={styles.addButton}>Add</button>
                        </div>
                        <div className={styles.mainContentTopRightName}>
                          {/* Music Name */}
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ marginLeft: '2vh', marginRight: '2vh' }}>Name:</span>
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
                          </div>
                        </div>
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
                  {/* 上面的 division */}
                  <div className={styles.topDivisionBottom}></div>

                  {/* 包装 <div className={styles.audioContainer}> */}
                  <div className={styles.audioContainerWrapper}>
                    <div className={styles.audioContainer}>
                      <h1 style={{ textAlign: 'center' }}>Audio Play</h1>
                      {uploadedFile && (
                        <audio controls>
                          <source src={URL.createObjectURL(uploadedFile)} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
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
