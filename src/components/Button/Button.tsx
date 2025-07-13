import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

/**
 * Button component that wraps MUI Button.
 * 
 * This component passes all received props directly to the MUI Button.
 * 
 * @param {ButtonProps} props - Props for the button, including children and any MUI Button props.
 * @returns {JSX.Element} Rendered button element.
 */

export interface ButtonProps extends MuiButtonProps {
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return <MuiButton {...props}>{props.children}</MuiButton>;
  }

export default Button;
