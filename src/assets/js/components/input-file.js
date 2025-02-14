export function inputFile(wrap = document) {
	const dropArea = wrap.querySelector('label.js_file_input');
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

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
		dropArea.addEventListener(eventName, preventDefaults, false);
		document.body.addEventListener(eventName, preventDefaults, false);
	});

	['dragenter', 'dragover'].forEach((eventName) => {
		dropArea.addEventListener(eventName, () => dropArea.classList.add(hoverClass), false);
	});

	['dragleave', 'drop'].forEach((eventName) => {
		dropArea.addEventListener(eventName, () => dropArea.classList.remove(hoverClass),	false);
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
			input.files = e.dataTransfer.files;
		} else {
			const trasfer = new DataTransfer();
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

		[...input.files].forEach((file) => {
			const item = div.cloneNode()
				, remove = div.cloneNode();

			item.classList.add('input-file__item');
			remove.classList.add('input-file__remove');

			item.textContent = file.name;
			item.appendChild(remove);
			itemsWrap.appendChild(item);

			remove.addEventListener('click', (e) => {
				e.preventDefault();

				item.remove();

				const trasfer = new DataTransfer();

				[...input.files].forEach((f) => {
					if (file.name !== f.name) trasfer.items.add(f);
				});

				input.files = trasfer.files;

				input.dispatchEvent(inputEvt);
				input.dispatchEvent(changeEvt);

				checkInput();
			});

			previewFile(file, item);
		});
	}

	function previewFile(file, wrapEl = itemsWrap) {
		let reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = function () {
			let imgC = img.cloneNode();
			imgC.src = reader.result;
			wrapEl.appendChild && wrapEl.appendChild(imgC);
		};
	}
}
