import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import StepTwo from '@/pages/multi-step-form/components/step-two';
import { useMultiStepForm } from '@/store/form.store';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('StepTwo', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();

    useMultiStepForm.setState({
      stepTwo: {
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
      },
    });
  });

  it('shows an error message when street input is invalid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.type(screen.getByRole('textbox', { name: /street/i }), 'ab');
    await user.tab();
    expect(await screen.findByText('Street must be at least 3 characters.'));
  });

  it('shows an error message when city input is invalid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.type(screen.getByRole('textbox', { name: /city/i }), 'a');
    await user.tab();
    expect(await screen.findByText('City must be at least 2 characters.'));

    await user.type(screen.getByRole('textbox', { name: /city/i }), 'a3');
    await user.tab();
    expect(await screen.findByText('City can only contain letters.'));
  });

  it('shows an error message when the state input is invalid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.type(screen.getByRole('textbox', { name: /state/i }), 'a');
    await user.tab();
    expect(await screen.findByText('State must be at least 2 characters.'));

    await user.type(screen.getByRole('textbox', { name: /state/i }), 'a3');
    await user.tab();
    expect(await screen.findByText('State can only contain letters.'));
  });

  it('shows an error message when the zip code input is invalid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.type(screen.getByRole('textbox', { name: /zip/i }), '!!!');
    await user.tab();
    expect(await screen.findByText('Enter a valid ZIP code.'));
  });

  it('shows an error message when country input is invalid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.type(screen.getByRole('textbox', { name: /country/i }), 'a');
    await user.tab();
    expect(await screen.findByText('Country must be at least 2 characters.'));

    await user.type(screen.getByRole('textbox', { name: /country/i }), 'a3');
    await user.tab();
    expect(await screen.findByText('Country can only contain letters.'));
  });

  it('proceeds to the previous step when prev button is clicked', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.click(screen.getByRole('button', { name: /prev/i }));

    const state = useMultiStepForm.getState();
    expect(state.progress).toBe(25);
    expect(state.currentStep).toBe('personal-info');
  });

  it('proceeds to the next step when everything is valid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.type(screen.getByRole('textbox', { name: /street/i }), 'Sunflower');
    await user.type(screen.getByRole('textbox', { name: /city/i }), 'Makati');
    await user.type(screen.getByRole('textbox', { name: /state/i }), 'Metro Manila');
    await user.type(screen.getByRole('textbox', { name: /zip/i }), '1442');
    await user.type(screen.getByRole('textbox', { name: /country/i }), 'PH');

    await user.click(screen.getByRole('button', { name: /next/i }));

    const state = useMultiStepForm.getState();
    expect(state.stepTwo).toEqual({
      street: 'Sunflower',
      city: 'Makati',
      state: 'Metro Manila',
      zip: '1442',
      country: 'PH',
    });
    expect(state.progress).toBe(75);
    expect(state.currentStep).toBe('preferences');
  });

  it('shows a toast when the next button is clicked and something from the form was invalid', async () => {
    const user = userEvent.setup();
    render(<StepTwo />);

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(toast.error).toHaveBeenCalledWith('Please fill up all required fields.');
  });
});
