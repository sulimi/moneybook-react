import {DisplayWrapper, DisplayWrapper2, ThirtyDayList} from '../money/MoneyHTML';
import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import Icon from '../../components/Icon';


const Bar = styled.div`
  position: relative;margin-top: 3px;
  .one,.two{
    position: absolute;top: 0;left: 0;height: 8px;border-radius: 4px;
  }
  .one{
    background: #fff;width: 55vw;
        @media (max-height:570px){
        width: 50vw;
        }
  }
    .two{
    background: #A5C9C0;
    &.out{
      background: #ffc0cb;
    }
  }
`;


type Props = {
  byTagItem: [string, number]
  count: number
}
const StatiByTagItem: React.FC<Props> = (props) => {
  const {byTagItem, count} = props;
  const tagName = byTagItem[0].split('&&');
  const percent = parseFloat((byTagItem[1] / count * 100).toFixed(2)) + '%';
  const percentElementBottom = useRef<HTMLDivElement>(null);
  const percentElementTop = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (percentElementBottom.current == null) return;
    if (percentElementTop.current == null) return;
    const {width} = percentElementBottom.current.getBoundingClientRect();
    const setWidth = width * (byTagItem[1] / count);
    percentElementTop.current.setAttribute('style', `width:${setWidth}px`);

  }, []);
  return (
    <ThirtyDayList>
      <DisplayWrapper>
        <Icon name={tagName[1]}/>
        <DisplayWrapper2>
          <div className='name'><span className='text'>{tagName[0]}</span><span>￥{byTagItem[1]}</span></div>
          <div className='note static'>
            <Bar>
              <div className='one' ref={percentElementBottom}/>
              <div className={tagName[2] === '-' ? 'two out' : 'two'} ref={percentElementTop}/>
            </Bar>
          </div>
        </DisplayWrapper2>
      </DisplayWrapper>
      <div className={tagName[2] === '-' ? 'amount static' : 'amount zheng static'}>{percent}</div>
    </ThirtyDayList>
  );
};

export {StatiByTagItem};