import React, { useState } from 'react'
import './navList.css'

const NavList = ({ activeCategory, onCategoryClick }) => {
  const [nav, setNav] = useState([
    {
      text: 'All',
      active: false
    },
    {
      text: 'Classical',
      active: false
    },
    {
      text: 'Ensembles',
      active: false
    },
    {
      text: 'Natural Sound',
      active: false
    },
    {
      text: 'Pop',
      active: false
    },
    {
      text: 'Rhythmic',
      active: false
    },
    {
      text: 'Slow smoothing',
      active: false
    },
    {
      text: 'Vocal',
      active: false
    }
  ])

  // 处理点击分类项的函数
  const handleCategoryClick = (categoryText) => {
    // 更新活动状态
    const updatedNav = nav.map((item) => ({
      ...item,
      active: item.text === categoryText
    }))
    setNav(updatedNav)

    // 通知父组件所选的分类
    onCategoryClick(categoryText)
  }

  return (
    <div className='nav-list-wrap'>
      {nav.map((item) => (
        <a
          key={item.text}
          className={`nav-item flex-center ${item.active ? 'active' : ''}`}
          onClick={() => handleCategoryClick(item.text)} // 点击时调用处理函数
        >
          {item.text}
        </a>
      ))}
    </div>
  )
}

export default NavList
