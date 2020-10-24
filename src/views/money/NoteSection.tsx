import styled from 'styled-components';
import React, {ChangeEventHandler} from 'react';
import {Input} from '../../components/Input';

const Wrapper = styled.section`
  background: #f5f5f5; padding: 14px 16px;
  font-size: 14px;
`;


type Props = { note: string, onChange: (note: string) => void }
const NoteSection: React.FC<Props> = (props) => {
  const note = props.note;
  const changeNote:ChangeEventHandler<HTMLInputElement> = (e) => {
      props.onChange(e.target.value);
  };
  return (
    <Wrapper>
      <Input text='备注' type='text' value={note} onChange={changeNote} placeholder='请输入备注'/>
    </Wrapper>
  );
};

export {NoteSection};