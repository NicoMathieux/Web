export default defineNuxtPlugin(() => {
	if (process.client) {
		const script = document.createElement("script");
		script.src = "/tarteaucitron/tarteaucitron.min.js";
		script.async = true;
        
		script.onload = () => {
			window.tarteaucitron.init({
				orientation: "bottom",
				privacyUrl: "/rgpd",
				hashtag: "#tarteaucitron",
				cookieName: "tarteaucitron",
				highPrivacy: true,
				handleBrowserDNTRequest: false,
				removeCredit: true,
				showAlertSmall: false,
				cookieslist: true,
				useExternalCss: false,
				readmoreLink: "/rgpd",
                showIcon: false,
                groupServices: false,
			});

            window.tarteaucitron.user.gtagUa = "G-1JX6LHVZHP";
            
			window.tarteaucitron.job = ["gtag"];
		};

		document.head.appendChild(script);
	}
});
