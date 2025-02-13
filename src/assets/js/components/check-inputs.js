function checkVal(el) {
	if (el.value === "") {
		el.classList.remove("is-active");
	} else {
		el.classList.add("is-active");
	}
}

export function checkInputs(wrap = document) {
	wrap
		.querySelectorAll(
			'input:not([type="checkbox"]):not([type="radio"]), textarea'
		)
		.forEach((el) => {
			["keydown", "change", "dragend", "paste"].forEach((eventName) => {
				el.addEventListener(eventName, () => {
					checkVal(el);
				});
			});

			checkVal(el);
		});
}
