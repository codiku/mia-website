export const getParam = (key: string, req: Request) => {
  return new URL(req.url).searchParams.get(key);
};
