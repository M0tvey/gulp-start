import select2 from "select2";

function initSelect($el) {
	if (!$el.length) return;

	const placeholder = $el.data("placeholder") || false,
		selectOpt = {
			language: "ru",
			dropdownParent: $el.parent(),
			width: "100%",
			minimumResultsForSearch: -1,
		};

	if (placeholder) selectOpt.placeholder = placeholder;

	$el.select2(selectOpt);
}

export { initSelect };
