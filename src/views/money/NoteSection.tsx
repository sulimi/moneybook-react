import styled from 'styled-components';
import React, {useRef} from 'react';

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


type Props = { note: string, onChange: (note: string) => void }
const NoteSection: React.FC<Props> = (props) => {
  // const [note, setNote] = useState('');
  const note = props.note;
  const refInput = useRef<HTMLInputElement>(null);
  const changeNote = () => {
    if (refInput.current !== null) {
      props.onChange(refInput.current.value);
    }
  };
  return (
    <Wrapper>
      <label>
        <span>备注</span>
        <input placeholder="在这里输入备注" type="text" defaultValue={note}
               ref={refInput}
               onBlur={changeNote}
        />
      </label>
    </Wrapper>
  );
};

export {NoteSection};