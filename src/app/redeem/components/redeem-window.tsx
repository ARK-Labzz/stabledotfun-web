"use client";

import { ChevronDown, Copy, Info } from "lucide-react";
import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TradeWindowToken, TradeWindowTokenComboBox } from "@/types";
import { stablecoins, token } from "@/static-data/token";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "sonner";
import { MaxInput } from "@/components/max-input";

const RedeemSchema = z.object({
  from: z.string({
    required_error: "Please select a token.",
  }),
  to: z.string({
    required_error: "Please select a token.",
  }),
  amount: z.number({
    required_error: "Please input an amount.",
  }),
});

export default function RedeemWindow() {
  const { publicKey } = useWallet();
  const [activeToken, setActiveToken] = React.useState<TradeWindowToken | null>(
    null
  );
  const [activeStable, setActiveStable] =
    React.useState<TradeWindowToken | null>(null);
  const [tokens, setTokens] = React.useState<TradeWindowTokenComboBox[] | null>(
    null
  );
  const [stables, setStables] = React.useState<
    TradeWindowTokenComboBox[] | null
  >(null);
  // const [amount, setAmount] = React.useState<number>(0);

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

  const form = useForm<z.infer<typeof RedeemSchema>>({
    resolver: zodResolver(RedeemSchema),
  });

  function onSubmit(data: z.infer<typeof RedeemSchema>) {
    console.log(data);
    console.info({ tokenName, tokenRatioChange, tokens, activeStable });
  }

  const handleCopy = () => {
    if (publicKey) navigator.clipboard.writeText(publicKey);
    toast("Address Copied!");
  };

  const handleMaxClick = () => {
    form.setValue("amount", activeToken?.amount || 0, { shouldValidate: true });
  };

  return (
    <div className="flex-1 rounded-lg p-6 border border-white/10 bg-white/5">
      <h2 className="text-2xl mb-6">Redeem Your Stablecoin</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm text-gray-400 mb-2">
                      From
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full h-17 gap-2 justify-between border-white/10 bg-white/5 hover:bg-primary/5",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                <div className="flex gap-2 items-center">
                                  <ChevronDown className="opacity-50" />
                                  <div className="flex flex-col flex-1 gap-1 items-start">
                                    <div className="text-xs text-white/50">
                                      Issued by{" "}
                                      <span className="text-primary">
                                        cre8tivebuka
                                      </span>
                                    </div>
                                    <div className="flex-1 text-[17px]">
                                      {tokens?.find(
                                        (token) => token.value === field.value
                                      )?.symbol + "s "}
                                      (
                                      {
                                        tokens?.find(
                                          (token) => token.value === field.value
                                        )?.fiat
                                      }
                                      )
                                    </div>
                                  </div>
                                </div>
                                <Image
                                  src={
                                    tokens?.find(
                                      (token) =>
                                        token.value ===
                                        activeToken?.name.toLowerCase()
                                    )?.icon || "/placeholder.svg"
                                  }
                                  className="h-9 w-9 rounded-lg bg-gray-500 "
                                  width={35}
                                  height={35}
                                  alt={
                                    tokens?.find(
                                      (token) =>
                                        token.value ===
                                        activeToken?.name.toLowerCase()
                                    )?.name || "Token"
                                  }
                                />
                              </>
                            ) : (
                              <div className="flex gap-2 items-center">
                                <ChevronDown className="opacity-50" />
                                Select token
                              </div>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="bg-secondary text-white border-secondary/30">
                          <CommandInput
                            placeholder="Search token..."
                            className="h-9 text-white"
                          />
                          <CommandList>
                            <CommandEmpty>No token found.</CommandEmpty>
                            <CommandGroup>
                              {tokens?.map((token) => (
                                <CommandItem
                                  value={token.label}
                                  key={token.value}
                                  onSelect={() => {
                                    form.setValue("from", token.value);
                                    setActiveToken(
                                      tokens.find(
                                        (el) => el.value === token.value
                                      ) || null
                                    );
                                  }}
                                >
                                  {token.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm text-gray-400 mb-2">
                      To
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                              "w-full h-17 gap-2 justify-between border-white/10 bg-white/5 hover:bg-primary/5",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              <>
                                <div className="flex gap-2 items-center">
                                  <ChevronDown className="opacity-50" />
                                  <div className="flex gap-2 font-normal text-xl items-center">
                                    {
                                      stables?.find(
                                        (token) => token.value === field.value
                                      )?.symbol
                                    }
                                    <Image
                                      src={
                                        stables?.find(
                                          (token) => token.value === field.value
                                        )?.icon || "/placeholder.svg"
                                      }
                                      className="h-4 w-4 overflow-hidden rounded-full bg-white "
                                      width={16}
                                      height={16}
                                      alt={
                                        stables?.find(
                                          (token) => token.value === field.value
                                        )?.symbol || "Coin"
                                      }
                                    />
                                  </div>
                                </div>
                                <div className="text-xs bg-white/5 border border-white/10 py-1 px-2 rounded-lg">
                                  {
                                    stables?.find(
                                      (token) => token.value === field.value
                                    )?.fiat
                                  }
                                </div>
                              </>
                            ) : (
                              <div className="flex gap-2 items-center">
                                <ChevronDown className="opacity-50" />
                                Select stablecoin
                              </div>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command className="bg-secondary text-white border-secondary/30">
                          <CommandInput
                            placeholder="Search stablecoin..."
                            className="h-9 text-white"
                          />
                          <CommandList>
                            <CommandEmpty>No stablecoin found.</CommandEmpty>
                            <CommandGroup>
                              {stables?.map((token) => (
                                <CommandItem
                                  value={token.label}
                                  key={token.id}
                                  onSelect={() => {
                                    form.setValue("to", token.value);
                                    setActiveStable(
                                      stables.find(
                                        (el) => el.value === token.value
                                      ) || null
                                    );
                                  }}
                                >
                                  {token.label}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mb-6">
            <div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm text-gray-400 mb-2">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <MaxInput
                        className=""
                        placeholder="0.00"
                        {...field}
                        onMaxClick={handleMaxClick}
                        availableAmount={
                          activeToken?.amount.toLocaleString("en", {
                            maximumFractionDigits: 3,
                          }) || 0
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>

      <div className="flex items-center gap-2 justify-center text-xs text-gray-400 mb-6">
        <Info size={14} />
        To redeem your stablecoins, transfer them to the wallet address of your
        choice. Below is your unique redemption account.
      </div>

      <div>
        <div className="text-sm text-white/50 mb-2">Destination Address</div>
        <div className="flex items-center gap-2 bg-white/5 p-3 rounded-md border border-white/10">
          <ChevronDown className="w-3 h-3" />
          <div className="truncate w-10 lg:w-full text-sm flex-1 flex flex-wrap items-center gap-2">
            {publicKey || "Null"}
          </div>
          <Copy
            onClick={handleCopy}
            size={16}
            className="text-gray-400 flex-shrink-0"
          />
        </div>
      </div>
    </div>
  );
}
