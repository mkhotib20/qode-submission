import { ComponentType } from 'react';

import CaptionStep from '../presentations/CaptionStep/Lazy';
import StatusStep from '../presentations/StatusStep';
import UploadStep from '../presentations/UploadStep';
import { ComponentStepProps, UploadWizardStep } from './type';

export const EACH_STEP_COMPONENT: Record<UploadWizardStep, ComponentType<ComponentStepProps>> = {
  upload: UploadStep,
  status: StatusStep,
  caption: CaptionStep,
};

export const EACH_STEP_TITLE: Record<UploadWizardStep, string> = {
  upload: 'Upload new image',
  caption: 'Write a Caption',
  status: 'Upload Status',
};
