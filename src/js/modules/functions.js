import $ from "jquery";

export function burgerMenu() {
	const burger = document.querySelector('.header__burger');
	const box = document.querySelector('.header__box');
	const body = document.body;

	burger.addEventListener('click', () => {
		burger.classList.toggle('open');
		box.classList.toggle('active');
		body.classList.toggle('lock');
	});

}

export function accordion(mode = true) {
	const accordionTriggers = document.querySelectorAll('.accordion-trigger');

	if (accordionTriggers) {
		// Додати обробник подій для кожного заголовку
		accordionTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				if (mode) {
					// Закрити всі аккордеони, крім того, який був клікнутий
					accordionTriggers.forEach(otherTrigger => {
						if (otherTrigger !== trigger) {
							otherTrigger.classList.remove('active');
							const otherContent = otherTrigger.nextElementSibling;
							let parentContainer = otherTrigger.parentNode.parentNode;
							otherContent.classList.remove('active');
						}
					});
				}

				trigger.classList.toggle('active');

				const content = trigger.nextElementSibling;
				const wrapper = trigger.parentNode;

				const img = wrapper.nextElementSibling;
				if (content) {
					content.classList.toggle('active');
				}
				if (img) {
					img.classList.toggle('active');
				}
			});
		});
	}
}

export function accordionMobile(mode = true) {
	const accordionTriggers = document.querySelectorAll('.accordion-trigger-mobile');
	if (window.innerWidth < 767) {
		accordionTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				if (mode) {
					// Закрити всі аккордеони, крім того, який був клікнутий
					accordionTriggers.forEach(otherTrigger => {
						if (otherTrigger !== trigger) {
							otherTrigger.classList.remove('active');
							const otherContent = otherTrigger.nextElementSibling;
							let parentContainer = otherTrigger.parentNode.parentNode;
							otherContent.classList.remove('active');
						}
					});
				}

				trigger.classList.toggle('active');

				const content = trigger.nextElementSibling;

				content.classList.toggle('active');
			});
		});
	}
}

export function tabs(container) {
	if (container) {
		document.addEventListener("DOMContentLoaded", function () {
			const tabButtons = container.querySelectorAll(".tab__button");
			const tabContents = container.querySelectorAll(".tab__content");

			tabButtons.forEach(function (button) {
				button.addEventListener("click", function (e) {
					e.preventDefault();
					const tabId = this.getAttribute("data-tab");
					showTab(tabId);
				});
			});

			function showTab(tabId) {
				tabContents.forEach(function (content) {
					if (content.getAttribute("data-tab") === tabId) {
						content.style.opacity = 0;
						content.style.display = "flex";
						content.classList.add('active');
						setTimeout(function () {
							content.style.opacity = 1;
						}, 50);
					} else {
						content.style.opacity = 0;
						content.style.display = "none";
						setTimeout(function () {
							content.classList.remove('active');
							content.style.opacity = 0;
						}, 50);
					}
				});
				tabButtons.forEach(function (button) {
					if (button.getAttribute("data-tab") === tabId) {
						button.classList.add("active");
					} else {
						button.classList.remove("active");
					}
				});

			}

			showTab(tabButtons[0].getAttribute("data-tab"));
		});
	}
}

export function copy() {
	const copyButtons = document.querySelectorAll('.copy__link');
	const popupMessage = document.getElementById('popupMessage');

	if (!copyButtons || !popupMessage) {
		console.error('Required elements not found.');
		return;
	}

	copyButtons.forEach((copyButton) => {
		copyButton.addEventListener('click', async (e) => {
			e.preventDefault();
			try {
				await navigator.clipboard.writeText(copyButton.textContent);
				popupMessage.textContent = 'Copied to clipboard!';
				popupMessage.style.opacity = '1';
				setTimeout(() => {
					popupMessage.style.opacity = '0';
				}, 1500);
			} catch (err) {
				popupMessage.textContent = 'Unable to copy. Please try again.';
				popupMessage.style.opacity = '1';
				setTimeout(() => {
					popupMessage.style.opacity = '0';
				}, 1500);
				console.error('Failed to copy: ', err);
			}
		});
	});
}

export function modal() {
	const open = document.querySelectorAll('.open__modal');
	const modal = document.querySelectorAll('.modal');
	let dataModal, window;

	if (modal) {
		open.forEach(function (el) {
			el.addEventListener('click', () => {
				dataModal = el.getAttribute('data-modal');

				modal.forEach(function (mod) {
					if (mod.classList.contains('active')) {
						mod.classList.remove('active');
					}
				});

				modal.forEach(function (mod) {
					if (mod.getAttribute('data-modal') === dataModal) {
						window = mod;
						setTimeout(() => {
							window.classList.remove('close__modal--animations');
							window.classList.add('active');
						}, 1200);

					}
				});
			});

			el.addEventListener('click', () => {
				let close = window.querySelector('.modal__close');
				let wrapper = window.querySelector('.modal__wrapper');
				window.classList.remove('close__modal--animations');
				window.classList.add('active');

				window.addEventListener('click', (e) => {
					if (e.target != wrapper && !wrapper.contains(e.target)) {
						window.classList.add('close__modal--animations');
						window.classList.remove('active');
					}
				});
				close.addEventListener('click', () => {
					window.classList.add('close__modal--animations');
					window.classList.remove('active');
				});

			});
		});
	}
}

export function sticky() {
	window.addEventListener('scroll', function () {
		$('header').toggleClass('sticky', window.scrollY > 0);
	});
}

export function pageNav() {
	const headerLinks = $('.header__link');

	headerLinks.each(function () {
		$(this).on('click', function (event) {
			event.preventDefault();

			const targetId = $(this).attr('href');
			const targetElement = $(`${targetId}:first`);
			const targetOffset = targetElement.offset().top - 100;
			$('html, body').animate({
				scrollTop: targetOffset
			}, 800);
		});
	});

	function activateMenuItem() {
		const scrollPosition = $(window).scrollTop();

		headerLinks.each(function () {
			const section = $(`${$(this).attr('href')}:first`);
			if (
				section.offset().top <= scrollPosition + 105 &&
				section.offset().top + section.outerHeight() > scrollPosition + 105
			) {
				headerLinks.removeClass('active');
				headerLinks.parent().removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
			}
		});
	}

	$(window).on('scroll', activateMenuItem);
}

export function inputPassword() {
	const inputs = document.querySelectorAll('.input__password')
	let index = true;
	if (inputs) {
		inputs.forEach(wrapper => {
			let svg = wrapper.querySelector('svg')
			let input = wrapper.querySelector('input')
			svg.addEventListener('click', () => {
				if (index) {
					input.type = "text"
					index = false
				} else {
					input.type = "password"
					index = true
				}
				wrapper.classList.toggle('active')
			})
		});
	}
}