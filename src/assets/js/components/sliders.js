import $ from 'jquery';
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs, Autoplay } from 'swiper/modules';

// ----------------------------------------- custom sliders
// https://swiperjs.com/swiper-api
/*
	data-slider             - id слайдера
	data-items-count        - количество видемых слайдов
	data-space-between      - растояние между слайдами
	data-paginate           - включить пагинацию? (data-paginate='id слайдера')
	data-space-breakpoints  - настройки для адаптации (data-space-breakpoints='80-spaceBetween:20;1200-spaceBetween:60,slidesPerView:2')
	data-slider-direction   - напровленеи слайдера
	data-thumbs             - взаимодействи слайдеров (data-thumbs='id второго слайдера')
	...
*/

export default function customSliders(callback = false) {
	const sliders = document.querySelectorAll('.js_custom_slider');
	if (!sliders.length) return false;
	if (!window.siteOpt) window.siteOpt = {};

	window.siteOpt.swipers = {};

	function initSlider(sliderEl) {
		const $slider = $(sliderEl),
			sliderId = sliderEl.dataset.slider

		if (window.siteOpt.swipers[sliderId]) return;

		const sliderSettings = {
				modules: [Navigation],
				loop: $slider.data('loop') || false,
				slidesPerGroup: $slider.data('items-group')
					? +$slider.data('items-group')
					: 1,
				slidesPerView: $slider.data('items-count')
					? $slider.data('items-count').toString().includes(`'`)
						? $slider.data('items-count').replaceAll(`'`, '')
						: +$slider.data('items-count')
					: 1,
				spaceBetween: $slider.data('space-between') || 0,
				watchSlidesProgress: true,
				allowTouchMove: $slider.data('allow-touch') == false ? false : true,
				centeredSlides: $slider.data('centered-slides') || false,
				centeredSlidesBounds: $slider.data('slides-bounds') || false,
				speed: $slider.data('speed') || 300,
				mousewheel: {
					forceToAxis: true,
				},
				navigation: {
					nextEl: `[data-slider-next=${sliderId}]`,
					prevEl: `[data-slider-prev=${sliderId}]`,
				},
				initialSlide: $slider.data('first-slide') || 0
			};

		if ($slider.data('data-mousewheel') !== undefined)
			sliderSettings.mousewheel = true;

		if ($slider.data('effect')) {
			sliderSettings.effect = $slider.data('effect');

			if ($slider.data('effect') == 'fade')
				sliderSettings.fadeEffect = {
					crossFade: true,
				};
		}

		if ($slider.data('auto')) {
			sliderSettings.modules.push(Autoplay);

			sliderSettings.autoplay = {
				delay: $slider.data('auto'),
			};
		}

		if ($(`[data-paginate=${sliderId}]`).length) {
			var sliderPagination = {
				el: `[data-paginate=${sliderId}]`,
				clickable: true,
			};

			$slider.addClass('paginate');
			sliderSettings.modules.push(Pagination);
			sliderSettings.pagination = sliderPagination;
		}

		if ($slider.data('slider-direction') !== undefined)
			sliderSettings.direction = $slider.data('slider-direction');

		if ($slider.data('column') !== undefined)
			sliderSettings.slidesPerColumn = $slider.data('column');

		if ($slider.data('space-breakpoints') !== undefined) {
			const sliderbreakbreak = {},
				sliderRes = $slider.data('space-breakpoints').split(';');

			$.each(sliderRes, function (i, a) {
				var sliderResI = a.split('-'),
					sliderWidth = parseInt(sliderResI[0]),
					sliderResOpts = sliderResI[1].split(','),
					sliderbreakSet = {};

				sliderResOpts.forEach((opt) => {
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

		if ($slider.data('thumbs')) {
			const thumbSliderEl = document.querySelector(`[data-slider='${$slider.data('thumbs')}']`)

			thumbSliderEl.checkVisibility() && (
				sliderSettings.modules.push(Thumbs),

				sliderSettings.thumbs = {
					swiper: initSlider(thumbSliderEl)
				}
			)
		}

		const thisSwiper = new Swiper(sliderEl, sliderSettings);

		!window.siteOpt.swipers[sliderId] && (window.siteOpt.swipers[sliderId] = thisSwiper);

		if (callback) callback(sliderId, thisSwiper);
		return thisSwiper;
	}

	setTimeout(() => {
		sliders.forEach((slider) => initSlider(slider) );
	}, 100);
}
