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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "sonner";
import { MaxInput } from "@/components/max-input";
import { RedeemSchema } from "@/lib/validation";
import { useRedeem } from "./redeem-context";

interface RedeemWindowProp {
  token: TradeWindowToken[];
  stablecoins: TradeWindowToken[];
}

export default function RedeemWindow({ token, stablecoins }: RedeemWindowProp) {
  const { set } = useRedeem();
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

  const form = useForm<z.infer<typeof RedeemSchema>>({
    resolver: zodResolver(RedeemSchema),
  });

  const watch = form.watch();

  React.useEffect(() => {
    set(activeToken, activeStable, watch.amount || 0);
  }, [activeStable, activeToken, set, watch]);

  function onSubmit(data: z.infer<typeof RedeemSchema>) {
    console.log({data, tokens});
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
              cc
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
                                      className="h-4 w-4 overflow-hidden rounded-full bg-white/5"
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
                                  value={token.id}
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
                        onMaxClick={handleMaxClick}
                        availableAmount={activeToken?.amount || 0}
                        {...field}
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

      <div className="flex items-center gap-2 justify-center text-xs text-white/50 rounded-lg bg-white/5 border border-white/10 p-2 mb-6">
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
