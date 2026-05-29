import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import StepTwo from '@/pages/multi-step-form/components/step-two';

describe('StepTwo', () => {
  beforeEach(() => {
    cleanup();
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
});
