import { version } from "react";
import { create } from "zustand";

const useEvenStore = create((set) => ({
  event: [],
  setEvent: (event) => set(() => ({ event: event })),
  version: 2,
  setVersion: (version) => set(() => ({ version: version })),
}));

export default useEvenStore;
