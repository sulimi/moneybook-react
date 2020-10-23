import styled from 'styled-components';
import React, {useState} from 'react';

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
  const [note, setNote] = useState('')
  console.log(note);
  return (
    <Wrapper>
      <label>
        <span>备注</span>
        <input placeholder="在这里输入备注" type="text" value={note}
               onChange={(e)=>setNote(e.target.value)}
        />
      </label>
    </Wrapper>
  );
};

export {NoteSection};