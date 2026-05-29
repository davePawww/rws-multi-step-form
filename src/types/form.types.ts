export type Step = 'personal-info' | 'address' | 'preferences' | 'review';

export type StepOne = {
  name: string;
  email: string;
  phone: string;
};

export type StepTwo = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type FormStore = {
  currentStep: Step;
  updateCurrentStep: (step: Step) => void;
  progress: number;
  updateProgress: (value: number) => void;
  stepOne: StepOne;
  updateStepOne: (details: StepOne) => void;
  stepTwo: StepTwo;
  updateStepTwo: (details: StepTwo) => void;
};
