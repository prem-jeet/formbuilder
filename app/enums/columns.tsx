"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Enum } from "./new/formAction";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";

export const columns: ColumnDef<Enum>[] = [
  {
    accessorKey: "name",

    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          {column.getIsSorted() === "asc" ? (
            <FaSortAlphaDown className="ml-2 h-4 w-4" />
          ) : (
            <FaSortAlphaDownAlt className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "label",
    header: ({ column }) => {
      return (
        <button
          className="btn btn-ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Label
          {column.getIsSorted() === "asc" ? (
            <FaSortAlphaDown className="ml-2 h-4 w-4" />
          ) : (
            <FaSortAlphaDownAlt className="ml-2 h-4 w-4" />
          )}
        </button>
      );
    },
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => `[ ${row.original.options} ]`,
  },
];
