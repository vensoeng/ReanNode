
let selectedLang = 'en'; // Default value
document.addEventListener('DOMContentLoaded', () => {
    const isLanguageSet = localStorage.getItem('language_set');
    if (!isLanguageSet) {
        setTimeout(openLangPopup, 500);
    }
});

function openLangPopup() {
    const overlay = document.getElementById('lang-overlay');
    const modal = document.getElementById('lang-modal');
    const currentLang = localStorage.getItem('user_language') || DEFAULT_LANG;
    syncLanguageSelectionUI(currentLang);
    overlay.classList.remove('pointer-events-none', 'opacity-0');
    overlay.classList.add('opacity-100');
    modal.classList.remove('translate-y-full');
    modal.classList.add('translate-y-0');
}

function syncLanguageSelectionUI(lang) {
    const targetCard = document.querySelector(`.lang-card[data-value="${lang}"]`);
    if (!targetCard) {
        return;
    }
    setTempSelection(lang, targetCard);
}

function setTempSelection(val, element) {
    selectedLang = val;
    // Reset all cards
    document.querySelectorAll('.lang-card').forEach(card => {
        card.classList.remove('border-blue-600', 'bg-blue-50');
        card.classList.add('border-gray-100');
        card.querySelector('.radio-icon').innerText = 'radio_button_unchecked';
        card.querySelector('.radio-icon').classList.replace('text-blue-600', 'text-gray-300');
    });
    // Highlight selected card
    element.classList.remove('border-gray-100');
    element.classList.add('border-blue-600', 'bg-blue-50');
    element.querySelector('.radio-icon').innerText = 'radio_button_checked';
    element.querySelector('.radio-icon').classList.replace('text-gray-300', 'text-blue-600');
}

function saveAndFinish() {
    // Save to localStorage
    localStorage.setItem('language_set', 'true');
    localStorage.setItem('user_language', selectedLang);
    // Run langeuage change after form popup close
    initLanguage();
    // Switch Views
    const selectionView = document.getElementById('selection-view');
    const successView = document.getElementById('success-view');
    selectionView.classList.add('hidden');
    successView.classList.remove('hidden');
    // Wait 1.5 seconds then close
    setTimeout(() => {
        closeLangPopup();
    }, 1500);
}

function closeLangPopup() {
    const overlay = document.getElementById('lang-overlay');
    const modal = document.getElementById('lang-modal');
    // 1. Check if the user has already saved a language
    const isLanguageSet = localStorage.getItem('language_set');
    // 2. If they haven't saved anything yet (they just clicked 'X'), set default to 'en'
    if (!isLanguageSet) {
        console.log("No selection made. Defaulting to English.");
        localStorage.setItem('language_set', 'true');
        localStorage.setItem('user_language', 'kh');
    }
    if (!localStorage.getItem('language_set')) {
        localStorage.setItem('language_set', 'true');
        localStorage.setItem('user_language', 'kh');
        window.location.reload();
    }
    // Run change language after form popup close
    initLanguage();
    // Run to change language after form popup close
    loadServices();
    modal.classList.replace('translate-y-0', 'translate-y-full');
    overlay.classList.add('opacity-0');
    // 4. Remove from DOM view after animation finishes
    setTimeout(() => {
        overlay.classList.add('hidden-popup');
        overlay.classList.remove('opacity-100');
        overlay.style.display = 'none'; // Ensure it's fully gone
    }, 500);
}

async function formartServicesLang(service, serviceLists) {
    const lang = localStorage.getItem('user_language') || DEFAULT_LANG;
    const labelsSource = {
        en: { deposit: "Deposit", warranty: "Warranty", starting: "STARTING FROM", booking: "BOOKING", avail: "Available", unavail: "Unavailable" },
        kh: { deposit: "ប្រាក់កក់", warranty: "ការធានា", starting: "តម្លៃចាប់ពី", booking: "កក់ឥឡូវនេះ", avail: "មានសេវាកម្ម", unavail: "ផ្អាកសេវាកម្ម" },
        zh: { deposit: "定金", warranty: "保修", starting: "起步价", booking: "立即预订", avail: "有空", unavail: "无空" }
    };
    // Get main service list 
    const list = serviceLists.find(item => item.list_id === service.list_id);
    return {
        list_id: service.list_id,
        list_name: service[`list_name_${lang}`] || service.list_name,
        title: service[`title_${lang}`] || service.title,
        description: service[`description_${lang}`] || service.description,
        tags: service[`tags_${lang}`] || service.tags,
        tags_active: service[`tags_active_${lang}`] || service.tags_active,
        price: service[`price_${lang}`] || service.price,
        warranty: service[`warranty_${lang}`] || service.warranty,
        deposit: service[`deposit_${lang}`] || service.deposit,
        time: service[`time_${lang}`] || service.time,
        location: service[`location_${lang}`] || service.location,
        re_change: service[`re_change_${lang}`] || service.re_change,
        status: service.status,
        labels: labelsSource[lang] || labelsSource['en'],
        img: list ? list.icon : `${DATA_URL}/public/img/favicon.png`,
        upper: service.upper || false
    };
}

