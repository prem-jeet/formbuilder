"use client";
import React from "react";
import { Enum } from "./new/formAction";

type Props = {
  enums: Enum[];
};

export const EnumsList = ({ enums }: Props) => {
  return (
    <div className="space-y-4">
      {enums.map((item) => (
        <div key={item.name} className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">{item.label}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
