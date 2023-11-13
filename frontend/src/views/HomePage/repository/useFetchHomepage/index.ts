'use client';

import useSwr from 'swr';

import jsonFetcher from '@/utils/jsonFetcher';

import { PostResponse } from '../../models/types';

const useHomeData = () => {
  const { data, isLoading } = useSwr<PostResponse>('/api/v1/post', jsonFetcher);

  return {
    postData: data?.result || [],
    hasNext: Boolean(data?.nextPage),
    isLoading,
  };
};

export default useHomeData;
