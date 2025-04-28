"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export type Transaction = {
  id: string;
  timestamp: string;
  description: string;
  amount: number;
  status: "pending" | "processing" | "completed" | "failed";
  transactionType: "buy" | "sell" | "transfer" | "stake" | "withdraw";
  asset: string;
  walletAddress: string;
  transactionHash: string;
  network: "Solana";
};

export const txcolumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "timestamp",
    header: "Timestamp",
    cell: ({ row }) => {
      const { timestamp } = row.original;

      return (
        <div>
          {format(new Date(timestamp), "MMM do yyyy, hh:mm:ss a")}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;

      return <div className="capitalize">{status}</div>;
    },
  },
  {
    accessorKey: "transactionType",
    header: "Transaction Type",
    cell: ({ row }) => {
      const { transactionType } = row.original;

      return <div className="capitalize">{transactionType}</div>;
    },
  },
  {
    accessorKey: "asset",
    header: "Asset",
  },
  {
    accessorKey: "walletAddress",
    header: "Wallet Address",
    cell: ({ row }) => {
      const { walletAddress } = row.original;

      return <div className="truncate">{truncateWallet(walletAddress)}</div>;
    },
  },
  {
    accessorKey: "transactionHash",
    header: "Transaction Hash",
    cell: ({ row }) => {
      const { transactionHash } = row.original;

      return <div className="truncate">{truncateWallet(transactionHash)}</div>;
    },
  },
  {
    accessorKey: "network",
    header: "Network",
  },
];

const truncateWallet = (text: string) => {
  return text.slice(0, 8) + "..." + text.slice(-8);
};

// Mock data for transactions
export const mockData: Transaction[] = [
  {
    id: "1",
    timestamp: "2023-10-01T12:00:00Z",
    description: "Bought SOL",
    amount: 2.5,
    status: "completed",
    transactionType: "buy",
    asset: "SOL",
    walletAddress: "0x1234567890abcdef1234567890abcdef12345678",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    network: "Solana",
  },
  {
    id: "2",
    timestamp: "2023-10-02T14:30:00Z",
    description: "Sold SOL",
    amount: 0.1,
    status: "completed",
    transactionType: "sell",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef1234",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567891",
    network: "Solana",
  },
  {
    id: "3",
    timestamp: "2023-10-03T16:45:00Z",
    description: "Transferred SOL",
    amount: 1000,
    status: "pending",
    transactionType: "transfer",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef5678",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567892",
    network: "Solana",
  },
  {
    id: "4",
    timestamp: "2023-10-04T18:00:00Z",
    description: "Staked SOL",
    amount: 500,
    status: "completed",
    transactionType: "stake",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef9876",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567893",
    network: "Solana",
  },
  {
    id: "5",
    timestamp: "2023-10-05T20:15:00Z",
    description: "Withdrew SOL",
    amount: 50,
    status: "failed",
    transactionType: "withdraw",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef6543",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567894",
    network: "Solana",
  },
  {
    id: "6",
    timestamp: "2023-10-06T22:30:00Z",
    description: "Bought SOL",
    amount: 10,
    status: "completed",
    transactionType: "buy",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef3210",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567895",
    network: "Solana",
  },
  {
    id: "7",
    timestamp: "2023-10-07T23:45:00Z",
    description: "Sold SOL",
    amount: 100,
    status: "processing",
    transactionType: "sell",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef7654",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567896",
    network: "Solana",
  },
  {
    id: "8",
    timestamp: "2023-10-08T01:00:00Z",
    description: "Transferred SOL",
    amount: 200,
    status: "completed",
    transactionType: "transfer",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef8765",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567897",
    network: "Solana",
  },
  {
    id: "9",
    timestamp: "2023-10-09T03:15:00Z",
    description: "Staked SOL",
    amount: 300,
    status: "completed",
    transactionType: "stake",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef5432",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567898",
    network: "Solana",
  },
  {
    id: "10",
    timestamp: "2023-10-10T05:30:00Z",
    description: "Withdrew SOL",
    amount: 400,
    status: "completed",
    transactionType: "withdraw",
    asset: "SOL",
    walletAddress: "0xabcdef1234567890abcdef1234567890abcdef1234",
    transactionHash:
      "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567899",
    network: "Solana",
  },
];
