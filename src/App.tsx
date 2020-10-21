import React from 'react';
import styled from 'styled-components';
import 'index.scss';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

const Wrapper = styled.div`
  border: 1px solid red;
  height: 100vh;
  display:flex;
  flex-direction: column;
`;
const Main = styled.div`
  border: 1px solid blue;
  flex-grow: 1;
  overflow-y: auto;
`;
const Nav = styled.div`
  ul{
    display: flex;
    li{
      width: 33.333333%;
      text-align: center;
      padding: 16px;
    }
  }
`;

function App() {
  return (
    <Router>
      <Wrapper>
        <Main>
          <Switch>
            <Route path="/tags">
              <Tags/>
            </Route>
            <Route path="/money">
              <Money/>
            </Route>
            <Route path="/statistics">
              <Statistics/>
            </Route>
            <Redirect exact from="/" to="/money"/>
            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </Main>
        <Nav>
          <ul>
            <li>
              <Link to="/tags">标签页</Link>
            </li>
            <li>
              <Link to="/money">记账页</Link>
            </li>
            <li>
              <Link to="/statistics">统计页</Link>
            </li>
          </ul>
        </Nav>
      </Wrapper>
    </Router>
  );
}

function Tags() {
  return <h2>标签标签标签</h2>;
}

function Money() {
  return <h2>记账记账记账</h2>;
}

function Statistics() {
  return <h2>统计统计统计</h2>;
}

function NoMatch() {
  return (
    <div>页面不存在</div>
  );
}

export default App;
