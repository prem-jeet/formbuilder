import { FaPlus } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { fetchEnums } from "./utils";
import { EnumsList } from "./EnumsList";

const EnumsPage = async () => {
  const rsp = await fetchEnums();

  return (
    <div className="flex items-center flex-col space-y-9">
      <div className="flex self-stretch items-center justify-between">
        <span className="text-3xl text-zinc-800 font-bold">Enumns list</span>
        <Link href="/enums/new">
          <button className="btn btn-neutral">
            <FaPlus />
            Add record
          </button>
        </Link>
      </div>
      <div className="self-stretch">
        {rsp.success ? <EnumsList enums={rsp.data} /> : <>No Data found</>}
      </div>
    </div>
  );
};
export default EnumsPage;
