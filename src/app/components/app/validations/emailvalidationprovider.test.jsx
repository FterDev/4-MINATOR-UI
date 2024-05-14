import EmailValidationProvider from "./emailvalidationprovider";

describe("EmailValidationProvider", () => {
  
  let emailValidationProvider;

  beforeEach(() => {
    emailValidationProvider = new EmailValidationProvider();
  });

  it("should return an error when email is empty", () => {
    const result = emailValidationProvider.validateEmail("");
    expect(result.errorText).toBe("E-mail is required!");
    expect(result.isErrored).toBe(true);
  });

  it("should return an error when email is null", () => {
    const result = emailValidationProvider.validateEmail(null);
    expect(result.errorText).toBe("E-mail is required!");
    expect(result.isErrored).toBe(true);
  });

  it("should return no error when email is valid", () => {
    const result = emailValidationProvider.validateEmail("test@example.com");
    expect(result.errorText).toBeNull();
    expect(result.isErrored).toBe(false);
  });

  it("should return an error when email is invalid", () => {
    const result = emailValidationProvider.validateEmail("invalid-email");
    expect(result.errorText).toBe("Invalid e-mail address!");
    expect(result.isErrored).toBe(true);
  });
});