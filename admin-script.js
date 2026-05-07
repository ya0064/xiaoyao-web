const STORAGE_KEY = 'xiaoyao_nav_data';
const LOGIN_KEY = 'xiaoyao_admin_login';
const DEFAULT_USER = { username: 'admin', password: 'admin' };

let currentEditData = null;

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('admin.html')) {
        checkAuth();
        bindLoginEvents();
    }
});

function checkAuth() {
    const loginData = localStorage.getItem(LOGIN_KEY);
    if (loginData) {
        try {
            const data = JSON.parse(loginData);
            if (data.loggedIn && data.timestamp > Date.now() - 86400000) {
                showAdminPanel();
                return;
            }
        } catch (e) {
            localStorage.removeItem(LOGIN_KEY);
        }
    }
    showLoginForm();
}

function bindLoginEvents() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username === DEFAULT_USER.username && password === DEFAULT_USER.password) {
                localStorage.setItem(LOGIN_KEY, JSON.stringify({
                    loggedIn: true,
                    timestamp: Date.now()
                }));
                showAdminPanel();
            } else {
                document.getElementById('errorMessage').style.display = 'block';
                document.getElementById('errorMessage').textContent = '用户名或密码错误';
            }
        });
    }
}

function showLoginForm() {
    document.querySelector('.login-container')?.classList.remove('hidden');
    document.querySelector('.admin-content')?.classList.add('hidden');
}

