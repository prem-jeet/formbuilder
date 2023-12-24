import React, { useEffect, useState } from "react";
import InputTypeSelectorMenu from "./InputTypeSelectorMenu";
import FormBuilder from "./FormBuilder";

const newForm = () => {
  return (
    <div className="shadow-xl card bg-base-100" style={{ height: "83vh" }}>
      <div className="flex h-full">
        <div className="max-w-sm p-3">
          <InputTypeSelectorMenu />
        </div>
        <div className="flex-1 p-3">
          <FormBuilder />
        </div>
      </div>
    </div>
  );
};

export default newForm;
