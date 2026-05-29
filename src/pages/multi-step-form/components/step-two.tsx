import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import validator from 'validator';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useMultiStepForm } from '@/store/form.store';

const stepTwoSchema = z.object({
  street: z
    .string()
    .trim()
    .min(3, 'Street must be at least 3 characters.')
    .max(100, 'Street is too long'),
  city: z
    .string()
    .trim()
    .min(2, 'City must be at least 2 characters.')
    .max(50, 'City is too long.')
    .refine((val) => validator.isAlpha(val, 'en-US', { ignore: " '-" }), {
      message: 'City can only contain letters.',
    }),
  state: z
    .string()
    .trim()
    .min(2, 'State must be at least 2 characters.')
    .max(50, 'State is too long.')
    .refine((val) => validator.isAlpha(val, 'en-US', { ignore: " '-" }), {
      message: 'State can only contain letters.',
    }),
  zip: z
    .string()
    .trim()
    .refine((val) => validator.isPostalCode(val, 'any'), {
      message: 'Enter a valid ZIP code.',
    }),
  country: z
    .string()
    .trim()
    .min(2, 'Country must be at least 2 characters.')
    .max(56, 'Country is too long.')
    .refine((val) => validator.isAlpha(val, 'en-US', { ignore: " '-" }), {
      message: 'Country can only contain letters.',
    }),
});

export default function StepTwo() {
  const progress = useMultiStepForm((s) => s.progress);
  const updateProgress = useMultiStepForm((s) => s.updateProgress);
  const stepTwo = useMultiStepForm((s) => s.stepTwo);
  const updateStepTwo = useMultiStepForm((s) => s.updateStepTwo);
  const updateCurrentStep = useMultiStepForm((s) => s.updateCurrentStep);

  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      street: stepTwo.street ?? '',
      city: stepTwo.city ?? '',
      state: stepTwo.state ?? '',
      zip: stepTwo.zip ?? '',
      country: stepTwo.country ?? '',
    },
    mode: 'onTouched',
  });

  const handlePrev = () => {
    updateProgress(25);
    updateCurrentStep('personal-info');
  };

  const handleNext = async () => {
    const valid = await form.trigger();
    if (valid) {
      updateStepTwo(form.getValues());
      updateProgress(50);
      updateCurrentStep('preferences');
    } else {
      toast.error('Please fill up all required fields.');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Address</CardTitle>
        <CardDescription className="mt-2">
          <Field>
            <p id="progress-bar-label" className="text-xs font-medium">
              Step 2 of 4
            </p>
            <Progress
              id="step-progress"
              role="progressbar"
              aria-label="progress-bar"
              aria-labelledby="progress-bar"
              value={progress}
            />
          </Field>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="step-two-form">
          <FieldGroup>
            <Controller
              name="street"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-street">Street</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-street"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-city">City</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-city"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="state"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-state">State</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-state"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="zip"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-zip">Zip</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-zip"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="country"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-country">Country</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-country"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline" onClick={() => void handlePrev()}>
          <ArrowLeft /> Prev
        </Button>
        <Button variant="outline" onClick={() => void handleNext()}>
          Next <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
