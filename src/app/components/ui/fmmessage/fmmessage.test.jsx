import React from "react";
import { render } from "@testing-library/react";
import FmMessage from "./fmmessage";

describe("FmMessage", () => {
  it("renders the message correctly", () => {
    const message = "This is a test message";
    const { getByText } = render(<FmMessage type="info" message={message} />);
    expect(getByText(message)).toBeInTheDocument();
  });

  it("renders the children correctly", () => {
    const { getByText } = render(
      <FmMessage type="success" message="Test message">
        <button>Click me</button>
      </FmMessage>
    );
    expect(getByText("Click me")).toBeInTheDocument();
  });

  // Add more test cases for different scenarios

});