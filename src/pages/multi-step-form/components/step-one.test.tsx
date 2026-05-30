import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import StepOne from '@/pages/multi-step-form/components/step-one';
import { useMultiStepForm } from '@/store/form.store';

vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('StepOne', () => {
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
    useMultiStepForm.setState({
      stepOne: {
        email: '',
        name: '',
        phone: '',
      },
    });
  });

  it('shows an error when name is touched and empty', async () => {
    const user = userEvent.setup();
    render(<StepOne />);

    await user.click(screen.getByRole('textbox', { name: /name/i }));
    await user.tab();

    expect(await screen.findByText('Name should not be empty.')).toBeInTheDocument();
  });

  it('shows an error when email is invalid', async () => {
    const user = userEvent.setup();
    render(<StepOne />);

    await user.click(screen.getByRole('textbox', { name: /email/i }));
    await user.tab();

    expect(
      await screen.findByText('Email is invalid. Please add a valid email.'),
    ).toBeInTheDocument();
  });

  it('shows and error when phone number is invalid', async () => {
    const user = userEvent.setup();
    render(<StepOne />);

    await user.click(screen.getByRole('textbox', { name: /phone/i }));
    await user.tab();

    expect(
      await screen.findByText('Phone number is invalid. Please add a valid phone number'),
    ).toBeInTheDocument();
  });

  it('proceeds to the next step when everything is valid', async () => {
    const user = userEvent.setup();
    render(<StepOne />);

    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John');
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'email@company.com');
    await user.type(screen.getByRole('textbox', { name: /phone/i }), '+12025550123');

    await user.click(screen.getByRole('button', { name: /next/i }));

    const state = useMultiStepForm.getState();
    expect(state.stepOne).toEqual({
      name: 'John',
      email: 'email@company.com',
      phone: '+12025550123',
    });
    expect(state.progress).toBe(50);
    expect(state.currentStep).toBe('address');
  });

  it('shows a toast when the next button is clicked and there is still an invalid field', async () => {
    const user = userEvent.setup();
    render(<StepOne />);

    await user.click(screen.getByRole('button', { name: /next/i }));

    expect(toast.error).toHaveBeenCalledWith('Please fill up all required fields.');
  });
});
