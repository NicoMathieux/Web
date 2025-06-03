export const getPrismicSingle = (id: string) => {
  const { client } = usePrismic();
  return useAsyncData(id, () => client.getSingle(id)).data;
};

export const getPrismicReusable = (type: string, id: string) => {
  const { client } = usePrismic();
  const data = useAsyncData(`[${type}-${id}]`, () => client.getByUID(type, id));

  if (import.meta.client) {
    if (!data.data.value) {
      const route = useRoute();
      throw createError({
        statusCode: 404,
        statusMessage: `Page Not Found: ${route.fullPath}`,
        fatal: true,
      })
    }
  }

  return data.data;
};

export const makePrismicLink = (url: string) => {
  return {
    link_type: "Document",
    url
  }
}