import { type EmailSender } from "@wasp.sh/spec";

export const emailSender: EmailSender = {
  provider: "Mailgun",
  defaultFrom: {
    name: "Open SaaS App",
    email: "me@example.com",
  },
};