// post data to dom
//  <img src="${DATA_URL}/img/${service.img}" class="" alt="" width="40">
async function renderServiceCard(service, serviceLists) {
    // fomart service after get lang from local storage
    service = await formartServicesLang(service, serviceLists);
    return `
    <div class="bg-[#ffffff] rounded-[1rem] overflow-hidden purple-accent-glow transition-all">
        <div class="flex items-center justify-between relative h-[7rem] px-6 w-full overflow-hidden">
            <div class="w-[4rem] h-[4rem] rounded-[50rem] bg-zinc-50 border border-zinc-100 flex items-center justify-center">
                <!-- <span class="material-symbols-outlined text-primary text-3xl" data-icon="architecture">architecture</span> -->
                <div class="w-[3.5rem] h-[3.5rem] rounded-[50rem] bg-white overflow-hidden flex items-center justify-center">
                    <img src="/logo192.png" class="" alt="" width="40">
                </div>
            </div>
            <div class="bg-white border backdrop-blur-md px-2 py-2 rounded-[5px] flex items-center gap-1.5 ${service.status ? '' : 'bg-black/5'}">
                <!-- <span class="w-1.5 h-1.5 rounded-full bg-green-600"></span> -->
                <span class="text-[10px] font-bold text-green-700 uppercase tracking-widest ${service.status ? '' : 'text-on-surface-variant'}">${service.status ? service.labels.avail : service.labels.unavail}</span>
            </div>
        </div>
        <div class="p-5 pt-[0rem]">
            <div class="flex justify-between items-start mb-3">
                <h3 class="text-title-sm text-on-surface line-clamp-1">${service.title}</h3>
            </div>
            <p class="text-on-surface-variant text-[14px] mb-4 line-clamp-2 hover:line-clamp-none">
               ${service.description}
            </p>
            <!-- Technical Specs -->
            <div class="flex flex-wrap gap-2 mb-4">
                ${service.tags.map(tag => `<span
                    class="px-2 py-1 bg-black/5 border border-black/5 rounded-lg text-[10px] font-medium text-on-surface">
                    ${tag}
                </span>`).join('')}
                ${service.tags_active.map(tag =>`<span
                    class="px-2 py-1 bg-purple-50 border border-purple-100 rounded-lg text-[10px] font-medium text-purple-600">
                   ${tag}
                </span>`).join('')}
            </div>
            <div class="block mb-[0.5rem]">
                <div class="flex items-start gap-2 text-on-surface-variant pt-4">
                    <span class="material-symbols-outlined text-[1.1rem] flex items-center pt-[4px]">schedule</span>
                    <span class="text-[14px] font-medium">${service.time}</span>
                </div>
                <div class="flex items-start gap-2 text-on-surface-variant pt-4">
                    <span class="material-symbols-outlined text-[1.1rem] flex items-center pt-[4px]">location_on</span>
                    <span class="text-[14px] font-medium">${service.location}</span>
                </div>
                <div class="flex items-start gap-2 text-on-surface-variant pt-4">
                    <span class="material-symbols-outlined text-[1.1rem] flex items-center pt-[4px]">local_atm</span>
                    <span class="text-[14px] font-medium">${service.labels.deposit}: ${service.deposit}</span>
                </div>
                <div class="flex items-start gap-2 text-on-surface-variant pt-4">
                    <span class="material-symbols-outlined text-[1.1rem] flex items-center pt-[4px]">fertile</span>
                    <span class="text-[14px] font-medium">${service.labels.warranty}: ${service.warranty}</span>
                </div>
                <div class="flex items-start gap-2 text-on-surface-variant pt-4 pb-6">
                    <span class="material-symbols-outlined text-[1.1rem] flex items-center pt-[4px]">crisis_alert</span>
                    <span class="text-[14px] font-medium">${service.re_change}</span>
                </div>
            </div>
            <div class="flex justify-between items-end mt-auto pt-6 border-t border-zinc-50">
                <div class="">
                    <p class="text-[11px] text-zinc-400 uppercase tracking-tighter">${service.labels.starting}</p>
                    <p class="font-title-sm text-title-sm text-[1.3rem] flex items-end">${service.price} ${service.upper ? '<span class="ml-[0.2rem] pb-[5px] text-[11px] uppercase tracking-tighter">upper</span>' : ''}</p>
                </div>
                <a ${service.status ? 'href="https://t.me/vensoeng"' : ''}" class="${service.status ? 'text-white bg-primary' : 'bg-black/5 '}  px-4 py-2 rounded-[0.6rem] cursor-pointer text-[0.8rem] active:scale-95 duration-150 transition-all">${service.labels.booking}</a>
            </div>
        </div>
    </div>
    `;
}
    
