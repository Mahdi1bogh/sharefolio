import { create } from "zustand";

type onBoardingType = {
  imageUrl: string;
  updateImageUrl: (url: string) => void;
  updateValues: (values: Partial<onBoardingType>) => void;
  currStep: number;
  setCurrStep: (step: number) => void;
};

export const useOnBoarding = create<onBoardingType>((set) => ({
  imageUrl: "",
  updateImageUrl: (url) => set({ imageUrl: url }),
  updateValues: (values) => set(values),
  currStep: 1,
  setCurrStep: (step) => set({ currStep: step }),
}));
