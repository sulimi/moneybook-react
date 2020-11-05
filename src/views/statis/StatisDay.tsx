import React from 'react';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import {useDate} from '../../hooks/useDate';


const Wrapper = styled.div`
  display: flex;flex-direction:column;justify-content: center;align-items: center;
  width: 100%;border: 1px solid #CCE2DB;background: #fff;z-index: 99;height: 100vh;
  position: absolute;
  top: 5vh;
  left: 50%;transform: translateX(-50%);
`;
const Header = styled.div`
  display: flex;justify-content: space-between;align-items: center;
  width: 100%;font-weight: bold;background: #CCE2DB;
.item{
  width: 30%;text-align: center;padding: 16px 10px;
  .icon{
    width: 1.5em;height: 1.5em;
  }
}
`;
const Body = styled.div`
  display: flex;align-items: center;flex-wrap: wrap;padding: 20px;
`;
const Item = styled.div`
  width: 33.3333%;padding: 20px 10px;text-align: center;
`;
const Bottom = styled.div`
width: 100%;background:red;flex-grow: 1;
`;

type Props={
  chooseDay:(d:number)=>void
  onToggle:()=>void
}
const StatisDay:React.FC<Props> = (props) => {
  const {showData, onSelectedDay, setShowData, onChangYear} = useDate();
  const chooseMonth = [['一月', 1], ['二月', 2], ['三月', 3], ['四月', 4], ['五月', 5], ['六月', 6],
    ['七月', 7], ['八月', 8], ['九月', 9], ['十月', 10], ['十一月', 11], ['十二月', 12],];
  const onChoose = (e:any,v: string | number) => {
    e.stopPropagation()
    setShowData({...showData, month: v as number});
    props.onToggle()
    props.chooseDay(v as number)
  };
  const onYear = (type: string) => {
    onChangYear(type);
  };

  return (
    <Wrapper>
      <Header>
        <div className='item' onClick={() => onYear('last')}><Icon name='yearleft'/></div>
        <div>{showData.year}</div>
        <div className='item' onClick={() => onYear('next')}><Icon name='yearrigth'/></div>
      </Header>
      <Body>
        {chooseMonth.map(([k, v]) => <Item key={k} onClick={(e) => onChoose(e,v)}>{k}</Item>)}
      </Body>
      <Bottom onClick={props.onToggle}/>
    </Wrapper>
  );
};

export {StatisDay};