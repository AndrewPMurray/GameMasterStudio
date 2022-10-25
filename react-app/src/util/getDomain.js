export const getDomain = () => {
	const env = process.env.NODE_ENV;
	switch (env) {
		case 'production': {
			return 'http://theelderwan.us.to:9000/gamemasterstudio/';
		}
		default: {
			return 'http://192.168.1.112:9000/gamemasterstudio/';
		}
	}
};
