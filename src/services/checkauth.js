
import Cookies from 'js-cookie';

export const checkAuth = () => {
	let isAuthenticated = false;
	if (Cookies.get('sessionid') !== undefined) isAuthenticated = true;
	return isAuthenticated;
};