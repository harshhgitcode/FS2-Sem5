import { rest } from "msw";

export const handlers = [
    rest.get("/api/events", (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    id: 1,
                    title: "Mock Event",
                    date: "Monday",
                    time: "10:00"
                }
            ])
        );
    })
];