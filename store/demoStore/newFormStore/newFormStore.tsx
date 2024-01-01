import { create } from "zustand";

export type FormEntity = {
  id: string;
  type: AvailableInputTypes | "column" | "section";
  label: string | null;
  name: string | null;
  mendatory?: boolean;
  parentId: string;
  childCount?: number;
};
export type FormLayout = {
  id: string;
  layout: {
    sections: FormEntity[];
    columns: FormEntity[];
    fields: FormEntity[];
  };
};
export type AvailableInputTypes =
  | "text"
  | "select"
  | "checkbox"
  | "long-text"
  | "number";

const generateInitialLayout = (): FormLayout => {
  const sectionId = crypto.randomUUID();
  const formId = crypto.randomUUID();

  return {
    id: formId,
    layout: {
      sections: [
        {
          id: sectionId,
          type: "section",
          label: null,
          name: null,
          parentId: formId,
          childCount: 2,
        },
      ],
      columns: new Array(2).fill(0).map(() => ({
        id: (() => crypto.randomUUID())(),
        type: "column",
        label: null,
        name: null,
        parentId: sectionId,
      })),
      fields: [],
    },
  };
};

type State = {
  formLayout: FormLayout[];
  currentlyActiveLayout: string;
};

type Actions = {
  addInput: (type: AvailableInputTypes) => void;
  clearLayoutData: (id: string) => void;
  addEmptySection: (formId: string, sectionId: string) => void;
  addEmptyColumn: (
    foemId: string,
    currColumnId: string,
    parentId: string
  ) => void;
  addNewFormLayout: () => string;
  initialSetup: () => void;
  getActiveFormLayout: () => FormLayout;
  moveSectionUp: (
    formId: string,
    sectionId: string,
    direction: "up" | "down"
  ) => void;
  moveWithinParentContainer: (
    formId: string,
    entityType: "column" | "field",
    direction: "up" | "down",
    targetId: string
  ) => void;
};

const useNewFormStore = create<State & Actions>()((set, get) => ({
  formLayout: [],
  currentlyActiveLayout: "",
  addInput: (type: AvailableInputTypes) => console.log(type),
  clearLayoutData: (id: string) => set((state) => ({ formLayout: [] })),
  addEmptySection: (formId: string, sectionId: string) => {
    const index = get().formLayout.findIndex((layout) => layout.id === formId);
    if (index !== -1) {
      const layout = structuredClone(get().formLayout[index]);
      const sections = [...layout.layout.sections];
      const sectionIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      const newSection = {
        id: crypto.randomUUID(),
        type: "section" as const,
        label: null,
        name: null,
        parentId: formId,
        childCount: 2,
      };
      layout.layout.sections = [
        ...sections.slice(0, sectionIndex + 1),
        { ...newSection },
        ...sections.slice(sectionIndex + 1),
      ];
      set((state) => ({
        formLayout: state.formLayout.map((l) => (l.id === formId ? layout : l)),
      }));
    }
  },
  addNewFormLayout: () => {
    const newLayout = { ...generateInitialLayout() };

    set((state) => ({
      formLayout: [...state.formLayout, { ...newLayout }],
      currentlyActiveLayout: newLayout.id,
    }));

    return newLayout.id;
  },
  initialSetup: () => {
    const shouldAddLayout = get().formLayout.length === 0;
    shouldAddLayout && get().addNewFormLayout();
  },
  getActiveFormLayout: () =>
    get().formLayout.find(
      (layout) => layout.id === get().currentlyActiveLayout
    ) as FormLayout,

  addEmptyColumn: (formId: string, currcolumnId: string, parentId: string) => {
    const layout = get().formLayout.find(({ id }) => id === formId);
    if (layout) {
      const newLayout = structuredClone(layout);
      const columns = [...layout.layout.columns];
      const currColumnIndex = columns.findIndex(
        (column) => column.id === currcolumnId
      );
      const newColumn = {
        id: crypto.randomUUID(),
        type: "column" as const,
        label: null,
        name: null,
        parentId: parentId,
        childCount: 0,
      };
      const newColumnsLayout = [
        ...columns.slice(0, currColumnIndex + 1),
        { ...newColumn },
        ...columns.slice(currColumnIndex + 1),
      ];
      newLayout.layout.columns = [...newColumnsLayout];

      set((state) => ({
        formLayout: state.formLayout.map((l) =>
          l.id === formId ? newLayout : l
        ),
      }));
    }
  },
  moveSectionUp: (
    formId: string,
    sectionId: string,
    direction: "up" | "down"
  ) => {
    const index = get().formLayout.findIndex((layout) => layout.id === formId);
    if (index !== -1) {
      const layout = structuredClone(get().formLayout[index]);
      const sections = [...layout.layout.sections];
      const currentSectionIndex = sections.findIndex(
        (section) => section.id === sectionId
      );
      if (currentSectionIndex >= 0) {
        const swapIndex = currentSectionIndex + (direction === "up" ? -1 : 1);
        const swapWith = { ...sections[swapIndex] };
        sections[swapIndex] = {
          ...sections[currentSectionIndex],
        };
        sections[currentSectionIndex] = { ...swapWith };
        layout.layout.sections = [...sections];
        set((state) => ({
          formLayout: state.formLayout.map((l) =>
            l.id === formId ? layout : l
          ),
        }));
      }
    }
  },
  moveWithinParentContainer: (
    formId: string,
    entityType: "column" | "field",
    direction: "up" | "down",
    targetId: string
  ) => {
    const key = entityType === "column" ? "columns" : "fields";
    const layout = structuredClone(
      get().formLayout.find((layout) => layout.id === formId)
    );
    if (layout) {
      const targetArray = layout.layout[key];
      const ogCurrIndex = targetArray.findIndex(({ id }) => id === targetId);
      const currEntity = { ...targetArray[ogCurrIndex] };

      const filteredArr = targetArray.filter(
        ({ parentId }) => parentId === currEntity.parentId
      );
      const tempCurrIndex = filteredArr.findIndex(({ id }) => id === targetId);
      const swapEntity = {
        ...filteredArr[tempCurrIndex + (direction === "up" ? 1 : -1)],
      };
      const ogSwapIndex = targetArray.findIndex(
        ({ id }) => id === swapEntity.id
      );

      targetArray[ogCurrIndex] = { ...swapEntity };
      targetArray[ogSwapIndex] = { ...currEntity };
      layout.layout[key] = [...targetArray];

      set((state) => ({
        formLayout: state.formLayout.map((l) => (l.id === formId ? layout : l)),
      }));
      console.log("called");
    }
  },
}));

export default useNewFormStore;
