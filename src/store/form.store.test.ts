import { describe, expect, it } from 'vitest';

import { useMultiStepForm } from '@/store/form.store';

describe('FormStore', () => {
  it('updates the currentStep when updateCurrentStep is called', () => {
    useMultiStepForm.getState().updateCurrentStep('review');
    expect(useMultiStepForm.getState().currentStep).toBe('review');
  });

  it('updates the progress when updateProgress is called', () => {
    useMultiStepForm.getState().updateProgress(25);
    expect(useMultiStepForm.getState().progress).toBe(25);
  });

  it('updates the setpOne when updateStepOne is called', () => {
    useMultiStepForm.getState().updateStepOne({
      name: 'Dave',
      email: 'email@company.com',
      phone: '+123456',
    });

    const { name, email, phone } = useMultiStepForm.getState().stepOne;
    expect(name).toBe('Dave');
    expect(email).toBe('email@company.com');
    expect(phone).toBe('+123456');
  });
});
