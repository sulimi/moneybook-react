import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  flex-grow: 1;
  display: flex;align-items: center;
    span{ margin-right: 16px;flex-shrink: 0;}
    input{
      flex-grow: 1;
      display: block;
      border: none;
      @media (max-height:570px){
            font-size: 12px;
      }
    }
`;
type Props = {
  text?: string;
} & React.InputHTMLAttributes<HTMLInputElement>
const Input: React.FC<Props> = (props) => {
  const {text, children, ...rest} = props;
  return (
    <Label>
      {props.text ? <span>{props.text}</span> : ''}
      <input {...rest}/>
    </Label>
  );
};

export {Input};