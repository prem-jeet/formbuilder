import { FaPlus } from "react-icons/fa";
import React from "react";
import Link from "next/link";
import { fetchEnums } from "./utils";
import { EnumsList } from "./EnumsList";
import { SomethingWentWrong } from "./SomethingWentWrong";

const EnumsPage = async () => {
  const rsp = await fetchEnums();

  return (
    <div className="flex flex-col space-y-9">
      <div className="flex items-center self-stretch justify-between">
        <span className="text-3xl font-bold text-zinc-800">Enumns list</span>
        <Link href="/enums/new">
          <button className="btn btn-neutral">
            <FaPlus />
            Add record
          </button>
        </Link>
      </div>
      <div className="self-stretch">
        {rsp.success ? (
          <EnumsList enums={rsp.data} />
        ) : (
          <span className="mt-10">
            <SomethingWentWrong />
          </span>
        )}
      </div>
    </div>
  );
};
export default EnumsPage;
