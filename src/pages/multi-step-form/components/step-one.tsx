import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
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

const stepOneSchema = z.object({
  name: z.string().trim().min(1, 'Name should not be empty.').max(50, 'Name is too long'),
  email: z.email('Email is invalid. Please add a valid email.'),
  phone: z.e164('Phone number is invalid. Please add a valid phone number'),
});

export default function StepOne() {
  const progress = useMultiStepForm((s) => s.progress);
  const updateProgress = useMultiStepForm((s) => s.updateProgress);
  const stepOne = useMultiStepForm((s) => s.stepOne);
  const updateStepOne = useMultiStepForm((s) => s.updateStepOne);
  const updateCurrentStep = useMultiStepForm((s) => s.updateCurrentStep);

  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      name: stepOne.name ?? '',
      email: stepOne.email ?? '',
      phone: stepOne.phone ?? '',
    },
    mode: 'onTouched',
  });

  const handleNext = async () => {
    const valid = await form.trigger();
    if (valid) {
      updateStepOne(form.getValues());
      updateProgress(50);
      updateCurrentStep('address');
    } else {
      toast.error('Please fill up all required fields.');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription className="mt-2">
          <Field>
            <p id="progress-bar-label" className="text-xs font-medium">
              Step 1 of 4
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
        <form id="step-one-form">
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-name"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-email"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="step-one-form-phone">Phone number</FieldLabel>
                  <Input
                    {...field}
                    id="step-one-form-phone"
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
        <Button variant="outline" disabled>
          <ArrowLeft /> Prev
        </Button>
        <Button variant="outline" onClick={() => void handleNext()}>
          Next <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
