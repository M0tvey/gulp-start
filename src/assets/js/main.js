import $ from 'jquery';
import svg4everybody from 'svg4everybody';

import options from './components/options';
import headerMobileMenu from './components/header-mobile-menu';
import customSliders from './components/sliders';
import acceptCookie from './components/cookie-accept';
import { initOpenPopup, initOpenUrlPopup } from './components/popups';
import { initSelect } from './components/custom-select';
import { initFormsValidator } from './components/validation-forms';
import inputsMask from './components/inputs-mask';
import { inputFile } from './components/input-file';
import { ajaxForm } from './components/ajax-form';
import { checkInputs } from './components/check-inputs';
import map from './components/map';

options();

$(function () {
	headerMobileMenu();
	svg4everybody();
	customSliders();
	initOpenPopup();
	initOpenUrlPopup();
	map();

	document.querySelectorAll('select').forEach(select => initSelect(select));

	initFormsValidator();
	inputsMask();
	inputFile();
	ajaxForm();
	checkInputs();
	acceptCookie();
});
