import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FMInput from './fminput';

describe('FMInput', () => {
  it('renders the component correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <FMInput
        title="Test Input"
        name="testInput"
        id="testInput"
        value=""
      />
    );

    const inputElement = getByLabelText('Test Input');
    

    expect(inputElement).toBeInTheDocument();
    
  });

  it('calls the onChange callback when input value changes', () => {
    const handleChange = jest.fn();

    const { getByLabelText } = render(
      <FMInput
        title="Test Input"
        name="testInput"
        id="testInput"
        value=""
        onChange={handleChange}
      />
    );

    const inputElement = getByLabelText('Test Input');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledWith('New Value');
  });

  // Add more test cases as needed
});