import React from 'react';
import 'index.scss';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Tags from './views/tag/Tags';
import Money from './views/Money';
import NoMatch from './views/NoMatch';
import styled from 'styled-components';
import {TagEdit} from './views/tag/TagEdit';
import {AddMoney} from './views/AddMoney';
import {Detail} from './views/Detail';
import {TagAdd} from './views/tag/TagAdd';
import {DayDetail} from './views/detail/DayDetail';
import {Statistics} from './views/Statis';
import {EditorRecord} from './views/record/EditorRecord';
import {EditorIng} from './views/record/EditorIng';
import {AllByTags} from './views/statis/AllByTags';


const AppWrapper = styled.div`
color: #333;
    @media (max-height:570px){
        font-size: 12px
        }
`;

function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/tags">
            <Tags/>
          </Route>
          <Route exact path="/detail">
            <Detail/>
          </Route>
          <Route exact path="/daydetail/:date">
            <DayDetail/>
          </Route>
          <Route exact path="/editorrecord/:id">
            <EditorRecord/>
          </Route>
          <Route exact path="/tags/:id">
            <TagEdit/>
          </Route>
          <Route exact path="/tagadd">
            <TagAdd/>
          </Route>
          <Route exact path="/money">
            <Money/>
          </Route>
          <Route exact path="/addmoney">
            <AddMoney/>
          </Route>
          <Route exact path="/editoring/:id">
            <EditorIng />
          </Route>
          <Route exact path="/statistics">
            <Statistics/>
          </Route>
          <Route exact path="/allbytags/:tag">
            <AllByTags/>
          </Route>
          <Redirect exact from="/" to="/money"/>
          <Route path="*">
            <NoMatch/>
          </Route>
        </Switch>
      </Router>
    </AppWrapper>

  );
}


export default App;
