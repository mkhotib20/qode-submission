export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
// in server need full url

export const API_URL = `${typeof window === 'undefined' ? BASE_URL : ''}/api/v1`;
