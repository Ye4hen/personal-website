document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector(".about__image");
  const wrapper = image.closest(".about__image-wrapper");
  const loader = wrapper ? wrapper.querySelector(".image-loader") : null;

  // Function to handle image load
  function handleImageLoad() {
    image.classList.add("loaded");
    if (wrapper) wrapper.classList.add("image-loaded");
    if (loader) loader.style.display = "none";
  }

  function handleImageError() {
    console.error("Image failed to load:", image.src);
    if (loader) loader.style.display = "none";
    if (wrapper) wrapper.classList.add("image-loaded");
  }

  // Check if image is already loaded (e.g., cached)
  if (image.complete && image.naturalWidth != 0) {
    handleImageLoad();
  } else {
    image.addEventListener("load", handleImageLoad, { once: true });
    image.addEventListener("error", handleImageError, { once: true });
  }
});
