"use client";
import { EnumFormSchema } from "@/validationSchemas/validationSchemas";
import React, { useRef } from "react";
import { LuAsterisk } from "react-icons/lu";
import { useFormStatus } from "react-dom";
import { IoIosWarning } from "react-icons/io";
import toast from "react-hot-toast";
import { createEnum } from "./formAction";

function removeExtraSpaces(str: string) {
  return str.trim().replace(/\s+/g, " ");
}

function formatString(inputString: string) {
  inputString = removeExtraSpaces(inputString);

  // Replace the remaining space with an underscore
  inputString = inputString.replace(/\s/g, "_");

  return inputString;
}

const processArrayString = (str: string) => {
  if (!str) {
    return [];
  }

  const strArray = str.split(",").map((s) => formatString(s));

  return strArray;
};

export function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button className="btn btn-primary" disabled={pending}>
      {pending ? <span className="loading loading-spinner"></span> : "Add Enum"}
    </button>
  );
}

const FormErrorAlert = (msg: string) => {
  return (
    <div
      role="alert"
      className="max-w-lg text-lg bg-red-100 alert text-rose-950"
    >
      <IoIosWarning />
      <span>{msg}</span>
    </div>
  );
};

export const NewEnumForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

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

    const rsp = await createEnum(newEnumObject);
    if (!rsp.success) {
      toast.custom(FormErrorAlert(rsp.msg));
    } else {
      toast.success("Enum added successfully!", { position: "top-center" });
    }
  };

  return (
    <div className="shadow-xl card w-96 bg-base-100">
      <div className="card-body">
        <h2 className="card-title">Add enum</h2>
        <hr />
        <form action={formAction} ref={formRef}>
          <div className="flex flex-col space-y-4">
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
                type="text"
                placeholder="Name of the enum"
                className="w-full max-w-xs input input-bordered"
                name="name"
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
                type="text"
                placeholder="Display label for enum"
                className="w-full max-w-xs input input-bordered"
                name="label"
              />
            </label>
            <label className="w-full max-w-xs form-control">
              <div className="label">
                <span className="label-text">
                  <span className="flex">
                    <span className="mr-2 font-bold text-zinc-300">
                      {"[ ]"}
                    </span>
                    Options
                    <span>
                      <LuAsterisk className="text-red-600" />
                    </span>
                  </span>
                </span>
              </div>
              <textarea
                placeholder="Comma(,) seperated values (option1,option2...)"
                className="w-full max-w-xs textarea textarea-bordered"
                rows={5}
                name="options"
              />
            </label>
          </div>
          <div className="justify-end mt-8 card-actions">
            <SubmitButton />
            <button
              onClick={() => formRef.current?.reset()}
              className="btn btn-error"
              type="button"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
