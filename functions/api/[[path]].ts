const WORKER_URL = "https://word-ladder-race-production.rexnorvell.workers.dev";

export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  return fetch(`${WORKER_URL}${url.pathname}${url.search}`, {
    method: context.request.method,
    headers: context.request.headers,
    body: context.request.body,
  });
}