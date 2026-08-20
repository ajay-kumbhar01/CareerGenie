import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "careergenie", // Unique app ID
  name: "CareerGenie",
  credentials: {
    gemini: {
      apiKey: process.env.GEMINI_API_KEY,
    },
  },
});
