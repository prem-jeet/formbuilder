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
      className="alert bg-red-100 text-lg text-rose-950 max-w-lg"
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
    if (rsp.error) {
      toast.custom(FormErrorAlert(rsp.msg));
    } else {
      toast.success("Enum added successfully!", { position: "top-center" });
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Add enum</h2>
        <hr />
        <form action={formAction} ref={formRef}>
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
                name="name"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">
                  <span className="flex">
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
                className="input input-bordered w-full max-w-xs"
                name="label"
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
                placeholder="Comma(,) seperated values (option1,option2...)"
                className="textarea textarea-bordered w-full max-w-xs"
                rows={5}
                name="options"
              />
            </label>
          </div>
          <div className="card-actions justify-end mt-8">
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
