import $ from 'jquery';
import parsley from 'parsleyjs';

export function initFormsValidator() {
	$('form').parsley({
		errorsContainer: function (parsleyField) {
			var fieldSet = parsleyField.$element.parent();

			if (fieldSet.length > 0) return fieldSet;
			return parsleyField;
		},
	});

	const Parsley = window.Parsley;
	Parsley.addMessages('ru', {
		defaultMessage: 'Некорректное значение.',
		type: {
			email: 'Неверный адрес электронной почты.',
			url: 'Введите URL адрес.',
			number: 'Введите число.',
			integer: 'Введите целое число.',
			digits: 'Введите только цифры.',
			alphanum: 'Введите буквенно-цифровое значение.',
		},
		notblank: 'Это поле должно быть заполнено.',
		required: 'Обязательное поле.',
		pattern: 'Это значение некорректно.',
		min: 'Это значение должно быть не менее чем %s.',
		max: 'Это значение должно быть не более чем %s.',
		range: 'Это значение должно быть от %s до %s.',
		minlength: 'Это значение должно содержать не менее %s символов.',
		maxlength: 'Это значение должно содержать не более %s символов.',
		length: 'Это значение должно содержать от %s до %s символов.',
		mincheck: 'Выберите не менее %s значений.',
		maxcheck: 'Выберите не более %s значений.',
		check: 'Выберите от %s до %s значений.',
		equalto: 'Это значение должно совпадать.',
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

			return files.length != 1 || filesSize <= +maxSize * 1048576;
		},
		requirementType: 'integer',
		messages: { ru: `Превышен размер вложенных файлов. Максимум %s mb.` },
	});

	Parsley.addValidator('fileFormats', {
		validateString: function (_value, formats, parsleyInstance) {
			if (!window.FormData) {
				alert('Вы заставляете всех разработчиков в мире съеживаться. Обновите свой браузер!');
				return true;
			}
			const formatsNames = [...parsleyInstance.$element[0].files].map((file) => file.name.split('.').pop());

			return formatsNames.map((format) => formats.toLowerCase().includes(format)).every((access) => !!access);
		},
		requirementType: 'string',
		messages: { ru: 'Не подходящий фрмат файла.' },
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
		messages: { ru: 'Должны быть только буквы.' },
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
	// 			, message = label ? `Поле '${ label.innerText.replace('*', '').trim() }' обязательно для заполнения` : Parsley._validatorRegistry.catalog.ru.required;

	// 		return value.length === 0 ? $.Deferred().reject(message) : true;
	// 	},
	// 	messages: { ru: 'Это поле обязательно для заполнения' }
	// });
}
