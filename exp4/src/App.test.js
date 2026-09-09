import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Social Post Scheduler", () => {
    render(<App />);

    expect(
        screen.getByRole("heading", {
            name: /social post scheduler/i
        })
    ).toBeInTheDocument();
});