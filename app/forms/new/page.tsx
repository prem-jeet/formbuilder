"use client";
import React, { useCallback, useEffect, useState } from "react";
import InputTypeSelectorMenu from "./InputTypeSelectorMenu";
import FormBuilder from "./FormBuilder";
import { AvailableInputTypes } from "@/store/demoStore/newFormStore/newFormStore";

const NewForm = () => {
  const [selectedInput, setSelectedInput] = useState<AvailableInputTypes | "">(
    ""
  );
  const clearSelectedInput = useCallback(() => {
    setSelectedInput("");
  }, []);
  return (
    <div className="shadow-xl card bg-base-100" style={{ height: "83vh" }}>
      <div className="flex h-full">
        <div className="max-w-sm p-3">
          <InputTypeSelectorMenu
            onchange={(type: AvailableInputTypes) => setSelectedInput(type)}
          />
        </div>
        <div className="flex-1 p-3">
          <FormBuilder
            selectedInputType={selectedInput || ""}
            clearSelectedInput={clearSelectedInput}
          />
        </div>
      </div>
    </div>
  );
};

export default NewForm;
