
const carousalMain = document.querySelector('.carousel_main');
const cardSectionMain = document.querySelector('.card_section_main')
const leftBtn = document.querySelector('.leftBtn');
const rightBtn = document.querySelector('.rightBtn');
const tabsBlack = document.querySelectorAll('.tabs_black .tabs');
const tabsPrd = document.querySelectorAll('.tabs_prd .tabs') 
const mobileFilter = document.querySelector('.mobile_main')
const footerDrops = document.querySelector('.footer_drops') 
const dropItems = document.querySelectorAll('.footer_drops_items');
const dropdowns = document.querySelectorAll('.dropdown_footer');
const dropIcon = document.querySelectorAll('.dropIcon')


dropItems.forEach((item, index) => {
   item.addEventListener('click', () => {
      if (window.innerWidth <= 768){

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

let mobileData = [];
let tvData = [];
let haData = [];

const fetchMobileData = async () => {
  try {
    const response = await fetch('./mobile.json');
    const data = await response.json();
    mobileData = data.mobile;
    tvData = data.tvs;
    haData = data.homeAppliances;
    recommendedData = data.recommended; 


    renderMobileTabs();
    renderTvTabs();
    renderHomeApplianceTabs();
    renderRemmended(recommendedData); 

    filterMobile('galaxyS25Ultra');
    filterTv('monitor'); 
    filterHomeAppliance('BespokeAIWindFree™'); 

  } catch (err) {
    console.error('Error fetching data:', err);
  } 
};

// --- Mobile Section ---
const renderMobileTabs = () => {
  const container = document.querySelector('.mobile_main');
  container.innerHTML = `
    <div class="prd_header">
      <h2>Mobile</h2>
      <div class="prd_scroll">
        <ul class="tabs_prd">
          <li class="tabs" data-category="galaxyS25Ultra"><p>Galaxy S25 Ultra</p></li>
          <li class="tabs" data-category="galaxyS25Plus"><p>Galaxy S25 | S25+</p></li>
          <li class="tabs" data-category="galaxyS25Series"><p>Galaxy S25 Series</p></li>
          <li class="tabs" data-category="galaxyTab"><p>Galaxy Tab S10 Series</p></li>
          <li class="tabs" data-category="galaxyWatch"><p>Galaxy Watch Ultra</p></li>
        </ul>
      </div>
    </div>
    <div class="mobile_content"></div>
  `;

  const tabs = container.querySelectorAll('.tabs');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.style.borderBottom = '');
      tab.style.borderBottom = '2px solid black';
      filterMobile(tab.dataset.category);
    });
  });
}; 

const filterMobile = (category) => {
  const filtered = mobileData.filter(item => item.category === category);
  renderMobileBlock(filtered);
};
 
