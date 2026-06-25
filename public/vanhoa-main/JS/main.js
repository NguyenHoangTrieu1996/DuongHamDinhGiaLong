const app = document.getElementById('app');
const ROUTES = {
    '/': {
        loadPage: './pages/index/index.js',
        pageName: 'Index'
    },
    '/giaoduc': {
        loadPage: './pages/giaoduc/giaoduc.js',
        pageName: 'GiaoDuc'
    },
    '/nghethuat': {
        loadPage: './pages/nghethuat/nghethuat.js',
        pageName: 'NgheThuat'
    },
      '/nghethuat/cailuong': {
        loadPage: './pages/nghethuat/cailuong.js',
        pageName: 'CaiLuong'
    },
     '/nghethuat/daocucham': {
        loadPage: './pages/nghethuat/daocucham.js',
        pageName: 'DaoCuCham'
    },
     '/nghethuat/daocuhoa': {
        loadPage: './pages/nghethuat/daocuhoa.js',
        pageName: 'DaoCuHoa'
    },
      '/nghethuat/hatboi': {
        loadPage: './pages/nghethuat/hatboi.js',
        pageName: 'HatBoi'
    },
     '/nghethuat/khmer': {
        loadPage: './pages/nghethuat/khmer.js',
        pageName: 'Khmer'
    },
    '/phongtuc': {
        loadPage: './pages/phongtuc/phongtuc.js',
        pageName: 'PhongTuc'
    },
    '/phongtuc/damcuoinguoiviet': {
        loadPage: './pages/phongtuc/damcuoinguoiviet.js',
        pageName: 'DamCuoiNguoiViet'
    },
    '/phongtuc/damcuoinguoihoa': {
        loadPage: './pages/phongtuc/damcuoinguoihoa.js',
        pageName: 'DamCuoiNguoiHoa'
    },
     '/phongtuc/damcuoinguoicham': {
        loadPage: './pages/phongtuc/damcuoinguoicham.js',
        pageName: 'DamCuoiNguoiCham'
    },
     '/phongtuc/damcuoinguoikhome': {
        loadPage: './pages/phongtuc/damcuoinguoikhome.js',
        pageName: 'DamCuoiNguoiKhome'
    },
    '/tinnguong': {
        loadPage: './pages/tinnguong/tinnguong.js',
        pageName: 'TinNguong'
    },
     '/tinnguong/thomau': {
        loadPage: './pages/tinnguong/thomau.js',
        pageName: 'ThoMau'
    }, 
    '/tinnguong/thothanhoang': {
        loadPage: './pages/tinnguong/thothanhoang.js',
        pageName: 'ThoThanHoang'
    },
     '/tinnguong/thothantai': {
        loadPage: './pages/tinnguong/thothantai.js',
        pageName: 'ThoThanTai'
    },
};

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
        document.body.appendChild(s);
    });
}



function preloadOther(currentPath) {
    for (const path in ROUTES) {
        if (path === currentPath) continue;
        const { loadPage, pageName } = ROUTES[path];
        if (typeof window[pageName] === 'undefined') {
            loadScript(loadPage);
        }
    }
}
async function afterRender() {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    const lang = localStorage.getItem('language');
    if (lang) {
        document.querySelector('#lang-vi, #lang-eng')?.setAttribute('id', lang);
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
        document.querySelectorAll(`.${lang}`).forEach(el => el.style.display = 'block');
        document.querySelectorAll(`.${lang}-inline`).forEach(el => el.style.display = 'inline');
        document.querySelectorAll(`.${lang}-block`).forEach(el => el.style.display = 'block');
        document.querySelectorAll(`.${lang}-flex`).forEach(el => el.style.display = 'flex');
    }
    function setHeaderHeight() {
        const header = document.querySelector('.header');
        if (!header) return;

        const height = header.offsetHeight;
        document.documentElement.style.setProperty(
            '--header-h',
            height + 'px'
        );
    }
    setHeaderHeight()
}
function initBackToTop() {
    const btn = document.querySelector('.backtotop');
    if (!btn) return;

    const offset = 200;

    window.addEventListener('scroll', () => {
        btn.classList.toggle(
            'cd-top--is-visible',
            window.scrollY > offset
        );
    });

    btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
function initCarousel(scope = document) {
    $(scope).find('.carousel').carousel();
}
async function lightGarry() {
    await loadScript("./JS/lightgallery/umd.min.js");
    await loadScript("./JS/lightgallery/thumbnail.min.js");
    await loadScript("./JS/lightgallery/zoom.min.js");
    await loadScript("./JS/lightgallery/fullscreen.min.js");
    await loadScript("./JS/lightgallery/autoplay.min.js");
    await loadScript("./JS/lightgallery/share.min.js");

    await lightGallery(document.getElementById("static-thumbnails"), {
        selector: ".lightimg",
        plugins: [lgThumbnail],
        alignThumbnails: "left",
        loop: true,
        allowMediaOverlap: true,
        toggleThumb: true,
        showZoomInOutIcons: true,
        actualSize: false,
        exThumbImage: "data-exthumbimage",
        closeExisting: true
    });

    await lightGallery(document.getElementById("static-thumbnailss"), {
        selector: ".lighting",
        plugins: [lgThumbnail],
        alignThumbnails: "left",
        loop: true,
        allowMediaOverlap: true,
        toggleThumb: true,
        showZoomInOutIcons: true,
        actualSize: false,
        exThumbImage: "data-exthumbimage",
        closeExisting: true
    });
}
async function render() {
    showLoader();

    const path = location.hash.replace('#', '') || '/';
    const route = ROUTES[path];
    // Các đường dẫn khác, không sử dụng do chỉ sử dụng app chạy local
    if (!route) {
        app.innerHTML = '<h2>404</h2>  <a href="#/"></a>';
        hideLoader();
        return;
    }

    let page = window[route.pageName];
    // Check chưa có page thì loadScrip, có rồi thì load
    if (typeof page === 'undefined') {
        await loadScript(route.loadPage);
        page = window[route.pageName];
    }

    if (typeof page === 'function') {
        app.innerHTML = page();
    } else {
        app.innerHTML = '<h2>Page Error</h2>';
    }
    if (path == '/') initCarousel(app);
    afterRender();
    initBackToTop();
    if (path == '/phongtuc/damcuoinguoiviet') lightGarry();
    hideLoader();
    preloadOther(path);
}
window.addEventListener('hashchange', render);
window.addEventListener('load', render);





