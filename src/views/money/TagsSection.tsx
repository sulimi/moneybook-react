import styled from 'styled-components';

const TagsSection=styled.section`
  background: #fff; padding: 12px 16px;flex-grow: 1;
  display: flex;flex-direction: column;justify-content: flex-end;align-items: flex-start;
    ol{
      margin: 0 -12px;
      li{
        background: #D9D9D9;border-radius: 18px;
        display: inline-flex;padding: 3px 18px;
        font-size: 14px;margin: 3px 12px;
      }
  }
  button{
  
    border-bottom: 1px solid #ddd;padding: 2px 4px;
    color: #666;margin-top:8px;
  }
`


export {TagsSection}