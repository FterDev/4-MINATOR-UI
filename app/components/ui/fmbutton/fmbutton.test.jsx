import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'
import FmButton from './fmbutton';

describe('FmButton', () => {
  it('renders the button with the provided text', () => {
    const { getByText } = render(<FmButton text="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('applies the default "filled" type and "primary" color if not provided', () => {
    const { container } = render(<FmButton text="Submit" />);
    const button = container.querySelector('.fm-button');
    expect(button).toHaveClass('fm-button-filled-primary');
  });

  it('applies the provided type and color', () => {
    const { container } = render(
      <FmButton text="Delete" type="outlined" color="danger" />
    );
    const button = container.querySelector('.fm-button');
    expect(button).toHaveClass('fm-button-outlined-danger');
  });

  it('calls the onClick function when the button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <FmButton text="Click me" onClick={handleClick} />
    );
    fireEvent.click(getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});