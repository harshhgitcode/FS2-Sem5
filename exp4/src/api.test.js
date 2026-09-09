test("returns mocked events from API", async () => {
    const response = await fetch("/api/events");

    const events = await response.json();

    expect(events).toEqual([
        {
            id: 1,
            title: "Mock Event",
            date: "Monday",
            time: "10:00"
        }
    ]);
});