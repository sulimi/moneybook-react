import React from 'react';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import {useDate} from '../../hooks/useDate';


const Wrapper = styled.div`
  display: flex;flex-direction:column;justify-content: center;align-items: center;
  width: 100%;z-index: 99;height: 100vh;
  position: absolute;
  top: 5vh;
  left: 50%;transform: translateX(-50%);
`;
const Header = styled.div`
  display: flex;justify-content: space-between;align-items: center;
  width: 100%;font-weight: bold;background: #CCE2DB;
.item{
  width: 20%;text-align: center;padding: 16px 10px;
  &:nth-child(1){
    border-right: 1px solid #AAA;
  }
  .icon{
    width: 1.5em;height: 1.5em;
  }
}
`;
const Body = styled.div`
  display: flex;align-items: center;flex-wrap: wrap;padding: 20px;background: #fff;border: 1px solid #CCE2DB;
`;
const Item = styled.div`
  width: 33.3333%;padding: 20px 10px;text-align: center;
`;
const Bottom = styled.div`
width: 100%;background:transparent;flex-grow: 1;
`;

type Props={
  chooseDay:(d:number)=>void
  onToggle:()=>void
  monthYear:boolean
}
const StatisDay:React.FC<Props> = (props) => {
  const {showData, setShowData, onChangYear} = useDate();
  const chooseMonth = [['一月', 0], ['二月', 1], ['三月', 2], ['四月', 3], ['五月', 4], ['六月', 5],
    ['七月', 6], ['八月', 7], ['九月', 8], ['十月', 9], ['十一月', 10], ['十二月', 11],];
  const onChoose = (e:any,v: string | number) => {
    e.stopPropagation()
    setShowData({...showData, month: v as number});
    props.onToggle()
    props.chooseDay(v as number)
  };
  const onYear = (type: string) => {
    onChangYear(type);
    if (type==='last'){
      props.chooseDay(-1)
    }else {
      props.chooseDay(13)
    }
  };

  return (
    <Wrapper>
      <Header>
        <div className='item' onClick={props.onToggle}>取消</div>
        <div className='item' onClick={() => onYear('last')}><Icon name='yearleft'/></div>
        <div>{showData.year}</div>
        <div className='item' onClick={() => onYear('next')}><Icon name='yearrigth'/></div>
        <div className='item' />
      </Header>
      {props.monthYear?'':<Body>
        {chooseMonth.map(([k, v]) =>
          <Item key={k} onClick={(e) => onChoose(e,v)}>{k}</Item>
        )
        }
      </Body>}
      <Bottom onClick={props.onToggle}/>
    </Wrapper>
  );
};

export {StatisDay};