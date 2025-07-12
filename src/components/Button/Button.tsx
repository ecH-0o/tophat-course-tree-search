import * as React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Represents a wrapper that displays a button.
 * 
 */

const StyledButton = styled(MuiButton)<MuiButtonProps>(() => ({
  backgroundColor: '#934af4',
  border: '1px solid #934af4'
}));


export interface ButtonProps extends MuiButtonProps {
}

export const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
  }

export default Button;
