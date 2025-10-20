function setCookie(name, value, options = {}) {
  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  if (options.days) {
    let date = new Date();
    date.setTime(date.getTime() + (options.days * 24 * 60 * 60 * 1000));
    options.expires = date.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(cookieName) {
	const d = new Date();
	d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
	let expires = `expires=${d.toUTCString()}`;
	document.cookie = `${cookieName}=;${expires};path=/`;
}

function getCookie(cookieName) {
	const matches = document.cookie.match(new RegExp('(?:^|; )' + cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));

	return matches ? decodeURIComponent(matches[1]) : undefined;
}

export { setCookie, getCookie, deleteCookie };
