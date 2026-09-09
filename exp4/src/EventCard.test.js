import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import EventCard from "./components/EventCard";

test("renders event title", () => {
    render(
        <EventCard
            event={{
                id: 1,
                title: "Team Meeting",
                time: "10:00"
            }}
            onUpdate={() => {}}
        />
    );

    expect(
        screen.getByText("Team Meeting")
    ).toBeInTheDocument();
});


test("clicking Edit updates the event", () => {
    const handleUpdate = jest.fn();

    window.prompt = jest
        .fn()
        .mockReturnValueOnce("Updated Meeting")
        .mockReturnValueOnce("14:00");

    render(
        <EventCard
            event={{
                id: 1,
                title: "Team Meeting",
                time: "10:00"
            }}
            onUpdate={handleUpdate}
        />
    );

    userEvent.click(
        screen.getByRole("button", {
            name: /edit/i
        })
    );

    expect(handleUpdate).toHaveBeenCalledWith(
        1,
        "Updated Meeting",
        "14:00"
    );
});