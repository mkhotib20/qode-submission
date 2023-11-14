'use client';

import { PropsWithChildren } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Box } from '@chakra-ui/react';

import useSwrFetch from '@/hooks/useSwrFetch';
import { API_URL } from '@/models/constants';
import { PostData } from '@/models/types';

import SimpleModal from '../SimpleModal';
import PostDetail from './components/PostDetail/Lazy';
import useCommentList from './usecase/useCommentList';

const PostDetailWrapper = ({ children }: PropsWithChildren<unknown>) => {
  const searchparams = useSearchParams();

  const { push } = useRouter();
  const postID = searchparams.get('p');
  const pathname = usePathname();
  // separate to prevent longer loading for only post detail
  const { data: postData } = useSwrFetch<PostData>(`${API_URL}/post/${postID}`, { skip: !postID });
  const { handleFetchMore, dataComment } = useCommentList(postID);

  return (
    <>
      {children}
      <SimpleModal isCentered onClose={() => push(pathname)} size="6xl" isOpen={Boolean(postID)}>
        <Box minH="80vh">
          {postData && (
            <PostDetail
              postData={postData}
              onFetchMore={handleFetchMore}
              postComment={{
                nextPage: dataComment?.nextPage,
                result: dataComment?.result || [],
              }}
            />
          )}
        </Box>
      </SimpleModal>
    </>
  );
};

export default PostDetailWrapper;
