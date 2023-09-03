import { useState } from 'react';
import './navList.css';

const NavList = () => {
  const [nav, setNav] = useState([
    {
      text: '分类1',
      active: false,
    },
    {
      text: '分类2',
      active: false,
    },
    {
      text: '分类3',
      active: false,
    },
    {
      text: '分类4',
      active: false,
    },
    {
      text: '分类5',
      active: false,
    },
    {
      text: '分类6',
      active: false,
    },
    {
      text: '分类7',
      active: false,
    },
    {
      text: '分类8',
      active: false,
    },
  ]);

  return (
    <div className="nav-list-wrap">
      {nav.map((item) => {
        return (
          <a key={item.text} className={`nav-item flex-center`}>
            {item.text}
          </a>
        );
      })}
    </div>
  );
};

export default NavList;
