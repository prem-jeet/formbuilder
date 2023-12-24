"use client";
import React, { useState } from "react";
import InputTypeSelectorMenu, { FormEntity } from "./InputTypeSelectorMenu";

const newForm = () => {
  const addInputField = (formEntity: FormEntity) => {};
  return (
    <div className="shadow-xl card bg-base-100" style={{ height: "83vh" }}>
      <div className="flex h-full">
        <div className="max-w-sm p-3">
          <InputTypeSelectorMenu addInputField={addInputField} />
        </div>
        <div className="flex-1 p-3">form</div>
      </div>
    </div>
  );
};

export default newForm;
