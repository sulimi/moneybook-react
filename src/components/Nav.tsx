import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import React from 'react';
import Icon from './Icon';


const NavWrapper = styled.div`
  line-height: 24px;
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  background: #fff;
  ul{
    display: flex;
    li{
      width: 33.333333%;
      padding: 4px ;
      font-size: 12px;
      text-align: center;
      a{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.selected{
          color: #A1DECF;
        .icon{
          fill:#A1DECF
        }
        }
        .icon{
          width: 24px;
          height: 24px;
        }
      }
 
    }
  }
`;

const Nav = () => {
  return (
    <NavWrapper>
      <ul>
        <li>
          <NavLink to="/tags" activeClassName="selected"><Icon name="detail"/>标签页</NavLink>
        </li>
        <li>
          <NavLink to="/money" activeClassName="selected"><Icon name="home"/>记账页</NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected"><Icon name="static"/>统计页</NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};


export default Nav;