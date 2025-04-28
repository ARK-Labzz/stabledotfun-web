"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import MiniChart from "./mini-chart";
import { AssetProp } from "@/types";
import { motion } from "motion/react";
import Link from "next/link";

interface AssetShowcaseProps {
  className?: string;
  asset: AssetProp[];
}

export default function AssetShowcase({
  className,
  asset,
}: AssetShowcaseProps) {
  const [assets, setAssets] = React.useState<AssetProp[] | null>(null);
  const [asc, setAsc] = React.useState<boolean>(false);
  const [isHover, setHover] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (asset && asset.length > 0) {
      // TODO - Replace with the fetch data variable
      setAssets(asset);
    }
  }, [asset]);

  const sortedData = assets?.sort((a, b) =>
    !asc ? a.price - b.price : b.price - a.price
  );
  // HACK - Sorts data in decending order on default

  return (
    <div
      className={cn(
        "flex flex-col gap-1 bg-white/5 rounded-2xl p-4 border border-secondary/30 overflow-scroll",
        className
      )}
    >
      <div className="flex justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-primary">
            Available coins
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
      <div className="relative flex flex-col lg:flex-row gap-3 overflow-x-auto overflow-y-hidden">
        <div className="lg:w-3/7 flex z-10">
          <motion.div
            className={cn(
              "relative h-full pb-6 md:pb-0 bg-[#121c22] flex gap-3 flex-1 overflow-x-auto overflow-y-hidden",
              isHover ? "absolute" : ""
            )}
            onHoverStart={() => setHover(true)}
            onHoverEnd={() => setHover(false)}
          >
            {assets
              ?.filter((_, i) => i < 5)
              .map((coin, index) => (
                <motion.div
                  key={index}
                  className={cn(
                    "select-none pointer-events-none rounded-lg p-4 border border-primary/50 relative overflow-hidden transition-all duration-200 group",
                    "hover:bg-secondary hover:border-teal/50 hover:inset-ring inset-ring-1 inset-ring-[rgba(0,194,203,0.3)] shadow-[rgba(0,194,203,0.3)] inset-shadow-[rgba(0,194,203,0.3)] inset-shadow-xs",
                    "top-1/2 -translate-y-1/2",
                    "w-50 xl:w-55 h-70",
                    index > 0 ? `rounded-xl border` : "bg-[#051016]"
                  )}
                  style={
                    !isHover
                      ? {
                          position: "absolute",
                          left: 1 + index * 8,
                          height: 280 - 10 * index,
                          zIndex: 10 - index,
                        }
                      : undefined
                  }
                  initial={false}
                  animate={{
                    position: isHover ? "relative" : "absolute",
                    left: isHover ? undefined : 1 + index * 8,
                    height: isHover ? 280 : 280 - 10 * index,
                    zIndex: isHover ? 10 : 10 - index,
                    backgroundColor: "#051016",
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                >
                  <div className="flex justify-between items-center 2xl:items-start mb-2 gap-1">
                    <div className="flex">
                      <Image
                        src={coin.image}
                        alt={coin.name}
                        width={36}
                        height={36}
                        className="rounded-md bg-white/5"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="text-[10px] lg:text-xs text-gray-400">
                        Issued by{" "}
                        <span className="text-primary">stable.fun</span>
                      </div>
                      <div className="text-xs lg:text-sm">
                        {coin.symbol}s ({coin.fiat})
                      </div>
                    </div>
                    <div
                      className={cn(
                        "rounded-full p-1 bg-white/5 border-2",
                        coin.change > 0
                          ? "border-t-primary border-l-primary"
                          : "border-t-red-500 border-l-red-500"
                      )}
                    >
                      {coin.change > 0 ? (
                        <ArrowUpRight
                          size={12}
                          className="text-primary group-hover:text-teal"
                        />
                      ) : (
                        <ArrowDownRight
                          size={12}
                          className="text-red-500 group-hover:text-teal"
                        />
                      )}
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="text-xs text-gray-400 mb-1">Yield Rate</div>
                    <div className="text-2xl font-bold mb-2">{coin.yield}</div>
                  </div>
                  <div
                    className={`text-xs ${
                      coin.change > 0 ? "text-teal" : "text-red-500"
                    } flex items-center gap-1`}
                  >
                    {coin.change}% 24hrs
                  </div>

                  {/* Mini chart visualization */}
                  <div className="h-10 mt-4 relative">
                    <MiniChart
                      // data={coin.data}
                      height={40}
                      color={coin.change > 0 ? "#00c2cb" : "#e74c3c"}
                      trend={coin.change > 0 ? "up" : "down"}
                    />
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
        <div className="flex-1 z-0 rounded-2xl p-4 border border-secondary/30 bg-white/5">
          <Table>
            <TableHeader>
              <TableRow className="w-full border-none hover:bg-transparent">
                <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-r-none text-center">
                  Stablecoin
                </TableHead>
                <TableHead className="bg-white/5 outline-white/10 text-white text-xs font-normal rounded-md rounded-l-none text-center">
                  Price
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
                    <Link href={`/portfolio/${el.id}`}>
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
                    </Link>
                      <TableCell
                        className={cn(
                          "text-center w-1/2",
                          el.change >= 0 ? "text-primary" : "text-red-400"
                        )}
                      >
                        ${el.price}
                      </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
