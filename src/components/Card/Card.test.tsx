import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from './Card';

describe('<Card />', () => {
  it('renders children', () => {
    render(<Card>Test 1</Card>);

    expect(screen.getByText('Test 1')).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    const { getByTestId } = render(<Card data-testid="styled-card" />);

    const card = getByTestId('styled-card');

    expect(card).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
    });
  });

  it('accepts props', () => {
    render(
      <Card data-testid="props-card" className="custom-class">
        X
      </Card>
    );
    const card = screen.getByTestId('props-card');
    
    expect(card).toHaveClass('custom-class');
  });
});
