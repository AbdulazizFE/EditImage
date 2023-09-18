let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let brightness = document.getElementById("brightness");
let sepia = document.getElementById("sepia");
let grayscale = document.getElementById("grayscale");
let blur = document.getElementById("blur");
let hue_rotate = document.getElementById("hue-rotate");

let upload = document.getElementById("upload");
let download = document.getElementById("download");
let img = document.getElementById("img");

let reset = document.querySelector("span");
let imgBox = document.querySelector(".img-box");

// Detect touch support
let isTouchDevice = 'ontouchstart' in window || navigator.msMaxTouchPoints;


const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// Hide elements on page load
window.onload = function () {
  download.style.display = "none";
  reset.style.display = "none";
  imgBox.style.display = "none";
};

// Reset filter values
function resetValue() {
  saturate.value = "100";
  contrast.value = "100";
  brightness.value = "100";
  sepia.value = "0";
  grayscale.value = "0";
  blur.value = "0";
  hue_rotate.value = "0";
  applyFilters(); // Apply default filters immediately
}

// Upload image
upload.onchange = function () {
  resetValue();
  download.style.display = "block";
  reset.style.display = "block";
  imgBox.style.display = "block";
  let file = new FileReader();
  file.readAsDataURL(upload.files[0]);
  file.onload = function () {
    img.src = file.result;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      applyFilters(); // Apply filters when a new image is loaded
    };
  };
};

// Apply filters
function applyFilters() {
  context.filter = `
    saturate(${saturate.value}%)
    contrast(${contrast.value}%)
    brightness(${brightness.value}%)
    sepia(${sepia.value}%)
    grayscale(${grayscale.value})
    blur(${blur.value}px)
    hue-rotate(${hue_rotate.value}deg)
  `;
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

// Add input event listeners for filter adjustments
let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
  filter.addEventListener("input", applyFilters);
});

// Download function
download.onclick = function () {
  download.href = canvas.toDataURL();
};


// Function to handle input events (used for both mouse and touch events)
function handleInput() {
  applyFilters();
}

// Add event listeners for both input and touch events
if (isTouchDevice) {
  filters.forEach((filter) => {
    filter.addEventListener("touchmove", handleInput);
  });
} else {
  filters.forEach((filter) => {
    filter.addEventListener("input", handleInput);
  });
}
// Add input event listeners for filter adjustments (both mouse and touch events)
filters.forEach((filter) => {
  filter.addEventListener("input", applyFilters);
  filter.addEventListener("touchmove", applyFilters);
});
