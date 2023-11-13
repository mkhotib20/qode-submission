import dynamic from 'next/dynamic';

import Loader from '../../loader';

const CaptionStep = dynamic(() => import('./index'), {
  loading: Loader,
});

export default CaptionStep;
