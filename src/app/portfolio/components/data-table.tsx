"use client";

import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  
  // Set default column visibility for responsive design
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  // Update column visibility based on screen size
  React.useEffect(() => {
    const updateColumnVisibility = () => {
      if (window.innerWidth < 640) {
        // Mobile view - show minimal columns
        setColumnVisibility({
          name: true,
          price: true,
          currentInvestment: true,
          pnl: true,
          mcap: false,
          supply: false,
          amount: false,
          initialInvestment: false,
          totalSold: false,
        });
      } else if (window.innerWidth < 1024) {
        // Tablet view - show more columns
        setColumnVisibility({
          name: true,
          price: true,
          mcap: true,
          supply: true,
          currentInvestment: true,
          pnl: true,
          amount: false,
          initialInvestment: false,
          totalSold: false,
        });
      } else {
        // Desktop view - show all columns
        setColumnVisibility({});
      }
    };

    // Set initial visibility
    updateColumnVisibility();

    // Add resize listener
    window.addEventListener("resize", updateColumnVisibility);
    
    return () => {
      window.removeEventListener("resize", updateColumnVisibility);
    };
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  });

  return (
    <div className="relative flex flex-col gap-4 w-full overflow-hidden">
      <div className="relative flex flex-wrap gap-2 sm:gap-3 justify-between mb-2 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-normal text-primary">
            Holdings
          </span>
          <span className="text-xs font-normal px-2 py-1 rounded-md text-gray-400 bg-secondary/70">
            {data?.length} Assets
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 hidden sm:inline-block">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            onClick={() => table.setSorting([])}
            variant={"ghost"}
            className="text-xs px-2 sm:px-3 py-1 rounded-md bg-white/5 border border-primary/30 hover:bg-secondary/10 text-gray-300 flex items-center gap-1"
          >
            {sorting.length > 0 && sorting[0].desc ? (
              <ChevronUp className="w-2 h-2" />
            ) : (
              <ChevronDown className="w-2 h-2" />
            )}
            <span className="hidden xs:inline">Highest Yield</span>
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border border-white/10 w-full overflow-hidden">
        <div className="w-full overflow-x-auto custom-scrollbar">
          <Table className="w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-white/5 hover:bg-white/10 outline-white/10 text-white text-xs font-normal cursor-pointer transition-colors"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center justify-center whitespace-nowrap">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === "desc" ? (
                            <ChevronDown className="ml-1 h-3 w-3" />
                          ) : (
                            <ChevronUp className="ml-1 h-3 w-3" />
                          )
                        ) : null}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className="text-xs my-4 border-b-white/5 hover:bg-muted/5"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex sm:hidden justify-center gap-1">
          {Array.from(
            { length: Math.min(5, table.getPageCount()) },
            (_, i) => {
              const pageIndex = i;
              const isCurrentPage = pageIndex === table.getState().pagination.pageIndex;
              const isInRange = 
                pageIndex === 0 || 
                pageIndex === table.getPageCount() - 1 ||
                Math.abs(pageIndex - table.getState().pagination.pageIndex) <= 1;
              
              if (!isInRange && pageIndex !== 2 && pageIndex !== table.getPageCount() - 3) {
                return null;
              }

              if (pageIndex === 2 && table.getState().pagination.pageIndex > 3) {
                return (
                  <span key="ellipsis-start" className="px-2 py-1 text-xs text-gray-400">
                    ...
                  </span>
                );
              }

              if (pageIndex === table.getPageCount() - 3 && table.getState().pagination.pageIndex < table.getPageCount() - 4) {
                return (
                  <span key="ellipsis-end" className="px-2 py-1 text-xs text-gray-400">
                    ...
                  </span>
                );
              }

              if (isInRange) {
                return (
                  <button
                    key={pageIndex}
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`px-2 py-1 text-xs rounded ${
                      isCurrentPage 
                        ? "bg-primary text-black" 
                        : "bg-white/5 text-gray-400"
                    }`}
                  >
                    {pageIndex + 1}
                  </button>
                );
              }
              
              return null;
            }
          ).filter(Boolean)}
        </div>
        
        {/* Desktop pagination controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="hidden sm:flex"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="sm:hidden h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="hidden sm:flex"
          >
            Next
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="sm:hidden h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}