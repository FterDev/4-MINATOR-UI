import { render } from "@testing-library/react";
import FmPasswordValidator from "./fmpasswordvalidator";

describe("FmPasswordValidator", () => {
  const criteria = {
    min: 8,
    max: 16,
    hasUpperLowerCase: true,
    hasNumber: true,
    hasSpecial: true,
  };

  const errors = {
    lengthError: false,
    hasUpperLowerCaseError: false,
    hasNumberError: false,
    hasSpecialError: false,
  };

  it("renders without errors", () => {
    render(<FmPasswordValidator criteria={criteria} errors={errors} />);
  });

  it("displays the correct criteria message", () => {
    const { getByText } = render(
      <FmPasswordValidator criteria={criteria} errors={errors} />
    );

    expect(getByText(/Minmum 8 and maximum 16 characters/i)).toBeInTheDocument();
    expect(
      getByText(/At least one uppercase and one lowercase letter/i)
    ).toBeInTheDocument();
    expect(getByText(/At least one number/i)).toBeInTheDocument();
    expect(getByText(/At least one special character/i)).toBeInTheDocument();
  });

  
});