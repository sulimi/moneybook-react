import Nav from './Nav';
import React from 'react';
import styled from 'styled-components';


const Wrapper = styled.div`
  height: 100vh;
  display:flex;
  flex-direction: column;
`;
const Header=styled.header`
    font-size: 18px;font-weight: bold;color: #444;padding: 5px 10px;
    display: flex;justify-content: center;align-items: center;flex-shrink: 0;height: 5vh;
`
const Main = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;
// type Props={
//   message: string
// }
const Layout = (props: any)=>{
  return (
  <Wrapper>
    {props.message&&<Header>{props.message}</Header>}
    <Main className={props.className}>
      {props.children}
    </Main>
    <Nav />
  </Wrapper>
)
}

export default Layout