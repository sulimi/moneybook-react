import {CategorySection} from './money/CategorySection';
import {NoteSection} from './money/NoteSection';
import Layout from '../components/Layout';
import {NumberPadSection} from './money/NumberPadSection';
import {TagsSection} from './money/TagsSection';
import styled from 'styled-components';
import React, {useState} from 'react';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
`;

type Category = '-' | '+'

function Money() {
  const [record, setRecord] = useState({
    tags: [] as string[],
    note: '',
    category: '-' as Category,
    amount: 0
  });
  return (
    <MyLayout>
      <TagsSection tags={record.tags}
                   onChange={(tags) => setRecord({...record, tags: tags})}/>
      <NoteSection note={record.note}
                   onChange={(note) => setRecord({...record, note: note})}/>
      <CategorySection category={record.category}
                       onChange={(category) => setRecord({...record, category: category})}/>
      <NumberPadSection amount={record.amount}
                        onChange={(amount) => setRecord({...record, amount: amount})}
                        onOk={()=>{}}
      />
    </MyLayout>
  );
}

export default Money;

