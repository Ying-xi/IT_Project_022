import React, { useState } from 'react';
import style from './keyboard.module.css';
import { useKeyEvent } from './hooks/useKeyEvent';
import IconArrow from './components/IconArrow/index';
import Popup from './components/Popup';

export default function Keyboard() {
  const { data, playSound } = useKeyEvent();
  const [showPop, setShowPop] = useState(false);

  return (
    <>
      <div className={style['con']}>
        <div onClick={() => setShowPop(true)} className={style['help-wrap']}>
          HELP❓
        </div>

        {data.map((item) => {
          return (
            <div key={item} className={style['key-item-wrap']}>
              <IconArrow onClick={() => playSound(`up_${item}`)} color="#000" />

              <div
                className={style['key-item']}
                onClick={(e) => {
                  playSound(item);
                }}
              >
                <p>{item}</p>
              </div>

              <IconArrow down onClick={() => playSound(`down_${item}`)} color="#ddd" />
            </div>
          );
        })}
      </div>

      <Popup show={showPop} onHide={() => setShowPop(false)}>
        <div className={style['help-pop-wrap']}>
            Enjoy the music created by yourself!
            You can play the piano sound by touch the key directly, or you can use your keyboard to do so.
            A W S E D R F are corresponded to the do re mi fa so fa ti key individually.
            Try the combination of down or up key with the alphabet key, you will get a different experience!
            (Touch anywhere out of the window to close)
        </div>
      </Popup>
    </>
  );
}
