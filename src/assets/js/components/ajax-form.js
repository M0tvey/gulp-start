import $ from "jquery";

export function ajaxForm(wrap = document) {
	wrap.querySelectorAll(".js_form_ajax").forEach(function (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			$form = $(e.target);
			if ($form.find("input").hasClass("error")) return;

			const $submitBtn = $form.find(".js_form_ajax_btn"),
				defaultTextBtn = $submitBtn.html(),
				$errorContainer = $form.find(".js_form_ajax_error"),
				fd = new FormData(form),
				activeClass = "is-active",
				isJson = form.action.includes(".json") || form.action.includes(".php");

			function openPopup(url) {
				$.fancybox.open({
					src: url,
					type: "ajax",
				});

				setTimeout(function () {
					$.fancybox.close(true);
				}, 3000);
			}

			$.ajax({
				url: $form.attr("action"),
				type: "POST",
				data: fd,
				dataType: isJson ? "json" : "html",
				processData: false,
				contentType: false,
				beforeSend: function () {
					$errorContainer.html();
					$submitBtn.html("Идет отправка...").prop("disabled", true);
				},
				success: function (data) {
					$submitBtn.prop("disabled", false).html(defaultTextBtn);

					if (isJson) {
						if (data.status === 1) {
							openPopup(data.popup);

							$form.find("." + activeClass).removeClass(activeClass);
							$form[0].reset();
							$form.find("select").val(null).trigger("change");
							$errorContainer.html("");
						} else {
							$errorContainer.html("<div>" + data.error + "</div>");
						}
					} else {
						const wrap = document.createElement("div");
						wrap.innerHTML = data;

						if (wrap.querySelector("[data-is-send]")?.value === "Y") {
							openPopup(wrap.querySelector("[data-post-url]").dataset.postUrl);
						}
					}
				},
				error: function (xhr, status, errorString) {
					$errorContainer.html("<div>" + errorString + "</div>");
					$submitBtn.prop("disabled", false).html(defaultTextBtn);
				},
			});
		});
	});
}
