import styled from 'styled-components';
import React from 'react';

const _NotesSection = styled.section`
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
`;
const NotesSection: React.FC = () => {
  return (
    <_NotesSection>
      <label>
        <span>备注</span>
        <input placeholder="在这里输入备注" type="text"/>
      </label>
    </_NotesSection>
  );
};

export {NotesSection};