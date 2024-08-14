import $ from 'jquery';
import svg4everybody from 'svg4everybody';
import select2 from 'select2';
import parsley from 'parsleyjs';
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

import options from './components/options';
import customSliders from './components/sliders';


options();
// gsap.registerPlugin(ScrollTrigger);

$(function () {
	svg4everybody();
  customSliders();
  
	// ---------------- mobile menu ----------------
	(_ => {
		const header = document.querySelector('.js_header'),
			headerMenu = header?.querySelector('.js_header_menu');
		if (!header && !headerMenu) return;

		const div = document.createElement('div'),
			mobileMenuWrap = header.querySelector('.mobile_menu__wrap') || div.cloneNode(),
			mobileMenuBttn = header.querySelector('.mobile_menu__bttn') || div.cloneNode(),
			mobileMenuzBlind = div.cloneNode(),
			openMenuClass = 'menu_open',
			mobileEl1 = header.querySelector('.js_mobile_el_1'),
			mobileEl2 = header.querySelector('.js_mobile_el_2'),
			subMenuActiveClass = 'submenu-active',
			activeClass = 'is-active',
			moveHeaderElement = () => {
				if (window.innerWidth < window.siteOpt.breakpoints['lg']) {
					header.classList.add('mobile_menu');
					if (mobileEl1) mobileMenuWrap.append(mobileEl1);
				} else {
					header.classList.remove('mobile_menu');
					if (mobileEl1) mobileEl2.before(mobileEl1);
				}

				if (window.innerWidth < window.siteOpt.breakpoints['sm']) {
					if (mobileEl2) mobileMenuWrap.append(mobileEl2);
				} else {
					if (mobileEl2) mobileMenuWrap.before(mobileEl2);
				}
			},
			closeMenu = () => {
				document.body.style.overflow = 'inherit';
				$(mobileMenuzBlind).fadeOut(500);
				header.classList.remove(openMenuClass);
				header.querySelector('.' + subMenuActiveClass)?.classList.remove(subMenuActiveClass);
			};

		mobileMenuzBlind.classList.add('mobile_menu__blind');
		header.append(mobileMenuzBlind);
		mobileMenuzBlind.addEventListener('click', e => {
			e.preventDefault();
			closeMenu();
		});

		for (let i = 0; i < 3; i++) { mobileMenuBttn.append(div.cloneNode()) };
		if (!mobileMenuBttn.classList.contains('mobile_menu__bttn')) {
			mobileMenuBttn.classList.add('mobile_menu__bttn');
			header.append(mobileMenuBttn);
		}

		window.addEventListener('resize', () => {
			moveHeaderElement();
		}, true);

		mobileMenuBttn?.addEventListener('click', e => {
			e.preventDefault();

			header.classList.toggle(openMenuClass);

			if (header.classList.contains(openMenuClass)) {
				document.body.style.overflow = 'hidden';
				$(mobileMenuzBlind).fadeIn(500);
			} else {
				closeMenu();
			}
		});

		mobileMenuWrap.classList.add('mobile_menu__wrap');
		if (!header.querySelector('.mobile_menu__wrap')) header.append(mobileMenuWrap);

		moveHeaderElement();

		headerMenu.querySelectorAll('li ul').forEach(function (subMenu) {
			const linckNext = div.cloneNode(),
				linckBack = document.createElement('li'),
				wrapSubMenu = subMenu.parentNode;

			linckNext.classList.add('mobile_menu_next-link');
			linckBack.classList.add('mobile_menu_back-link');

			linckBack.textContent = wrapSubMenu.querySelector('a').innerText;

			linckNext.addEventListener('click', function (e) {
				e.preventDefault();

				headerMenu.classList.add(subMenuActiveClass);
				wrapSubMenu.classList.add(activeClass);
				headerMenu.style.overflowY = 'hidden';
			});

			linckBack.addEventListener('click', function (e) {
				e.preventDefault();

				headerMenu.classList.remove(subMenuActiveClass);
				wrapSubMenu.classList.remove(activeClass);
				headerMenu.style.overflowY = 'auto';
			});

			wrapSubMenu.querySelector('a').append(linckNext);
			subMenu.append(linckBack);
		});
	})();

	// ----------------------------------------- popup
	function openPopup(wrap=document) {
		wrap.querySelectorAll('.js_open_popup').forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();

				if (!link.href) return;

				$.fancybox.open({
					hideScrollbar: false,
					src: link.href,
					type: 'ajax',
				});
			})
		});
	}

	function openLocalPopup(wrap=document) {
		wrap.querySelectorAll('.js_open_local_popup').forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();

				if (!link.hash) return;

				$.fancybox.open({
					hideScrollbar: false,
					src: link.hash,
					type: 'inline',
				});
			})
		});
	}
	
	$(document).on('afterLoad.fb', function (event, fancybox, current) {
		const wrap = current.$content[0];
		openPopup(wrap);
		openLocalPopup(wrap);

		current.$slide.addClass('popup--' + wrap.id + '__wrap');

		if (!wrap.querySelector('form')) return;

		wrap.querySelectorAll('select').forEach(function () {
			initSelects($(this));
		});

		$(wrap).find('form').parsley({
			errorsContainer: function (parsleyField) {
				const $fieldSet = parsleyField.$element.parent();
	
				if ($fieldSet.length > 0) return $fieldSet;
				return parsleyField;
			}
		});

		phoneMask();
		checkInputs();
		inputFile(wrap);
		textareaHeight();
		ajaxForm(wrap);
	});

	openPopup();
	openLocalPopup();

	// ----------------------------------------- custom selects
	function initSelects($el) {
		const placeholder = $el.data('placeholder') || false
		, selectOpt = {
        language: 'ru',
        dropdownParent: $el.parent(),
        width: '100%',
        minimumResultsForSearch: -1,
      };

		if (placeholder) selectOpt.placeholder = placeholder;

		$el.select2(selectOpt);
	};

	$('select').each(function () {
		initSelects($(this));
	});

	// ----------------------------------------- parsley
	$('form').parsley({
		errorsContainer: function (parsleyField) {
			var fieldSet = parsleyField.$element.parent();

			if (fieldSet.length > 0) return fieldSet;
			return parsleyField;
		}
	});

	const Parsley = window.Parsley;
	Parsley.addMessages('ru', {
		defaultMessage: "Некорректное значение.",
		type: {
			email: "Неверный адрес электронной почты.",
			url: "Введите URL адрес.",
			number: "Введите число.",
			integer: "Введите целое число.",
			digits: "Введите только цифры.",
			alphanum: "Введите буквенно-цифровое значение."
		},
		notblank: "Это поле должно быть заполнено.",
		required: "Обязательное поле.",
		pattern: "Это значение некорректно.",
		min: "Это значение должно быть не менее чем %s.",
		max: "Это значение должно быть не более чем %s.",
		range: "Это значение должно быть от %s до %s.",
		minlength: "Это значение должно содержать не менее %s символов.",
		maxlength: "Это значение должно содержать не более %s символов.",
		length: "Это значение должно содержать от %s до %s символов.",
		mincheck: "Выберите не менее %s значений.",
		maxcheck: "Выберите не более %s значений.",
		check: "Выберите от %s до %s значений.",
		equalto: "Это значение должно совпадать."
	});

	Parsley.setLocale('ru');

	Parsley.on('field:error', function () {
		this.$element[0].parentNode.classList.add('error-wrap');
	}).on('field:success', function () {
		this.$element[0].parentNode.classList.remove('error-wrap');
	});

	Parsley.addValidator('maxFileSize', {
		validateString: function (_value, maxSize, parsleyInstance) {
			if (!window.FormData) {
				alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
				return true;
			}
			const files = parsleyInstance.$element[0].files
				, filesSize = [...files].reduce((courent, file) => courent + file.size, 0);

			return files.length != 1 || filesSize <= (+maxSize * 1048576);
		},
		requirementType: 'integer',
		messages: { ru: `Превышен размер вложенных файлов. Максимум %s mb.` }
	});

	Parsley.addValidator('fileFormats', {
		validateString: function (_value, formats, parsleyInstance) {
			if (!window.FormData) {
				alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
				return true;
			}
			const formatsNames = [...parsleyInstance.$element[0].files].map(file => file.name.split('.').pop());

			return formatsNames.map(format => formats.toLowerCase().includes(format)).every(access => !!access);
		},
		requirementType: 'string',
		messages: { ru: 'Не подходящий фрмат файла.' }
	});

	Parsley.addValidator('wordsOnly', {
		validateString: function (_value, data, parsleyInstance) {
			if (!window.FormData) {
				alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
				return true;
			}

			return /^[a-zA-Zа-яА-ЯЯёЁ ]+$/.test(_value);
		},
		requirementType: 'string',
		messages: { ru: 'Должны быть только буквы.' }
	});

	// разкоментируй на свой страх и риск )))
	//                 ⭣
	// Parsley.addValidator('required', {
	// 	validateMultiple: function (value, dataset, parsleyInstance) {
	// 		if (!window.FormData) {
	// 			alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
	// 			return true;
	// 		}

	// 		return value.length == 0 ? $.Deferred().reject('Это поле обязательно') : true;
	// 	},
	// 	validateString: function (value, dataset, parsleyInstance) {
	// 		if (!window.FormData) {
	// 			alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
	// 			return true;
	// 		}

	// 		const label = parsleyInstance.element.parentNode.querySelector('label')
	// 			, message = label ? `Поле "${ label.innerText.replace('*', '').trim() }" обязательно для заполнения` : Parsley._validatorRegistry.catalog.ru.required;

	// 		return value.length === 0 ? $.Deferred().reject(message) : true;
	// 	},
	// 	messages: { ru: 'Это поле обязательно для заполнения' }
	// });

	// ----------------------------------------- phone mask
	function phoneMask() {
    document.querySelectorAll('.js-phone-mask').forEach(phoneEl => {
      Inputmask({
        showMaskOnHover: false,
        mask: "+7 (999) 999-99-99"
      }).mask(phoneEl);
    });

	};phoneMask();

	// ----------------------------------------- textarea
	function textareaHeight() {
		$('textarea').on('keydown change dragend paste', function (e) {
			let ghost = $(this).parent().find('.ghost'),
				text = e.type === 'paste' ? this.value + (e.originalEvent || e).clipboardData.getData('text/plain') : $(this).val();

			ghost.text(text);

			let ghostHeight = ghost.innerHeight();
			$(this).css('min-height', ghostHeight < 80 ? 80 : ghostHeight);
		});
	};textareaHeight();

	// ----------------------------------------- input file
	function inputFile(wrap=document) {
		const dropArea = wrap.querySelector('label.js-file-input');
		if (!dropArea) return;
		const input = dropArea.control
			, hoverClass = 'is-hover'
			, activeClass = 'is-active'
			, areaHtml = dropArea.innerHTML
			, activeHtml = input.dataset.activeHtml || '<span>Готово!</span> Перезагрузить файл(ы)'
			, div = document.createElement('div')
			, img = document.createElement('img')
			, itemsWrap = div.cloneNode()
			, inputEvt = new Event('input')
			, changeEvt = new Event('change');

		itemsWrap.classList.add('input-file__list');
		dropArea.parentNode.appendChild(itemsWrap);

		function preventDefaults (e) {
			e.preventDefault()
			e.stopPropagation()
		}

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, preventDefaults, false);
			document.body.addEventListener(eventName, preventDefaults, false);
		});
		
		['dragenter', 'dragover'].forEach(eventName => {
			dropArea.addEventListener(eventName, () => {
				dropArea.classList.add(hoverClass)
			}, false)
		});

		['dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, () => {
				dropArea.classList.remove(hoverClass)
			}, false)
		});

		function setActive() {
			dropArea.classList.add(activeClass);
			dropArea.innerHTML = activeHtml;
		}

		function checkInput() {
			if (input.files.length) {
				setActive();
			} else {
				dropArea.classList.remove(activeClass);
				dropArea.innerHTML = areaHtml;
			}
		}

		dropArea.addEventListener('drop', (e) => {
			if (input.multiple) {
				input.files = e.dataTransfer.files
			} else {
				const trasfer = new DataTransfer;
				trasfer.items.add(e.dataTransfer.files.item(0));
				input.files = trasfer.files;
			}
			
			input.dispatchEvent(inputEvt);
			input.dispatchEvent(changeEvt);

			checkInput();
			handleFiles();
		}, false);

		input.addEventListener('change', () => {
			checkInput();
			handleFiles();
		}, false);

		function handleFiles() {
			itemsWrap.innerHTML = '';

			[...input.files].forEach(file => {
				const item = div.cloneNode()
					, remove = div.cloneNode();

				item.classList.add('input-file__item');
				remove.classList.add('input-file__remove');

				item.textContent = file.name;
				item.appendChild(remove);
				itemsWrap.appendChild(item);

				remove.addEventListener('click', e => {
					e.preventDefault();

					item.remove();

					const trasfer = new DataTransfer;

					[...input.files].forEach(f => {
						if (file.name !== f.name) trasfer.items.add(f);
					});

					input.files = trasfer.files;
			
					input.dispatchEvent(inputEvt);
					input.dispatchEvent(changeEvt);

					checkInput();
				});

				// previewFile(sile);
			})
		}

		function previewFile(file) {
			let reader = new FileReader()
			reader.readAsDataURL(file);

			reader.onloadend = function() {
				let imgC = img.cloneNode();
				imgC.src = reader.result;
				itemsWrap.appendChild(imgC);
			}
		}
	};inputFile();

	// ----------------------------------------- ajax form
	function ajaxForm(wrap=document) {
		wrap.querySelectorAll('.js-form-ajax').forEach(function(form){
			form.addEventListener('submit', function (e) {
				e.preventDefault();
				$form = $(e.target);
				if ($form.find("input").hasClass("error")) return;

				const $submitBtn = $form.find('.js-form-ajax-btn'),
					defaultTextBtn = $submitBtn.html(),
					$errorContainer = $form.find('.js-form-ajax-error'),
					fd = new FormData(form),
					activeClass = 'is-active',
					isJson = form.action.includes('.json') || form.action.includes('.php');
					
				function openPopup(url) {
					$.fancybox.open({
						src: url,
						type: 'ajax'
					});

					setTimeout(function () {
						$.fancybox.close(true);
					}, 3000);
				}

				$.ajax({
					url: $form.attr("action"),
					type: "POST",
					data: fd,
					dataType: isJson ? 'json' : 'html',
					processData: false,
					contentType: false,
					beforeSend: function () {
						$errorContainer.html();
						$submitBtn
							.html('Идет отправка...')
							.prop('disabled', true);
					},
					success: function (data) {
						
						$submitBtn
							.prop('disabled', false)
							.html(defaultTextBtn);

						if (isJson) {
							if (data.status === 1) {
								openPopup(data.popup);

								$form.find('.' + activeClass).removeClass(activeClass);
								$form[0].reset();
								$form.find('select').val(null).trigger('change');
								$errorContainer.html('');
							} else {
								$errorContainer.html('<div>' + data.error + '</div>');
							}
						} else {
							const wrap = document.createElement('div');
							wrap.innerHTML = data;

							if (wrap.querySelector('[data-is-send]')?.value === 'Y') {
								openPopup(wrap.querySelector('[data-post-url]').dataset.postUrl);
							}
						}
					},
					error: function (xhr, status, errorString) {
						
						$errorContainer.html('<div>' + errorString + '</div>');
						$submitBtn
							.prop('disabled', false)
							.html(defaultTextBtn);
					}
				});
			});
		});
	}; ajaxForm();

	function checkVal(el) {
		if (el.value === '') {
			el.classList.remove('is-active');
		} else {
			el.classList.add('is-active');
		}
	}

	function checkInputs() {
		$('input:not([type="checkbox"]):not([type="radio"]), textarea').on('keydown change dragend paste', function () {
			checkVal(this);
		});
	
		$('input:not([type="checkbox"]):not([type="radio"]), textarea').each(function () {
			checkVal(this);
		});
	}; checkInputs();


	// ----------------------------------------- ancors link
	(_ => {
		const menuClick = localStorage.getItem('menu_click'),
			scrollToF = to => {
				let top = $(to).offset().top;
				const $header = $('.header');
				// top = innerWidth <= window.siteOpt.breakpoints['sm'] ? top - 60 : top
				top = $header.css('position') === 'fixed' ? top - ($header.innerHeight() + 10) : top;

				$('html, body').stop().animate({ scrollTop: top }, 500, 'swing');
			};

		$('a[href*="#"]:not([href="#"]):not([class*=js])').on("click", function (e) {
			e.preventDefault();

			const blockId = this.hash,
				href = this.href.replace(this.hash, '');

			if (window.location.href === href) {
				if ($(blockId).length) scrollToF(blockId);
				localStorage.setItem('menu_click', '');

				$(document.querySelector('.mobile_menu__blind')).fadeOut(500);
				document.querySelector('.js_header').classList.remove('menu_open');
				document.querySelector('.js_header').querySelector('.submenu-active')?.classList.remove('submenu-active');
			} else {
				localStorage.setItem('menu_click', blockId);
				window.location.href = href;
			}

			return false;
		});

		if (menuClick != '' && menuClick != null && !!menuClick) {
			setTimeout(() => {
				if ($(menuClick).length) scrollToF(menuClick);
				localStorage.setItem('menu_click', '');
			}, 300);
		}
	})();

	// ----------------------------------------- active menu on scroll
	function menuScroll() {
		const slideMenuLinks = document.querySelectorAll('.js_menu a[href*="#"]'),
			activeClass = 'is-active',
			blocksCords = [...slideMenuLinks].map(function (el) {
				const block = $(el.hash);

				if (block.length) {
					return {
						'block': block,
						'block_top': block.offset().top,
						'block_bottom': block.offset().top + block.innerHeight()
					};
				}
			}),
			activeMenuLink = () => {
				let arr = [];
				$.each(blocksCords, function (i, cords) {
					if (cords) {
						let activeLine = $(window).scrollTop() + window.innerHeight / 2,
							isInBlock = activeLine > cords.block_top && activeLine < cords.block_bottom;

						arr[i] = isInBlock;

						if (arr.every(el => el === false)) slideMenuLinks.forEach(el => el.classList.remove(activeClass));
						if (isInBlock) {
							slideMenuLinks.forEach(el => {
								el.classList.remove(activeClass);
								if (el.hash === '#' + cords.block[0].id) el.classList.add(activeClass);
							});
						}
					}
				});
			};

		if (blocksCords.lenght) activeMenuLink();

		window.addEventListener('scroll', function () {
			activeMenuLink();
		});
	}; menuScroll();

	// ----------------------------------------- tabs
	function tabs() {
		const activeClass = 'is-active',
			targetSelector = '[data-tab-target]';
		if (!$(targetSelector).length) return false;

		$(targetSelector).each(function () {
			console.log(this)
			if ($(this).parent().data('mob') && innerWidth <= breakpoints[$(this).parent().data('mob')]) {
				const $target = $(`[data-tab=${this.dataset.tabTarget}]`);

				if ($(this).hasClass(activeClass)) $(this).removeClass(activeClass);
				if ($target.hasClass(activeClass)) $target.removeClass(activeClass);
				$target.insertAfter($(this));
			}
		});

		$(targetSelector).filter(':last-of-type').after('<li class="tabs__line"></li>');
		$(targetSelector).filter('.' + activeClass).each(function () {
			$(this).siblings('.tabs__line').css({
				'left': $(this).position().left,
				'width': $(this).innerWidth()
			});
		});

		$(document).on('click', targetSelector, function (e) {
			e.preventDefault();

			let $tabLink = $(this),
				tabsLine = $tabLink.siblings('.tabs__line');

			const isMob = ($tabLink.parent().data('mob') && innerWidth <= breakpoints[$tabLink.parent().data('mob')]);

			if (isMob) {
				if ($tabLink.hasClass(activeClass)) {
					$tabLink.removeClass(activeClass)
					$tabLink.siblings('[data-tab]:visible').slideUp()
				} else {
					$tabLink.addClass(activeClass).siblings('li').removeClass(activeClass);
					$tabLink.siblings(`[data-tab]:not([data-tab=${this.dataset.tabTarget}])`).slideUp()
					$(`[data-tab=${this.dataset.tabTarget}]`).slideDown();
				}

			} else {
				if ($tabLink.hasClass(activeClass)) return false;

				tabsLine.animate({
					'left': $tabLink.position().left,
					'width': $tabLink.innerWidth()
				}, 200);

				if ($tabLink.parents('.js-toggle-group').length !== 0) {
					$tabLink.parents('.js-toggle-group').find(targetSelector).removeClass(activeClass);
					$tabLink.addClass(activeClass);
				} else {
					$tabLink.addClass(activeClass).siblings().removeClass(activeClass);
				}

				var htmlActive = $tabLink.html();
				$tabLink.closest('.tabs-wrap').find('.js-tabs-name-mob').html(htmlActive);

				var targetTab = $tabLink.data('tab-target'),
					tab = $(document).find('[data-tab="' + targetTab + '"]'),
					tabGroup = tab.data('tab-group');

				$(document).find(`.${activeClass}[data-tab-group="${tabGroup}"]`).addClass('is-proccess');

				setTimeout(function () {
					$(document).find('[data-tab-group="' + tabGroup + '"]').removeClass(activeClass).removeClass('is-proccess');
					tab.show(0, function () {
						$(this).addClass(activeClass);
					});
				}, 300);
			}
		});
	} tabs();
});