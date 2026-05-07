const STORAGE_KEY = 'xiaoyao_nav_data';

document.addEventListener('DOMContentLoaded', function() {
    initCategories();
    renderAllSites();
    bindEvents();
});

function getNavData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            return navData;
        }
    }
    return navData;
}

function initCategories() {
    const categoryList = document.getElementById('categoryList');
    const data = getNavData();
    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.category;
        li.dataset.category = item.category;
        li.style.animationDelay = `${index * 0.1}s`;
        categoryList.appendChild(li);
    });
}

function renderAllSites() {
    const navGrid = document.getElementById('navGrid');
    navGrid.innerHTML = '';
    
    let iconIndex = 0;
    const data = getNavData();
    data.forEach(category => {
        category.sites.forEach(site => {
            const card = createSiteCard(site, icons[iconIndex % icons.length]);
            navGrid.appendChild(card);
            iconIndex++;
        });
    });
}

function renderSitesByCategory(categoryName) {
    const navGrid = document.getElementById('navGrid');
    navGrid.innerHTML = '';
    
    if (categoryName === 'all') {
        renderAllSites();
        return;
    }
    
    let iconIndex = 0;
    const data = getNavData();
    const category = data.find(c => c.category === categoryName);
    if (category) {
        category.sites.forEach(site => {
            const card = createSiteCard(site, icons[iconIndex % icons.length]);
            navGrid.appendChild(card);
            iconIndex++;
        });
    }
}

function createSiteCard(site, icon) {
    const card = document.createElement('div');
    card.className = 'nav-card';
    card.addEventListener('click', () => {
        window.open(site.url, '_blank');
    });
    
    card.innerHTML = `
        <div class="icon">${icon}</div>
        <div class="info">
            <h3>${site.name}</h3>
            <p>${site.description}</p>
        </div>
    `;
    
    return card;
}

function bindEvents() {
    const categoryItems = document.querySelectorAll('#categoryList li');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            categoryItems.forEach(li => li.classList.remove('active'));
            this.classList.add('active');
            renderSitesByCategory(this.dataset.category);
        });
    });
    
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    function handleSearch() {
        const keyword = searchInput.value.toLowerCase().trim();
        if (!keyword) {
            const activeCategory = document.querySelector('#categoryList li.active').dataset.category;
            renderSitesByCategory(activeCategory);
            return;
        }
        
        const navGrid = document.getElementById('navGrid');
        navGrid.innerHTML = '';
        
        let iconIndex = 0;
        let found = false;
        
        const data = getNavData();
        data.forEach(category => {
            category.sites.forEach(site => {
                if (site.name.toLowerCase().includes(keyword) || 
                    site.description.toLowerCase().includes(keyword)) {
                    const card = createSiteCard(site, icons[iconIndex % icons.length]);
                    navGrid.appendChild(card);
                    iconIndex++;
                    found = true;
                }
            });
        });
        
        if (!found) {
            navGrid.innerHTML = `
                <div class="empty-state">
                    <p>未找到匹配的网站</p>
                </div>
            `;
        }
    }
    
    searchBtn.addEventListener('click', handleSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
}