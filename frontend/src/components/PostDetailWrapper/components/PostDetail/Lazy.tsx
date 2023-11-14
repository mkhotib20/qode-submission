import dynamic from 'next/dynamic';

const PostDetail = dynamic(() => import('./index'));

export default PostDetail;
