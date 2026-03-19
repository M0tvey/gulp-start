import $ from 'jquery';
import { Fancybox } from "@fancyapps/ui";
import { initSelect } from './custom-select';
import { phoneMask } from './inputs-mask';
import { checkInputs } from './check-inputs';
import inputsMask from './inputs-mask';
import { ajaxForm } from './ajax-form';
import { initFormsValidator } from './validation-forms';

const defaults = {
	compact: () => window.matchMedia('(max-width: 10px), (max-height: 10px)').matches,
	on: {
		reveal: (fancybox) => {
			const wrap = fancybox.container
				, popup = wrap.querySelector('.popup');

			if (!popup) return;

			initOpenPopup(popup);

			popup.id && wrap.classList.add('popup--' + popup.id + '__wrap');

			if (!popup.querySelector('form')) return;

			popup.querySelectorAll('select').forEach(select => initSelect(select));

			initFormsValidator(popup);

			inputsMask();
			checkInputs(popup);
			inputFile(popup);
			ajaxForm(popup);
		}
	}
}

function initOpenPopup(wrap = document) {
	wrap.querySelectorAll('.js_open_popup').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();

			const linkHref = link.href || link.hasAttribute('href') && link.getAttribute('href');

			if (!linkHref) return;

			Fancybox.show([{
				src: linkHref,
				type: 'ajax'
			}], {
				...defaults
			});
		});
	});

	wrap.querySelectorAll('.js_open_local_popup').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			if (!link.hash) return;

			Fancybox.show([{
				src: link.hash
			}], {
				...defaults
			});
		});
	});
}

function initOpenUrlPopup() {
	const urlParams = new URLSearchParams(window.location.search)

	urlParams.has('openAjaxPopup') && (() => {
		const isLogin = urlParams.get('openAjaxPopup').includes('login');

		Fancybox.show([{
			closeButton: !isLogin,
			src: urlParams.get('openAjaxPopup'),
			type: 'ajax'
		}], {
			...defaults,
			dragToClose: !isLogin,
			backdropClick: !isLogin,
		});
	})();

	urlParams.has('openPopup') && Fancybox.show([{
		src: urlParams.get('openPopup')
	}], {
		...defaults
	});
}

function openAjaxPopup(href) {
	Fancybox.close();

	Fancybox.show([{
		src: href,
		type: 'ajax'
	}], {
		...defaults
	});
}

export { initOpenPopup, initOpenUrlPopup, openAjaxPopup };