function showAdminPanel() {
    document.body.innerHTML = `
        <div class="admin-content">
            <header class="admin-header">
                <h1>逍遥导航站 - 管理后台</h1>
                <button class="logout-btn" onclick="logout()">退出登录</button>
            </header>
            <div class="admin-container">
                <div class="admin-actions">
                    <button class="action-btn primary" onclick="showAddModal()">添加网站</button>
                    <button class="action-btn success" onclick="exportData()">导出数据</button>
                    <button class="action-btn danger" onclick="clearAllData()">清空数据</button>
                </div>
                <div class="nav-table">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>网站名称</th>
                                <th>网址</th>
                                <th>描述</th>
                                <th>分类</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody"></tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="modal-overlay" id="siteModal">
            <div class="modal-box">
                <button class="close-btn" onclick="closeModal()">&times;</button>
                <h2 id="modalTitle">添加网站</h2>
                <form id="siteForm">
                    <div class="form-group">
                        <label for="siteName">网站名称</label>
                        <input type="text" id="siteName" required>
                    </div>
                    <div class="form-group">
                        <label for="siteUrl">网址</label>
                        <input type="url" id="siteUrl" required placeholder="https://">
                    </div>
                    <div class="form-group">
                        <label for="siteDesc">描述</label>
                        <textarea id="siteDesc" placeholder="简短描述网站"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="siteCategory">分类</label>
                        <select id="siteCategory" required></select>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn cancel" onclick="closeModal()">取消</button>
                        <button type="submit" class="btn confirm">确定</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="modal-overlay" id="categoryModal">
            <div class="modal-box">
                <button class="close-btn" onclick="closeCategoryModal()">&times;</button>
                <h2>添加分类</h2>
                <form id="categoryForm">
                    <div class="form-group">
                        <label for="categoryName">分类名称</label>
                        <input type="text" id="categoryName" required>
                    </div>
                    <div class="modal-actions">
                        <button type="button" class="btn cancel" onclick="closeCategoryModal()">取消</button>
                        <button type="submit" class="btn confirm">确定</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    
    bindAdminEvents();
    renderTable();
}

function bindAdminEvents() {
    document.getElementById('siteForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveSite();
    });
    
    document.getElementById('categoryForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        saveCategory();
    });
}

function logout() {
    localStorage.removeItem(LOGIN_KEY);
    window.location.reload();
}

function getNavData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    return navData;
}

function saveNavData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderTable() {
    const tbody = document.getElementById('tableBody');
    const data = getNavData();
    tbody.innerHTML = '';
    
    let id = 1;
    data.forEach(category => {
        category.sites.forEach(site => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${id++}</td>
                <td>${site.name}</td>
                <td><a href="${site.url}" target="_blank" style="color: #667eea;">${site.url}</a></td>
                <td>${site.description || '-'}</td>
                <td><span class="category-badge">${category.category}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="table-btn edit" onclick="showEditModal('${category.category}', '${site.name}')">编辑</button>
                        <button class="table-btn delete" onclick="deleteSite('${category.category}', '${site.name}')">删除</button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    });
}

function showAddModal() {
    currentEditData = null;
    document.getElementById('modalTitle').textContent = '添加网站';
    document.getElementById('siteName').value = '';
    document.getElementById('siteUrl').value = '';
    document.getElementById('siteDesc').value = '';
    populateCategories();
    document.getElementById('siteModal').classList.add('active');
}

function showEditModal(categoryName, siteName) {
    const data = getNavData();
    const category = data.find(c => c.category === categoryName);
    const site = category?.sites.find(s => s.name === siteName);
    
    if (site) {
        currentEditData = { categoryName, siteName };
        document.getElementById('modalTitle').textContent = '编辑网站';
        document.getElementById('siteName').value = site.name;
        document.getElementById('siteUrl').value = site.url;
        document.getElementById('siteDesc').value = site.description || '';
        populateCategories(categoryName);
        document.getElementById('siteModal').classList.add('active');
    }
}

function populateCategories(selectedCategory = '') {
    const select = document.getElementById('siteCategory');
    const data = getNavData();
    select.innerHTML = '';
    
    data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.category;
        option.textContent = category.category;
        if (category.category === selectedCategory) {
            option.selected = true;
        }
        select.appendChild(option);
    });
    
    const addOption = document.createElement('option');
    addOption.value = '__add_new__';
    addOption.textContent = '+ 添加新分类';
    select.appendChild(addOption);
    
    select.addEventListener('change', function() {
        if (this.value === '__add_new__') {
            closeModal();
            showCategoryModal();
        }
    });
}

function showCategoryModal() {
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryModal').classList.add('active');
}

function saveSite() {
    const name = document.getElementById('siteName').value;
    const url = document.getElementById('siteUrl').value;
    const desc = document.getElementById('siteDesc').value;
    const categoryName = document.getElementById('siteCategory').value;
    
    let data = getNavData();
    
    if (currentEditData) {
        const oldCategory = data.find(c => c.category === currentEditData.categoryName);
        if (oldCategory) {
            const siteIndex = oldCategory.sites.findIndex(s => s.name === currentEditData.siteName);
            if (siteIndex !== -1) {
                oldCategory.sites.splice(siteIndex, 1);
            }
            if (oldCategory.sites.length === 0) {
                const catIndex = data.findIndex(c => c.category === currentEditData.categoryName);
                data.splice(catIndex, 1);
            }
        }
    }
    
    let category = data.find(c => c.category === categoryName);
    if (!category) {
        category = { category: categoryName, sites: [] };
        data.push(category);
    }
    
    category.sites.push({
        name,
        url,
        description: desc
    });
    
    saveNavData(data);
    closeModal();
    renderTable();
    showToast('保存成功', 'success');
}

function saveCategory() {
    const name = document.getElementById('categoryName').value;
    const data = getNavData();
    
    if (!data.find(c => c.category === name)) {
        data.push({ category: name, sites: [] });
        saveNavData(data);
        showToast('分类添加成功', 'success');
    } else {
        showToast('分类已存在', 'error');
        return;
    }
    
    closeCategoryModal();
}

function deleteSite(categoryName, siteName) {
    if (!confirm(`确定要删除 "${siteName}" 吗？`)) return;
    
    let data = getNavData();
    const category = data.find(c => c.category === categoryName);
    
    if (category) {
        const siteIndex = category.sites.findIndex(s => s.name === siteName);
        if (siteIndex !== -1) {
            category.sites.splice(siteIndex, 1);
            
            if (category.sites.length === 0) {
                const catIndex = data.findIndex(c => c.category === categoryName);
                data.splice(catIndex, 1);
            }
            
            saveNavData(data);
            renderTable();
            showToast('删除成功', 'success');
        }
    }
}

function closeModal() {
    document.getElementById('siteModal').classList.remove('active');
    currentEditData = null;
}

function closeCategoryModal() {
    document.getElementById('categoryModal').classList.remove('active');
}

function exportData() {
    const data = getNavData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'xiaoyao_nav_data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('数据已导出', 'success');
}

function clearAllData() {
    if (!confirm('确定要清空所有数据吗？此操作不可恢复！')) return;
    
    localStorage.removeItem(STORAGE_KEY);
    renderTable();
    showToast('数据已清空', 'success');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
}