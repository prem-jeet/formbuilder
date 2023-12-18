import React, { useEffect, useState } from "react";
import { Enum } from "./new/formAction";
import { MdKey } from "react-icons/md";
type Props = {
  row: Enum;
  onCancel: () => void;
};

const formDate = { id: "", name: "", label: "", options: "" };

export const EditEnumFrom = ({ row, onCancel }: Props) => {
  const [initialState, setInitialState] = useState({ ...formDate });
  const [formState, setFormState] = useState({ ...formDate });
  useEffect(() => {
    setFormState({ ...row, options: row.options.join(",") });
    setInitialState({ ...row, options: row.options.join(",") });
    console.log(row);
  }, [row]);
  return (
    <div className="flex flex-1">
      <form action="" className="flex flex-col justify-between w-full px-3">
        <div className="flex flex-col items-center space-y-4">
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="flex items-center space-x-2 label-text">
                <MdKey />
                <span>Id</span>
              </span>
            </div>
            <input
              disabled
              value={formState.id}
              type="text"
              className="w-full max-w-xs input input-bordered"
            />
          </label>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              value={formState.name}
              type="text"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full max-w-xs input input-bordered"
            />
          </label>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="label-text">Label</span>
            </div>
            <input
              value={formState.label}
              type="text"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, label: e.target.value }))
              }
              className="w-full max-w-xs input input-bordered"
            />
          </label>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="label-text">Options</span>
            </div>
            <textarea
              rows={6}
              value={formState.options}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, options: e.target.value }))
              }
              className="w-full max-w-xs textarea textarea-bordered"
            />
          </label>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            className="py-1 text-md px-9 btn btn-ghost"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button className="py-1 text-xl px-9 btn btn-neutral btn-outline">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
