import React from 'react';
import {NumberPadSection} from './money/NumberPadSection';
import {TagsSection} from './money/TagsSection';
import {NotesSection} from './money/NotesSection';
import {CategorySection} from './money/CategorySection';
import styled from 'styled-components';
import Layout from '../components/Layout';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

function Money() {
  return (
    <MyLayout>
      <TagsSection/>
      <NotesSection/>
      <CategorySection/>
      <NumberPadSection/>
    </MyLayout>
  );
}

export default Money;