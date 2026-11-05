import {
  API_RATE_LIMIT_MAX_RETRIES,
  API_RATE_LIMIT_RETRY_DELAY,
} from "@/constants";
import wait from "./wait";

const TOO_MANY_REQUESTS = 429;

export default async function fetchWithRetry(
  url: string,
  attempt = 0
): Promise<Response> {
  // The signal overcomes Next.js' memoized fetch cache to prevent stale 429's instead of refetching
  const { signal } = new AbortController();
  const response = await fetch(url, { signal });

  if (
    response.status !== TOO_MANY_REQUESTS ||
    attempt >= API_RATE_LIMIT_MAX_RETRIES
  ) {
    return response;
  }

  // Back off exponentially i.e. retries with the base (attempt) raised to the power of 2 up to the max retries
  await wait(API_RATE_LIMIT_RETRY_DELAY * 2 ** attempt);
  return fetchWithRetry(url, attempt + 1);
}
