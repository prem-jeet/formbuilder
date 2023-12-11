"use client";
import React from "react";
import { Enum } from "./new/formAction";
import { DataTable } from "./data-table";
import { columns } from "./columns";

type Props = {
  enums: Enum[];
};

export const EnumsList = ({ enums }: Props) => {
  return <DataTable columns={columns} data={enums} />;
};
