import React, {useState} from 'react';
import styled from 'styled-components';
import Icon from '../../components/Icon';
import {CategorySection} from '../../components/CategorySection';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Topbar} from '../tag/AddRewHtml';
import {useRecords} from '../../hooks/useRecords';
import dayjs from 'dayjs';
import {DayDetailList} from './DayDetailList';
import {thousand} from '../../lib/thousandSeparator';


const Wrapper = styled.div`
  display: flex;flex-direction: column;
`;
const Header = styled.header`
  display: flex;flex-direction:column;
`;

const Middle = styled.div`
  display: flex;justify-content:center;align-items: center;width: 100%;
   ul{
   background: #A5C9C0;color: #fff;margin: 3px;
    li{
       &.selected{
      color: #65C6BB;
      }
   }
  }
`;
const Bottom = styled.div`
display: flex;justify-content:space-around;align-items: center;width: 100%;
padding: 5px 16px;
.item{
width: 33.333%;
  .num{
  text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
  font-weight: bold;padding: 5px;text-align: center;font-size: 18px;
  &.shou{
    color: #A5C9C0;
  }
}
.text{
  color: #AAA;padding: 5px;text-align: center;font-size: 10px;
}
}

`;


const DayDetail = () => {
  type Params = {
    date: string
  }
  const {date} = useParams<Params>();
  const {records} = useRecords();
  const [cate, setCate] = useState<Category>('-');
  const onChange = (category: Category) => {
    setCate(category);
  };
  const todayRecords=records.filter(r=>dayjs(date).isSame(r.createdAt,'day'))
  const todayTypeRecords=todayRecords.filter(r=>r.category===cate)
  const count=(type:string)=>{
    return thousand(todayRecords.filter(r=>r.category===type).reduce((sum,item)=>{return sum+=item.amount},0).toString())
  }
  //返回
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();


  };
  return (
    <Wrapper>
      <Header>
        <Topbar>
          <div className='back' onClick={onClickBack}>
            <Icon name='left'/>
            <span>明细</span>
          </div>
          <span>2020-11-03</span>
          <Link to='/addmoney' className='save'>
            记一笔
          </Link>
        </Topbar>
        <Middle>
          <CategorySection category={cate} onChange={category => onChange(category)}/>
        </Middle>
        <Bottom>
          <div className='item'>
            <div className='num'>{records.length}</div>
            <div className='text'>账目条数</div>
          </div>
          <div className='item'>
            <div className='num'>-￥{count('-')}</div>
            <div className='text'>总支出</div>
          </div>
          <div className='item'>
            <div className='num shou'>+￥{count('+')}</div>
            <div className='text'>总收入</div>
          </div>
        </Bottom>
      </Header>
      <DayDetailList records={todayTypeRecords} />
    </Wrapper>
  );
};

export {DayDetail};

