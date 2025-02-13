import $ from "jquery";
import svg4everybody from "svg4everybody";

import options from "./components/options";
import headerMobileMenu from "./components/header-mobile-menu";
import customSliders from "./components/sliders";
import acceptCookie from "./components/cookie-accept";
import { openPopup, openLocalPopup } from "./components/popups";
import { initSelect } from "./components/custom-select";
import { initFormsValidator } from "./components/validation-forms";
import { phoneMask } from "./components/phone-mask";
import { inputFile } from "./components/input-file";
import { ajaxForm } from "./components/ajax-form";
import { checkInputs } from "./components/check-inputs";

options();

// gsap.registerPlugin(ScrollTrigger);

$(function () {
	headerMobileMenu();
	svg4everybody();
	customSliders();
	openPopup();
	openLocalPopup();

	$(document).on("afterLoad.fb", function (event, fancybox, current) {
		const wrap = current.$content[0];
		openPopup(wrap);
		openLocalPopup(wrap);

		current.$slide.addClass("popup--" + wrap.id + "__wrap");

		if (!wrap.querySelector("form")) return;

		wrap.querySelectorAll("select").forEach(function () {
			initSelects($(this));
		});

		$(wrap)
			.find("form")
			.parsley({
				errorsContainer: function (parsleyField) {
					const $fieldSet = parsleyField.$element.parent();

					if ($fieldSet.length > 0) return $fieldSet;
					return parsleyField;
				},
			});

		phoneMask();
		checkInputs(wrap);
		inputFile(wrap);
		ajaxForm(wrap);
	});

	$("select").each(function () {
		initSelect($(this));
	});

	initFormsValidator();
	phoneMask();
	inputFile();
	ajaxForm();
	checkInputs();
	acceptCookie();
});
