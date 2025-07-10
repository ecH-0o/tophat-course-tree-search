import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';


/**
 * Represents a wrapper that displays a button.
 * 
 */
export interface ButtonProps extends MuiButtonProps {
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return <MuiButton onClick={props.onClick}>{props.children}</MuiButton>;
  }

export default Button;
