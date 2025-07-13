import * as React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, styled } from '@mui/material';

/**
 * Card component that wraps MUI Card.
 * 
 * This component passes all received props directly to the MUI Card.
 * 
 * @param {CardProps} props - Props for the card, including children and any MUI Card props.
 * @returns {JSX.Element} Rendered card element.
 */

export interface CardProps extends MuiCardProps {
}

const StyledCard = styled(MuiCard)<MuiCardProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center',
  margin: 0,
}));

export const Card: React.FC<CardProps> = (props: CardProps) => {
    return <StyledCard {...props}>{props.children}</StyledCard>;
}

export default Card;
