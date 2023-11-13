import dynamic from 'next/dynamic';

import Loader from './loader';

const UploadWizardLazy = dynamic(() => import('./index'), {
  loading: Loader,
});

export default UploadWizardLazy;
