export const isDevelopment = () => {
	return (
		process.env.NODE_ENV === "development" ||
		(typeof window !== "undefined" &&
			window.location.hostname === "localhost")
	);
};

export const isProduction = () => {
    console.log(process.env.NODE_ENV);
	return (
		process.env.NODE_ENV === "production" &&
		typeof window !== "undefined" &&
		!window.location.hostname.includes("localhost")
	);
};
