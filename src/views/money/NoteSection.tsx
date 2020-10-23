import styled from 'styled-components';
import React, {useRef, useState} from 'react';

const Wrapper = styled.section`
  background: #f5f5f5; padding: 10px 16px;
  font-size: 14px;
  label{
  display: flex;align-items: center;
    span{ margin-right: 16px;flex-shrink: 0;}
    input{
      display: block;height: 72px;
      flex-grow: 1;border: none;background: none;
    }
  }
`;
const NoteSection: React.FC = () => {
  const [note, setNote] = useState('');
  const refInput = useRef<HTMLInputElement>(null);
  const changeNote = () => {
    if (refInput.current !== null) {
      setNote(refInput.current.value);
      console.log(note);
    }
  };
  const x=()=>{
    console.log(1);
  }
  return (
    <Wrapper>
      <label>
        <span>备注</span>
        <input placeholder="在这里输入备注" type="text" defaultValue={note}
               ref={refInput}
               onBlur={changeNote}
               onChange={x}
        />
      </label>
    </Wrapper>
  );
};

export {NoteSection};