import { z } from "zod";

export const RedeemSchema = z.object({
  from: z.string({
    required_error: "Please select a token.",
  }),
  to: z.string({
    required_error: "Please select a stablecoin.",
  }),
  amount: z.number({
    required_error: "Please input an amount.",
  }),
});

export const RedeemMiniSchema = z.object({
  from: z.string({ required_error: "Please enter an amount." }),
  to: z.string({ required_error: "Please enter an amount." }),
});
