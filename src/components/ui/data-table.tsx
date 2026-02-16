import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight, Search, Filter } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  theme?: 'light' | 'dark';
  searchKey?: string;
  searchPlaceholder?: string;
  entityLabel?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  theme = 'light',
  searchKey = 'email',
  searchPlaceholder = 'Search...',
  entityLabel = 'item(s)',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      {/* Search Bar and Filter */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`} />
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(searchKey)?.setFilterValue(event.target.value)
            }
            className={`pl-9 h-9 text-sm ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus-visible:ring-zinc-600' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus-visible:ring-blue-500'}`}
          />
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className={`text-xs h-9 ${theme === 'dark' ? 'border-zinc-600 bg-zinc-800 text-white hover:bg-zinc-700' : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Filter className="w-3.5 h-3.5 mr-1.5" />
          Filter
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={`border-b ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-900' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-xs font-medium py-2 ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-b ${theme === 'dark' ? 'border-zinc-800 hover:bg-zinc-800/50' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className={`h-24 text-center text-sm ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className={`flex items-center justify-between px-2 text-xs ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-600'}`}>
        <div className="flex-1">
          Showing{" "}
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
          </span>{" "}
          to{" "}
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          of{" "}
          <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          {entityLabel}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`h-8 w-8 p-0 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 disabled:opacity-50' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 disabled:opacity-50'}`}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className={`text-xs font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`h-8 w-8 p-0 ${theme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 disabled:opacity-50' : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 disabled:opacity-50'}`}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
