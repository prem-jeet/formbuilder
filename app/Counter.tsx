"use client";
import useCounterStore from "@/store/demoStore/demoStore";
import React from "react";

export const Counter = () => {
  const count = useCounterStore((state) => state.count);
  return (
    <div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-6xl">
          {/* @ts-expect-error */}
          <span style={{ "--value": count }}></span>
        </span>
        Count
      </div>
    </div>
  );
};
