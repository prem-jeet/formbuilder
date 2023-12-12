"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Enum } from "./new/formAction";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

export const columns: ColumnDef<Enum>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <span
          className="flex items-center space-x-3 cursor-pointer "
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Name</span>
          <span className="text-slate-400">
            {column.getIsSorted() === "asc" ? (
              <FaSortAlphaDown />
            ) : (
              <FaSortAlphaDownAlt />
            )}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <span
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span>Label</span>
          <span className="text-slate-400">
            {column.getIsSorted() === "asc" ? (
              <FaSortAlphaDown />
            ) : (
              <FaSortAlphaDownAlt />
            )}
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => `[ ${row.original.options} ]`,
  },
];
