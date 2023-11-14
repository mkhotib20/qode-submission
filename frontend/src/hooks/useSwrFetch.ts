import useSWR from 'swr';

import jsonFetcher from '@/utils/jsonFetcher';

interface UseSwrFetchOpt {
  skip?: boolean;
}
const useSwrFetch = <RspData = unknown>(key: string, opts?: UseSwrFetchOpt) => {
  return useSWR<RspData>(opts?.skip ? null : key, jsonFetcher);
};

export default useSwrFetch;
