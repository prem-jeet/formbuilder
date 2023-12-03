"use client";
import useCounterStore from "@/store/demoStore/demoStore";
import React, { useEffect, useState } from "react";

export const CounterButtons = () => {
  const { increment, decrement } = useCounterStore((state) => ({
    increment: state.incCount,
    decrement: state.decCount,
  }));
  const count = useCounterStore((state) => state.count);
  const [incBy, setIncBy] = useState(1);
  useEffect(() => {
    console.log(incBy);
  }, [incBy]);
  return (
    <div className="space-x-3 space-y-3">
      <button
        className="btn btn-outline btn-primary"
        onClick={() => increment()}
      >
        Increment
      </button>
      <button
        className="btn btn-outline btn-secondary"
        onClick={() => decrement()}
        disabled={count === 0}
      >
        Decrement
      </button>
      <div className="join ">
        <input
          type="number"
          min="0"
          className="input input-bordered join-item w-20"
          value={incBy}
          onChange={(e) => setIncBy(Number(e.target.value))}
        />
        <button
          className="btn join-item  btn-outline"
          onClick={() => {
            increment(incBy);
          }}
        >
          Increment By
        </button>
      </div>
    </div>
  );
};
