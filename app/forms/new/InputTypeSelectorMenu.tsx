"use client";
import useNewFormStore, {
  AvailableInputTypes,
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const availableInputType: AvailableInputTypes[] = [
  "text",
  "select",
  "checkbox",
  "long-text",
  "number",
];

type Props = {
  onchange: (type: AvailableInputTypes) => void;
};

const InputTypeSelectorMenu = ({ onchange }: Props) => {
  const [fieldFilter, setFieldFilter] = useState("");

  const { initialLayoutSetup } = useNewFormStore((state) => ({
    addInput: state.addInput,
    initialLayoutSetup: state.initialSetup,
  }));

  const filteredAvailableInputTypes = availableInputType.filter((type) =>
    type.includes(fieldFilter.toLocaleLowerCase())
  );

  const createInput = (type: AvailableInputTypes) => onchange(type);

  useEffect(() => {
    initialLayoutSetup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
