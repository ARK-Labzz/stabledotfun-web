"use client";

import { cn } from "@/lib/utils";
import { AssetProp } from "@/types";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";

interface AssetHoldingProps {
  className?: string;
  asset: AssetProp[];
}

export default function AssetHolding({ className, asset }: AssetHoldingProps) {
  const [assets, setAssets] = React.useState<AssetProp[] | null>(null);
  const [asc, setAsc] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (asset && asset.length > 0) {
      // TODO - Replace with the fetch data variable
      setAssets(asset);
    }
  }, [asset]);

  const sortedData = assets
    ?.filter((_, i) => i < 10)
    ?.sort((a, b) => (!asc ? a.price - b.price : b.price - a.price));
  // HACK - Sorts data in decending order on default

  return (
    <div
      className={cn(
        "flex flex-col flex-1 gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30 overflow-scroll",
        className
      )}
    >
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-primary">
            Your holdings
          </span>
          <span className="text-xs font-normal px-2 py-1 rounded-md text-gray-400 bg-secondary/70">
            {assets?.length} Assets
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAsc((prev) => !prev)}
            className="text-xs px-3 py-1 rounded-md bg-white/5 border border-primary/30 text-gray-300 flex items-center gap-1"
          >
            {asc ? (
              <ChevronUp className="w-2 h-2" />
            ) : (
              <ChevronDown className="w-2 h-2" />
            )}
            Highest Yield
          </button>
        </div>
      </div>

      <div className="lg:flex-1 mx-auto w-[85vw] lg:w-full overflow-x-scroll">
        <Table>
          <TableHeader>
            <TableRow className="w-full border-none hover:bg-transparent">
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-r-none text-center">
                Stablecoin
              </TableHead>
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none rounded-r-none text-center">
                Price
              </TableHead>
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none rounded-r-none text-center">
                Amount
              </TableHead>
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none rounded-r-none text-center">
                Initial Investment
              </TableHead>
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none rounded-r-none text-center">
                Current Investment
              </TableHead>
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none rounded-r-none text-center">
                Next Yield Amount
              </TableHead>
              <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none text-center p-2">
                TNX
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData
              ?.filter((_, i) => i < 5)
              .map((el) => (
                <TableRow
                  key={el.id}
                  className="text-xs my-4 border-b-white/5 hover:bg-muted/5"
                >
                  <TableCell className="flex items-center gap-2 w-1/2">
                    <Image
                      src={el.image}
                      alt={el.name}
                      width={28}
                      height={28}
                      className="rounded-md bg-white/5"
                    />
                    {el.symbol}s ({el.fiat})
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center",
                      el.change >= 0 ? "text-primary" : "text-red-400"
                    )}
                  >
                    $
                    {el.price.toLocaleString("en", {
                      compactDisplay: "long",
                      maximumFractionDigits: 3,
                    })}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    $
                    {el.amount.toLocaleString("en", {
                      compactDisplay: "long",
                      maximumFractionDigits: 3,
                    })}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    $
                    {el.initialInvestment.toLocaleString("en", {
                      compactDisplay: "long",
                      maximumFractionDigits: 3,
                    })}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    $
                    {el.currentInvestment.toLocaleString("en", {
                      compactDisplay: "long",
                      maximumFractionDigits: 3,
                    })}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-center",
                      el.change >= 0 ? "text-primary" : "text-red-400"
                    )}
                  >
                    $
                    {el.nextYield.toLocaleString("en", {
                      compactDisplay: "long",
                      maximumFractionDigits: 3,
                    })}
                  </TableCell>
                  <TableCell className={cn("text-center")}>
                    <Link href={el.tnx}>
                      <ExternalLink className="text-primary w-3 h-3" />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
