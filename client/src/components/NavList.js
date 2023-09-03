import React from 'react';
import './navList.css';

const NavList = ({ allTags, onCategoryClick, activeCategory }) => {
  return (
    <div className="nav-list-wrap">
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`nav-item flex-center ${tag === activeCategory ? 'active' : ''}`}
          onClick={() => onCategoryClick(tag)} // 点击时调用处理函数，传递选定的标签
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default NavList;
