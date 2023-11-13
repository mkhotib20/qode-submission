type JsonFetcher = <ResponseType = Record<string, unknown>>(
  input: RequestInfo,
  init?: RequestInit,
) => Promise<ResponseType>;

const jsonFetcher: JsonFetcher = async (input, init) => {
  const response = await fetch(input, init);
  const jsonRsp = await response.json();
  if (!response.ok) {
    return;
  }
  return jsonRsp;
};

export default jsonFetcher;
