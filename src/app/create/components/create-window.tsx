"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Upload } from "lucide-react";
import { TradeWindowToken, TradeWindowTokenComboBox } from "@/types";
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
import { CreateWindowSchema } from "@/lib/validation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useCreateCoin } from "./create-context";

interface CreateWindowProp {
  stablecoins: TradeWindowToken[];
}

export default function CreateWindow({ stablecoins }: CreateWindowProp) {
  const { set } = useCreateCoin();
  const [activeStable, setActiveStable] =
    React.useState<TradeWindowToken | null>(null);

  const [stables, setStables] = React.useState<
    TradeWindowTokenComboBox[] | null
  >(null);

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

  const form = useForm<z.infer<typeof CreateWindowSchema>>({
    resolver: zodResolver(CreateWindowSchema),
  });

  const watch = form.watch();
  const stablecoinSymbol = watch.symbol;
  const { symbol, name, logo } = watch;

  React.useEffect(() => {
    if (activeStable) {
      console.log({ symbol, name, logo, activeStable });
      set(symbol, name, logo || null, activeStable);
    }
  }, [activeStable, logo, name, set, symbol]);

  function onSubmit(data: z.infer<typeof CreateWindowSchema>) {
    console.log(data);
  }

  return (
    <div className="flex-1 border-white/10 border rounded-2xl p-6">
      <h2 className="text-2xl font-normal mb-6 text-white">
        Create Your Stablecoin
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm text-gray-400 mb-2">
                      Ticker Symbol
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="MXNs"
                        className="bg-white/5 border-white/5 border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm text-gray-400 mb-2">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Mexican Peso Stablecoin"
                        className="bg-white/5 border-white/5 border"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mb-6">
            <FormField
              control={form.control}
              name="fiat"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm text-gray-400 mb-2">
                    Target Fiat Currency
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
                                  form.setValue("fiat", token.value);
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

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Logo</div>
            <div className="bg-gray-600/5 rounded-lg border-[1px] border-gray-600/10 p-8 flex flex-col items-center justify-center">
              <Upload size={24} className="text-gray-400 mb-2" />
              <div className="text-sm font-medium mb-1">
                Click to Upload or drag and drop
              </div>
              <div className="text-xs text-gray-400">PNG, JPG (1MB)</div>
            </div>
          </div>

          <Button className="w-full">
            Create {stablecoinSymbol ? `${stablecoinSymbol}s` : "Stablecoin"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
