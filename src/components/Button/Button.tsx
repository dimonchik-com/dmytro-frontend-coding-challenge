import React, { ReactNode } from 'react';
import { StyledButton } from './Button.styles';

interface IButtonProps {
  children: ReactNode | string;
  onClick: any;
}

const Button = (props: IButtonProps) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

export default Button;
