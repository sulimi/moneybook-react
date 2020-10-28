import Layout from '../components/Layout';
import styled from 'styled-components';
import React from 'react';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;align-items: center;
  > .about{
   display:flex;flex-direction: column;justify-content: flex-end;align-items: center;
   height: 30vh;font-weight: bold;
    .paytext{
      color: #A5C9C0;text-align: center;
      font-size: 14px;
    }
    .paynum{
      color: #A5C9C0;font-size: 32px;text-align: center;padding: 10px;
    }
    .in{
      font-size: 14px;color: #AAAAAA;text-align: center;
    }
  }
  > .add-wrapper{
      height: 20vh;padding-bottom: 30px;
      display:flex;flex-direction: column;justify-content: flex-end;align-items: center;
    > .addmoney{
  font-size: 16px;font-weight: bold;color: #444444;
    background: #BFD9D3;border: 1px solid #65C6BB;padding: 12px 40px;border-radius: 10px;
  }
  }

  > .toggle{
  display: flex;justify-content: center;align-items: center;
    font-size: 14px;color: #AAAAAA;
    .icon{
      fill: #AAAAAA;margin-left: 10px;
    }
  }
  
`;


function Money() {

  return (
    <MyLayout message='TODAY'>
      <div className='about'>
        <div className='paytext'>今日支出</div>
        <div className='paynum'>￥1415</div>
        <div className='in'>收入￥789</div>
      </div>
      <Link className='add-wrapper' to='/addmoney'>
        <button className='addmoney'>记一笔</button>
      </Link>
      <div className='toggle'>展示近30日账单 (6)<Icon name='right'/></div>
    </MyLayout>
  );
}

export default Money;

