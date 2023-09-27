import React from 'react';
import './navList.css';

/* combine filter tags with color frames*/
const NavList = ({ allTags, onCategoryClick, activeCategory }) => {
  return (
    <div className="nav-list-wrap">
      {allTags.map((tag) => (
        <button
          key={tag}
          className={`nav-item flex-center ${tag === activeCategory ? 'active' : ''} ${tag}`}
          onClick={() => onCategoryClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default NavList;
