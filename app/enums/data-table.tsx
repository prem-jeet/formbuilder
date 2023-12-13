"use client";

import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filterBy, setFilterBy] = useState("name");
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="space-y-3">
      <div>
        <div className="join">
          <div>
            <div>
              <input
                type="text"
                placeholder={`Filter by`}
                className="w-full max-w-xs input input-bordered join-item"
                value={
                  (table.getColumn(filterBy)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(filterBy)?.setFilterValue(event.target.value)
                }
              />
            </div>
          </div>
          <select
            value={filterBy}
            onChange={(e) => {
              table.getColumn(filterBy)?.setFilterValue("");
              setFilterBy(e.target.value);
            }}
            className="w-auto max-w-xs select select-bordered join-item"
          >
            <option value="name">Name</option>
            <option value="label">Label</option>
          </select>
        </div>
      </div>
      <div className="p-1 overflow-auto bg-white rounded-sm shadow-md outline outline-1 outline-slate-300">
        <table className="table border-collapse">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="text-lg text-black">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      style={{ width: header.getSize() }}
                      key={header.id}
                      className="relative outline-1 outline outline-slate-100"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <tr
                  className="hover"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="outline-1 outline outline-slate-100"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="h-24 text-center">
                  No results.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
