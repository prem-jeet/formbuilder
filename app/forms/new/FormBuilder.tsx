"use client";
import useNewFormStore from "@/store/demoStore/newFormStore/newFormStore";
import React, { useState } from "react";
import FormbuilderSection from "./FormbuilderSection";

const FormBuilder = () => {
  const formLayout = useNewFormStore((state) => state.getActiveFormLayout());
  const sections = formLayout?.layout.sections;
  const [selectedSection, setSelectedSection] = useState("");
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
                onClick={() => setSelectedSection(section.id)}
              >
                <span>section id is{section.id}</span>
              </FormbuilderSection>
            );
          })}
      </div>
    </div>
  );
};

export default FormBuilder;
