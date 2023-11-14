import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('./index'));

export default LoginForm;
