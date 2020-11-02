import Layout from '../components/Layout';
import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import Icon from '../components/Icon';
import {Link} from 'react-router-dom';
import {useRecords} from '../hooks/useRecords';
import dayjs from 'dayjs';
import {hashCreate} from '../lib/hashCreate';

const MyLayout = styled(Layout)`
  display: flex;
  flex-direction: column;align-items: center;
  > .about{
   display:flex;flex-direction: column;justify-content: flex-end;align-items: center;flex-shrink: 0;
   height: 30vh;font-weight: bold;
    .paytext{
      color: #A5C9C0;text-align: center;
      font-size: 14px;
    }
    .paynum{
      color: #A5C9C0;font-size: 32px;text-align: center;padding: 10px;
    }
    .in{
      font-size: 14px;color: #AAAAAA;text-align: center;
    }
  }
  > .add-wrapper{
      height: 20vh;padding-bottom: 30px;
      display:flex;flex-direction: column;justify-content: flex-end;align-items: center;flex-shrink: 0;
    > .addmoney{
  font-size: 16px;font-weight: bold;color: #444444;
    background: #BFD9D3;border: 1px solid #65C6BB;padding: 12px 40px;border-radius: 10px;
  }
  }

  > .toggle{
  display: flex;justify-content: center;align-items: center;flex-shrink: 0;
    font-size: 14px;color: #AAAAAA;padding: 16px;
    .icon{
      fill: #AAAAAA;margin-left: 10px;
    }
    
  }
  
`;
const ThirtyDay = styled.div`
  display: flex;flex-direction: column;align-items: center;
`;
const ThirtyDayList = styled.div`
display: flex;align-items: center;
`;

function Money() {
  const {records} = useRecords();
  const recordArr = hashCreate(records).filter(([d, r], i, arr) =>
    dayjs(d) > dayjs(dayjs(arr[0][0]).subtract(29, 'day').format('YYYY-MM-DD')));
  const [showR, setShowR] = useState(false);
  const onShowR = () => {
    setShowR((showR) => !showR);
  };
  return (
    <MyLayout message='TODAY'>
      <div className='about'>
        <div className='paytext'>今日支出</div>
        <div className='paynum'>￥1415</div>
        <div className='in'>收入￥789</div>
      </div>
      <Link className='add-wrapper' to='/addmoney'>
        <button className='addmoney'>记一笔</button>
      </Link>
      <div className='toggle' onClick={onShowR}>展示近30天账单 (6)
        {showR?<Icon name='xia'/>:<Icon name='right'/>}
      </div>
      {showR && <ThirtyDay>
        {recordArr.map(([date, records]) =>
          <ThirtyDay key={date}>
            <ThirtyDayList>
              <div>{dayjs(records[0].createdAt).isSame(new Date(), 'day') ?
                <span>今天</span> : ''}<span>{dayjs(records[0].createdAt).format('MM月')}</span><span>{dayjs(records[0].createdAt).format('D')}</span>
              </div>
              <div>总金额</div>
            </ThirtyDayList>
            <ThirtyDay>
              {records.map(r =>
                <ThirtyDayList key={r.id}>
                  <Icon name={r.tag.icon}/>
                  <div>{r.tag.name}</div>
                  <div>{r.note}</div>
                  <div>￥{r.amount}</div>
                </ThirtyDayList>
              )}
            </ThirtyDay>
          </ThirtyDay>
        )}
      </ThirtyDay>}

    </MyLayout>
  );
}

export default Money;
