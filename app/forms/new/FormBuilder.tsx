"use client";
import useNewFormStore, {
  AvailableInputTypes,
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React, { useEffect, useState } from "react";
import FormbuilderSection from "./FormbuilderSection";
import FormbuilderColumn from "./FormbuilderColumn";
import toast from "react-hot-toast";
import FormBuilderField from "./FormBuilderField";

type Props = {
  selectedInputType: AvailableInputTypes | "";
  clearSelectedInput: () => void;
};

const FormBuilder = ({ selectedInputType, clearSelectedInput }: Props) => {
  const formLayout = useNewFormStore((state) => state.getActiveFormLayout());
  const addInput = useNewFormStore((state) => state.addInput);
  const sections = formLayout?.layout.sections;
  const columns = formLayout?.layout.columns;
  const fields = formLayout?.layout.fields;

  const [selectedSection, setSelectedSection] = useState("");
  const [selectedColumn, setselectedColumn] = useState("");
  const [selectedField, setselectedField] = useState("");

  const clearSelections = () => {
    setSelectedSection("");
    setselectedColumn("");
    setselectedField("");
  };

  const getChildColumns = (sectionId: string) =>
    columns.filter((column) => column.parentId === sectionId);
  const getChildFields = (columnId: string) =>
    fields.filter((field) => field.parentId === columnId);

  useEffect(() => {
    if (selectedInputType) {
      if (!selectedColumn) {
        toast.error("No column selected.", {
          className: "border-2 border-rose-500 p-4 text-xl font-medium",
          iconTheme: {
            primary: "#f43f5e",
            secondary: "#fafaff",
          },
          position: "top-center",
        });
      } else {
        addInput(selectedInputType, selectedColumn, formLayout.id);
      }
      clearSelectedInput();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInputType]);
  // eslint-enable-next-line react-hooks/exhaustive-deps

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
                    <div
                      className="flex-grow self-stretch"
                      key={column.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        clearSelections();
                        setselectedColumn(column.id);
                      }}
                    >
                      <FormbuilderColumn
                        formId={section.parentId}
                        column={column}
                        isFirst={index === 0}
                        isLast={
                          index === getChildColumns(section.id).length - 1
                        }
                        enableDelete={getChildColumns(section.id).length > 1}
                        isSelected={selectedColumn === column.id}
                      >
                        {getChildFields(column.id).map((field) => (
                          <div
                            key={field.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSection("");
                              setselectedField(field.id);
                            }}
                          >
                            <FormBuilderField
                              fieldEntity={field}
                              parentColumn={column}
                              formId={formLayout.id}
                              isSelected={selectedField === field.id}
                            />
                          </div>
                        ))}
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
