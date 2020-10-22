import styled from 'styled-components';

const NotesSection=styled.section`
  background: #f5f5f5; padding: 10px 16px;
  font-size: 14px;
  label{
  display: flex;align-items: center;
    span{ margin-right: 16px;flex-shrink: 0;}
    input{
      display: block;height: 72px;
      flex-grow: 1;border: none;background: none;
    }
  }
`
export {NotesSection}