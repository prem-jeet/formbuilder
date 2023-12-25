import { create } from "zustand";

export type FormEntity = {
  id: string;
  type: AvailableInputTypes | "column" | "section";
  label: string | null;
  name: string | null;
  mendatory?: boolean;
  parentId: string | null;
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
  addNewFormLayout: () => string;
  initialSetup: () => void;
  getActiveFormLayout: () => FormLayout;
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
}));

export default useNewFormStore;
