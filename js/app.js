const photoUpload = document.querySelector("#photoUpload");
const uploaderUI = document.querySelector("#uploaderUI");
const photos = document.querySelector("#photos");
const createSlideShow = document.querySelector("#createSlideShow");
const output = document.querySelector("#output");

// click => input file
uploaderUI.addEventListener("click", () => {
  photoUpload.click();
});

// create carousel function
const createCarousel = (photoList) => {
  const id = "carousel" + Date.now();
  const carousel = document.createElement("div");
  carousel.id = id
  carousel.className = "carousel slide";

  let slides = "";
  let indicators = "";
  photoList.forEach((photo, index) => {
    slides += `
      <div class="carousel-item ${index === 0 && "active"}">
        <img src="${photo}" class=" d-block w-100" alt="...">
      </div>
    `;
    indicators += `
      <button type="button" ${index === 0 && 'class="active"'} data-bs-target="#${id}" data-bs-slide-to="${index}" aria-label="Slide ${
      index + 1
    }"></button>
    `;
  });

  carousel.innerHTML = `
  <div class="carousel-indicators">
    ${indicators}
  </div>
  <div class="carousel-inner">
    ${slides}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  `;
  output.append(carousel)
};

// upload photos
photoUpload.addEventListener("change", (event) => {
  console.log([...event.target.files]);

  [...event.target.files].forEach((file) => {
    const img = new Image(100, 100);

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      // console.log(event.target);
      img.src = event.target.result;
      img.classList.add("photo");
      photos.append(img);
    });
    reader.readAsDataURL(file);
  });
});

// create carousel
createSlideShow.addEventListener("click", () => {
  const allPhotos = [...document.querySelectorAll(".photo")];
  createCarousel(allPhotos.map((el) => el.src));
});
