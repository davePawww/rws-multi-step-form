import { create } from 'zustand';

import type { FormStore } from '@/types/form.types';

export const useMultiStepForm = create<FormStore>((set) => ({
  currentStep: 'personal-info',
  updateCurrentStep: (step) => set({ currentStep: step }),
  progress: 0,
  updateProgress: (value) => set({ progress: value }),
  stepOne: {
    name: '',
    email: '',
    phone: '',
  },
  updateStepOne: (details) => set({ stepOne: details }),
}));
