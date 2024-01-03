import { cn } from "@/lib/utils";
import useNewFormStore, {
  FormEntity,
} from "@/store/demoStore/newFormStore/newFormStore";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

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
  const { addColumn, moveLeft, moveRight } = useNewFormStore((state) => ({
    addColumn: state.addEmptyColumn,
    moveLeft: () =>
      state.moveWithinParentContainer(formId, "column", "down", column.id),
    moveRight: () =>
      state.moveWithinParentContainer(formId, "column", "up", column.id),
  }));
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        clickHandler();
      }}
      className={cn(
        "p-4 space-y-4 rounded-lg cursor-pointer outline outline-zinc-400 hover:outline-black outline-1 bg-zinc-100",
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
                <li onClick={moveRight}>
                  <div>Move Right</div>
                </li>
              )}
              {!isFirst && (
                <li onClick={moveLeft}>
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
export default FormbuilderColumn;
