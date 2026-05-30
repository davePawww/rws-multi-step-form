import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import StepThree from '@/pages/multi-step-form/components/step-three';
import { useMultiStepForm } from '@/store/form.store';

describe('StepThree', () => {
  beforeEach(() => {
    cleanup();
  });

  it('proceeds to the next step when next button is clicked', async () => {
    const user = userEvent.setup();
    render(<StepThree />);

    await user.click(screen.getByRole('button', { name: /next/i }));

    const state = useMultiStepForm.getState();
    expect(state.progress).toBe(100);
    expect(state.currentStep).toBe('review');
  });

  it('proceeds to the prev step when the prev button is clicked', async () => {
    const user = userEvent.setup();
    render(<StepThree />);

    await user.click(screen.getByRole('button', { name: /prev/i }));

    const state = useMultiStepForm.getState();
    expect(state.progress).toBe(50);
    expect(state.currentStep).toBe('address');
  });
});
