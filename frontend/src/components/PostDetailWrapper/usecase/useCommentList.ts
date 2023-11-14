import { useCallback, useMemo } from 'react';

import useSWRInfinite from 'swr/infinite';

import { API_URL } from '@/models/constants';
import jsonFetcher from '@/utils/jsonFetcher';

import { CommentResponse } from '../models/types';

const useCommentList = (postID: string | null) => {
  const getKey = useCallback(
    (pageIndex: number, prevData?: CommentResponse) => {
      if (!postID) return null;
      if (prevData && !prevData.result.length) {
        return null;
      }

      return `${API_URL}/comment/${postID}?page=${pageIndex + 1}`;
    },
    [postID],
  );

  const { setSize, data } = useSWRInfinite<CommentResponse>(getKey, jsonFetcher);

  const handleFetchMore = () => {
    setSize((prev) => prev + 1);
  };

  const dataComment = useMemo<CommentResponse>(() => {
    return {
      result: data?.flatMap((item) => item?.result) || [],
      nextPage: data?.[data?.length - 1]?.nextPage,
    };
  }, [data]);
  return {
    dataComment,
    handleFetchMore,
  };
};

export default useCommentList;
