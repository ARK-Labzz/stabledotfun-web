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
    <div className="w-full rounded-lg border border-white/10 bg-white/5 overflow-hidden">
      <div className="w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[640px] p-2 lg:p-4">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}