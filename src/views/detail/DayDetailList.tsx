import { ThirtyDay} from '../money/MoneyHTML';
import React from 'react';
import {Link} from 'react-router-dom';
import {DetailItem} from './DetailItem';
import {RecordItem} from '../../custom';

type Props={
  records:RecordItem[]
}
const DayDetailList:React.FC<Props> = (props)=>{
  return <ThirtyDay>
    {props.records.map(r =>
      <Link to={'/editorrecord/'+r.id} key={r.id}>
      <DetailItem record={r}/>
      </Link>
    )}
  </ThirtyDay>
}

export {DayDetailList}