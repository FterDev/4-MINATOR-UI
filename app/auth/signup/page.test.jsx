import { render, screen, fireEvent } from '@testing-library/react';
import SignUp from './page';

describe('SignUp', () => {
  test('renders SignUp component', () => {
    render(<SignUp />);
    const signUpElement = screen.getByText(/Please enter the required information to create an account/i);
    expect(signUpElement).toBeInTheDocument();
  });

  test('validates email input', () => {
    render(<SignUp />);
    const emailInput = screen.getByLabelText(/E-Mail/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    const emailErrorElement = screen.getByText(/Invalid email address/i);
    expect(emailErrorElement).toBeInTheDocument();
  });

  test('validates nickname input', () => {
    render(<SignUp />);
    const nicknameInput = screen.getByLabelText(/Nickname/i);
    fireEvent.change(nicknameInput, { target: { value: ' ' } });
    fireEvent.blur(nicknameInput);
    const nicknameErrorElement = screen.getByText(/Nickname is required/i);
    expect(nicknameErrorElement).toBeInTheDocument();
  });

  test('validates password input', () => {
    render(<SignUp />);
    const passwordInput = screen.getByLabelText(/Password/i);
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.blur(passwordInput);
    const passwordErrorElement = screen.getByText(/Password must have at least 8 characters/i);
    expect(passwordErrorElement).toBeInTheDocument();
  });

  // Add more tests for other functionalities as needed
});