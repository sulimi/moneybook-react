import styled from 'styled-components';

const AddMoneyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
`;
const AddHeader = styled.header`
  display: flex;justify-content: space-between;align-items: center;padding: 0 6px;flex-shrink: 0;
  .icon{
    width:2em;
    height:2em;
  }
`;
export {AddHeader,AddMoneyWrapper}
