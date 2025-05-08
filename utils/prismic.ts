export const getPrismicSingle = (id: string) => {
  const { client } = usePrismic();
  return useAsyncData(id, () => client.getSingle(id)).data;
};

export const getPrismicReusable = (type: string, id: string) => {
  const { client } = usePrismic();
  return useAsyncData(`[${type}-${id}]`, () => client.getByUID(type, id)).data;
};
