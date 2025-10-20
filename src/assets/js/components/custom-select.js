import Choices from 'choices.js'; // https://github.com/Choices-js/Choices

function initSelect(el, callback) {
	if (!el) return;

	const selectOpt = {
		searchEnabled: false,
		itemSelectText: false
	}

	const choices = new Choices(el, selectOpt);

	// choices.showDropdown();

	callback && typeof callback === 'function' && callback(choices);
}

export { initSelect };
