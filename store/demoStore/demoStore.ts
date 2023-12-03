import { create } from "zustand";

type State = {
  count: number;
};

type Actions = {
  incCount: (value?: number) => void;
  decCount: (value?: number) => void;
};

const useCounterStore = create<State & Actions>()((set) => ({
  count: 0,
  incCount: (value?: number) =>
    set((state) => ({
      count: state.count + (value || 1),
    })),
  decCount: (value?: number) =>
    set((state) => ({
      count: state.count - (value || 1),
    })),
}));

export default useCounterStore;
