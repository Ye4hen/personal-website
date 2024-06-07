// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

// const blog = document.querySelector('.blog');
const portfolioItems = document.querySelector('.portfolio__items');
let data;
let startItem = 0;
let endItem = 4;

if (portfolioItems) {
	loadPortfolioItems();
}

async function loadPortfolioItems() {
	const response = await fetch("files/dataPortfolio.json", {
		method: "GET"
	});
	if (response.ok) {
		const responseResult = await response.json();
		data = responseResult;
		initPortfolio(data, startItem, endItem);
	} else {
		alert("Error!!!")
	}
}

function initPortfolio(data, startItem, endItem) {
	const dataPart = data.items.slice(startItem, endItem);
	console.log(dataPart);

	dataPart.forEach(item => {
		buildPortfolioItem(item)
	});
	viewMore();
}

function buildPortfolioItem(item) {
	let portfolioItemTemplate = ``;

	portfolioItemTemplate += `<article data-id="${item.id}" class="portfolio__item item-portfolio">`;
	portfolioItemTemplate += `<div class="item-portfolio__info">`;
	portfolioItemTemplate += `<h3 class="item-portfolio__name">${item.name}</h3>`;
	if (item.tags) {
		portfolioItemTemplate += `<div class="item-portfolio__tags">`;
		for (const tag of item.tags) {
			portfolioItemTemplate += `<div class="item-portfolio__tag">${tag}</div>`;
		}
		portfolioItemTemplate += `</div>`;
	}
	portfolioItemTemplate += `<div class="item-portfolio__links">`;
	if (item.urlProject) {
		portfolioItemTemplate += `<a href="${item.urlProject}" target="_blank" class="item-portfolio__link">VIEW PROJECT</a>`;
	}
	if (item.urlCode) {
		portfolioItemTemplate += `<a href="${item.urlCode}" target="_blank" class="item-portfolio__link">VIEW CODE</a>`;
	}
	portfolioItemTemplate += `</div>`;
	portfolioItemTemplate += `</div>`;

	item.image ? portfolioItemTemplate += `
    <a href="${item.urlProject}" target="_blank" class="item-portfolio__image">
        <img src="${item.image}" alt="${item.name}">
    </a>` : null;

	portfolioItemTemplate += `</article>`;

	portfolioItems.insertAdjacentHTML('beforeend', portfolioItemTemplate);

}

document.addEventListener('click', documentActions);

function viewMore() {
	const dataItemsLength = data.items.length;
	const currentItems = document.querySelectorAll('.portfolio__item').length;

	const viewMore = document.querySelector('.portfolio__view-more');

	console.log('currentItems:', currentItems);
	console.log('endItem:', endItem);
	console.log('dataItemsLength:', dataItemsLength);

	currentItems < dataItemsLength ? viewMore.hidden = true : viewMore.hidden = false
}

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.portfolio__view-more')) {

		startItem = document.querySelectorAll('.item-portfolio').length;
		endItem = startItem + 2;


		initPortfolio(data, startItem, endItem)
		e.preventDefault();
	}
}

// ------------------------------------

