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
async function render() {
    const path = location.hash.replace('#', '') || '/';
    const page = routes[path];

    if (DATA_FILES[path] && !window.DATAS_LOADED?.[path]) {
        await loadScript(DATA_FILES[path]);
    }
    if (typeof page === 'function') {
        app.innerHTML = page();
        const datas = getDatasByPath(path);
        if (path !== "/chuyendekhac") {
            if (!datas) {
                alert("Lỗi Sai Đường Dẫn Dữ Liệu");
            } else {
                const container = document.getElementById("dataMap");
                container.innerHTML = '';
                datas.forEach((item, index) => {
                    if (item.title1) {
                        const title1 = document.createElement('h2');
                        const title2 = document.createElement('h2');
                        title1.className = 'lang lang-vi';
                        title2.className = 'lang lang-eng';
                        title1.innerHTML = item.title1;
                        title2.innerHTML = item.title2;
                        title2.style.display = 'none';
                        container.appendChild(title1);
                        container.appendChild(title2);
                        return;
                    }
                    const itemDiv = document.createElement('div');
                    itemDiv.className = "box";
                    const img = document.createElement('img');
                    img.src = item.img;
                    img.alt = index + 1;
                    img.className = 'd-block w-100';
                    img.loading = index < 5 ? "eager" : "lazy";
                    const contentp1 = document.createElement('p');
                    const contentp2 = document.createElement('p');
                    contentp1.className = 'lang lang-vi';
                    contentp2.className = 'lang lang-eng';
                    contentp2.style.display = 'none';
                    contentp1.innerHTML = item.decs1;
                    contentp2.innerHTML = item.decs2;
                    itemDiv.appendChild(img);
                    itemDiv.appendChild(contentp1);
                    itemDiv.appendChild(contentp2);
                    container.appendChild(itemDiv);
                });
            }
        }
    } else {
        app.innerHTML = '<h2>404</h2>';
    }
    /* Scroll top */
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
    if (path === '/') {
        setTimeout(() => {
            Object.entries(DATA_FILES).forEach(([p, file]) => {
                if (!window.DATAS_LOADED?.[p]) {
                    loadScript(file);
                }
            });
        }, 0);
    }
    hideLoader();
}
window.addEventListener('hashchange', render);
window.addEventListener('load', render);
