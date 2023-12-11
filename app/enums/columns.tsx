"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Enum } from "./new/formAction";

export const columns: ColumnDef<Enum>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "options",
    header: "Options",
    cell: ({ row }) => `[ ${row.original.options} ]`,
  },
];
