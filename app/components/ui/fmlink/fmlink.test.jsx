import React from "react";
import { render } from "@testing-library/react";
import FmLink from "./fmlink";

describe("FmLink", () => {
  it("renders the link with the correct text and href", () => {
    const text = "Click me";
    const href = "/some-page";
    const { getByText } = render(<FmLink text={text} href={href} />);
    const linkElement = getByText(text);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe(href);
  });

  it("applies the provided className to the link", () => {
    const text = "Click me";
    const href = "/some-page";
    const className = "custom-link";
    const { getByText } = render(
      <FmLink text={text} href={href} className={className} />
    );
    const linkElement = getByText(text);
    expect(linkElement).toHaveClass(className);
  });
});