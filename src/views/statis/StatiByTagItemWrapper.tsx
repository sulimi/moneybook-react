import {ThirtyDay} from '../money/MoneyHTML';
import React from 'react';
import {Link} from 'react-router-dom';
import {StatiByTagItem} from './StatiByTagItem';
import {ByTagList} from '../../custom';

type Props = {
  byTagListValue: ByTagList[]
}

const StatiByTagItemWrapper: React.FC<Props> = (props) => {
  const {byTagListValue}=props
  byTagListValue.sort((a,b)=>b[1]-a[1])
  const count = byTagListValue.reduce((sum, i) => {return sum += i[1];}, 0);
  return <ThirtyDay>
    {byTagListValue.map(([i, v]) =>
      <Link to={'/allbytags/'+i} key={i}>
        <StatiByTagItem byTagItem={[i, v]} count={count}/>
      </Link>)}
  </ThirtyDay>;
};

export {StatiByTagItemWrapper};