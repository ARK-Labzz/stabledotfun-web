"use client";

import { Button } from "@/components/ui/button";
import { Copy, Info } from "lucide-react";
import React from "react";
import { useRedeem } from "./redeem-context";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "sonner";
import Image from "next/image";
import { MaxInput } from "@/components/max-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RedeemMiniSchema } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function RedeemMiniWindow() {
  const { from, to } = useRedeem();
  const { publicKey } = useWallet();

  const form = useForm<z.infer<typeof RedeemMiniSchema>>({
    resolver: zodResolver(RedeemMiniSchema),
  });

  const watch = form.watch();

  const fromWatch = watch.from;

  const getRatioAmount = (from?.amount || 0) / (to?.amount || 1);

  const getAmount = Number(fromWatch) * getRatioAmount || 0;

  React.useEffect(() => {
    if (getAmount) form.setValue("to", String(getAmount));
  }, [getAmount, form]);

  const handleCopy = () => {
    if (publicKey) navigator.clipboard.writeText(publicKey);
    toast("Address Copied!");
  };

  const handleMaxClick = () => {
    form.setValue("from", String(from?.amount || 0), {
      shouldValidate: true,
    });
  };

  function onSubmit(data: z.infer<typeof RedeemMiniSchema>) {
    console.log(data);
  }

  return (
    <div className="w-full lg:w-80 space-y-4 rounded-lg p-4 border border-white/10 bg-white/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-1 items-center gap-2">
              <Image
                src={from?.icon || "/placeholder.svg"}
                className="h-9 w-9 rounded-lg bg-gray-500 "
                width={35}
                height={35}
                alt={from?.name || "token"}
              />
              <div className="flex flex-col gap-1">
                <div className="text-xs text-gray-400">
                  Issued by <span className="text-primary">cre8tivebuka</span>
                </div>
                <div className="font-medium">
                  {from?.symbol}s ({from?.fiat})
                </div>
              </div>
              <div className="flex justify-end ml-auto">
                {/* Cop Icon Here */}
              </div>
            </div>

            <div className="text-xl text-center text-white/50 p-2 w-full border border-white/10 rounded-lg font-medium mb-4">
              Redeem Your{" "}
              <span className="text-primary/50">{from?.symbol}s</span>
            </div>

            <div className="space-y-4 flex flex-col gap-3">
              <div>
                <div className="text-sm mb-2">Sell Your {from?.symbol}s</div>
                <FormField
                  control={form.control}
                  name="from"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MaxInput
                          className=""
                          placeholder="0.00"
                          onMaxClick={handleMaxClick}
                          max={from?.amount}
                          availableAmount={from?.amount || 0}
                          symbol={`${from?.symbol || "Null"}s`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <div className="text-sm mb-2">Get</div>
                <div className="relative px-4 py-2 rounded-xl bg-white/10 border-white/10 border">
                  <div className="relative flex gap-2 justify-between items-center">
                    <div className="text-2xl truncate w-7/12">
                      {getAmount.toLocaleString("en", {
                        maximumFractionDigits: 3,
                      })}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      - {to?.symbol}{" "}
                      <Info size={12} className="text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm mb-2">Destination Address</div>
                <div className="flex items-center gap-2 bg-white/5 p-3 rounded-md border border-white/10">
                  <div className="truncate text-sm w-60">
                    {publicKey || "Null"}
                  </div>
                  <Copy
                    onClick={handleCopy}
                    size={16}
                    className="text-gray-400 flex-shrink-0"
                  />
                </div>
              </div>

              <Button
                disabled={!form.formState.isValid}
                type="submit"
                className="w-full h-14 text-base bg-secondary/80 hover:bg-secondary cursor-pointer"
              >
                Redeem {from?.symbol || "Null"}s
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
