"use client";

import React from "react";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useCreateCoin } from "@/app/create/components/create-context";
import { useWallet } from "@/hooks/use-wallet";
import { toast } from "sonner";
import { TradeWindowToken, TradeWindowTokenComboBox } from "@/types";
import { CreateMiniWindowSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface CreateMiniWindowProp {
  stablecoins: TradeWindowToken[];
}

const MintWindow = ({ stablecoins }: CreateMiniWindowProp) => {
  const { publicKey, username } = useWallet();

  const { ticker, name, fiat, logo } = useCreateCoin();

  const [activeStable, setActiveStable] =
    React.useState<TradeWindowToken | null>(null);
  const [stables, setStables] = React.useState<
    TradeWindowTokenComboBox[] | null
  >(null);

  const form = useForm<z.infer<typeof CreateMiniWindowSchema>>({
    resolver: zodResolver(CreateMiniWindowSchema),
  });

  React.useEffect(() => {
    if (name) form.setValue("name", name);
    if (ticker) form.setValue("symbol", ticker);
    if (fiat) form.setValue("fiat", fiat.id);
    if (logo) form.setValue("logo", logo);
    if (publicKey) form.setValue("wallet", publicKey);
  }, [name, ticker, form, fiat, logo, publicKey]);
  
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

  const handleCopy = () => {
    if (publicKey) navigator.clipboard.writeText(publicKey);
    toast("Address Copied!");
  };

  function onSubmit(data: z.infer<typeof CreateMiniWindowSchema>) {
    console.log(data);
  }

  return (
    <div className="w-full lg:w-80 h-full">
      <div className="h-full bg-[rgba(255,255,255,0.05)] border-gray-600/10 border-[2px] space-y-6 rounded-lg p-4">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <div className="h-10 w-10 bg-zinc-600/10 rounded-xl "></div>
            <div className="">
              <p className="text-xs text-gray-400">
                Issued by{" "}
                <span className="text-primary">
                  {username ? username : "cre8tivebuka"}
                </span>
              </p>
              <p>
                {ticker ? ticker + "s" : "MXNs"} ({fiat ? fiat.symbol : "CETES"}
                )
              </p>
            </div>
          </div>
          <div>
            <Image
              src="info.svg"
              className="h-10 w-10"
              height={100}
              width={100}
              alt="more info"
              priority
            />
          </div>
        </div>

        <h3 className="text-xl text-gray-600 font-medium mb-4 text-center py-3 rounded-sm border-[1.5px] border-gray-600">
          Mint {ticker ? ticker + "s" : "MXNs"}
        </h3>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-6">
              <div>
                <div className="text-sm mb-2 text-gray-600">Amount</div>
                <div className="flex bg-gray-600/5 border-[1px] border-gray-600/10 p-2 rounded-md justify-between items-center mb-2 gap-2">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="0"
                            className="border-none flex flex-1 w-8/12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="text-sm text-gray-400 flex items-center gap-1">
                    <FormField
                      control={form.control}
                      name="fiat"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              const result = stables?.find(
                                (el) => el.value === value
                              );
                              if (result) setActiveStable(result);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="p-1 px-2 border-[1px] border-gray-600/20 bg-gray-600/10">
                                <SelectValue
                                  placeholder={activeStable?.symbol}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {stables?.map((el, i) => (
                                <SelectItem key={el.id + i} value={el.value}>
                                  {el.symbol}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-600 mb-2">
                  Target Fiat Currency
                </div>
                {fiat && (
                  <div className="flex items-center gap-2  bg-gray-600/5 border-[1px] border-gray-600/10 p-2 rounded-md">
                    <div className="text-sm flex flex-wrap gap-2 items-center">
                      - {fiat?.name}
                      {fiat && (
                        <span className="inline-block min-w-5 h-3 py-1 px-2 bg-green-500 relative">
                          <span className="absolute inset-0 flex items-center justify-center text-white text-[8px]">
                            {fiat?.symbol}
                          </span>
                        </span>
                      )}
                    </div>
                    <div className="ml-auto text-xs  bg-gray-600/5 border-[1px] border-gray-600/10 px-2 py-1 rounded">
                      {fiat?.fiat}
                    </div>
                  </div>
                )}
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

              <Button className="w-full">
                Mint {ticker ? ticker + "s" : "MXNs"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default MintWindow;
