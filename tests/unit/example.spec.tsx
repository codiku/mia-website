/**
 * @jest-environment jsdom
 */
import { Button } from "@/components/Button/Button";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Button>Hello</Button>);
    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Hello");
  });
});
