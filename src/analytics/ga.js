let ga = require('react-ga');


export const initializeGoogleAnalytics = () => {
	console.log('INITIALING GOOGLE ANALYTICS');
	ga.initialize('UA-77899465-1');
}

export const pageview = (url) => {
	const parsedHashLocation = (url.split('?')[0]).split('#')[1];
	ga.pageview(parsedHashLocation);
}

export const event = (payload) => {
	ga.event({
		category: payload.category,
		action: payload.action
	});
}
