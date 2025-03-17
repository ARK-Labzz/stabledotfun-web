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

export const CreateWindowSchema = z.object({
  name: z.string({
    required_error: "Please enter stablecoin name.",
  }),
  symbol: z.string({
    required_error: "Please enter stablecoin symbol (e.g. MXN).",
  }),
  fiat: z.string({
    required_error: "Please enter fiat.",
  }),
  logo: z
    .string({
      required_error: "Please enter stablecoin name.",
    })
    .default("#")
    .optional(),
});

export const CreateMiniWindowSchema = z.object({
  name: z.string({
    required_error: "Please enter stablecoin name.",
  }),
  symbol: z.string({
    required_error: "Please enter stablecoin symbol (e.g. MXN).",
  }),
  fiat: z.string({
    required_error: "Please enter fiat.",
  }),
  logo: z
    .string({
      required_error: "Please enter stablecoin name.",
    })
    .default("#")
    .optional(),
  amount: z.string({ required_error: "Please enter an amount." }),
  wallet: z.string({
    required_error: "Please enter your wallet address.",
  }),
});
