/**
 * Create cookie
 * @param cookieName {String} - cookie name
 * @param cookieValue {String || Number} - cookie value
 * @param expDays {Number} - cookie expiration date in days (by default: 30)
 */
const setCookie = (cookieName, cookieValue, expDays = 30) => {
	const d = new Date();
	const name = encodeURIComponent(cookieName);
	const value = encodeURIComponent(cookieValue);

	d.setTime(d.getTime() + expDays * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = `${name}=${value};${expires};path=/`;
};

/**
 * Delete cookie
 * @param cookieName {String} - cookie name
 */
function deleteCookie(cookieName) {
	const d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
	let expires = `expires=${d.toUTCString()}`;
	document.cookie = `${cookieName}=;${expires};path=/`;
}

/**
 * Read cookie
 * @param cookieName {String} - cookie name
 * @returns {string}
 */
function getCookie(cookieName) {
	const matches = document.cookie.match(new RegExp('(?:^|; )' + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));

	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export { setCookie, getCookie, deleteCookie };
