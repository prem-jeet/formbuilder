"use client";
import useNewFormStore, {
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React, { useState } from "react";
import FormbuilderSection from "./FormbuilderSection";
import { cn } from "@/lib/utils";
import { BsThreeDotsVertical } from "react-icons/bs";
import FormbuilderColumn from "./FormbuilderColumn";

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
