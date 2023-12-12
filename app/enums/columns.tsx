"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Enum } from "./new/formAction";
import { FaSortAlphaDown, FaSortAlphaDownAlt } from "react-icons/fa";
import { RiArrowUpDownLine } from "react-icons/ri";

export const columns: ColumnDef<Enum>[] = [
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
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => `[ ${row.original.options} ]`,
  },
];
