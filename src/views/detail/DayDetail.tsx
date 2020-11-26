import React, {useState} from 'react';
import Icon from '../../components/Icon';
import {CategorySection} from '../../components/CategorySection';
import {Link, useHistory, useParams} from 'react-router-dom';
import {Topbar} from '../tag/AddRewHtml';
import {useRecords} from '../../hooks/useRecords';
import dayjs from 'dayjs';
import {DayDetailList} from './DayDetailList';
import {thousand} from '../../lib/thousandSeparator';
import {DayDetailBottom, DayDetailHeader, DayDetailLength, DayDetailMiddle, DayDetailWrapper} from './DayDetailHtml';
import {Category} from '../../custom';




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
  const todayRecords = records.filter(r => dayjs(date).isSame(r.createdAt, 'day'));
  const todayTypeRecords = todayRecords.filter(r => r.category === cate);
  const amountType = (type: string) => todayRecords.filter(r => r.category === type).reduce((sum, item) => {return sum += item.amount;}, 0);
  const lastAmount = () => -amountType('-') + amountType('+');
  const showNum = (type: string) => {
    return thousand(amountType(type).toString());
  };

  //返回
  const history = useHistory();
  const onClickBack = () => {
    // window.history.back();
    history.goBack();


  };
  const num=()=>{
    if (lastAmount()>0){
      return '+'
    }else if (lastAmount()===0){
      return ;
    }else {
      return '-'
    }
  }
  return (
    <DayDetailWrapper>
      <DayDetailHeader>
        <Topbar>
          <div className='back' onClick={onClickBack}>
            <Icon name='left'/>
            <span>明细</span>
          </div>
          <span>{dayjs(date).format('YYYY-MM-DD')}</span>
          <Link to='/addmoney' className='save'>
            记一笔
          </Link>
        </Topbar>
        <DayDetailMiddle>
          <CategorySection category={cate} onChange={category => onChange(category)}/>
        </DayDetailMiddle>
        <DayDetailBottom>
          <div className='item'>
            <div className='num shou'>+￥{showNum('+')}</div>
            <div className='text'>总收入</div>
          </div>
          <div className='item'>
            <div className='num'>-￥{showNum('-')}</div>
            <div className='text'>总支出</div>
          </div>
          <div className='item'>
            <div className={lastAmount()>0?'num greed':'num red'}>{num()}￥{thousand(Math.abs(lastAmount()).toString())}</div>
            <div className='text'>结余</div>
          </div>
        </DayDetailBottom>
      </DayDetailHeader>
      <DayDetailLength>账单({todayTypeRecords.length})：</DayDetailLength>
      <DayDetailList records={todayTypeRecords}/>
    </DayDetailWrapper>
  );
};

export {DayDetail};

