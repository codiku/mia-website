/**
 * @jest-environment jsdom
 */
import { Button } from "@/components/Button/Button";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Home", () => {
  it("renders a button that clicks", () => {
    let count = 0;
    render(<Button onClick={() => count++}>Hello</Button>);

    const button = screen.getByRole("button");

    expect(button.textContent).toBe("Hello");
  });
});
