import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import React from 'react';
import Icon from './Icon';


const NavWrapper = styled.div`
  line-height: 20px;
  background: #fff;
  ul{
    display: flex;
    li{
      width: 33.333333%;
      padding: 4px ;
      font-size: 10px;
      text-align: center;
      a{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #AAA;
        &.selected{
          color: #A1DECF;
        .icon{
          fill:#A1DECF
        }
        }
        .icon{
          width: 20px;
          height: 20px;
          fill:#AAA
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
          <NavLink to="/money" activeClassName="selected"><Icon name="home"/>记账</NavLink>
        </li>
        <li>
          <NavLink to="/detail" activeClassName="selected"><Icon name="detail"/>明细</NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName="selected"><Icon name="static"/>统计</NavLink>
        </li>
      </ul>
    </NavWrapper>
  );
};


export default Nav;