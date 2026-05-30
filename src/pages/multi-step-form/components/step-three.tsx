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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useMultiStepForm } from '@/store/form.store';

const stepThreeSchema = z.object({
  newsletter: z.boolean(),
  notifications: z.boolean(),
  theme: z.enum(['light', 'dark']),
});

export default function StepThree() {
  const progress = useMultiStepForm((s) => s.progress);
  const updateProgress = useMultiStepForm((s) => s.updateProgress);
  const updateCurrentStep = useMultiStepForm((s) => s.updateCurrentStep);
  const stepThree = useMultiStepForm((s) => s.stepThree);
  const updateStepThree = useMultiStepForm((s) => s.updateStepThree);

  const form = useForm<z.infer<typeof stepThreeSchema>>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      newsletter: stepThree.newsletter ?? false,
      notifications: stepThree.notifications ?? false,
      theme: stepThree.theme ?? 'light',
    },
    mode: 'onTouched',
  });

  const handlePrev = () => {
    updateProgress(50);
    updateCurrentStep('address');
  };

  const handleNext = async () => {
    const valid = await form.trigger();
    if (valid) {
      updateStepThree(form.getValues());
      updateProgress(100);
      updateCurrentStep('review');
    } else {
      toast.error('Something is wrong.. Please contact admin.');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Preferences</CardTitle>
        <CardDescription className="mt-2">
          <Field>
            <p id="progress-bar-label" className="text-xs font-medium">
              Step 3 of 4
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
        <FieldGroup>
          <Controller
            name="newsletter"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                <Checkbox
                  id="newsletter-checkbox"
                  name="newsletter-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldContent>
                  <FieldLabel htmlFor="newsletter-checkbox">Subscribe to newsletter</FieldLabel>
                  <FieldDescription>
                    By clicking this checkbox, you agree to receive a weekly newsletter.
                  </FieldDescription>
                </FieldContent>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="notifications"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                <Checkbox
                  id="notifications-checkbox"
                  name="notifications-checkbox"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldContent>
                  <FieldLabel htmlFor="notifications-checkbox">Allow notifications</FieldLabel>
                  <FieldDescription>
                    By clicking this checkbox, you agree to receive notifications.
                  </FieldDescription>
                </FieldContent>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            name="theme"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Switch
                  id="toggle-dark-mode"
                  checked={field.value === 'dark'}
                  onCheckedChange={(checked) => field.onChange(checked ? 'dark' : 'light')}
                />
                <FieldLabel>Toggle dark mode</FieldLabel>
              </Field>
            )}
          />
        </FieldGroup>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant="outline" onClick={handlePrev}>
          <ArrowLeft /> Prev
        </Button>
        <Button variant="outline" onClick={() => void handleNext()}>
          Next <ArrowRight />
        </Button>
      </CardFooter>
    </Card>
  );
}
