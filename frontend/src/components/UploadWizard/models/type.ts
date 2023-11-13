import { Dispatch, SetStateAction } from 'react';

export type UploadWizardStep = 'upload' | 'caption';

export interface UploadData {
  file?: File;
  previewUrl?: string;
  caption?: string;
}

export interface ComponentStepProps {
  setActiveStep: Dispatch<SetStateAction<UploadWizardStep>>;
  imageState: UploadData;
  closeModal: () => void;
  setImageState: Dispatch<SetStateAction<UploadData>>;
  handleSubmit: () => void;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
export interface UploadWizardProps {
  isOpen: boolean;
  onClose: () => void;
}
