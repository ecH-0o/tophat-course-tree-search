import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('<Button />', () => {
  it('renders children', () => {
    render(<Button>Test 1</Button>);

    expect(screen.getByText('Test 1')).toBeInTheDocument();
  });

  it('triggers onClick', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('accepts props', () => {
    render(
      <Button variant="contained" data-testid="props-button" className="custom-class">
        X
      </Button>
    );
    const button = screen.getByTestId('props-button');
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('MuiButton-contained');
  });
});
