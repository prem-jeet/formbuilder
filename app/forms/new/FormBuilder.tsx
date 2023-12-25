"use client";
import { cn } from "@/lib/utils";
import useNewFormStore, {
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
const FormBuilder = () => {
  const formLayout = useNewFormStore((state) => state.getActiveFormLayout());
  const sections = formLayout?.layout.sections;
  const [selectedSection, setSelectedSection] = useState("");
  return (
    <div>
      <div>
        {sections &&
          sections.map((section, index) => {
            return (
              <SectionComponent
                key={section.id}
                isFirst={index === 0}
                isLast={index === sections.length - 1}
                section={section}
                enableDelete={sections.length > 1}
                isSelected={selectedSection === section.id}
                onClick={() => setSelectedSection(section.id)}
              >
                <span>section id is{section.id}</span>
              </SectionComponent>
            );
          })}
      </div>
    </div>
  );
};

export default FormBuilder;

function SectionComponent({
  children,
  section,
  isFirst,
  isLast,
  enableDelete,
  isSelected,
  onClick: clickHandler,
}: {
  children: React.ReactNode;
  section: FormEntity;
  isFirst: boolean;
  isLast: boolean;
  enableDelete: boolean;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={clickHandler}
      className={cn(
        "p-4 space-y-4 rounded-lg cursor-pointer outline outline-zinc-400 hover:outline-black outline-1",
        {
          "outline-black": isSelected,
        }
      )}
    >
      {isSelected && (
        <div className="flex justify-between">
          <span className="text-zinc-400">{section.label || "(no label)"}</span>
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
                <div>Add section</div>
              </li>
              {enableDelete && (
                <li>
                  <div>Remove section</div>
                </li>
              )}
              {!isFirst && (
                <li>
                  <div>Move up</div>
                </li>
              )}
              {!isLast && (
                <li>
                  <div>Move down</div>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      <div>{children}</div>
    </div>
  );
}
