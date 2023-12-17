import React from "react";
import { TbFileSad } from "react-icons/tb";
export const SomethingWentWrong = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <span className="text-8xl">
        <TbFileSad />
      </span>
      <span className="text-3xl">Something went wrong</span>
    </div>
  );
};
