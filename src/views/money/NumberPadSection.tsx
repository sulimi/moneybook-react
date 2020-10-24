import React, {useState} from 'react';
import {Wrapper} from './numberPad/NumberPadWrapper';
import {generateOutPut} from './numberPad/generateOutput';

type Props={amount: number, onChange: (amount: number)=>void, onOk?: ()=>void}
const NumberPadSection: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState(props.amount.toString());
  const setOutput = (output: string) => {
  let newOutput
    if (output.length > 16) {
      newOutput = output.slice(0, 16);
    } else if (output.length === 0) {
      newOutput = '0';
    }else {
      newOutput=output
    }
    _setOutput(newOutput)
    props.onChange(parseFloat(newOutput))
  };
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === null) {
      return;
    }
    if (text==='ok'){
      if (props.onOk){props.onOk()}
      return;
    }
    type InputString = '0'|'1'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'删除'|'清空'|'.'
    if ('0123456789.'.split('').concat(['删除','清空']).indexOf(text)>=0){
      setOutput(generateOutPut((text as InputString), output))
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