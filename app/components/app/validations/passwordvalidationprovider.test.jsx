import PasswordValidationProvider from './passwordvalidationprovider';

describe('PasswordValidationProvider', () => {
  const criteria = {
    min: 8,
    max: 32,
    hasNumber: true,
    hasSpecial: true,
    hasUpperLowerCase: true
  };

  it('should return no errors for a valid password', () => {
    const password = 'ValidPassword123!';
    const provider = new PasswordValidationProvider(criteria);
    const result = provider.validatePassword(password);

    expect(result.error).toBe(false);
    expect(result.lengthError).toBe(false);
    expect(result.hasNumberError).toBe(false);
    expect(result.hasSpecialError).toBe(false);
    expect(result.hasUpperLowerCaseError).toBe(false);
  });

  it('should return lengthError for a password with length less than the minimum', () => {
    const password = 'SrtPwd';
    const provider = new PasswordValidationProvider(criteria);
    const result = provider.validatePassword(password);

    
    expect(result.lengthError).toBe(true);
  });

  it('should return lengthError for a password with length greater than the maximum', () => {
    const password = 'VeryLongPasswordThatExceedsTheMaximumLength';
    const provider = new PasswordValidationProvider(criteria);
    const result = provider.validatePassword(password);

    expect(result.error).toBe(true);
    expect(result.lengthError).toBe(true);
    expect(result.hasNumberError).toBe(false);
    expect(result.hasSpecialError).toBe(false);
    expect(result.hasUpperLowerCaseError).toBe(false);
  });

  it('should return hasNumberError for a password without a number', () => {
    const password = 'NoNumberPassword!';
    const provider = new PasswordValidationProvider(criteria);
    const result = provider.validatePassword(password);

    expect(result.error).toBe(true);
    expect(result.lengthError).toBe(false);
    expect(result.hasNumberError).toBe(true);
    expect(result.hasSpecialError).toBe(false);
    expect(result.hasUpperLowerCaseError).toBe(false);
  });

  it('should return hasSpecialError for a password without a special character', () => {
    const password = 'NoSpecialCharPassword123';
    const provider = new PasswordValidationProvider(criteria);
    const result = provider.validatePassword(password);

    expect(result.error).toBe(true);
    expect(result.lengthError).toBe(false);
    expect(result.hasNumberError).toBe(false);
    expect(result.hasSpecialError).toBe(true);
    expect(result.hasUpperLowerCaseError).toBe(false);
  });

  it('should return hasUpperLowerCaseError for a password without both upper and lower case characters', () => {
    const password = 'NoUpperLowerCase123!';
    const provider = new PasswordValidationProvider(criteria);
    const result = provider.validatePassword(password);

    expect(result.error).toBe(true);
    expect(result.lengthError).toBe(false);
    expect(result.hasNumberError).toBe(false);
    expect(result.hasSpecialError).toBe(false);
    expect(result.hasUpperLowerCaseError).toBe(true);
  });
});