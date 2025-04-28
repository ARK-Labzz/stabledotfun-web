"use client";

import { cn } from "@/lib/utils";
import { AssetProp } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const columns: ColumnDef<AssetProp>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const { image, name, symbol, fiat, id } = row.original;
      return (
        <Link href={`/portfolio/${id}`}>
          <div className="flex items-center gap-2 pr-3">
            <Image
              src={image}
              alt={name}
              width={28}
              height={28}
              className="rounded-md bg-white/5"
            />
            {symbol}s ({fiat})
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const { price, change } = row.original;

      return (
        <div className={cn(change >= 0 ? "text-primary" : "text-red-400")}>
          $
          {price.toLocaleString("en", {
            compactDisplay: "long",
            maximumFractionDigits: 3,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const { amount } = row.original;

      return (
        <div>
          {amount.toLocaleString("en", {
            compactDisplay: "long",
            maximumFractionDigits: 3,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "initialInvestment",
    header: "Initial Investment",
    cell: ({ row }) => {
      const { initialInvestment } = row.original;

      return (
        <div>
          $
          {initialInvestment.toLocaleString("en", {
            compactDisplay: "long",
            maximumFractionDigits: 3,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "currentInvestment",
    header: "Current Investment",
    cell: ({ row }) => {
      const { currentInvestment } = row.original;

      return (
        <div>
          $
          {currentInvestment.toLocaleString("en", {
            compactDisplay: "long",
            maximumFractionDigits: 3,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "nextYield",
    header: "Next Yield",
    cell: ({ row }) => {
      const { nextYield } = row.original;

      return (
        <div className={cn(nextYield >= 0 ? "text-primary" : "text-red-400")}>
          $
          {nextYield.toLocaleString("en", {
            compactDisplay: "long",
            maximumFractionDigits: 3,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "tnx",
    header: "TNX",
    cell: ({ row }) => {
      const { tnx } = row.original;

      return (
        <div className="text-center">
          <Link href={tnx}>
            <ExternalLink className="text-primary w-3 h-3" />
          </Link>
        </div>
      );
    },
  },
];
