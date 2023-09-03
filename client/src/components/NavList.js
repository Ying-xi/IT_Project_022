import { useState } from 'react';
import './navList.css';

const NavList = () => {
  const [nav, setNav] = useState([
    {
      text: 'Class1',
      active: false,
    },
    {
      text: 'Class2',
      active: false,
    },
    {
      text: 'Class3',
      active: false,
    },
    {
      text: 'Class4',
      active: false,
    },
    {
      text: 'Class5',
      active: false,
    },
    {
      text: 'Class6',
      active: false,
    },
    {
      text: 'Class7',
      active: false,
    },
    {
      text: 'Class8',
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
