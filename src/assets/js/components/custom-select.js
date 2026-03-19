import TomSelect from 'tom-select/base'; // https://tom-select.js.org/docs/

function initSelect(el, callback) {
	if (!el) return;

	const selectOpt = {
		searchEnabled: false,
		itemSelectText: false,
		render: {
			option: function(data, escape) {
				return `<div class=""${ data.hasOwnProperty('icon') ? 'style="--icon:url(' + data.icon + ')"' : '' }>${ escape(data.text) }</div>`;
			},
			item: function(data, escape) {
				return `<div class=""${ data.hasOwnProperty('icon') ? 'style="--icon:url(' + data.icon + ')"' : '' }>${ escape(data.text) }</div>`;
			},
		},
	}

	el.dataset.parent && (selectOpt.dropdownParent = el.closest(el.dataset.parent));

	const selectInstance = new TomSelect(el, selectOpt);
	console.log(selectOpt, selectInstance);

	callback && typeof callback === 'function' && callback(selectInstance);
}

export { initSelect };
