"use client";

import { AssetProp } from "@/types";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

interface AssetWindowProp {
  data: AssetProp[];
}

export default function AssetWindow({ data }: AssetWindowProp) {
  return (
    <div className="w-full lg:flex-1 rounded-lg p-4 border border-white/10 bg-white/5 overflow-hidden">
      <div className="max-w-full">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}