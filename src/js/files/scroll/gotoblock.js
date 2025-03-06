// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile, menuClose, getHash, FLS } from "../functions.js";
// Підключення доповнення для збільшення можливостей
// Документація: https://github.com/cferdinandi/smooth-scroll
// import SmoothScroll from 'smooth-scroll';
//==============================================================================================================================================================================================================================================================================================================================

// Модуль плавної проктутки до блоку
export let gotoBlock = (targetBlock, noHeader = false, speed = 500, offsetTop = 0) => {
	const targetBlockElement = document.querySelector(targetBlock);
	if (targetBlockElement) {
		let headerItem = '';
		let headerItemHeight = 0;
		if (noHeader) {
			headerItem = 'header.header';
			const headerElement = document.querySelector(headerItem);
			if (!headerElement.classList.contains('_header-scroll')) {
				headerElement.style.cssText = `transition-duration: 0s;`;
				headerElement.classList.add('_header-scroll');
				headerItemHeight = headerElement.offsetHeight;
				headerElement.classList.remove('_header-scroll');
				setTimeout(() => {
					headerElement.style.cssText = ``;
				}, 0);
			} else {
				headerItemHeight = headerElement.offsetHeight;
			}
		}
		let options = {
			speedAsDuration: true,
			speed: speed,
			header: headerItem,
			offset: offsetTop,
			easing: 'easeOutQuad',
		};
		// Закриваємо меню, якщо воно відкрите
		document.documentElement.classList.contains("menu-open") ? menuClose() : null;

		// CHANGED: Always scroll to the top of the section
    const sectionElement = targetBlockElement.closest('[data-fp-section]') || targetBlockElement;
    let targetPosition = sectionElement.getBoundingClientRect().top + window.scrollY;

		if (typeof SmoothScroll !== 'undefined') {
			// Прокручування з використанням доповнення
			// CHANGED: Use sectionElement instead of targetBlockElement
      new SmoothScroll().animateScroll(sectionElement, '', options);
		} else {
			// Прокручування стандартними засобами
			// CHANGED: Calculate position based on sectionElement
      let targetBlockElementPosition = targetPosition; // Use the section's top position
			targetBlockElementPosition = headerItemHeight ? targetBlockElementPosition - headerItemHeight : targetBlockElementPosition;
			targetBlockElementPosition = offsetTop ? targetBlockElementPosition - offsetTop : targetBlockElementPosition;
			window.scrollTo({
				top: targetBlockElementPosition,
				behavior: "smooth"
			});
		}
		FLS(`[gotoBlock]: Юхуу...їдемо до ${targetBlock}`);
	} else {
		FLS(`[gotoBlock]: Йой... Такого блоку немає на сторінці: ${targetBlock}`);
	}
};