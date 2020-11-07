import Icon from '../../components/Icon';
import React, {useEffect} from 'react';
import {useDate} from '../../hooks/useDate';
import dayjs from 'dayjs';
import styled from 'styled-components';
import {sDate} from '../../custom';


const Wrapper = styled.div`
display: flex;justify-content: space-between;align-items: center;
position: relative;padding: 16px;
  > .icon{
    margin: 0 10px;
    height: 100%;
    width: 4em;fill:#A5C9C0;
        @media (max-height:570px){
         width: 3em;
     }
  }
  .title{
    color: #A5C9C0;
    font-size: 40px;
     @media (max-height:570px){
        font-size: 30px;
     }
  }
`;

type Props = {
  onChangeDay?: (d: sDate) => void,
}
const ByYear :React.FC<Props> = (props) => {
  const
    {
      showData, onChangYear, updateShowDate
    } = useDate();
  useEffect(() => {
    if (props.onChangeDay) {
      props.onChangeDay(showData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showData]);
  const onYear = (type: string) => {
    onChangYear(type);
  };
  const onSetToday = () => {
    updateShowDate({
      year: dayjs().year(),
      month: dayjs().month(),
      day: dayjs().date()
    });
  };
  return (
    <Wrapper>
      <Icon name='yearleft' onClick={() => onYear('last')}/>
      <span className='title' onClick={onSetToday}>{showData.year}</span>
      <Icon name='yearrigth' onClick={() => onYear('next')}/>
    </Wrapper>
  );
};
export {ByYear};