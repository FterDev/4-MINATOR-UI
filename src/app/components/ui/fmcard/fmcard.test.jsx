import React from "react";
import { render } from "@testing-library/react";
import FmCard from "./fmcard";

describe("FmCard", () => {
  it("renders the title and subtitle correctly", () => {
    const title = "Test Title";
    const subtitle = "Test Subtitle";

    const { getByText } = render(
      <FmCard title={title} subtitle={subtitle} />
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(subtitle)).toBeInTheDocument();
  });

  it("renders the children correctly", () => {
    const children = <div>Test Children</div>;

    const { getByText } = render(<FmCard>{children}</FmCard>);

    expect(getByText("Test Children")).toBeInTheDocument();
  });
});