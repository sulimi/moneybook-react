import styled from 'styled-components';
import Layout from '../../components/Layout';

const MyLayout = styled(Layout)`
  display: flex;flex-direction: column;align-items: center;
  > .about{
   display:flex;flex-direction: column;justify-content: flex-end;align-items: center;height: 30vh;font-weight: bold;flex-shrink: 0;
    .paytext{
      color: #A5C9C0;text-align: center;font-size: 14px;
    }
    .paynum{
      color: #A5C9C0;font-size: 32px;text-align: center;padding: 10px;word-break: break-all
    }
    .in{
      font-size: 14px;color: #AAAAAA;text-align: center;word-break: break-all
    }
  }
  > .add-wrapper{
      height: 20vh;padding-bottom: 30px;display:flex;flex-direction: column;justify-content: flex-end;align-items: center;flex-shrink: 0;
    > .addmoney{
    font-size: 16px;font-weight: bold;color: #444444;background: #BFD9D3;border: 1px solid #65C6BB;padding: 12px 40px;border-radius: 10px;
  }
  }

  > .toggle{
    display: flex;justify-content: center;align-items: center;font-size: 14px;color: #AAAAAA;padding: 16px;flex-shrink: 0;
    .icon{
      fill: #AAAAAA;margin-left: 10px;
    }
  }

`;
const ThirtyDay = styled.div`
  display: flex;flex-direction: column;width: 100%;flex-grow: 1;flex-shrink: 0;
`;

const ThirtyDayHeader = styled.div`
  display: flex;align-items: center;justify-content: space-between;width: 100%;padding: 10px 24px 10px 30px;
.day-header{
  color:#65C6BB;font-size: 12px;background: #fff;flex-shrink: 0;margin-right: 5px;
  .today{
     margin-right: 5px;
  }
  .day{
    font-weight: bold;font-size: 16px;margin-left: 5px;
  }
}
.num{

  display: flex;align-items: center;justify-content: flex-end;flex-wrap: wrap;color: #AAAAAA;
  > .item{
    padding: 0 5px;word-break: break-all;
  }
}
`;
const ThirtyDayList = styled.div`
  display: flex;align-items: center;justify-content: space-between;padding: 16px;background: #F8F8F6;margin: 5px 16px;border-radius: 10px;
  .icon{
    width: 3em;height: 3em;
  }
  .amount{
    font-size: 18px;font-weight: bold;
    &.zheng{
      color:#65C6BB
    }
  }
`;
const DisplayWrapper = styled.div`
  display: flex;align-items: center;
`;
const DisplayWrapper2 = styled.div`
  display: flex;flex-direction:column;justify-content: center;
  .name{
    flex-shrink: 0;padding: 0 3px 3px;height: 2em;display: flex;align-items: flex-end;
  }
  .note{
      font-size: 10px;color: #AAA;padding: 0 3px 5px;height: 1.5em;max-width: 28vw;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;
  }
`;
const None=styled.div`
    color: #AAAAAA;text-align: center;
`

export {MyLayout,ThirtyDay,ThirtyDayHeader,ThirtyDayList,DisplayWrapper,DisplayWrapper2,None}