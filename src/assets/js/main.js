getBrowser = (showVersion=false) => {
	const userAgent = navigator.userAgent
		, browserVersion = (userAgent, regex) => {
			return userAgent.match(regex) ? userAgent.match(regex)[2] : null;
		};
	let browser = 'unkown'
		, version = '0.0.0.0';

	// Detect browser name
	browser = /ucbrowser/i.test(userAgent) ? 'UCBrowser' : browser;
	browser = /edg/i.test(userAgent) ? 'Edge' : browser;
	browser = /googlebot/i.test(userAgent) ? 'GoogleBot' : browser;
	browser = /chromium/i.test(userAgent) ? 'Chromium' : browser;
	browser = /firefox|fxios/i.test(userAgent) && !/seamonkey/i.test(userAgent) ? 'Firefox' : browser;
	browser =	/; msie|trident/i.test(userAgent) && !/ucbrowser/i.test(userAgent) ? 'IE' : browser;
	browser = /chrome|crios/i.test(userAgent) && !/opr|opera|chromium|edg|ucbrowser|googlebot/i.test(userAgent) ? 'Chrome' : browser;
	browser = /safari/i.test(userAgent) && !/chromium|edg|ucbrowser|chrome|crios|opr|opera|fxios|firefox/i.test(userAgent) ? 'Safari' : browser;
	browser = /opr|opera/i.test(userAgent) ? 'Opera' : browser;

	if (showVersion) {
		// detect browser version
		switch (browser) {
			case 'UCBrowser':
				version = browserVersion(userAgent, /(ucbrowser)\/([\d\.]+)/i );
			case 'Edge':
				version = browserVersion(userAgent, /(edge|edga|edgios|edg)\/([\d\.]+)/i );
			case 'GoogleBot':
				version = browserVersion(userAgent, /(googlebot)\/([\d\.]+)/i );
			case 'Chromium':
				version = browserVersion(userAgent, /(chromium)\/([\d\.]+)/i );
			case 'Firefox':
				version = browserVersion(userAgent, /(firefox|fxios)\/([\d\.]+)/i );
			case 'Chrome':
				version = browserVersion(userAgent, /(chrome|crios)\/([\d\.]+)/i );
			case 'Safari':
				version = browserVersion(userAgent, /(safari)\/([\d\.]+)/i );
			case 'Opera':
				version = browserVersion(userAgent, /(opera|opr)\/([\d\.]+)/i );
			case 'IE':
				const versionB = browserVersion(userAgent, /(trident)\/([\d\.]+)/i);
				// IE version is mapped using trident version
				// IE/8.0 = Trident/4.0, IE/9.0 = Trident/5.0
				version = versionB ? parseFloat(versionB) + 4.0 : 7.0;
		}
	}

	return browser + (showVersion ? '/' + version : '');
};

window.siteOpt = {
	breakpoints: {
		'xlll': 1750,
		'xll': 1400,
		'xxl': 1280,
		'xl': 1200,
		'lg': 992,
		'mdd': 900,
		'md': 768,
		'sm': 576,
		'xxs': 500,
		'xss': 400,
		'xs': 320
	},
	isMobile: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substring(0,4)),
	browser: getBrowser()
}

// gsap.registerPlugin(ScrollTrigger);

