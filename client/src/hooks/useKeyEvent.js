import { useRef } from 'react';
import { useEffect, useState } from 'react';

export const useKeyEvent = () => {
  const [data] = useState(['do', 're', 'mi', 'fa', 'so', 'la', 'ti']);
  const [dirKey] = useState(['ARROWUP', 'ARROWDOWN', 'ARROWLEFT', 'ARROWRIGHT']);
  const [funcKey] = useState(['A', 'W', 'S', 'E', 'D', 'R', 'F']);
  const dirKeying = useRef(''); // 按下的方向键

  const playing = useRef(false);
  const playRef = useRef(null);

  let current = null;
  const playSound = (note) => {
    // console.log('props..');

    if (playing.current) {
      return;
    }
    playing.current = true;
    playRef.current = setTimeout(() => {
      playing.current = false;
      clearTimeout(playRef.current);
    }, 100);

    const src = require(`../music/${note}.mp3`);

    if (current) {
      current.pause();
      current.currentTime = 0;
    }
    //创建媒体对象
    const audio = new Audio(src);

    //调用play方法
    audio.play();
    current = audio;
  };

  /**
   * 计算音乐文件的文件名
   * @param {*} name 名字
   * @param {*} prefix 名字前缀
   */
  const calcMusicName = (name, prefix) => {
    console.log('按下的键盘：', prefix+name);

    switch (name) {
      case funcKey[0]:
        playSound(`${prefix}${data[0]}`);
        break;
      case funcKey[1]:
        playSound(`${prefix}${data[1]}`);
        break;
      case funcKey[2]:
        playSound(`${prefix}${data[2]}`);
        break;
      case funcKey[3]:
        playSound(`${prefix}${data[3]}`);
        break;
      case funcKey[4]:
        playSound(`${prefix}${data[4]}`);
        break;
      case funcKey[5]:
        playSound(`${prefix}${data[5]}`);
        break;
      case funcKey[6]:
        playSound(`${prefix}${data[6]}`);
        break;
    }
  };

  /**
   * 只触发普通音节
   */
  const calcFuncKey = (k) => {
    calcMusicName(k, '');
  };

  /**
   * 触发高音
   */
  const calcUpKey = (k) => {
    calcMusicName(k, 'up_');
  };

  /**
   * 触发低音
   */
  const calcDownKey = (k) => {
    calcMusicName(k, 'down_');
  };

  /**
   * 触发组合键or单键
   */
  const onKeyUpPlay = (e) => {
    let k = e.key.toUpperCase();

    if (dirKey.includes(k)) {
      // 方向键不要触发keyup
      return;
    }

    if (dirKeying.current && dirKeying.current === dirKey[0]) {
      calcUpKey(k);
    } else if (dirKeying.current && dirKeying.current === dirKey[1]) {
      calcDownKey(k);
    } else {
      calcFuncKey(k);
    }

    dirKeying.current = '';
  };

  /**
   * 触发方向键
   */
  const onKeydown = (e) => {
    const k = e.key.toUpperCase();
    if (dirKey.includes(k)) {
      // 按下了方向键
      dirKeying.current = k;
    }
  };

  useEffect(() => {
    document.body.addEventListener('keydown', onKeydown);
    document.body.addEventListener('keyup', onKeyUpPlay);

    return () => {
      document.body.removeEventListener('keydown', onKeydown);
      document.body.removeEventListener('keyup', onKeyUpPlay);
    };
  }, []);

  return {
    data,
    playSound,
  };
};
