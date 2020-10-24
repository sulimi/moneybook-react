import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: flex;align-items: center;
    span{ margin-right: 16px;flex-shrink: 0;}
    input{
      display: block;height: 44px;
      flex-grow: 1;border: none;background: none;
    }
`;
type Props = {
  text: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
const Input: React.FC<Props> = (props) => {
  const {text, children, ...rest} = props;
  return (
    <Label>
      <span>{props.text}</span>
      <input {...rest}/>
    </Label>
  );
};

export {Input};