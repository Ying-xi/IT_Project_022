import { MouseEventHandler, useRef, useState } from 'react';
import styled from 'styled-components';
import NavList from './NavList';

const HomeWrap = styled.div`
  width: 100%;
  overflow: auto;
  padding-bottom: 300px;

  /* 弹窗样式 */
  .modal {
    /* display: none; */
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
  }

  .modal-content {
    background-color: #fff;
    margin: 20% auto;
    padding: 20px;
    width: 50%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .text-container {
    font-family: Arial, sans-serif;
    font-size: 25.6px;
    color: rgba(204, 159, 98, 0.9);
    /* line-height: 0.5; */
    /* height: 100%; */
  }

  /* navbar & dock */

  .navbar {
    /* background-image: url('../../navbar-bg.jpg'); */
    /* background-image: url('../../assets/img/navbar-bg.jpg'); */
    background-image: url(${require('@img/navbar-bg.jpg')});
    background-size: cover;
    height: 10vh;
    color: white;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 2vh;
    /* extra */
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
  }

  .navbar a {
    text-decoration: none;
    color: white;
    margin-left: 2vh;
    padding: 2vh 4vh;
    background-color: green;
    border-radius: 1vh;
    box-shadow: 0 1vh 2vh rgba(54, 54, 54, 0.6);
    /* extra */
    text-align: center;
  }

  .dock-background {
    position: fixed;
    bottom: 4vh;
    left: 30%;
    width: 40%;
    height: 8vh;
    background: linear-gradient(
      135deg,
      rgba(205, 203, 203, 0.74) 0%,
      rgba(202, 202, 202, 0.472) 100%
    );
    backdrop-filter: blur(1vh);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1vh;
    border-radius: 3vh;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
  }

  .dock-buttons {
    display: flex;
    flex-grow: 1;
    gap: 2vh;
  }

  .dock-button {
    width: 6vh;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: green;
    color: white;
    font-size: 3vh;
    border-radius: 3vh;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .dock-button:hover {
    background-color: rgb(93, 242, 93);
  }

  .dock-text {
    flex-grow: 1;
    height: 6vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: green;
    color: white;
    font-weight: bold;
    border-radius: 1vh;
  }

  .nav-link {
    text-decoration: none;
    color: white;
    margin-left: 2vh;
    padding: 2vh 4vh;
    background-color: green;
    border-radius: 1vh;
    box-shadow: 0 1vh 2vh rgba(54, 54, 54, 0.6);
    text-align: center;
    transition: background-color 0.3s ease;
  }

  .nav-link:hover {
    background-color: rgb(93, 242, 93);
  }

  .search-container {
    border-radius: 8px;
    padding: 10px;
    /* box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); */
    display: flex;
    align-items: center;
  }

  .search-inp {
    border: none;
    padding: 0 8px;
    flex-grow: 1;
    box-shadow: none;
    border-bottom: solid 1px rgba(208, 208, 208, 0.934);
    margin: 0 10px;
    height: 100%;
    background-color: transparent;
    color: #fff;
    font-size: 18px;
    width: 160px;
  }

  .search-btn {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 13px 26px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    font-size: 16px;
  }

  .search-btn:hover {
    background-color: rgb(93, 242, 93);
    transform: scale(1.05);
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }

  .button-container {
    padding: 0 100px;
    display: grid;
    grid-template-columns: repeat(4, auto);
    grid-gap: 100px 20px;
    place-items: center;
    place-content: center;
    /* background-color: pink; */
  }

  .button {
    /* background-image: url(./rain.jpg); */
    text-align: center;
    transition: transform 0.3s ease;
    /* background-color: red; */
    border-radius: 10px;
    position: relative;
    /* width: 400px; */
    /* height: 100%; */
  }

  .button:hover {
    transform: scale(1.06);
    z-index: 99;
  }

  .button > img {
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  /* 按钮文案 */
  .button > .music-item-text {
    /* position: absolute;
    bottom: 0;
    left: 0;
    width: 100%; */
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    /* backdrop-filter: blur(5px); */

    /* text-align: right; */
    cursor: pointer;
    background: rgba(0, 0, 0, 0.307);
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    color: #fff;
  }

  .size-container {
    margin: 20px auto;
    padding: 5px 110px;
    display: flex;
    justify-content: space-between;
  }
`;

const Home = () => {
  const myAudio = useRef(null); // 音乐DOM
  const audioSource = useRef(null); // 音频来源DOM

  /**
   * 播放音乐
   * @param songPath 音乐路径
   */
  const playSong = (songPath: string) => {
    audioSource.current.src = songPath;
    myAudio.current.load();
    myAudio.current.play();
  };

  return (
    <HomeWrap className="pt-100px">
      <div className="navbar bg-red">
        <a href="combination.html" className="nav-link">
          {' '}
          &nbsp;&nbsp;Home&nbsp;&nbsp;{' '}
        </a>
        <a href="#" className="nav-link">
          ⚙ Setting
        </a>
        <a href="#" className="nav-link mr-5vh">
          👤 Log In
        </a>
      </div>

      <audio id="myAudio" ref={myAudio}>
        <source id="audioSource" ref={audioSource} src="" type="audio/mpeg" />
      </audio>

      {/* 分类 */}
      <div className="size-container relative">
        <NavList></NavList>

        <form className="search-container" action="/url" method="get">
          <img src={require('@img/icon-search.svg')} alt="" className="w-25px" />
          <input className="search-inp" type="text" placeholder="Search your music" />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </div>

      {/* 每个音乐 */}
      <div className="button-container">
        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/AuldLangSyne.jpg')}
            onClick={() => playSong(require('@song/AuldLangSyne.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">Auld Lang Syne</p>
        </div>
        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/Bleu.jpg')}
            onClick={() => playSong(require('@song/Bleu.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">Bleu</p>
        </div>
        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/CanonInD.jpg')}
            onClick={() => playSong(require('@song/CanonInD.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">Canon In D</p>
        </div>
        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/RelaxingRain.jpg')}
            onClick={() => playSong(require('@song/RelaxingRain.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">Relaxing Rain</p>
        </div>

        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/VocaliseOp34No14.jpg')}
            onClick={() => playSong(require('@song/VocaliseOp34No14.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">Vocalise, Op34, No14</p>
        </div>
        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/WhatMakesYouBeautiful.jpg')}
            onClick={() => playSong(require('@song/WhatMakesYouBeautiful.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">What Makes You Beautiful</p>
        </div>
        <div className={`button w-[400pw] h-[350pw] text-30pw`}>
          <img
            src={require('@img/WinterBokeh.jpg')}
            onClick={() => playSong(require('@song/WinterBokeh.mp3'))}
            alt="音乐按钮"
            className={``}
          />
          <p className="music-item-text">Winter Bokeh</p>
        </div>
      </div>

      <div className="dock-background">
        <div className="dock-buttons">
          <div className="dock-text">🎵 Raining</div>
          <div className="dock-button toggle-play">▶️</div>
          <div className="dock-button toggle-volume">🔊</div>
        </div>
      </div>
    </HomeWrap>
  );
};

export default Home;
