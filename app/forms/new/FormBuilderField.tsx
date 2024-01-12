import { cn } from "@/lib/utils";
import { FormEntity } from "@/store/demoStore/newFormStore/newFormStore";
import React from "react";

type Props = {
  fieldEntity: FormEntity;
  parentColumn: FormEntity;
  formId: string;
  isSelected: boolean;
};

const FormBuilderField = ({
  fieldEntity,
  parentColumn,
  formId,
  isSelected,
}: Props) => {
  return (
    <label className="form-control w-full">
      {(fieldEntity.label || isSelected) && (
        <div className="label">
          <span
            className={cn("label-text", {
              "text-zinc-400": !fieldEntity.label,
            })}
          >
            {fieldEntity.label || "(no label)"}
          </span>
        </div>
      )}
      {generateInput(fieldEntity)}
    </label>
  );
};

export default FormBuilderField;

function generateInput(entity: FormEntity) {
  const type = entity.type;

  switch (type) {
    case "text":
      return <TextField label={entity.label} />;
    case "select":
      return <>select</>;
    case "checkbox":
      return <>checkbox</>;
    case "long-text":
      return <>long text</>;
    case "number":
      return <>number</>;
  }
}

const TextField = () => (
  <input
    type="text"
    placeholder="Text input"
    className="input input-bordered w-full"
  />
);
