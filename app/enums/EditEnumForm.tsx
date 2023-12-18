import React, { useEffect, useState } from "react";
import { Enum, updateEnum } from "./new/formAction";
import { MdKey } from "react-icons/md";
import { LuAsterisk } from "react-icons/lu";
import { FormErrorAlert, processArrayString } from "./new/NewEnumForm";
import { EnumFormSchema } from "@/validationSchemas/validationSchemas";
import toast from "react-hot-toast";
type Props = {
  row: Enum;
  onCancel: () => void;
};
const formDate = { id: "", name: "", label: "", options: "" };

export const EditEnumFrom = ({ row, onCancel }: Props) => {
  const [initialState, setInitialState] = useState({ ...formDate });
  const [formState, setFormState] = useState({ ...formDate });
  const [isValueChanged, setIsValueChanged] = useState(false);

  useEffect(() => {
    setFormState({ ...row, options: row.options.join(",") });
    setInitialState({ ...row, options: row.options.join(",") });
    console.log(row);
  }, [row]);

  useEffect(() => {
    setIsValueChanged(
      formState.name !== initialState.name ||
        formState.label !== initialState.label ||
        formState.options !== initialState.options
    );
  }, [formState]);

  const formAction = async (fd: FormData) => {
    const newEnumObject = {
      name: fd.get("name") as string,
      label: fd.get("label") as string,
      options: Array.from(
        new Set(processArrayString(fd.get("options") as string))
      ),
    };

    const validate = EnumFormSchema.safeParse(newEnumObject);

    if (!validate.success) {
      const errors: { [key: string]: string[] } =
        validate.error.formErrors.fieldErrors;
      for (let key in errors) {
        toast.custom(
          FormErrorAlert(`${key.toLocaleUpperCase()} : ${errors[key]}`)
        );
      }
      return;
    }

    const rsp = await updateEnum(newEnumObject, initialState.id);
    onCancel();
    setTimeout(() => {
      if (!rsp.success) {
        toast.custom(FormErrorAlert(rsp.msg));
      } else {
        toast.success("Enum updated successfully!", { position: "top-center" });
      }
    }, 250);
  };

  return (
    <div className="flex flex-1">
      <form
        action={formAction}
        className="flex flex-col justify-between w-full px-3"
      >
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
              <span className="label-text">
                <span className="flex">
                  <span className="mr-2 font-bold text-zinc-300">T</span>
                  Name
                  <span>
                    <LuAsterisk className="text-red-600" />
                  </span>
                </span>
              </span>
            </div>
            <input
              value={formState.name}
              type="text"
              name="name"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full max-w-xs input input-bordered"
            />
          </label>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="label-text">
                <span className="flex">
                  <span className="mr-2 font-bold text-zinc-300">T</span>
                  Label
                  <span>
                    <LuAsterisk className="text-red-600" />
                  </span>
                </span>
              </span>
            </div>
            <input
              value={formState.label}
              type="text"
              name="label"
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, label: e.target.value }))
              }
              className="w-full max-w-xs input input-bordered"
            />
          </label>
          <label className="w-full max-w-xs form-control">
            <div className="label">
              <span className="label-text">
                <span className="flex">
                  <span className="mr-2 font-bold text-zinc-300">{"[ ]"}</span>
                  Options
                  <span>
                    <LuAsterisk className="text-red-600" />
                  </span>
                </span>
              </span>
            </div>
            <textarea
              name="options"
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
          <button
            className="py-1 text-xl px-9 btn btn-neutral btn-outline"
            disabled={!isValueChanged}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};
