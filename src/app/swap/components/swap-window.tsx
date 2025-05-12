"use client";

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
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TradeWindowToken, TradeWindowTokenComboBox } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ChevronDown, RefreshCw } from "lucide-react";
import { useSwap } from "./swap-context";
import { Input } from "@/components/ui/input";

interface IconProps {
  className?: string;
}

function SwapIcon({ className = "" }: IconProps) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M7 10L3 14L7 18" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M21 14H3" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M17 6L21 10L17 14" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M3 10H21" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Schema for swap form
const SwapSchema = z.object({
  fromToken: z.string().min(1, "Select a token"),
  toToken: z.string().min(1, "Select a token"),
  fromAmount: z.string().min(1, "Enter an amount"),
});

interface SwapWindowProps {
  stablecoins: TradeWindowToken[];  // Limited set: USDs, GBPs, MXNs, EURs, BRLs
  tokens: TradeWindowToken[];       // All accepted tokens, including stablecoins + USDC, BONK, etc.
}

export default function SwapWindow({ stablecoins, tokens }: SwapWindowProps) {
  const { 
    fromToken, 
    toToken, 
    fromAmount, 
    toAmount, 
    rate, 
    lastUpdated,
    set, 
    switchTokens,
    updateRate 
  } = useSwap();
  
  const [tokenList, setTokenList] = React.useState<TradeWindowTokenComboBox[] | null>(null);
  const [allTokensList, setAllTokensList] = React.useState<TradeWindowTokenComboBox[] | null>(null);
  const [isSwitching, setIsSwitching] = React.useState(false);

  React.useEffect(() => {
    if (stablecoins && stablecoins.length > 0) {
      const formattedStablecoins: TradeWindowTokenComboBox[] = stablecoins.map((el) => ({
        ...el,
        label: el.name,
        value: el.name.toLowerCase(),
      }));
      setTokenList(formattedStablecoins);
      
      if (tokens && tokens.length > 0) {
        const formattedTokens: TradeWindowTokenComboBox[] = tokens.map((el) => ({
          ...el,
          label: el.name,
          value: el.name.toLowerCase(),
        }));
        setAllTokensList(formattedTokens);
      }
    }
  }, [stablecoins, tokens]);

  const form = useForm<z.infer<typeof SwapSchema>>({
    resolver: zodResolver(SwapSchema),
    defaultValues: {
      fromToken: "",
      toToken: "",
      fromAmount: "",
    },
  });

  React.useEffect(() => {
    // Set form values when context values change
    if (fromToken) {
      form.setValue("fromToken", fromToken.name.toLowerCase());
    }
    if (toToken) {
      form.setValue("toToken", toToken.name.toLowerCase());
    }
    if (fromAmount) {
      form.setValue("fromAmount", fromAmount);
    }
  }, [fromToken, toToken, fromAmount, form]);

  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (value && !/^[0-9]+(\.[0-9]*)?$/.test(value) && value !== ".") {
      return;
    }
    
    form.setValue("fromAmount", value);
    
    if (value && rate) {
      const calculatedAmount = (parseFloat(value) * (rate || 1)).toFixed(6);
      set(fromToken, toToken, value, calculatedAmount);
    } else {
      set(fromToken, toToken, value, "");
    }
  };

  const handleSwitch = () => {
    setIsSwitching(true);
    switchTokens();
    
    setTimeout(() => {
      setIsSwitching(false);
    }, 300);
  };

  const handleMaxClick = () => {
    if (fromToken && fromToken.amount) {
      const maxAmount = fromToken.amount.toString();
      form.setValue("fromAmount", maxAmount);

      if (rate) {
        const calculatedAmount = (parseFloat(maxAmount) * (rate || 1)).toFixed(6);
        set(fromToken, toToken, maxAmount, calculatedAmount);
      }
    }
  };

  // Handle half button click
  const handleHalfClick = () => {
    if (fromToken && fromToken.amount) {
      const halfAmount = (fromToken.amount / 2).toString();
      form.setValue("fromAmount", halfAmount);
      
      if (rate) {
        const calculatedAmount = (parseFloat(halfAmount) * (rate || 1)).toFixed(6);
        set(fromToken, toToken, halfAmount, calculatedAmount);
      }
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return "Not yet updated";
    
    const now = new Date();
    const seconds = Math.floor((now.getTime() - lastUpdated.getTime()) / 1000);
    
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      return `${Math.floor(seconds / 60)}m ago`;
    } else {
      return `${Math.floor(seconds / 3600)}h ago`;
    }
  };

  function onSubmit(data: z.infer<typeof SwapSchema>) {
    console.log("Swap submitted:", data);
  }

  return (
    <div className="flex-1 rounded-lg p-4 sm:p-6 border border-white/10 bg-white/5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {/* From Token Section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-sm text-gray-400">You Sell</div>
              {fromToken && (
                <div className="text-sm text-gray-400">
                  Balance: {fromToken.amount.toLocaleString()}
                </div>
              )}
            </div>
            
            <div className="rounded-lg border border-white/10 bg-white/5 p-2 sm:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                {/* Token Select */}
                <FormField
                  control={form.control}
                  name="fromToken"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-auto">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full sm:w-[180px] h-12 gap-2 justify-between border-white/10 bg-white/5 hover:bg-primary/5",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && fromToken ? (
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={fromToken.icon || "/placeholder.svg"}
                                    alt={fromToken.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                  />
                                  <span>{fromToken.symbol}</span>
                                </div>
                              ) : (
                                <span>Select token</span>
                              )}
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command className="bg-secondary text-white border-secondary/30">
                            <CommandInput
                              placeholder="Search token..."
                              className="h-9 text-white"
                            />
                            <CommandList>
                              <CommandEmpty>No token found.</CommandEmpty>
                              <CommandGroup>
                                {tokenList?.map((token) => (
                                  <CommandItem
                                    key={token.id}
                                    value={token.name}
                                    onSelect={() => {
                                      form.setValue("fromToken", token.value);
                                      set(token, toToken, fromAmount, toAmount);
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Image
                                        src={token.icon || "/placeholder.svg"}
                                        alt={token.name}
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                      />
                                      <span>{token.symbol}</span>
                                    </div>
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
              
                {/* Amount Input */}
                <FormField
                  control={form.control}
                  name="fromAmount"
                  render={({ field }) => (
                    <FormItem className="flex-1 w-full">
                      <div className="flex flex-col w-full">
                        {/* Amount buttons */}
                        <div className="flex justify-end mb-2">
                          {fromToken && (
                            <div className="flex gap-1">
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 rounded-md bg-white/10 px-2 text-xs text-gray-300 hover:bg-white/20"
                                onClick={handleHalfClick}
                              >
                                HALF
                              </Button>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 rounded-md bg-white/10 px-2 text-xs text-gray-300 hover:bg-white/20"
                                onClick={handleMaxClick}
                              >
                                MAX
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Input field - now below the buttons */}
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            className="w-full border-none bg-transparent text-right text-xl focus-visible:ring-0 focus-visible:ring-offset-0"
                            onChange={handleFromAmountChange}
                            value={field.value}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center -my-2 relative z-10">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className={cn(
                "h-10 w-10 rounded-full border-white/10 bg-background hover:bg-white/10",
                isSwitching && "animate-spin"
              )}
              onClick={handleSwitch}
            >
              {/* Using SwapIcon instead of ArrowDown */}
              <SwapIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* To Token Section */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-sm text-gray-400">You Buy</div>
              {toToken && (
                <div className="text-sm text-gray-400">
                  Balance: {toToken.amount.toLocaleString()}
                </div>
              )}
            </div>
            
            <div className="rounded-lg border border-white/10 bg-white/5 p-2 sm:p-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                {/* Token Select */}
                <FormField
                  control={form.control}
                  name="toToken"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-auto">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full sm:w-[180px] h-12 gap-2 justify-between border-white/10 bg-white/5 hover:bg-primary/5",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value && toToken ? (
                                <div className="flex items-center gap-2">
                                  <Image
                                    src={toToken.icon || "/placeholder.svg"}
                                    alt={toToken.name}
                                    width={24}
                                    height={24}
                                    className="rounded-full"
                                  />
                                  <span>{toToken.symbol}</span>
                                </div>
                              ) : (
                                <span>Select token</span>
                              )}
                              <ChevronDown className="h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command className="bg-secondary text-white border-secondary/30">
                            <CommandInput
                              placeholder="Search token..."
                              className="h-9 text-white"
                            />
                            <CommandList>
                              <CommandEmpty>No token found.</CommandEmpty>
                              <CommandGroup>
                                {allTokensList?.map((token) => (
                                  <CommandItem
                                    key={token.id}
                                    value={token.name}
                                    onSelect={() => {
                                      form.setValue("toToken", token.value);
                                      set(fromToken, token, fromAmount, toAmount);
                                    }}
                                  >
                                    <div className="flex items-center gap-2">
                                      <Image
                                        src={token.icon || "/placeholder.svg"}
                                        alt={token.name}
                                        width={20}
                                        height={20}
                                        className="rounded-full"
                                      />
                                      <span>{token.symbol}</span>
                                    </div>
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
                
                {/* To Amount Display */}
                <div className="flex-1 w-full text-right text-xl">
                  {toAmount ? parseFloat(toAmount).toLocaleString(undefined, {
                    maximumFractionDigits: 6
                  }) : "0.00"}
                </div>
              </div>
            </div>
          </div>

          {/* Rate Information with Manual Refresh Button */}
          {fromToken && toToken && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3 text-sm gap-2">
              <div className="flex items-center gap-2">
                <span>1 {fromToken.symbol} ≈ {rate ? rate.toFixed(6) : '...'} {toToken.symbol}</span>
                {/* Prominent refresh button */}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 border-primary/30 hover:bg-primary/10 flex items-center gap-1"
                  onClick={updateRate}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Refresh
                </Button>
              </div>
              
              <div className="text-gray-400 flex items-center gap-2">
                <span>
                  {fromToken.fiat && toToken.fiat ? 
                    `${fromToken.fiat} → ${toToken.fiat}` : 
                    `${fromToken.symbol} → ${toToken.symbol}`
                  }
                </span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="text-gray-500">
                      <span className="text-xs">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Last updated: {formatLastUpdated()}</p>
                      <p className="text-xs mt-1">Rates refresh every 15 minutes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 bg-primary/80 hover:bg-primary text-black font-medium"
            disabled={!fromToken || !toToken || !fromAmount || parseFloat(fromAmount) === 0}
          >
            {!fromToken || !toToken ? "Select tokens" : 
             !fromAmount || parseFloat(fromAmount) === 0 ? "Enter an amount" : 
             `Swap ${fromToken.symbol} for ${toToken.symbol}`}
          </Button>
        </form>
      </Form>
    </div>
  );
}