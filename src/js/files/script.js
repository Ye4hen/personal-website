document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector(".about__image");
  const wrapper = image.parentElement;
  const loader = wrapper.querySelector(".image-loader");

  // Function to handle image load
  function handleImageLoad() {
    image.classList.add("loaded");
    wrapper.classList.add("image-loaded");
    if (loader) {
      loader.style.display = "none";
    }
  }

  // Check if image is already loaded (e.g., cached)
  if (image.complete && image.naturalWidth !== 0) {
    handleImageLoad();
  } else {
    // Add load event listener for dynamic loading
    image.addEventListener("load", handleImageLoad);

    // Handle error case (e.g., broken image path)
    image.addEventListener("error", function () {
      console.error("Image failed to load");
      if (loader) {
        loader.style.display = "none"; // Hide loader on error
      }
    });
  }
});