
const carousalMain = document.querySelector('.carousel_main');
const cardSectionMain = document.querySelector('.card_section_main')
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
const tabsBlack = document.querySelectorAll('.tabs_black .tabs');
const mobileFilter = document.querySelector('.mobile_main')
// const footerDrops = document.querySelector('.footer_drops')
const dropItems = document.querySelectorAll('.footer_drops_items');
const dropdowns = document.querySelectorAll('.dropdown_footer');
const dropIcon = document.querySelectorAll('.dropIcon')


dropItems.forEach((item, index) => {
   item.addEventListener('click', () => {
      if (window.innerWidth > 768){

      const dropdown = dropdowns[index];
      const icon = dropIcon[index]


      const isVisible = dropdown.style.display === 'block';
      dropdown.style.display = isVisible ? 'none' : 'block'

      icon.style.transform = isVisible ? 'rotate(0deg)' : 'rotate(180deg)'
      console.log('click');
   }

   });
});

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

const fetchMobileData = async () => {
   try {
     const response = await fetch('./mobile.json');
     const data = await response.json();
     renderMobileBlock(data.mobile);
   } catch (err) {
     console.error('Error fetching mobile data:', err);
   }
 }; 
 
 const renderMobileBlock = (mobiles) => {
   const container = document.querySelector('.mobile_main');
   container.innerHTML = ''; 
 
   mobiles.forEach((item) => {
     container.innerHTML += `
     <div class="prd_header">
                    <h2>Mobile</h2>
                    <div class="prd_scroll">
                        <ul class="tabs_prd">
                            <li class="tabs">
                                <p>Galaxy S25 Ultra</p>
                            </li>
                            <li class="tabs">
                                <p>Galaxy S25 | S25+</p>
                            </li>
                            <li class="tabs">
                                <p>Galaxy S25 Seeries</p>
                            </li>
                            <li class="tabs">
                                <p>Galexy Tab S10 Series</p>
                            </li>
                            <li class="tabs">
                                <p>Galaxy Watch Ultra</p>
                            </li>

                        </ul>
                    </div>

                </div>

       <div class="filter_content_main"> 
           <div class="filter_content">
               <h2>${item.title}</h2>
               <p>${item.des1} <br>${item.des2 || ''}</p>
           </div>
       </div>
 
       <div class="filter_content_button">
           <button>Buy now</button>
       </div>
 
       <div class="prd_img">
           <img class="img_cover_mob" src="${item.img}" alt="">
           <img class="img_cover_tab" src="${item.img2}" alt="">
       </div>
     `;
   });
 };

 
 
 fetchMobileData();
 



// let renderFooterItems = (items) => {
//    const footerDrops = document.querySelector('.footer_drops'); 
//    footerDrops.innerHTML = ''; 

//    items.forEach((itm) => {
//       const footerDisplay = document.createElement('div');
//       footerDisplay.classList.add('footer_drops_inner'); 

//       const listItems = itm.items.map(item => `<li>${item}</li>`).join('');

//       footerDisplay.innerHTML = `
//          <div class="footer_drops_main">
//                         <div class="footer_drops_items">
//                             <p>${itm.title}</p>
//                             <img class="dropIcon" src="./img/dropdown.svg" alt="">
//                         </div>
//                         <ul class="dropdown_footer">
//                             <li>${listItems}</li>
                            
//                         </ul>
//          </div>
//       `;

//       footerDrops.appendChild(footerDisplay); 
//    });
// };

