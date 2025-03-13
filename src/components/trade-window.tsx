"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
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
import { Check, ChevronDown } from "lucide-react";

interface TradeWindowProp {
  className?: string;
}

interface TradeWindowToken {
  id: string;
  name: string;
  icon: string;
  amount: number;
  ratio: number;
}

interface TradeWindowTokenComboBox extends TradeWindowToken {
  value: string;
  label: string;
}

const token: TradeWindowToken[] = [
  {
    id: "1",
    name: "MXN",
    icon: "/placeholder.svg",
    amount: 100_000,
    ratio: 0.8,
  },
  {
    id: "2",
    name: "SND",
    icon: "/placeholder.svg",
    amount: 23_000,
    ratio: 0.3,
  },
];

export default function TradeWindow({ className }: TradeWindowProp) {
  const [open, setOpen] = React.useState(false);
  const [tradeType, setTradeType] = React.useState<"buy" | "sell">("buy");
  const [activeToken, setActiveToken] = React.useState<TradeWindowToken | null>(
    null
  );
  const [tokens, setTokens] = React.useState<TradeWindowTokenComboBox[] | null>(
    null
  );
  const [amount, setAmount] = React.useState<number>(0);

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
  }, []);

  const tokenName = activeToken ? activeToken.name.toUpperCase() + "s" : "Null";
  const tokenRatioChange = activeToken
    ? Number(activeToken.amount.toPrecision(3)).toLocaleString("en", {
        // notation: "compact",
        // HACK - Change uncomment if you want output to look like 10K, 1Bn, etc
        compactDisplay: "long",
        maximumFractionDigits: 3,
      })
    : 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30",
        className
      )}
    >
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
                        )?.label
                      }
                      {"s"}
                      <Image
                        src={
                          tokens.find(
                            (token) =>
                              token.value === activeToken?.name.toLowerCase()
                          )?.icon || "/placeholder.svg"
                        }
                        className="h-4 w-4 rounded-full bg-gray-500"
                        width={16}
                        height={16}
                        alt={
                          tokens.find(
                            (token) =>
                              token.value === activeToken?.name.toLowerCase()
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
                  <CommandInput placeholder="Search token..." className="h-9" />
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
                              currentValue === activeToken?.name.toLowerCase()
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
          <div className="text-sm text-white/50">Mint a supply</div>
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

        <div className="flex flex-col gap-3">
          <div className="text-sm text-white/50">Amount</div>
          <div className="relative flex justify-between items-center gap-3 mb-2 border border-primary/30 py-2 px-2.5 rounded-md bg-white/5">
            <Input
              placeholder="0.00"
              defaultValue={0}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-2xl border-transparent w-5/8 mr-auto focus-visible:border-transparent focus-visible:border-b focus-visible:border-b-secondary focus-visible:ring-ring/0"
            />
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
        <div className="text-xs flex flex-1 items-center justify-between text-gray-400 mb-4">
          {tradeType === "buy" ? "Get" : "Available"}:{" "}
          <span className="text-primary">
            {activeToken
              ? `${tokenName} ${
                  tradeType === "buy"
                    ? (amount * activeToken.ratio).toLocaleString("en", {
                        compactDisplay: "long",
                        maximumFractionDigits: 3,
                      })
                    : tokenRatioChange
                }`
              : 0.0}
          </span>
        </div>

        <Button disabled={!activeToken}>
          {tradeType === "buy" ? "Buy" : "Sell"} {tokenName}
        </Button>
      </div>

      {/* <div className="bg-secondary/50 rounded-md p-4 border border-border">
        <div className="flex justify-between items-center mb-2">
          <div className="text-lg font-medium">Payout Period</div>
          <div className="text-sm text-teal">7 days</div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">Next Maturity Date</div>
            <div className="text-sm">March 6, 2024</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">
              Total Current Investment
            </div>
            <div className="text-sm">$0.00</div>
          </div>
          <div className="flex justify-between">
            <div className="text-sm text-gray-400">Total Yield Reward</div>
            <div className="text-sm">$1,543.56</div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
