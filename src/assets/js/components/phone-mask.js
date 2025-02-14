import Inputmask from '../../../../node_modules/inputmask/dist/inputmask.es6.js';

export function phoneMask() {
	document.querySelectorAll('.js_phone_mask').forEach((phoneEl) => {
		Inputmask({
			showMaskOnHover: false,
			mask: '+7 (999) 999-99-99',
		}).mask(phoneEl);
	});
}
