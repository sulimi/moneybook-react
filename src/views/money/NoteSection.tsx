import styled from 'styled-components';
import React, {ChangeEventHandler} from 'react';
import {Input} from '../../components/Input';

const Wrapper = styled.section`
  font-size: 14px; 
`;


type Props = { note: string, onChange: (note: string) => void }
const NoteSection: React.FC<Props> = (props) => {
  const note = props.note;
  const changeNote:ChangeEventHandler<HTMLInputElement> = (e) => {
      props.onChange(e.target.value);
    console.log(props.onChange(e.target.value));
  };
  return (
    <Wrapper>
      <Input type='text' value={note} onChange={changeNote} placeholder='写点备注...'/>
    </Wrapper>
  );
};

export {NoteSection};