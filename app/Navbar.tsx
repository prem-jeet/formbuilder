import React from "react";
import { FaPlus } from "react-icons/fa";
export const Navbar = () => {
  return (
    <div className="navbar bg-base-100 py-4">
      <div className="container mx-auto">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none space-x-5">
          <button className="btn btn-neutral">
            <FaPlus />
            Form
          </button>
          <button className="btn btn-outline">
            <FaPlus />
            Enum
          </button>
        </div>
      </div>
    </div>
  );
};
