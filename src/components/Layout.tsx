import Nav from './Nav';
import React from 'react';
import styled from 'styled-components';
import Icon from './Icon';


const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  flex-direction: column;
`;
const Header=styled.header`
    font-size: 18px;font-weight: bold;color: #444;padding: 5px 10px;
    display: flex;justify-content: center;align-items: center;flex-shrink: 0;height: 5vh;
    .monthyear{
    padding: 0 16px;text-align: center;color: #A5C9C0;width: 20vw;
          @media (max-height:570px){
       font-size: 14px;
     }
    
    &:nth-child(1){
    border-bottom: 1px solid #A5C9C0;
    }
    }
    .text{
    flex-grow: 1;text-align: center;
        .icon{
      margin-left: 5px;
    }
    }

`
const Main = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  &::-webkit-scrollbar{
    display:none;
  }
`;
type Props={
  message?: string
  className?:string
  chooseDay?:()=>void
  monthYear?:boolean
  toggleMonthYear?:()=>void
}
const Layout: React.FC<Props> = (props)=>{
  return (
  <Wrapper>
    {props.message&&
    <Header>
      <div className='monthyear' onClick={props.toggleMonthYear}>
        {props.monthYear?'按年':'按月'}
      </div>
      <div className='text' onClick={props.chooseDay}>
        {props.message}
        {props.chooseDay&&<Icon name='down'/>}
      </div>
      <div className='monthyear'/>
    </Header>}
    <Main className={props.className}>
      {props.children}
    </Main>
    <Nav />
  </Wrapper>
)
}

export default Layout