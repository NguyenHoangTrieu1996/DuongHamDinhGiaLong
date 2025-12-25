const app = document.getElementById('app');
const routes = {
    "/kientrucxua": window.KienTrucXua,
    "/thaynguagiuadong": window.ThayNguaGiuaDong,
    "/xaydungduongham": window.XayDungDuongHam,
    "/": window.VaiNetVeDinh,
    "/ngoiphao": window.NgoiPhao,
    "/chuyendekhac": window.ChuyenDeKhac,
};
const DATA_FILES = {
    '/': './public/datas/datas-home.js',
    '/kientrucxua': './public/datas/datas-kientrucxua.js',
    '/thaynguagiuadong': './public/datas/datas-thaynguagiuadong.js',
    '/xaydungduongham': './public/datas/datas-xaydungduongham.js',
    '/ngoiphao': './public/datas/datas-ngoiphao.js'
};
function getDatasByPath(path) {
    switch (path) {
        case '/': return window.Datavainetvedinhgialong;
        case '/kientrucxua': return window.Datakientrucxua;
        case '/thaynguagiuadong': return window.Datathaynguagiuadong;
        case '/xaydungduongham': return window.Dataxaydungduongham;
        case '/ngoiphao': return window.Datangoiphao;
        default: return null;
    }
}
function loadScript(src) {
    return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
            resolve();
            return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.defer = true;
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
    });
}
function preloadAllDatas() {
    if (!window.DATAS_LOADED?.['/']) {
        loadScript(DATA_FILES['/']);
    }
    Object.entries(DATA_FILES).forEach(([path, file]) => {
        if (!window.DATAS_LOADED?.[path]) {
            loadScript(file);
        }
    });
}

function afterRender() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.querySelectorAll('.readmore-btn').forEach(btn => {
        btn.onclick = () => {
            const wrap = btn.closest('.readmore-wrap');
            wrap.classList.toggle('show');
            btn.textContent = wrap.classList.contains('show')
                ? btn.dataset.close
                : btn.dataset.open;
        };
    });
    const lang = localStorage.getItem('language');
    if (lang) {
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
        document.querySelectorAll(`.${lang}`).forEach(el => el.style.display = 'block');
        document.querySelectorAll(`.${lang}-inline`).forEach(el => el.style.display = 'inline');
    }
}

async function render() {
    const path = location.hash.replace('#', '') || '/';
    const page = routes[path];
    if (path === '/chuyendekhac' && typeof page === 'function') {
        app.innerHTML = page();
        afterRender();
        hideLoader();
        preloadAllDatas();
        return;
    }
    if (DATA_FILES[path] && !window.DATAS_LOADED?.[path]) {
        await loadScript(DATA_FILES[path]);
    }
    if (typeof page === 'function') {
        app.innerHTML = page();
        const datas = getDatasByPath(path);
        if (path !== "/chuyendekhac") {
            if (!datas) {
                alert("Dữ liệu chưa được tải, đợi ít phút và chuyển lại trang/The data hasn't loaded yet, please wait a few minutes and return to the page.");
            } else {
                const container = document.getElementById("dataMap");
                container.innerHTML = '';
                datas.forEach((item, index) => {
                    if (item.title1) {
                        const h1 = document.createElement('h2');
                        const h2 = document.createElement('h2');
                        h1.className = 'lang lang-vi';
                        h2.className = 'lang lang-eng';
                        h1.innerHTML = item.title1;
                        h2.innerHTML = item.title2;
                        h2.style.display = 'none';
                        container.appendChild(h1);
                        container.appendChild(h2);
                        return;
                    }
                    const box = document.createElement('div');
                    box.className = 'box';
                    const img = document.createElement('img');
                    img.src = item.img;
                    img.alt = index + 1;
                    img.className = 'd-block w-100';
                    img.loading = index < 5 ? 'eager' : 'lazy';
                    const p1 = document.createElement('p');
                    const p2 = document.createElement('p');
                    p1.className = 'lang lang-vi';
                    p2.className = 'lang lang-eng';
                    p2.style.display = 'none';
                    p1.innerHTML = item.decs1;
                    p2.innerHTML = item.decs2;
                    box.appendChild(img);
                    box.appendChild(p1);
                    box.appendChild(p2);
                    container.appendChild(box);
                });
            }
        }
         afterRender();
    } else {
        app.innerHTML = '<h2>404</h2>';
    }
    if (path === '/') {
        preloadAllDatas();
    }
    hideLoader();
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);
