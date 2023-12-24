"use client";
import useNewFormStore from "@/store/demoStore/newFormStore/newFormStore";
import React from "react";

const FormBuilder = () => {
  const getActiveFormLayout = useNewFormStore((state) =>
    state.getActiveFormLayout()
  );
  return (
    <div>
      <h1 className="text-lg">Form builder</h1>
      <div>
        <pre>{JSON.stringify(getActiveFormLayout, null, 2)}</pre>
      </div>
    </div>
  );
};

export default FormBuilder;
