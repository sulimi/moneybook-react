import {ThirtyDay} from '../money/MoneyHTML';
import React from 'react';
import {Link} from 'react-router-dom';
import {StatiByTagItem} from './StatiByTagItem';

type Props = {
  byTagListValue: ByTagList[]
}

const StatiByTagItemWrapper: React.FC<Props> = (props) => {
  const count = props.byTagListValue.reduce((sum, i) => {return sum += i[1];}, 0);
  return <ThirtyDay>
    {props.byTagListValue.map(([i, v]) =>
      <Link to='/addmoney' key={i}>
        <StatiByTagItem byTagItem={[i, v]} count={count}/>
      </Link>)}
  </ThirtyDay>;
};

export {StatiByTagItemWrapper};