import NicknameValidationProvider from "./nicknamevaltidationprovider";

describe("NicknameValidationProvider", () => {
  let nicknameValidationProvider;

  beforeEach(() => {
    nicknameValidationProvider = new NicknameValidationProvider();
  });

  describe("validateNickname", () => {
    it("should return an error when nickname is empty", () => {
      const result = nicknameValidationProvider.validateNickname("");
      expect(result.errorText).toBe("Nickname is required!");
      expect(result.isErrored).toBe(true);
    });

    it("should return an error when nickname is null", () => {
      const result = nicknameValidationProvider.validateNickname(null);
      expect(result.errorText).toBe("Nickname is required!");
      expect(result.isErrored).toBe(true);
    });

    it("should return an error when nickname is less than 3 characters", () => {
      const result = nicknameValidationProvider.validateNickname("ab");
      expect(result.errorText).toBe("Nickname must be between 3 and 32 characters!");
      expect(result.isErrored).toBe(true);
    });

    it("should return an error when nickname is more than 32 characters", () => {
      const result = nicknameValidationProvider.validateNickname("abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz");
      expect(result.errorText).toBe("Nickname must be between 3 and 32 characters!");
      expect(result.isErrored).toBe(true);
    });

    it("should return no error when nickname is valid", () => {
      const result = nicknameValidationProvider.validateNickname("validNickname");
      expect(result.errorText).toBeNull();
      expect(result.isErrored).toBe(false);
    });
  });
});