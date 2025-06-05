const carousalMain = document.querySelector('.carousel_main');
let currentSlide = 0;
let slideElements = [];

let fetchMainCarousal = async () => {
  try {
    let res = await fetch('./mainCarousal.json');
    let data = await res.json();
    renderMainCarousel(data);
  } catch (error) {
    console.error("Failed to load carousel data:", error);
  }
};

let renderMainCarousel = (slides) => {
  carousalMain.innerHTML = '';
  slideElements = [];

  slides.forEach((slideInfo, index) => {
    const slide = document.createElement('div');
    slide.classList.add('carousel_slide');
    if (index === 0) slide.classList.add('active');

    slide.innerHTML = `
      <picture>
        <source srcset="${slideInfo.img3}" media="(min-width:1440px)">
        <source srcset="${slideInfo.img2}" media="(min-width:768px)">
        <img src="${slideInfo.img1}" alt="Slide Image" style="width:100%;">
      </picture>
      <div class="carousel_content">
        <h2>${slideInfo.title}</h2>
        <p>${slideInfo.description}</p>
        <button class="button">Buy now</button>
      </div>
    `;

    carousalMain.appendChild(slide);
    slideElements.push(slide);
  });

  startAutoSlide();
};

let startAutoSlide = () => {
  setInterval(() => { 
    slideElements[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideElements.length;
    slideElements[currentSlide].classList.add('active');
  }, 5000); 
};

fetchMainCarousal(); 
