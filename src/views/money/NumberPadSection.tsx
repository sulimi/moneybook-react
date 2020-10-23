import styled from 'styled-components';
import React, {useState} from 'react';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column; 
  > .output{
      background: #fff;font-size: 36px;line-height: 72px;text-align: right;padding: 0 16px;
      box-shadow: inset 0 -5px 5px -5px rgba(0,0,0,0.25),inset 0 5px 5px -5px rgba(0,0,0,0.25)};
  > .pad{
      flex-wrap: wrap;
    > button{
        width: 25%;height: 64px;float:left;font-size: 18px;
        &.ok{
          height: 128px;
          float: right;
        }
        &.zero{
          width: 50%;
        }
    }
  }
`;
const NumberPadSection: React.FC = () => {
  const [output, setOutput] = useState('0');
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === null) {
      return;
    }
    switch (text) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        if (output === '0') {
          setOutput(text); //覆盖
        } else {
          setOutput(output + text);
        }
        break;
      case '.':
        if (output.indexOf('.')>=0){return}
        setOutput(output + '.');
        break;
      case '删除':
        if (output.length === 1) {
          setOutput('0');
        } else {
          setOutput(output.slice(0, -1));
        }
        break;
      case '清空':
        setOutput('0');
        break;
      case 'ok':
        console.log('确认');
        break;
    }
  };
  return (
    <Wrapper>
      <div className='output'>{output}</div>
      <div className='pad clearfix' onClick={onClickButtonWrapper}>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>删除</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>清空</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className='ok'>ok</button>
        <button className='zero'>0</button>
        <button>.</button>
      </div>
    </Wrapper>
  );
};
export {NumberPadSection};