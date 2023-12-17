"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Enum } from "./new/formAction";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { RiArrowUpDownLine } from "react-icons/ri";
import { CiCalendar } from "react-icons/ci";
import { MdOutlineVpnKey } from "react-icons/md";
export const columns: ColumnDef<Enum>[] = [
  {
    id: "select",

    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
        className="checkbox"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => {
          row.toggleSelected(e.target.checked);
        }}
        className="checkbox"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => (
      <span className="flex items-center space-x-1">
        <MdOutlineVpnKey className="text-md" />
        <span>ID</span>
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center space-x-3 cursor-pointer "
          onClick={column.getToggleSortingHandler()}
        >
          <span>Name</span>
          <span className="text-slate-400">
            {column.getIsSorted() === "asc" ? (
              <FaSortAlphaDown />
            ) : column.getIsSorted() === "desc" ? (
              <FaSortAlphaDownAlt />
            ) : (
              <RiArrowUpDownLine className="text-slate-300" />
            )}
          </span>
        </span>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center space-x-3 cursor-pointer"
          onClick={column.getToggleSortingHandler()}
        >
          <span>Label</span>
          <span className="text-slate-400">
            {column.getIsSorted() === "asc" ? (
              <FaSortAlphaDown />
            ) : column.getIsSorted() === "desc" ? (
              <FaSortAlphaDownAlt />
            ) : (
              <RiArrowUpDownLine className="text-slate-300" />
            )}
          </span>
        </span>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => `[ ${row.original.options} ]`,
    enableHiding: false,
  },
  {
    accessorKey: "updated",
    header: () => dateFieldHeader("Updated"),
    cell: ({ row }) => dateFieldCell(new Date(row.original.updated)),
    enableHiding: true,
  },
  {
    accessorKey: "created",
    header: () => dateFieldHeader("Created"),
    cell: ({ row }) => dateFieldCell(new Date(row.original.created)),
    enableHiding: true,
  },
];

function dateFieldHeader(label: string) {
  return (
    <div className="flex items-center space-x-1">
      <span>
        <CiCalendar />
      </span>
      <span>{label}</span>
    </div>
  );
}
function dateFieldCell(date: Date) {
  return (
    <div className="flex flex-col space-y-1 items-start justify-center">
      <span>
        {date.toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </span>
      <span>
        {date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
}
