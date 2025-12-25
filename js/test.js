const app = document.getElementById('app');

/* ================= ROUTES ================= */
const routes = {
    "/kientrucxua": window.KienTrucXua,
    "/thaynguagiuadong": window.ThayNguaGiuaDong,
    "/xaydungduongham": window.XayDungDuongHam,
    "/": window.VaiNetVeDinh,
    "/ngoiphao": window.NgoiPhao,
    "/chuyendekhac": window.ChuyenDeKhac,
};

const Datas = {
    '/kientrucxua': window.Datakientrucxua,
    '/thaynguagiuadong': window.Datathaynguagiuadong,
    '/xaydungduongham': window.Dataxaydungduongham,
    '/': window.Datavainetvedinhgialong,
    '/ngoiphao': window.Datangoiphao,
};

/* ================= RENDER ENTRY ================= */
function render() {
    showLoader();
    app.classList.remove('ready');

    // ép browser paint loader trước
    requestAnimationFrame(() => {
        renderPage();
    });
}

/* ================= MAIN RENDER ================= */
function renderPage() {
    const path = location.hash.replace('#', '') || '/';
    const page = routes[path];

    if (typeof page !== 'function') {
        app.innerHTML = '<h2>404</h2>';
        finishRender();
        return;
    }

    // render layout trước
    app.innerHTML = page();

    const datas = Datas[path];
    if (!datas || path === "/chuyendekhac") {
        finishRender();
        return;
    }

    const container = document.getElementById("dataMap");
    if (!container) {
        finishRender();
        return;
    }

    /* ===== DOM BATCHING (CHỐNG GIẬT) ===== */
    const fragment = document.createDocumentFragment();

    datas.forEach((item, index) => {

        // title riêng cho kientrucxua
        if (path === "/kientrucxua" && item.title1) {
            const h2vi = document.createElement('h2');
            const h2en = document.createElement('h2');

            h2vi.className = 'lang lang-vi';
            h2en.className = 'lang lang-eng';
            h2en.style.display = 'none';

            h2vi.innerHTML = item.title1;
            h2en.innerHTML = item.title2;

            fragment.append(h2vi, h2en);
            return;
        }

        const box = document.createElement('div');
        box.className = "box";

        const img = document.createElement('img');
        img.src = item.img;
        img.alt = index + 1;
        img.className = 'd-block w-100';
        img.loading = index < 4 ? 'eager' : 'lazy';

        const p1 = document.createElement('p');
        const p2 = document.createElement('p');

        p1.className = 'lang lang-vi';
        p2.className = 'lang lang-eng';
        p2.style.display = 'none';

        p1.innerHTML = item.decs1;
        p2.innerHTML = item.decs2;

        box.append(img, p1, p2);
        fragment.appendChild(box);
    });

    container.appendChild(fragment);

    finishRender();
}

/* ================= FINISH RENDER ================= */
function finishRender() {

    // xử lý language SAU KHI DOM ĐÃ ỔN ĐỊNH
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
        document.querySelectorAll(`.${storedLang}`).forEach(el => el.style.display = 'block');
        document.querySelectorAll(`.${storedLang}-inline`).forEach(el => el.style.display = 'inline');
    }

    // bind readmore
    document.querySelectorAll('.readmore-btn').forEach(btn => {
        btn.onclick = () => {
            const wrap = btn.closest('.readmore-wrap');
            wrap.classList.toggle('show');
            btn.textContent = wrap.classList.contains('show')
                ? btn.dataset.close
                : btn.dataset.open;
        };
    });

    // frame tiếp theo → show page + hide loader
    requestAnimationFrame(() => {
        app.classList.add('ready');
        hideLoader();
    });

    // scroll sau khi page đã paint
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, 40);
}

/* ================= EVENTS ================= */
window.addEventListener('hashchange', render);
window.addEventListener('load', render);
