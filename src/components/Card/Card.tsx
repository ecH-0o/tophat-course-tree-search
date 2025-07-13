import * as React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

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

export const Card: React.FC<CardProps> = (props: CardProps) => {
    return <MuiCard {...props}>{props.children}</MuiCard>;
}

export default Card;
