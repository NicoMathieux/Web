const isShopOn = ref<boolean | null>(null);

export const useShop = () => {
	const params = getPrismicSingle("settings");

	isShopOn.value = params.value.data.shop_activated ? true : false;

	return {
		isShopOn
	};
};
