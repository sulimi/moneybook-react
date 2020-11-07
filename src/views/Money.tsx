import React, {useState} from 'react';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {hashCreate} from '../lib/hashCreate';
import {thousand} from '../lib/thousandSeparator';
import {MyLayout} from './money/MoneyHTML';
import {DetailList} from './detail/DetailList';



function Money() {
  const {records} = useRecords();
  const todayRecord = records.filter(r => dayjs(r.createdAt).isSame(new Date(), 'day'));
  const byYearRecord=records.filter(r=>dayjs(r.createdAt).isSame(new Date(),'year'))
  const recordArr = hashCreate(byYearRecord).filter(([d]) =>{
    return dayjs(d) > dayjs(dayjs(new Date()).subtract(29, 'day').format('YYYY-MM-DD'))
  })

  const [showR, setShowR] = useState(false);
  const onShowR = () => {
    setShowR((showR) => !showR);
  };

  const amountCalculate=(arr: RecordItem[],type:string)=>{
    return arr.filter(r => r.category === type).reduce((sum, item) => {return sum + item.amount;}, 0)
  }

  return (
    <MyLayout message='TODAY'>
      <div className='about'>
        <div className='paytext'>今日支出</div>
        <div
          className='paynum'>-￥{thousand(amountCalculate(todayRecord,'-').toString())}</div>
        <div className='in'>收入￥{thousand(amountCalculate(todayRecord,'+').toString())}</div>
      </div>
      <Link className='add-wrapper' to='/addmoney'>
        <button className='addmoney'>记一笔</button>
      </Link>
      <div className='toggle' onClick={onShowR}>{showR?'隐藏':'展示'}近30天账单
        ({recordArr.map(([d, r]) => r.length).reduce((sum,item)=>{return sum+item},0)})
        {showR ? <Icon name='xia'/> : <Icon name='right'/>}
      </div>
      {showR &&
      <DetailList records={recordArr}/>
      }
    </MyLayout>
  );
}

export default Money;
