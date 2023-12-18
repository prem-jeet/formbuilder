"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import { useEffect, useState } from "react";
import { Enum } from "./new/formAction";
import DeleteSelectedRowsPopup from "./DeleteSelectedRowsPopup";
import { RightOverlay } from "@/components/RightOverlay";
import { cn } from "@/lib/utils";
import { EditEnumFrom } from "./EditEnumForm";

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
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false,
    created: false,
  });
  const [isEditOverlayVisible, setIsEditOverlayVisible] = useState(false);
  const [editingRow, setEditingRow] = useState<Enum>({
    name: "",
    label: "",
    id: "",
    options: [],
    updated: "",
    created: "",
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,

    state: {
      sorting,
      columnFilters,
      rowSelection,
      columnVisibility,
    },
  });

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="join">
            <div>
              <div>
                <input
                  type="text"
                  placeholder={`Filter by`}
                  className="w-full max-w-xs input input-bordered join-item"
                  value={
                    (table.getColumn(filterBy)?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn(filterBy)
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
            </div>
            <select
              value={filterBy}
              onChange={(e) => {
                const str = table.getColumn(filterBy)?.getFilterValue();
                table.getColumn(filterBy)?.setFilterValue("");
                setFilterBy(e.target.value);
                table.getColumn(e.target.value)?.setFilterValue(str);
              }}
              className="w-auto max-w-xs select select-bordered join-item"
            >
              <option value="name">Name</option>
              <option value="label">Label</option>
            </select>
          </div>
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-outline btn-secondary"
            >
              Columns
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              {table
                .getAllColumns()
                .filter((column) => column.id !== "select")
                .map((column) => (
                  <li key={column.id} className="form-control">
                    <label className="justify-start cursor-pointer label">
                      <input
                        type="checkbox"
                        checked={column.getIsVisible()}
                        onChange={(e) =>
                          column.toggleVisibility(e.target.checked)
                        }
                        disabled={!column.getCanHide()}
                        className="checkbox checkbox-sm checkbox-info"
                      />
                      <span className="uppercase label-text">{column.id}</span>
                    </label>
                  </li>
                ))}
            </ul>
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
                        style={{
                          width:
                            header.column.columnDef.id === "select"
                              ? "10px"
                              : "auto",
                        }}
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
                        onClick={() => {
                          if (!cell.id.includes("select")) {
                            setEditingRow(row.original as Enum);
                            setIsEditOverlayVisible(true);
                          }
                        }}
                        className={cn("outline-1 outline outline-slate-100", {
                          "cursor-pointer": !cell.id.includes("select"),
                        })}
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
      {!!table.getFilteredSelectedRowModel().rows.length && (
        <DeleteSelectedRowsPopup
          rows={
            table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original) as Enum[]
          }
        />
      )}

      <RightOverlay
        header="Edit Enum"
        isVisible={isEditOverlayVisible}
        onClose={() => setIsEditOverlayVisible(false)}
      >
        <EditEnumFrom
          row={editingRow}
          onCancel={() => setIsEditOverlayVisible(false)}
        />
      </RightOverlay>
    </>
  );
}
