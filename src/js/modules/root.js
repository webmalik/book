import settings from '../../../gulp/config/settings.json';
import { copy } from "../modules/functions.js"

export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function project() {
	const header = document.querySelector('.webmalik__header')
	const navContainer = document.querySelector('.webmalik__nav')


	if (header) {
		header.textContent = "Проект: " + settings.projectName
		settings.menuItems.forEach(element => {
			const menuItem = document.createElement('a')
			menuItem.href = element.url
			menuItem.textContent = element.label
			menuItem.target = '_blank'
			navContainer.appendChild(menuItem)
		});

		copy()
	}
}