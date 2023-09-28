import { useState } from 'react';
import { useEffect } from 'react';
import style from './index.module.css';

const SearchComp = (props) => {
  const [inp, setInp] = useState('');

  return (
    <form
      className={style['search-container']}
      onSubmit={(e) => {
        e.preventDefault();
        props.onChange(inp.trim());
      }}
    >
      {/* <img src={"../public/navbar-bg.jpg"} alt="" className="w-25px" /> */}
      <input
        onInput={(e) => {
          setInp(e.target.value);
        }}
        value={inp}
        className={style['search-inp']}
        type="text"
        placeholder="Search your music"
      />
      <button type="submit" className={style['search-btn']}>
        Search
      </button>
    </form>
  );
};

export default SearchComp;
