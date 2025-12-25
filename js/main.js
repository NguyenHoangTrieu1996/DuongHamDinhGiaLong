const app = document.getElementById('app');
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

function render() {
    const path = location.hash.replace('#', '') || '/';
    const page = routes[path];
    if (typeof page === 'function') {
        app.innerHTML = page();
        const datas = Datas[path];
        if (path == "/chuyendekhac") {
        } else {
            if (path == "/kientrucxua") {
                if (!datas) { alert("Lỗi Sai Đường Giẫn Dữ Liệu") } else {
                    const container = document.getElementById("dataMap");
                    datas.forEach((item, index) => {
                        if (item.title1) {
                            const title1 = document.createElement('h2');
                            const title2 = document.createElement('h2');
                            title1.className = 'lang lang-vi';
                            title2.className = 'lang lang-eng';
                            title1.innerHTML = item.title1;
                            title2.innerHTML = item.title2;
                            title2.style = 'display: none;';
                            container.appendChild(title1);
                            container.appendChild(title2);
                        } else {
                            const itemDiv = document.createElement('div');
                            itemDiv.className = "box"
                            const img = document.createElement('img');
                            img.src = item.img;
                            img.alt = ++index;
                            img.className = 'd-block w-100';
                            if (index < 5) {
                                img.loading = "eager";
                            } else {
                                img.loading = "lazy";
                            }
                            // Tạo div content
                            const contentp1 = document.createElement('p');
                            const contentp2 = document.createElement('p');
                            contentp1.className = 'lang lang-vi';
                            contentp2.className = 'lang lang-eng';
                            contentp2.style = 'display: none;';
                            contentp1.innerHTML = item.decs1;
                            contentp2.innerHTML = item.decs2;

                            // Lồng các phần tử
                            itemDiv.appendChild(img);
                            itemDiv.appendChild(contentp1);
                            itemDiv.appendChild(contentp2);
                            // Thêm vào carousel-inner mà không xóa nội dung cũ
                            container.appendChild(itemDiv);
                        }
                    });
                };
            } else {
                if (!datas) { alert("Lỗi Sai Đường Giẫn Dữ Liệu") } else {
                    const container = document.getElementById("dataMap");
                    datas.forEach((item, index) => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = "box"
                        const img = document.createElement('img');
                        img.src = item.img;
                        img.alt = ++index;
                        img.className = 'd-block w-100';
                        if (index < 5) {
                            img.loading = "eager";
                        } else {
                            img.loading = "lazy";
                        }
                        // Tạo div content
                        const contentp1 = document.createElement('p');
                        const contentp2 = document.createElement('p');
                        contentp1.className = 'lang lang-vi';
                        contentp2.className = 'lang lang-eng';
                        contentp2.style = 'display: none;';
                        contentp1.innerHTML = item.decs1;
                        contentp2.innerHTML = item.decs2;
                        // Lồng các phần tử
                        itemDiv.appendChild(img);
                        itemDiv.appendChild(contentp1);
                        itemDiv.appendChild(contentp2);
                        // Thêm vào carousel-inner mà không xóa nội dung cũ
                        container.appendChild(itemDiv);
                    });
                };
            }
        }
      
    } else {
        app.innerHTML = '<h2>404</h2>';
    }

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant' // đổi thành 'smooth' nếu muốn mượt
    });

    // Readmore
    document.querySelectorAll('.readmore-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const wrap = btn.closest('.readmore-wrap');
            wrap.classList.toggle('show');
            btn.textContent = wrap.classList.contains('show')
                ? btn.dataset.close
                : btn.dataset.open;
        });
    });

    // Change Language khi chuyển trang
    if (localStorage.getItem('language')) {
        const storedData = localStorage.getItem('language');
        switch (storedData) {
            case 'lang-vi':
                const english = document.getElementById("lang-eng");
                if (english) english.id = 'lang-vi';

                // Ẩn tất cả các phần tử ngôn ngữ
                document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
                // Hiển thị ngôn ngữ việt nam
                document.querySelectorAll('.lang-vi').forEach(el => el.style.display = 'block');
                document.querySelectorAll('.lang-vi-inline').forEach(el => el.style.display = 'inline');
                break;
            case 'lang-eng':
                const vietnamese = document.getElementById("lang-vi");
                if (vietnamese) vietnamese.id = 'lang-eng';

                // Ẩn tất cả các phần tử ngôn ngữ
                document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
                // Hiển thị ngôn ngữ tiếng anh
                document.querySelectorAll('.lang-eng').forEach(el => el.style.display = 'block');
                document.querySelectorAll('.lang-eng-inline').forEach(el => el.style.display = 'inline');
                break;
            default:
                break;
        }
    }
    hideLoader();
}

window.addEventListener('hashchange', render);
window.addEventListener('load', render);





