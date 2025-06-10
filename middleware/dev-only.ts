export default defineNuxtRouteMiddleware((to, from) => {
	if (process.env.NODE_ENV === "production") {
		if (import.meta.client) {
			const error = createError({
				statusCode: 404,
				statusMessage: `Page not found: ${to.path}`,
			});
            
			const nuxtApp = useNuxtApp();
			nuxtApp.callHook('app:error', error);
            
			return abortNavigation();
		} else {
			throw createError({
				statusCode: 404,
				statusMessage: `Page not found: ${to.path}`,
			});
		}
	}
});
