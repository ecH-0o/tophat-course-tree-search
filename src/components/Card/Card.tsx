import * as React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { styled } from '@mui/material/styles';

/**
 * Represents a wrapper that displays a card.
 * 
 */

const StyledCard = styled(MuiCard)<MuiCardProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', 
  alignItems: 'center',
  margin: 0,
}));

export interface CardProps extends MuiCardProps {
}

export const Card: React.FC<CardProps> = (props: CardProps) => {
    return <StyledCard {...props}>{props.children}</StyledCard>;
}

export default Card;
