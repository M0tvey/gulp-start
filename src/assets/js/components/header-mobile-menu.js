import $ from 'jquery';

export default () => {
	const header = document.querySelector('.js_header'),
		headerMenu = header?.querySelector('.js_header_menu');
	if (!header || !headerMenu) return;

	const div = document.createElement('div')
		, mobileMenuWrap = header.querySelector('.mobile_menu__wrap') || div.cloneNode()
		, mobileMenubtn = header.querySelector('.mobile_menu__btn') || div.cloneNode()
		, mobileMenuzBlind = div.cloneNode()
		, openMenuClass = 'menu_open'
		, mobileEl1 = header.querySelector('.js_mobile_el_1')
		, mobileEl2 = header.querySelector('.js_mobile_el_2')
		, subMenuActiveClass = 'submenu-active'
		, activeClass = 'is-active'
		, moveHeaderElement = () => {
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
		}
		, closeMenu = () => {
			document.body.style.overflow = 'inherit';
			$(mobileMenuzBlind).fadeOut(500);
			header.classList.remove(openMenuClass);
			header.querySelector('.' + subMenuActiveClass)?.classList.remove(subMenuActiveClass);
		};

	document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');

	mobileMenuzBlind.classList.add('mobile_menu__blind');
	header.append(mobileMenuzBlind);
	mobileMenuzBlind.addEventListener('click', (e) => {
		e.preventDefault();
		closeMenu();
	});

	for (let i = 0; i < 3; i++) mobileMenubtn.append(div.cloneNode());

	if (!mobileMenubtn.classList.contains('mobile_menu__btn')) {
		mobileMenubtn.classList.add('mobile_menu__btn');
		header.append(mobileMenubtn);
	}

	window.addEventListener('resize', () => moveHeaderElement(), true);

	mobileMenubtn?.addEventListener('click', (e) => {
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
		const linckNext = div.cloneNode()
			, linckBack = document.createElement('li')
			, wrapSubMenu = subMenu.parentNode;

		linckNext.classList.add('mobile_menu__next-link');
		linckBack.classList.add('mobile_menu__back-link');

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
};
