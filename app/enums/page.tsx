import { FaPlus } from "react-icons/fa";
import React from "react";
import Link from "next/link";

const EnumsPage = () => {
  return (
    <div>
      Enumns list
      <Link href="/enums/new">
        <button className="btn btn-neutral">
          <FaPlus />
          Enum
        </button>
      </Link>
    </div>
  );
};
export default EnumsPage;
