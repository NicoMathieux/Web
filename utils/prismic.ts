export const getPrismicSingle = (id: string) => {
  const { client } = usePrismic();
  return useAsyncData(id, () => client.getSingle(id)).data;
};
