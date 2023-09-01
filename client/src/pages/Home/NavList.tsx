import styled from 'styled-components';
import { useState } from 'react';

const NavWrap = styled.div`
  display: grid;
  place-items: center;
  place-content: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;

  .nav-item {
    background-color: #acbd7f;
    color: #fff;
    border-radius: 40px;
  }
`;

const NavList = () => {
  const [nav, setNav] = useState([
    {
      text: 'All',
      active: false,
    },
    {
      text: 'Classical',
      active: false,
    },
    {
      text: 'Ensembles',
      active: false,
    },
    {
      text: 'Natural Sound',
      active: false,
    },
    {
      text: 'Pop',
      active: false,
    },
    {
      text: 'Rhythmic',
      active: false,
    },
    {
      text: 'Slow Soothing',
      active: false,
    },
    {
      text: 'Vocal',
      active: false,
    },
  ]);

  return (
    <NavWrap>
      {nav.map((item) => {
        return (
          <a key={item.text} className={`nav-item flex-center w-[200pw] h-[50pw] text-25pw`}>
            {item.text}
          </a>
        );
      })}
    </NavWrap>
  );
};

export default NavList;
