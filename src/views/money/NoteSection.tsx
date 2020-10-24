import styled from 'styled-components';
import React, {ChangeEventHandler} from 'react';
import {Input} from '../../components/Input';

const Wrapper = styled.section`
  background: #f5f5f5; padding: 10px 16px;
  font-size: 14px;
`;


type Props = { note: string, onChange: (note: string) => void }
const NoteSection: React.FC<Props> = (props) => {
  const note = props.note;
  // const refInput = useRef<HTMLInputElement>(null);
  const changeNote:ChangeEventHandler<HTMLInputElement> = (e) => {
    // if (refInput.current !== null) {
      props.onChange(e.target.value);
    // }
  };
  return (
    <Wrapper>
     {/* <label>
        <span>备注</span>
        <input placeholder="在这里输入备注" type="text" defaultValue={note}
               ref={refInput}
               onBlur={changeNote}
        />
      </label>*/}
      <Input text='备注' type='text' value={note} onChange={changeNote}/>
    </Wrapper>
  );
};

export {NoteSection};