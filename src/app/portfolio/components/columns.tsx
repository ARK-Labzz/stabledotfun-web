"use client";

import { AssetProp } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import MiniChart from "@/components/mini-chart";

export const columns: ColumnDef<AssetProp>[] = [
  // Name Column
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const asset = row.original;
      return (
        <Link
          href={`/portfolio/${asset.id}`}
          className="flex gap-3 items-center hover:text-primary transition-colors ease-in duration-200"
        >
          <Image
            src={asset.image}
            alt={asset.name}
            width={28}
            height={28}
            className="rounded-md bg-white/5"
          />
          <span>
            {asset.symbol}s ({asset.fiat})
          </span>
        </Link>
      );
    },
  },
  
  // Price Column
  {
    accessorKey: "price",
    header: "Price (USD)",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 6,
        maximumFractionDigits: 6,
      }).format(price);
      
      return <div className="text-center">{formatted}</div>;
    },
  },
  
  // MCap Column
  {
    accessorKey: "mcap",
    header: "MCap",
    cell: ({ row }) => {
      const asset = row.original;
      const mcap = (asset.price * (asset.supply || 1000000)) / 1000000;
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(mcap);
      
      return <div className="text-center">{formatted}M</div>;
    },
  },
  
  // Supply Column
  {
    accessorKey: "supply",
    header: "Supply",
    cell: ({ row }) => {
      const supply = row.original.supply || 1000000;
      return <div className="text-center">{supply.toLocaleString()}</div>;
    },
  },
  
  // Position Value Column
  {
    accessorKey: "currentInvestment",
    header: "Position Value",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("currentInvestment"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(value);
      
      return <div className="text-center">{formatted}</div>;
    },
  },
  
  // Position Size Column
  {
    accessorKey: "amount",
    header: "Position Size",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      return <div className="text-center">{amount.toLocaleString()}</div>;
    },
  },
  
  // Total Bought Column
  {
    accessorKey: "initialInvestment",
    header: "Total Bought",
    cell: ({ row }) => {
      const value = parseFloat(row.getValue("initialInvestment"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(value);
      
      return <div className="text-center">{formatted}</div>;
    },
  },
  
  // Total Sold Column
  {
    accessorKey: "totalSold",
    header: "Total Sold",
    cell: ({ row }) => {
      const asset = row.original;
      // Calculate total sold as the difference between initial and current
      const totalSold = Math.max(0, asset.initialInvestment - asset.currentInvestment);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 2,
      }).format(totalSold);
      
      return <div className="text-center">{formatted}</div>;
    },
  },
  
  // P&L Column with Mini Chart
  {
    accessorKey: "pnl",
    header: "P&L",
    cell: ({ row }) => {
      const asset = row.original;
      const pnl = asset.currentInvestment - asset.initialInvestment;
      const pnlPercentage = (pnl / asset.initialInvestment) * 100;
      
      return (
        <div className="flex items-center justify-center gap-1">
          <span className={pnl >= 0 ? "text-primary" : "text-red-400"}>
            {pnl >= 0 ? "+" : "-"}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 2,
            }).format(Math.abs(pnl))}
          </span>
          <div className="w-16 h-8">
            <MiniChart
              height={32}
              color={pnl >= 0 ? "#00c2cb" : "#e74c3c"}
              trend={pnl >= 0 ? "up" : "down"}
            />
          </div>
          <span className={pnl >= 0 ? "text-primary" : "text-red-400"}>
            ({pnl >= 0 ? "+" : ""}
            {pnlPercentage.toFixed(2)}%)
          </span>
        </div>
      );
    },
  },
];

