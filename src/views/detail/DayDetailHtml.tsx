import styled from 'styled-components';

const DayDetailWrapper = styled.div`
  display: flex;flex-direction: column;
`;
const DayDetailHeader = styled.header`
  display: flex;flex-direction:column;
`;

const DayDetailMiddle = styled.div`
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
const DayDetailBottom = styled.div`
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
  &.greed{
     color: #A5C9C0;
  }
  &.red{
     color: #FA8072;
  }
}
.text{
  color: #AAA;padding: 5px;text-align: center;font-size: 12px;
}
&.bytag{
  width: 100%; padding-top: 30px;
}
}

`;

const DayDetailLength = styled.div`
  color: #AAA;padding: 5px 16px;font-size: 12px;
  border-top: 1px solid  #F8F8F6;
`;
export {DayDetailWrapper,DayDetailHeader,DayDetailMiddle,DayDetailBottom,DayDetailLength}