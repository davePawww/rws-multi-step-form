import StepOne from '@/pages/multi-step-form/components/step-one';
import StepTwo from '@/pages/multi-step-form/components/step-two';
import { useMultiStepForm } from '@/store/form.store';

export default function MultiStepForm() {
  const currentStep = useMultiStepForm((s) => s.currentStep);

  if (currentStep === 'personal-info') return <StepOne />;
  if (currentStep === 'address') return <StepTwo />;
}
