export async function onRequest(context: any) {
  const url = new URL(context.request.url);
  url.pathname = url.pathname.replace(/^\/api/, "");
  return fetch(
    `https://word-ladder-race.rexnorvell.workers.dev${url.pathname}${url.search}`,
    {
      method: context.request.method,
      headers: context.request.headers,
      body: context.request.body,
    }
  );
}