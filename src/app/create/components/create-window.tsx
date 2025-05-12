"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, Info, Upload } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
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


const fiatOptions = [
  {
    id: "usd",
    name: "US Dollar",
    symbol: "USD",
    fiat: "USD",
    country: "USA",
    bond: "USTRY",
    apy: 3.62,
    icon: "/flags/usa.png", 
  },
  {
    id: "gbp",
    name: "Great British Pounds",
    symbol: "GBP",
    fiat: "GBP",
    country: "Great Britain",
    bond: "GILTS",
    apy: 3.92,
    icon: "/flags/gb.png",
  },
  {
    id: "eur",
    name: "Euros",
    symbol: "EUR",
    fiat: "EUR",
    country: "Europe",
    bond: "EUROB",
    apy: 1.95,
    icon: "/flags/eu.png",
  },
  {
    id: "mxn",
    name: "Mexican Peso",
    symbol: "MXN",
    fiat: "MXN",
    country: "Mexico",
    bond: "CETES",
    apy: 7.3,
    icon: "/flags/mx.png",
  },
  {
    id: "brl",
    name: "Brazilian Real",
    symbol: "BRL",
    fiat: "BRL",
    country: "Brazil",
    bond: "TESOURO",
    apy: 12.95,
    icon: "/flags/br.png",
  },
];

export default function CreateWindow({ stablecoins }: CreateWindowProp) {
  const { set } = useCreateCoin();
  const [activeFiat, setActiveFiat] = React.useState<any>(null);
  const [isCToken, setIsCToken] = React.useState<boolean>(false);
  const [, setLogoFile] = React.useState<File | null>(null);
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Convert fiat options to combo box format
  const fiatOptionsFormatted = React.useMemo(() => {
    return fiatOptions.map((option) => ({
      ...option,
      label: option.name,
      value: option.id,
    }));
  }, []);

  const form = useForm<z.infer<typeof CreateWindowSchema>>({
    resolver: zodResolver(CreateWindowSchema),
  });

  const watch = form.watch();
  const stablecoinSymbol = watch.symbol;
  const { symbol, name } = watch;

  React.useEffect(() => {
    if (activeFiat) {
      set(
        symbol || null,
        name || null,
        logoPreview,
        {
          ...activeFiat,
          amount: 0, // Default amount
          price: 1, // Default price
          supply: 0, // Default supply
          change: 0, // Default change
          yield: activeFiat.apy.toString(), // Use APY as yield
        },
        isCToken,
        activeFiat.bond,
        activeFiat.apy,
        0 // Initial supply is 0
      );
    }
  }, [activeFiat, logoPreview, name, set, symbol, isCToken]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (1MB = 1048576 bytes)
      if (file.size > 1048576) {
        form.setError("logo", { message: "File is too large. Maximum size is 1MB." });
        return;
      }
      
      // Check file type
      if (!file.type.includes('image/png') && !file.type.includes('image/jpeg')) {
        form.setError("logo", { message: "Only PNG and JPG files are allowed." });
        return;
      }
      
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        form.setValue("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      // Check file size and type as above
      if (file.size > 1048576) {
        form.setError("logo", { message: "File is too large. Maximum size is 1MB." });
        return;
      }
      
      if (!file.type.includes('image/png') && !file.type.includes('image/jpeg')) {
        form.setError("logo", { message: "Only PNG and JPG files are allowed." });
        return;
      }
      
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        form.setValue("logo", result);
      };
      reader.readAsDataURL(file);
    }
  };
  
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
                                    fiatOptionsFormatted.find(
                                      (option) => option.value === field.value
                                    )?.symbol
                                  }
                                  <Image
                                    src={
                                      fiatOptionsFormatted.find(
                                        (option) => option.value === field.value
                                      )?.icon || "/placeholder.svg"
                                    }
                                    className="h-4 w-4 overflow-hidden rounded-full bg-white/5"
                                    width={16}
                                    height={16}
                                    alt={
                                      fiatOptionsFormatted.find(
                                        (option) => option.value === field.value
                                      )?.symbol || "Coin"
                                    }
                                  />
                                </div>
                              </div>
                              <div className="text-xs bg-white/5 border border-white/10 py-1 px-2 rounded-lg">
                                {
                                  fiatOptionsFormatted.find(
                                    (option) => option.value === field.value
                                  )?.country
                                }
                              </div>
                            </>
                          ) : (
                            <div className="flex gap-2 items-center">
                              <ChevronDown className="opacity-50" />
                              Select fiat currency
                            </div>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command className="bg-secondary text-white border-secondary/30">
                        <CommandInput
                          placeholder="Search currency..."
                          className="h-9 text-white"
                        />
                        <CommandList>
                          <CommandEmpty>No currency found.</CommandEmpty>
                          <CommandGroup>
                            {fiatOptionsFormatted.map((option) => (
                              <CommandItem
                                value={option.id}
                                key={option.id}
                                onSelect={() => {
                                  form.setValue("fiat", option.value);
                                  setActiveFiat(option);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <Image 
                                    src={option.icon || "/placeholder.svg"}
                                    alt={option.symbol}
                                    width={16}
                                    height={16}
                                    className="rounded-full"
                                  />
                                  {option.name} ({option.symbol})
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
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">Logo</div>
            <div 
              className="bg-gray-600/5 rounded-lg border-[1px] border-gray-600/10 p-8 flex flex-col items-center justify-center cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/png,image/jpeg"
              />
              {logoPreview ? (
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mb-2 overflow-hidden rounded-lg">
                    <Image 
                      src={logoPreview} 
                      alt="Logo preview" 
                      width={80} 
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-sm font-medium">Click to change</div>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-gray-400 mb-2" />
                  <div className="text-sm font-medium mb-1">
                    Click to Upload or drag and drop
                  </div>
                  <div className="text-xs text-gray-400">PNG, JPG (1MB)</div>
                </>
              )}
            </div>
            {form.formState.errors.logo && (
              <p className="text-red-500 text-xs mt-1">{form.formState.errors.logo.message}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">cToken</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={16} className="text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-xs">
                        Compressed Tokens store multiple token accounts within a single Merkle Tree. 
                        Only a small hash representing the tree is stored onchain while the account data 
                        is kept offchain and the original tokens are held in a common pool account. 
                        This compression reduces cost by about 95% and enables thousands of token accounts 
                        to be created for the price of just a few regular accounts, making small transactions 
                        economically viable and allowing for much wider token distribution.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Switch
                checked={isCToken}
                onCheckedChange={setIsCToken}
              />
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