"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { TradeWindowToken, TradeWindowTokenComboBox } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { MaxInput } from "@/components/max-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RedeemMiniSchema } from "@/lib/validation";

interface SellWindowProp {
  className?: string;
  token: TradeWindowToken[];
  stablecoins: TradeWindowToken[];
}

export default function SellWindow({
  className,
  token,
  stablecoins,
}: SellWindowProp) {
  const { publicKey } = useWallet();
  const [open, setOpen] = React.useState(false);
  const [tradeType, setTradeType] = React.useState<"buy" | "sell">("buy");
  const [activeToken, setActiveToken] = React.useState<TradeWindowToken | null>(
    null
  );
  const [tokens, setTokens] = React.useState<TradeWindowTokenComboBox[] | null>(
    null
  );
  const [activeStable, setActiveStable] =
    React.useState<TradeWindowToken | null>(null);
  const [stables, setStables] = React.useState<
    TradeWindowTokenComboBox[] | null
  >(null);

  const form = useForm<z.infer<typeof RedeemMiniSchema>>({
    resolver: zodResolver(RedeemMiniSchema),
  });

  React.useEffect(() => {
    if (token && token.length > 0) {
      setActiveToken(token[0]); // Set the active token to the first index
      const output: TradeWindowTokenComboBox[] = token.map((el) => ({
        ...el,
        label: el.name,
        value: el.name.toLowerCase(),
      }));
      setTokens(output);
    } // TODO - Make this reset the tokens when fetched from API
  }, [token]);

  React.useEffect(() => {
    if (stablecoins && stablecoins.length > 0) {
      setActiveStable(stablecoins[0]); // Set the active token to the first index
      const output: TradeWindowTokenComboBox[] = stablecoins.map((el) => ({
        ...el,
        label: el.name,
        value: el.name.toLowerCase(),
      }));
      setStables(output);
    } // TODO - Make this reset the stablecoin when fetched from API
  }, [stablecoins]);

  const watch = form.watch();

  const fromWatch = watch.from;

  const getRatioAmount =
    (activeToken?.amount || 0) / (activeStable?.amount || 1);

  const getAmount = Number(fromWatch) * getRatioAmount || 0;

  React.useEffect(() => {
    if (getAmount) form.setValue("to", String(getAmount));
  }, [getAmount, form]);

  const handleCopy = () => {
    if (publicKey) navigator.clipboard.writeText(publicKey);
    toast("Address Copied!");
  };

  const handleMaxClick = () => {
    form.setValue("from", String(activeToken?.amount || 0), {
      shouldValidate: true,
    });
  };

  function onSubmit(data: z.infer<typeof RedeemMiniSchema>) {
    console.log({data, stables, tokens});
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-white/5 rounded-xl p-4 border border-secondary/30 flex-col gap-3 flex">
            <div className="flex flex-1 justify-between items-center">
              <div>Sell Your Stablecoin</div>
              {tokens && (
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[110px] justify-between bg-white/10 border-primary/30 gap-1 px-0"
                    >
                      <ChevronDown className="opacity-50" />
                      {tokens ? (
                        <>
                          {
                            tokens.find(
                              (token) =>
                                token.value === activeToken?.name.toLowerCase()
                            )?.symbol
                          }
                          {"s"}
                          <Image
                            src={
                              tokens.find(
                                (token) =>
                                  token.value ===
                                  activeToken?.name.toLowerCase()
                              )?.icon || "/placeholder.svg"
                            }
                            className="h-4 w-4 rounded-full bg-gray-500"
                            width={16}
                            height={16}
                            alt={
                              tokens.find(
                                (token) =>
                                  token.value ===
                                  activeToken?.name.toLowerCase()
                              )?.name || "Token"
                            }
                          />
                        </>
                      ) : (
                        "Select token..."
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[110px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search token..."
                        className="h-9"
                      />
                      <CommandList>
                        <CommandEmpty>No token found.</CommandEmpty>
                        <CommandGroup className="bg-secondary">
                          {tokens.map((token) => (
                            <CommandItem
                              key={token.value}
                              value={token.value}
                              onSelect={(currentValue) => {
                                const selectedToken =
                                  tokens.find(
                                    (token) => token.value === currentValue
                                  ) || null;
                                setActiveToken(
                                  currentValue ===
                                    activeToken?.name.toLowerCase()
                                    ? null
                                    : selectedToken
                                );
                                setOpen(false);
                              }}
                            >
                              {token.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  activeToken?.name === token.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm text-white/50">Burn a supply</div>
              <div className="flex justify-between items-center gap-3 mb-2">
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex flex-1 border cursor-pointer uppercase font-normal",
                    tradeType === "buy"
                      ? "border-primary text-white bg-white/10"
                      : "text-white/50 bg-white/5 border-white/10"
                  )}
                  onClick={() => setTradeType("buy")}
                >
                  Buy
                </Button>
                <Button
                  variant={"outline"}
                  className={cn(
                    "flex flex-1 border cursor-pointer uppercase font-normal",
                    tradeType === "sell"
                      ? "border-primary text-white bg-white/10"
                      : "text-white/50 bg-white/5 border-white/10"
                  )}
                  onClick={() => setTradeType("sell")}
                >
                  Sell
                </Button>
              </div>
            </div>

            <div className="relative flex flex-col gap-4">
              <div className="text-sm text-white/50">Amount</div>

              <div>
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
                          max={activeToken?.amount}
                          availableAmount={activeToken?.amount || 0}
                          symbol={`${activeToken?.symbol || "Null"}s`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="relative flex flex-col gap-3 mb-2 border border-primary/30 py-2 px-2.5 rounded-md bg-white/5">
                {/* <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary outline-4 outline-background/60 flex items-center justify-center">
                  <ArrowUpDown size={20} className="text-background" />
                </div> */}

                <div className="text-xs text-white/50">Get</div>
                <div className="flex flex-1 justify-between gap-3">
                  <div className="relative flex flex-1 gap-2 justify-between items-center">
                    <div className="text-2xl truncate w-7/12">
                      {getAmount.toLocaleString("en", {
                        maximumFractionDigits: 3,
                      })}
                    </div>
                  </div>
                  <span className="absolute flex gap-1 right-2 items-center top-1/2 -translate-y-1/2 text-sm text-gray-400 p-2 w-fit bg-white/5 border border-primary/30 rounded-md pointer-events-none">
                    USDC{" "}
                    <Image
                      src={"/placeholder.svg"}
                      className="h-4 w-4 rounded-full bg-gray-500"
                      width={16}
                      height={16}
                      alt="USDC"
                    />
                  </span>
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
              disabled={!activeToken}
              className="w-full h-14 text-base bg-secondary/80 hover:bg-secondary cursor-pointer"
            >
              {tradeType === "buy" ? "Purchase" : "Sell"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
