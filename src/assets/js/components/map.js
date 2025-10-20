
export default function() {
		const mapEl = document.querySelector('.js_map');

		if (!mapEl) return;
		mapEl.classList.add('grey');

		window.map = null;
		mapInit();

		const div = document.createElement('div')
			, adresBlock = div.cloneNode()
			, adresBlockTitle = div.cloneNode();

		let hasAutoRotate = true
			, frame = 0;

		async function mapInit() {
			await ymaps3.ready;
			const {YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapMarker, YMapListener} = ymaps3;

			map = new YMap(mapEl, {
					location: {
						center: mapEl.dataset.cords?.split(',') || [37.573856, 55.751574],
						zoom: mapEl.dataset.zoom || 16,
					},
					showScaleInCopyrights: true,
					// camera: {tilt: (40 * Math.PI) / 180},
					camera: {tilt: .5}
				},
				[ new YMapDefaultFeaturesLayer({}) ]
			);

			fetch('./../customization.json').then(response => response.json()).then(data => {
				map.addChild(new YMapDefaultSchemeLayer({ customization: data }));
				setTimeout(() => mapEl.classList.remove('grey'), 1500);
			});

			mapEl.dataset.icon && (() => {
				const markerElement = document.createElement('img');
				markerElement.className = 'map__marker';
				markerElement.src = mapEl.dataset.icon;

				map.addChild(new YMapMarker({
					coordinates: mapEl.dataset.cords?.split(',') || [37.573856, 55.751574]
				}, markerElement));
			})();

			adresBlock.textContent = mapEl.dataset.content;
			adresBlock.classList.add('map__adres');
			adresBlock.addEventListener('click', e => {
				map.update({
					location: {
						center: mapEl.dataset.cords?.split(',') || [37.573856, 55.751574],
						zoom: mapEl.dataset.zoom || 16,
						duration: 700
					},
				});
			});
			adresBlockTitle.textContent = 'Адрес';
			adresBlockTitle.classList = 'map__adres_title';
			adresBlock.prepend(adresBlockTitle);
			mapEl.append(adresBlock);

			map.addChild(new YMapListener({
				layer: 'any',
				onActionStart: () => {
					hasAutoRotate = false;
				}
			}));

			function startAutoRotationCamera() {
				if (hasAutoRotate) {
					map.update({camera: {azimuth: map.azimuth + (2 * Math.PI) / 180 / 120}});

					frame = requestAnimationFrame(startAutoRotationCamera);
				} else {
					cancelAnimationFrame(frame);
				}
			}
			startAutoRotationCamera();
		}
	}
