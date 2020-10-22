import styled from 'styled-components';
import {Link} from 'react-router-dom';
import React from 'react';
require('icons/money.svg')
require('icons/tag.svg')
require('icons/static.svg')

const NavWrapper = styled.div`
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  ul{
    display: flex;
    li{
      width: 33.333333%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 4px ;
      font-size: 12px;
      .icon{
      width: 24px;
      height: 24px;
      }
    }
  }
`;

const Nav = () =>{
  return (
    <NavWrapper>
      <ul>
        <li>
          <svg className="icon">
            <use xlinkHref="#money"/>
          </svg>
          <Link to="/tags">标签页</Link>
        </li>
        <li>
          <svg className="icon">
            <use xlinkHref="#tag"/>
          </svg>
          <Link to="/money">记账页</Link>
        </li>
        <li>
          <svg className="icon">
            <use xlinkHref="#static"/>
          </svg>
          <Link to="/statistics">统计页</Link>
        </li>
      </ul>
    </NavWrapper>
  )
}


export default Nav