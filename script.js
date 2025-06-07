
const carousalMain = document.querySelector('.carousel_main');
const cardSectionMain = document.querySelector('.card_section_main')
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
const tabsBlack = document.querySelectorAll('.tabs_black .tabs');
const mobileFilter = document.querySelector('.mobile_main')



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
let weekData = []
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
      filterThisWeek(category);

   });
});
weekFetch()
//week fetch end

//mobile fetch start 


async function fetchMobile() {
  try {
    const res = await fetch('./mobile.json');
    const data = await res.json();
    renderMobileData(data.mobile);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// function renderMobileData(products) {
//   mobileFilter.innerHTML = '';

//   products.forEach((mbl) => {
//     const mblscrn = document.createElement('div');
//     mblscrn.classList.add('filter_content_main');

//     mblscrn.innerHTML = ` 
//                 <div class="prd_header">
//                     <h2>Mobile</h2>
//                     <div class="prd_scroll">
//                         <ul class="tabs_prd">
//                             <li class="tabs">
//                                 <p>Galaxy S25 Ultra</p>
//                             </li>
//                             <li class="tabs">
//                                 <p>Galaxy S25 | S25+</p>
//                             </li>
//                             <li class="tabs">
//                                 <p>Galaxy S25 Seeries</p>
//                             </li>
//                             <li class="tabs">
//                                 <p>Galexy Tab S10 Series</p>
//                             </li>
//                             <li class="tabs">
//                                 <p>Galaxy Watch Ultra</p>
//                             </li>

//                         </ul>
//                     </div>

//                 </div>

//                 <div class="filter_content_main">
//                     <div class="filter_content">
//                         <h2>Galexy S25 Ultra</h2>
//                         <p>Starting ₹ 117999* <br>Incl. ₹ 11000 Instant bank discount or ₹ 12000 exchange bonus </p>
//                     </div>


//                 </div>

//                 <div class="filter_content_button">
//                     <button>
//                         Buy now
//                     </button>
//                 </div>
//                 <div class="prd_img">
//                     <img class="img_cover_mob"
//                         src="https://images.samsung.com/is/image/samsung/assets/in/home/250217/new_HOME_P3_MX-KV_720x1280_mo-revised.jpg?$720_1280_JPG$"
//                         alt="">
//                     <img class="img_cover_tab"
//                         src="https://images.samsung.com/is/image/samsung/assets/in/home/250124/S24UltraPMimage.png?$1440_810_PNG$"
//                         alt="">
//                 </div>
//     `;

//     mobileFilter.appendChild(mblscrn);
//   });
// }

// fetchMobile();

