"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
export interface FormEntity {
  id: string;
  type: AvailableInputTypes | "column" | "section";
  label: string | null;
  name: string | null;
  mendatory?: boolean;
  parentId: string | null;
  childCount?: number;
}
export type AvailableInputTypes =
  | "text"
  | "select"
  | "checkbox"
  | "long-text"
  | "number";

const availableInputType: AvailableInputTypes[] = [
  "text",
  "select",
  "checkbox",
  "long-text",
  "number",
];

interface Props {
  addInputField: (newEntity: FormEntity) => void;
}

const InputTypeSelectorMenu = ({ addInputField }: Props) => {
  const [fieldFilter, setFieldFilter] = useState("");

  const filteredAvailableInputTypes = availableInputType.filter((type) =>
    type.includes(fieldFilter.toLocaleLowerCase())
  );

  const createInput = (type: AvailableInputTypes) => {
    const newEntity: FormEntity = {
      label: null,
      name: null,
      id: (() => crypto.randomUUID())(),
      parentId: null,
      type,
    };

    addInputField({ ...newEntity });
  };

  return (
    <>
      <div className="space-y-4">
        <div className="join">
          <button className="text-lg font-bold text-black bg-base-100 btn join-item">
            <FaSearch />
          </button>
          <input
            className="input input-bordered join-item"
            placeholder="search fields"
            value={fieldFilter}
            onChange={(e) => setFieldFilter(e.target.value)}
          />
        </div>
        <div>
          <div className="grid grid-cols-2 gap-4">
            {filteredAvailableInputTypes.map((type) => (
              <button
                key={type}
                className="w-full btn btn-outline "
                onClick={() => createInput(type)}
              >
                {type.split("-").join(" ").toLocaleUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default InputTypeSelectorMenu;
