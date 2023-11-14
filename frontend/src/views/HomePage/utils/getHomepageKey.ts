import { API_URL } from '@/models/constants';

import { PostResponse } from '../models/types';

const getHomepageKey = (pageIndex: number, prevPage?: PostResponse) => {
  if (prevPage && !prevPage.result.length) {
    return null;
  }

  return `${API_URL}/post?page=${pageIndex + 1}`;
};
export default getHomepageKey;