// fetch service list from json file
var serviceGrid = document.querySelector('div[data-id="service-list"]');
async function loadServices(QUERY = '') {
    try {
        const response = await fetch(`${DATA_URL}/db/json@1.2.0.json`);
        let myServices = await response.json();
        // Filter services based on QUERY
        if(QUERY && QUERY == 'photo'){
            const photoIds = [1, 2, 3];
            myServices = myServices.filter(service => photoIds.includes(service.list_id));
        }else if(QUERY && QUERY == 'video'){
            const videoIds = [5, 6];
            myServices = myServices.filter(service => videoIds.includes(service.list_id));
        }else if(QUERY && QUERY == 'design'){
            const designIds = [4];
            myServices = myServices.filter(service => designIds.includes(service.list_id));
        }else if(QUERY && QUERY == 'website'){
            const websiteIds = [7, 8];
            myServices = myServices.filter(service => websiteIds.includes(service.list_id));
        }
        //Randomly select one service to determine which list data to fetch (if needed)
        const shuffledServices = myServices.sort(() => Math.random() - 0.5);
        // Fetch list data once
        const serviceLists = await fetchListServices();
        
        // Wait for all cards to render
        const cardPromises = shuffledServices.map(service => renderServiceCard(service, serviceLists));
        const serviceCards = await Promise.all(cardPromises);
        serviceGrid.innerHTML = serviceCards.join('');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// fetch list card from json file
async function fetchListServices() {
    try {
        const response = await fetch(`${DATA_URL}/db/json_img@1.2.0.json`);
        if (!response.ok) {
            throw new Error("រកឯកសារមិនឃើញ ឬមានបញ្ហា Network");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
    
// Tab navigation logic 
const filterTabs = document.querySelector('div[data-id="filter-tabs"]');
var btnList = filterTabs.querySelectorAll('button');
btnList.forEach(btn => 
    btn.addEventListener('click', () => {
        btnList.forEach(b => b.setAttribute('class', "min-w-[max-content] px-6 py-2.5 rounded-[50rem] bg-white border border-outline-variant text-secondary font-label-md hover:bg-surface-container-low transition-all"));
        //add active class to current button
        btn.setAttribute('class', 'min-w-[max-content] px-6 py-2.5 rounded-[50rem] bg-primary text-on-primary font-label-md transition-all');
        btn.scrollIntoView({ behavior: 'smooth', inline: 'center' });
        // load data with filter
        const validTypes = ['all','photo', 'video', 'design', 'website']; 
        if(!validTypes.includes(btn.getAttribute('data-value'))){
            alert("Invalid filter type. Please select a valid filter.");
            console.warn("Invalid filter type:", btn.getAttribute('data-value'));
            return;
        }
        loadServices(btn.getAttribute('data-value'));
    })
    
);
    
//scrool btn action
const scrollBtn = document.querySelector('div[data-id="scroll"]');
const scrollThreshold = 700; 
document.addEventListener('scroll', () => {
    if (window.scrollY > (scrollThreshold * 2)) {
        scrollBtn.classList.add('scroll-visible');
    } else {
        scrollBtn.classList.remove('scroll-visible');
    }
});
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//load page 
document.addEventListener('DOMContentLoaded', async () => {
    const savedLang = localStorage.getItem('user_language') || DEFAULT_LANG;
    syncLanguageSelectionUI(savedLang);
    loadServices();
});