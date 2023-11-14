'use client';

import { useCallback, useState } from 'react';

import useSWRInfinite from 'swr/infinite';

import jsonFetcher from '@/utils/jsonFetcher';

import { PostResponse } from '../../models/types';
import getHomepageKey from '../../utils/getHomepageKey';

const useHomeData = () => {
  const [fetchingMore, setFetchingMore] = useState(false);

  // will always revalidate first page to reconsile the sort
  // In network will always show page 1 refetched before next page
  const { data, setSize, isLoading } = useSWRInfinite<PostResponse>(getHomepageKey, jsonFetcher, {
    onSuccess: () => {
      setFetchingMore(false);
    },
  });

  const postData = data?.flatMap((item) => item?.result) || [];
  const hasNext = data?.[data?.length - 1]?.nextPage;

  const fetchMore = useCallback(() => {
    setFetchingMore(true);
    setSize((prev) => prev + 1);
  }, [setSize]);

  return {
    postData,
    hasNext,
    fetchMore,
    isLoading,
    fetchingMore,
  };
};

export default useHomeData;
