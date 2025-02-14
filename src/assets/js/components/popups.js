import $ from 'jquery';

function openPopup(wrap = document) {
	wrap.querySelectorAll('.js_open_popup').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			if (!link.href) return;

			$.fancybox.open({
				hideScrollbar: false,
				src: link.href,
				type: 'ajax',
			});
		});
	});
}

function openLocalPopup(wrap = document) {
	wrap.querySelectorAll('.js_open_local_popup').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();

			if (!link.hash) return;

			$.fancybox.open({
				hideScrollbar: false,
				src: link.hash,
				type: 'inline',
			});
		});
	});
}

export { openPopup, openLocalPopup };
