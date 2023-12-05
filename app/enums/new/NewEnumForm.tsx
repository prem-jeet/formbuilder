import React from "react";
import { LuAsterisk } from "react-icons/lu";

export const NewEnumForm = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Add enum</h2>
        <hr />
        <div className="flex flex-col space-y-4">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                <span className="flex">
                  Name
                  <span>
                    <LuAsterisk className="text-red-600" />
                  </span>
                </span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Name of the enum"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Label <span className="text-slate-400">(optional)</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Display label for enum (optional)"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                <span className="flex">
                  Options
                  <span>
                    <LuAsterisk className="text-red-600" />
                  </span>
                </span>
              </span>
            </div>
            <textarea
              placeholder="Type here"
              className="textarea textarea-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add Enum</button>
        </div>
      </div>
    </div>
  );
};
