document.addEventListener("DOMContentLoaded", function () {
	const image = document.querySelector(".about__image");

	// images.forEach((img) => {
		image.addEventListener("load", function () {
			image.classList.add("loaded");
			image.parentElement.classList.add("image-loaded");
			const loader = image.parentElement.querySelector(".image-loader");
			if (loader) {
				loader.style.display = "none"; // Hide loader
			}
		});
	// });
});
