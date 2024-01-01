import { cn } from "@/lib/utils";
import useNewFormStore, {
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const FormbuilderSection = ({
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
}) => {
  const { addEmptySection, moveUp, moveDowm } = useNewFormStore((state) => ({
    addEmptySection: state.addEmptySection,
    moveUp: () => state.moveSectionUp(section.parentId, section.id, "up"),
    moveDowm: () => state.moveSectionUp(section.parentId, section.id, "down"),
  }));
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
                <div
                  onClick={() =>
                    addEmptySection(section.parentId as string, section.id)
                  }
                >
                  Add section
                </div>
              </li>
              {enableDelete && (
                <li>
                  <div>Remove section</div>
                </li>
              )}
              {!isFirst && (
                <li onClick={moveUp}>
                  <div>Move up</div>
                </li>
              )}
              {!isLast && (
                <li onClick={moveDowm}>
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
};

export default FormbuilderSection;
