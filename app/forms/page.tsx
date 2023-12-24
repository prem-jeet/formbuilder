import Link from "next/link";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { SomethingWentWrong } from "../enums/SomethingWentWrong";
import { FormList } from "./FormList";

const forms = () => {
  const rsp = {
    success: true,
  };
  return (
    <div className="flex items-center flex-col space-y-9">
      <div className="flex self-stretch items-center justify-between">
        <span className="text-3xl text-zinc-800 font-bold">Forms list</span>
        <Link href="/forms/new">
          <button className="btn btn-neutral">
            <FaPlus />
            Add record
          </button>
        </Link>
      </div>
      <div className="self-stretch">
        {rsp.success ? (
          <FormList forms={[]} />
        ) : (
          <span className="mt-10">
            <SomethingWentWrong />
          </span>
        )}
      </div>
    </div>
  );
};

export default forms;
