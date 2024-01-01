"use client";
import useNewFormStore, {
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React, { useState } from "react";
import FormbuilderSection from "./FormbuilderSection";
import { cn } from "@/lib/utils";
import { BsThreeDotsVertical } from "react-icons/bs";

const FormBuilder = () => {
  const formLayout = useNewFormStore((state) => state.getActiveFormLayout());
  const sections = formLayout?.layout.sections;
  const columns = formLayout?.layout.columns;
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedColumn, setselectedColumn] = useState("");
  const clearSelections = () => {
    setSelectedSection("");
    setselectedColumn("");
  };

  const getChildColumns = (sectionId: string) =>
    columns.filter((column) => column.parentId === sectionId);

  return (
    <div>
      <div className="space-y-4">
        {sections &&
          sections.map((section, index) => {
            return (
              <FormbuilderSection
                key={section.id}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
                section={section}
                enableDelete={sections.length > 1}
                isSelected={selectedSection === section.id}
                onClick={() => {
                  clearSelections();
                  setSelectedSection(section.id);
                }}
              >
                <div className="flex gap-4">
                  {getChildColumns(section.id).map((column, index) => (
                    <div className="flex-grow self-stretch" key={column.id}>
                      <FormbuilderColumn
                        formId={section.parentId}
                        column={column}
                        isFirst={index === 0}
                        isLast={
                          index === getChildColumns(section.id).length - 1
                        }
                        enableDelete={getChildColumns(section.id).length > 1}
                        onClick={() => {
                          clearSelections();
                          setselectedColumn(column.id);
                        }}
                        isSelected={selectedColumn === column.id}
                      >
                        {column.id}
                      </FormbuilderColumn>
                    </div>
                  ))}
                </div>
              </FormbuilderSection>
            );
          })}
      </div>
    </div>
  );
};

export default FormBuilder;

const FormbuilderColumn = ({
  formId,
  children,
  column,
  isFirst,
  isLast,
  enableDelete,
  isSelected,
  onClick: clickHandler,
}: {
  formId: string;
  children: React.ReactNode;
  column: FormEntity;
  isFirst: boolean;
  isLast: boolean;
  enableDelete: boolean;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { addColumn } = useNewFormStore((state) => ({
    addColumn: state.addEmptyColumn,
  }));
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        clickHandler();
      }}
      className={cn(
        "p-4 space-y-4 rounded-lg cursor-pointer outline outline-zinc-400 hover:outline-black outline-1",
        {
          "outline-black": isSelected,
        }
      )}
    >
      {isSelected && (
        <div className="flex justify-between">
          <span className="text-zinc-400">{column.label || "(no label)"}</span>
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="text-lg btn-sm btn btn-ghost btn-square"
            >
              <BsThreeDotsVertical />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <div
                  onClick={() => addColumn(formId, column.id, column.parentId)}
                >
                  Add column
                </div>
              </li>
              {enableDelete && (
                <li>
                  <div>Remove column</div>
                </li>
              )}
              {!isLast && (
                <li>
                  <div>Move Right</div>
                </li>
              )}
              {!isFirst && (
                <li>
                  <div>Move Left</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
};
