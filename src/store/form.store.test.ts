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

  it('updates setpOne state when updateStepOne is called', () => {
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

  it('updates stepTwo state when updateStepTwo is called', () => {
    useMultiStepForm.getState().updateStepTwo({
      street: 'Sunflower',
      city: 'Makati',
      state: 'NCR',
      zip: '1442',
      country: 'PH',
    });

    const { street, city, state, zip, country } = useMultiStepForm.getState().stepTwo;
    expect(street).toBe('Sunflower');
    expect(city).toBe('Makati');
    expect(state).toBe('NCR');
    expect(zip).toBe('1442');
    expect(country).toBe('PH');
  });

  it('updates stepThree state when updateStepThree is called', () => {
    useMultiStepForm.getState().updateStepThree({
      newsletter: true,
      notifications: true,
      theme: 'dark',
    });

    const { newsletter, notifications, theme } = useMultiStepForm.getState().stepThree;
    expect(newsletter).toBe(true);
    expect(notifications).toBe(true);
    expect(theme).toBe('dark');
  });
});
