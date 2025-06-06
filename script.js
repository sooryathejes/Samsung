
const carousalMain = document.querySelector('.carousel_main');
const cardSectionMain = document.querySelector('.card_section_main')
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
const tabsBlack = document.querySelectorAll('.tabs_black .tabs');



// ---main-carousal-fetch---
let currentSlide = 0;
let slideElements = [];
let autoSlideInterval;
let fetchMainCarousal = async () => {
   try {
      let res = await fetch('./mainCarousal.json');
      let data = await res.json();
      renderMainCarousel(data);
   } catch (error) {
      console.error("Failed to load carousel data:", error);
   }
};

// --Main-carousal-innerHTML--
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
            <button class="button" data-index="${index}">Buy now</button>
         </div>
        
      `;

      carousalMain.appendChild(slide);
      slideElements.push(slide);
   });

   const buyButtons = carousalMain.querySelectorAll('.button');
   buyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
         const index = e.target.getAttribute('data-index');
         const slide = slides[index];
         console.log(`Buy now clicked for: ${slide.title}`);
      });
   });

   startAutoSlide();
};

let showSlide = (index) => {
   slideElements[currentSlide].classList.remove('active');
   currentSlide = (index + slideElements.length) % slideElements.length;
   slideElements[currentSlide].classList.add('active');
};

let startAutoSlide = () => {
   autoSlideInterval = setInterval(() => {
      showSlide(currentSlide + 1);
   }, 5000);
};

if (leftBtn && rightBtn) {
   leftBtn.addEventListener('click', () => {
     clearInterval(autoSlideInterval);
     showSlide(currentSlide - 1);
     
   });
 
   rightBtn.addEventListener('click', () => {
     clearInterval(autoSlideInterval);
     showSlide(currentSlide + 1);
   });
 } else {
   console.warn("Left or right button not found in DOM.");
 }
 
fetchMainCarousal();
// --main-carousal-innerHTML-end--

//This week fetch start
let weekData  = []
let weekFetch = async () => {
   try {
      let rel = await fetch('./thisWeeks.json');
      let data = await rel.json();
      weekData = data
      tabsBlack[0].click();
   } catch (error) {
      console.log(error); 
   }
};

let renderThisWeek = (cards) => {
   cardSectionMain.innerHTML = ''; 
 
   cards.forEach((prodctInfo) => {
      const card = document.createElement('div');
      card.classList.add('card_section');

      card.innerHTML = `
         <div class="main_card">
            <picture>
               <source srcset="${prodctInfo.resImg1}" media="(min-width:768px)">
               <img src="${prodctInfo.img1}" alt="Slide Image" style="width:100%;">
            </picture>
            <div class="main_card_content">
               <div class="main_card_content_head">
                  <h2>${prodctInfo.title1} <br> ${prodctInfo.subtitle1}</h2>
               </div>
               <p>${prodctInfo.des1}</p>
            </div>
         </div>
         <div class="sub_cards">
                    <img src="${prodctInfo.img2}" 
                        alt="">
                    <div class="sub_card_content">
                        <h2>${prodctInfo.title2} <br>${prodctInfo.subtitle2} </h2>
                    </div>
                </div>
                <div class="sub_cards">
                    <img src="${prodctInfo.img3}"
                        alt="">
                    <div class="sub_card_content">
                        <h2>${prodctInfo.title3} <br> ${prodctInfo.subtitle3}</h2>
                    </div>
                </div>
                <div class="sub_cards">
                    <img src="${prodctInfo.img4}"
                        alt="">
                    <div class="sub_card_content">
                        <h2>${prodctInfo.title4}| ${prodctInfo.subtitle4}</h2>
                    </div>
                </div>
                <div class="sub_cards">
                    <img src="${prodctInfo.img5}"
                        alt="">
                    <div class="sub_card_content">
                        <h2>${prodctInfo.title5}<br>${prodctInfo.subtitle5}</h2>
                    </div>
                </div>
         
      `; 

      cardSectionMain.appendChild(card); 
   });  
}; 


let filterThisWeek = (category) => {
   const filteredData = weekData.filter(product => product.category === category);
   renderThisWeek(filteredData);
};

tabsBlack.forEach(tab => {
   tab.addEventListener('click', () => {
      const category = tab.innerText.trim().toLowerCase().replace(/\s+/g, '');
      tabsBlack.forEach(t => t.style.borderBottom = '');
      tab.style.borderBottom = '2px solid black'
      filterThisWeek(category );
      
   });
});
weekFetch() 