const renderMobileBlock = (mobiles) => {
  const container = document.querySelector('.mobile_content');
  container.innerHTML = '';

  mobiles.forEach((item) => {
    container.innerHTML += `
      <div class="filter_content_main">
        <div class="filter_content">
          <h2>${item.title}</h2>
          <p>${item.des1}<br>${item.des2 || ''}</p>
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

// --- TV Section ---
const renderTvTabs = () => {
  const container = document.querySelector('.tv_main');
  container.innerHTML += `
  <div class="prd_header">
   <h2>TV & AV</h2>
    <div class="prd_scroll">
      <ul class="tabs_prd">
        <li class="tabs" data-category="2025tvs"><p>2025 TVs</p></li>
        <li class="tabs" data-category="oled"><p>OLED</p></li>
        <li class="tabs" data-category="monitor"><p>Monitor</p></li>
        <li class="tabs" data-category="theframe"><p>The Frame</p></li>
        <li class="tabs" data-category="crystal4kuhd"><p>Crystal 4K UHD</p></li>
      </ul>
    </div>
    </div>
    <div class="tv_content"></div>
  `;

  const tabs = container.querySelectorAll('.tabs');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.style.borderBottom = '');
      tab.style.borderBottom = '2px solid black';
      filterTv(tab.dataset.category); 
    });
  });
};

const filterTv = (category) => {
  const filtered = tvData.filter(item => item.category === category);
  renderTvBlock(filtered);
};

const renderTvBlock = (tvItems) => {
  const container = document.querySelector('.tv_content');
  container.innerHTML = '';

  tvItems.forEach((item) => {
    container.innerHTML += `
      <div class="filter_content_main">
        <div class="filter_content">
          <h2>${item.title}</h2>
          <p>${item.des1}<br>${item.des2 || ''}</p>
        </div>
      </div>
      <div class="filter_content_button">
        <button>Buy now</button>
      </div>
      <div class="prd_img">
        <img class="img_tv_mob" src="${item.img}" alt="">
        <img class="img_tv_tab" src="${item.img2}" alt="">
      </div>
    `;
  });
};

//--- Home Appliences--
const renderHomeApplianceTabs = () => {
   const container = document.querySelector('.home_main');
   container.innerHTML += `
     <div class="prd_header">
       <h2>Home Appliances</h2>
       <div class="prd_scroll">
         <ul class="tabs_prd">
           <li class="tabs" data-category="BespokeAIWindFree™"><p>Bespoke AI WindFree™</p></li>
           <li class="tabs" data-category="BespokeAIDoubleDoor"><p>Bespoke AI Double Door</p></li>
           <li class="tabs" data-category="BespokeAIFrenchDoor"><p>Bespoke AI French Door</p></li>
           <li class="tabs" data-category="BespokeAITopLoadWasher"><p>Bespoke AI Top Load Washer</p></li>
           <li class="tabs" data-category="BespokeAIFrontLoad"><p>Bespoke AI Front Load</p></li>
         </ul>
       </div>
     </div>
     <div class="home_content"></div>
   `;
 
   const tabs = container.querySelectorAll('.tabs');
   tabs.forEach(tab => {
     tab.addEventListener('click', () => {
       tabs.forEach(t => t.style.borderBottom = '');
       tab.style.borderBottom = '2px solid black';
       filterHomeAppliance(tab.dataset.category);
     });
   });
 };
 
 const filterHomeAppliance = (category) => {
   const filtered = haData.filter(item => item.category === category);
   renderHomeApplianceBlock(filtered);
 };
 
 const renderHomeApplianceBlock = (items) => {
   const container = document.querySelector('.home_content');
   container.innerHTML = '';
 
   items.forEach((item) => {
     container.innerHTML += `
       <div class="filter_content_main">
         <div class="filter_content">
           <h2>${item.title}</h2>
           <p>${item.des1}<br>${item.des2 || ''}</p>
         </div>
       </div>
       <div class="filter_content_button">
         <button>Buy now</button>
       </div>
       <div class="prd_img">
         <img class="img_home_mob" src="${item.img}" alt="">
         <img class="img_home_tab" src="${item.img2}" alt="">
       </div>
     `;
   });
 };
 
 const renderRemmended = (cards) => {
   const container = document.querySelector('.recommended_cards_main');
   container.innerHTML = '';

   cards.forEach((card) => {
       container.innerHTML += `
           <div class="recommended_cards">
               <div class="recommended_cards_img">
                   <img class="recomended_img_mob" src="${card.img1}" alt="">
                   <img class="recomended_img_tab" src="${card.img2}" alt="">
               </div>
               <div class="recommended_cards_content">
                   <p>${card.name}</p>
               </div>
               <div class="recommended_features">
                   <div class="recommended_color">
                       <p class="clr">
                           Colour : <span> ${card.color}</span>
                        </p>
                        <div class="clr_inp">
                            <input type="radio">
                        </div>
                        <div class="kg_button">
                            <button>
                                8.0kg
                            </button>
                        </div>
                        <div class="price_secction">
                            <div class="tax_details">
                                <span>MRP (Inclusive of all taxes) </span>
                                <div>
                                    <del>${card.mrp1} </del>
                                    <span>${card.mrp2}</span>
                                </div>
                            </div>
                            <div class="price">
                                <span>${card.price}</span>
                            </div>
                            <div class="emi_cal">
                                <a href="#">EMI Calculater</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="recommended_cards_button">
                    <button>Buy now</button>
                </div>
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

