export const getPrismicSingle = (id: string) => {
  const { client } = usePrismic();
  return useAsyncData(id, () => client.getSingle(id)).data;
};

export const getPrismicReusable = async (type: string, id: string) => {
  const { client } = usePrismic();
  const { data, error } = await useAsyncData(`[${type}-${id}]`, () =>
    client.getByUID(type, id)
  )

  // Côté serveur (SSR)
  if (import.meta.server && error.value) {
    throw createError({
      statusCode: 404,
      statusMessage: `Page not found: ${type}/${id}`,
    })
  }

  // Côté client (SPA)
  if (import.meta.client) {
    const nuxtError = useError()
    watch(
      () => error.value,
      (err) => {
        if (err) {
          nuxtError.value = createError({
            statusCode: 404,
            statusMessage: `Page not found: ${type}/${id}`,
          })
        }
      }
    )
  }

  return data
};

export const makePrismicLink = (url: string) => {
  return {
    link_type: "Document",
    url
  }
}