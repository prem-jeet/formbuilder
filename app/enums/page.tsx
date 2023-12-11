import { FaPlus } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const EnumsPage = () => {
  return (
    <div className="flex items-center flex-col">
      <div className="flex self-stretch items-center justify-between">
        <span className="text-3xl text-zinc-800 font-bold">Enumns list</span>
        <Link href="/enums/new">
          <button className="btn btn-neutral">
            <FaPlus />
            Add record
          </button>
        </Link>
      </div>
    </div>
  );
};
export default EnumsPage;
