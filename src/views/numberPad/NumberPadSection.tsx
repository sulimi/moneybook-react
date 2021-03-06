import React, {useState} from 'react';
import {Wrapper} from './NumberPadWrapper';
import {generateOutPut} from './generateOutput';
import {NoteSection} from '../../components/NoteSection';
import {Message} from '../../components/Message';
import {thousand} from '../../lib/thousandSeparator';
import {useDate} from '../../hooks/useDate';
import dayjs, {Dayjs} from 'dayjs';
import {DaysBook} from './DaysBook';

type Props = {
  id?:number,
  amount: number,
  note: string,
  createdAt: Dayjs,
  onChange: (amount: number) => void,
  onOk?: () => void,
  onChangeNote: (note: string) => void,
  onChangeDay:(createAt: Dayjs)=>void
}
const NumberPadSection: React.FC<Props> = (props) => {
  const [output, _setOutput] = useState(props.amount.toString());
  const [success, setSuccess] = useState(false);
  const setOutput = (output: string) => {
    let newOutput;
    if (output.length > 10) {
      newOutput = output.slice(0, 10);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1500);
    } else if (output.length === 0) {
      newOutput = '0';
    } else {
      newOutput = output;
    }
    _setOutput(newOutput);
    props.onChange(parseFloat(parseFloat(newOutput).toFixed(2)));
  };
  const onClickButtonWrapper = (e: React.MouseEvent) => {
    const text = (e.target as HTMLButtonElement).textContent;
    if (text === null) {
      return;
    }
    if (text === 'ok') {
      if (props.onOk) {
        props.onOk();
        if (props.id){return;}
        setOutput('0');
        props.onChangeNote('');
        props.onChangeDay(dayjs())
        onSelectDay(dayjs())
      }
      return;
    }
    type InputString = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '删除' | '清空' | '.'
    if ('0123456789.'.split('').concat(['删除', '清空']).indexOf(text) >= 0) {
      setOutput(generateOutPut((text as InputString), output));
    }
  };


  //日期
  const {onSelectDay} = useDate();
  const [showDays,setShowDays]=useState(false)
  const onShowDays=()=>{
    setShowDays((showDays)=>!showDays)
  }
  const onChangeDay=(d:Dayjs)=>{
    props.onChangeDay(d)
    onSelectDay(d)
  }
  const onToggel=(e:any)=>{
    e.stopPropagation()
    setShowDays((showDays)=>!showDays)
  }
  const dayBtn=()=>{
    if (dayjs(props.createdAt).isSame(dayjs(),'day')){
      return '今天'
    }else {
      return dayjs(props.createdAt).format('M月D日')
    }
  }
  return (
    <Wrapper>
      {success ? <Message>金额太大啦！先存一笔吧~</Message> : ''}
      <div className='top'>
        <div className='day' onClick={onShowDays}>{dayBtn()}</div>
        <div className='output'>
          <NoteSection note={props.note}
                       onChange={props.onChangeNote}/>
          <div className='num'>
            <span className='cny'>CNY</span><span className={output.length > 7 ? 'small' : ''}>{thousand(output)}</span>
          </div>

        </div>
      </div>
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
      {showDays?<DaysBook createdAt={props.createdAt} onChangeDay={onChangeDay} onToggleClick={onToggel}/>:''}
    </Wrapper>
  );
};
export {NumberPadSection};