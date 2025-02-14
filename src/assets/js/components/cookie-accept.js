import $ from 'jquery';
import { getCookie, setCookie } from './cookie';

export default () => {
	const cookieAccept = getCookie('user_cookie_accept'),
		inputUrl = document.querySelector('.js_cookie_accept_url');

	if (inputUrl && !cookieAccept) {
		$.ajax({
			url: inputUrl.dataset.url,
			context: document.body,
			success: function (response) {
				document
					.querySelector('.main')
					.insertAdjacentHTML('afterend', response);
			},
		});

		document.addEventListener('click', (event) => {
			const cookieButton = event.target.closest('.js_cookie_accept');

			if (cookieButton) {
				const popup = document.querySelector('.js_acceptcookie');
				setCookie('user_cookie_accept', 1);

				$(popup).fadeOut(() => {
					document.querySelector('.js_acceptcookie').remove();
				});
			}
		});
	}
};