$(function () {
	svg4everybody();

	// ----------------------------------------- custom sliders
	// https://swiperjs.com/swiper-api
	/*
		data-slider             - id слайдера
		data-items-count        - количество видемых слайдов
		data-space-between      - растояние между слайдами
		data-paginate           - включить пагинацию? (элемент должен находится внутри data-slider, data-paginate="id слайдера")
		data-space-breakpoints  - настройки для адаптации (data-space-breakpoints="80-spaceBetween:20;1200-spaceBetween:60,slidesPerView:2")
		data-slider-direction   - напровленеи слайдера
		data-thumbs             - взаимодействи слайдеров (data-thumbs="id второго слайдера")
		...
	*/
	function customSliders(callback=false) {
		const sliders = document.querySelectorAll('.js_custom_slider');
		if (!sliders.length) return false;
		if (!window.siteOpt) window.siteOpt = {};

		window.siteOpt.swipers = {};

		function initSlider(s) {
			const $slider = $(s),
				sliderId = s.dataset.slider,
				sliderSettings = {
					loop: $slider.data('loop') || false,
					slidesPerGroup: $slider.data('items-group') ? +$slider.data('items-group') : 1,
					slidesPerView: $slider.data('items-count') ? $slider.data('items-count').toString().includes(`'`) ? $slider.data('items-count').replaceAll(`'`, '') : +$slider.data('items-count') : 1,
					spaceBetween: $slider.data('space-between') || 0,
					watchSlidesProgress: true,
					allowTouchMove: $slider.data('allow-touch') == false ? false : true,
					centeredSlides: $slider.data('centered-slides') || false,
					centeredSlidesBounds: $slider.data('slides-bounds') || false,
					speed: $slider.data('speed') || 300,
					navigation: {
						nextEl: `[data-slider-next=${sliderId}]`,
						prevEl: `[data-slider-prev=${sliderId}]`,
					}
				};

			if ($slider.data('data-mousewheel') !== undefined) sliderSettings.mousewheel = true;

			if ($slider.data('effect')) {
				sliderSettings.effect = $slider.data('effect');
				
				if ($slider.data('effect') == 'fade') sliderSettings.fadeEffect = {
					crossFade: true
				}
			}

			if ($slider.data('auto')) {
				sliderSettings.autoplay = {
					delay: $slider.data('auto'),
				}
			}

			if ($(`[data-paginate=${sliderId}]`).length) {
				var sliderPagination = {
					el: `[data-paginate=${sliderId}]`,
					clickable: true
				}

				$slider.addClass('paginate');
				sliderSettings.pagination = sliderPagination;
			}

			if ($slider.data('slider-direction') !== undefined) sliderSettings.direction = $slider.data('slider-direction');

			if ($slider.data('column') !== undefined) sliderSettings.slidesPerColumn = $slider.data('column');

			if ($slider.data('space-breakpoints') !== undefined) {
				const sliderbreakbreak = {}
					, sliderRes = $slider.data('space-breakpoints').split(';');

				$.each(sliderRes, function (i, a) {
					var sliderResI = a.split('-'),
						sliderWidth = parseInt(sliderResI[0]),
						sliderResOpts = sliderResI[1].split(','),
						sliderbreakSet = {};

					sliderResOpts.forEach(opt => {
						const [key, val] = opt.split(':'),
							value = val.includes(`'`)
								? val.replaceAll(`'`, '')
								: val.includes(`true`)
									? true
									: val.includes(`false`)
										? false
										: +val;

						sliderbreakSet[key] = value;
					});

					sliderbreakbreak[sliderWidth] = sliderbreakSet;
				});

				sliderSettings.breakpoints = sliderbreakbreak;
			}	

			const thisSwiper = new Swiper(s, sliderSettings);

			window.siteOpt.swipers[sliderId] = thisSwiper;

			if (callback) callback(sliderId, thisSwiper);
			return thisSwiper;
		};

		setTimeout(_ => {
			sliders.forEach(slider => {
				if (window.siteOpt.swipers[slider.dataset.slider]) return;
				
				if (slider.dataset.thumbs) {
					const secondSliderEl = document.querySelector(`[data-slider="${ slider.dataset.thumbs }"]`)
						, secondSlider = initSlider(secondSliderEl)
						, firstSlider = initSlider(slider);

					firstSlider.params.thumbs.swiper = secondSlider;
					firstSlider.thumbs.init();
				} else {
					initSlider(slider);
				}

			});
		}, 100)
	}; customSliders();

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

	// ----------------------------------------- contacts map
	function getDimensions(src, callback) {
		const img = document.createElement('img');

		img.src = src;
		img.onload = () => {
			callback({
				height: img.height,
				width: img.width
			});
		};
	};

	function contactsMap() {
		const mapEl = document.querySelector('.js_map');

		if (mapEl && (typeof ymaps !== 'undefined')) {
			ymaps.ready().done(function (ym) {
				let placemark;
				const contactsMap = new ym.Map(mapEl, {
						center: mapEl.dataset.cords.split(',') || ['55.751574', '37.573856'],
						autoFitToViewport: 'always',
						zoom: mapEl.dataset.zoom || 16,
						controls: ['zoomControl']
					}, {
						zoomControlSize: 'small'
					})
					, positions = contactsMap.getGlobalPixelCenter()
					, iconOpt = {
						iconLayout: 'default#image'
					}
					, adresBlock = document.createElement('div');

				function setC() {
					let right = 0;

					if (window.innerWidth < window.siteOpt.breakpoints['lg']) right = 240;
					if (window.innerWidth < window.siteOpt.breakpoints['md']) right = 150;

					const offsetPos = contactsMap.options.get('projection').fromGlobalPixels([positions[0] + right, positions[1] + 50], contactsMap.getZoom());

					contactsMap.setCenter(offsetPos);
				}

				function addIcon(opt) {
					placemark = new ymaps.Placemark(contactsMap.getCenter(), {
						hintContent: mapEl.dataset.content || 'Метка'
					}, opt);

					contactsMap.geoObjects.add(placemark);

					setC();
				};
				
				window.addEventListener('resize', () => {
					setC();
				}, true);

				if (mapEl.dataset.icon) {
					const src = mapEl.dataset.icon;
					getDimensions(src, size => {
						iconOpt.iconImageHref = src;
						iconOpt.iconImageSize = [size.width, size.height];
						iconOpt.iconImageOffset = [-size.width / 2, -size.height];

						addIcon(iconOpt);
					});
				} else addIcon(iconOpt);
			
				adresBlock.innerHTML = mapEl.dataset.adres;
				adresBlock.classList.add('map__adres');
				contactsMap.behaviors.disable('scrollZoom');

				setTimeout(() => {
					placemark.getOverlaySync().getLayoutSync().getElement().append(adresBlock)
				}, 300)
			});
		}
	}; contactsMap();

	// ----------------------------------------- custom selects
	function initSelects($el) {
		const placeholder = $el.data('placeholder') || false
		selectOpt = {
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
			const files = parsleyInstance.$element[0].files;
			
			return files.length != 1 || files[0].size <= maxSize * 1024;
		},
		requirementType: 'integer',
		messages: {
			ru: 'Этот файл не должен быть больше, чем 5 mb.',
		}
	});

	Parsley.addValidator('fileFormats', {
		validateString: function (_value, formats, parsleyInstance) {
			if (!window.FormData) {
				alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
				return true;
			}
			const fileFormat = _value.split('.').pop().toLowerCase();

			return formats.toLowerCase().includes(fileFormat);
		},
		requirementType: 'string',
		messages: {
			ru: 'Не подходящий фрмат файла.',
		}
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
		messages: {
			ru: 'Должны быть только буквы.',
		}
	});

	// ----------------------------------------- phone mask
	function phoneMask() {
		$(".js-phone-mask").inputmask({
			showMaskOnHover: false,
			mask: "+7 (999) 999-99-99"
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
			, activeHtml = input.dataset.activeHtml || '<span>Готово!</span> Перезагрузить файл'
			, div = document.createElement('div')
			, img = document.createElement('img')
			, itemsWrap = div.cloneNode();

		itemsWrap.classList.add('input-file__list');
		dropArea.parentNode.appendChild(itemsWrap);

		function preventDefaults (e) {
			e.preventDefault()
			e.stopPropagation()
		}

		['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
			dropArea.addEventListener(eventName, preventDefaults, false)   
			document.body.addEventListener(eventName, preventDefaults, false)
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
				input.files =  e.dataTransfer.files
			} else {
				const trasfer = new DataTransfer;
				trasfer.items.add(e.dataTransfer.files.item(0));
				input.files = trasfer.files;
			}
			
			setActive();
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