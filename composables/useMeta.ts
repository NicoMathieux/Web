export const useMeta = (page: Object) => {
    useSeoMeta({
        title: computed(() => page.value?.data?.meta_title || ''),
        ogTitle: computed(() => page.value?.data?.meta_title || ''),
        description: computed(() => page.value?.data?.meta_description || ''),
        ogDescription: computed(() => page.value?.data?.meta_description || ''),
        ogImage: computed(() => page.value?.data?.meta_image?.url || ''),
        twitterCard: 'summary_large_image'
    })
}