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
    .icon{
      margin-left: 5px;
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
}
const Layout: React.FC<Props> = (props)=>{
  return (
  <Wrapper>
    {props.message&&<Header onClick={props.chooseDay}>{props.message}{props.chooseDay&&<Icon name='down'/>}</Header>}
    <Main className={props.className}>
      {props.children}
    </Main>
    <Nav />
  </Wrapper>
)
}

export default Layout