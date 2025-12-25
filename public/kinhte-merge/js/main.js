// Change Language
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

document.getElementById('changeLang').onclick = () => {
    const vietnamese = document.getElementById("lang-vi");
    const english = document.getElementById("lang-eng");
    if (vietnamese) {
        vietnamese.id = "lang-eng"
        // Ẩn tất cả các phần tử ngôn ngữ
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
        // Hiển thị ngôn ngữ tiếng anh
        document.querySelectorAll('.lang-eng').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lang-eng-inline').forEach(el => el.style.display = 'inline');
        // Lưu ngôn ngữ đã chọn vào localStorage
        localStorage.setItem('language', 'lang-eng')
    }
    if (english) {
        english.id = "lang-vi"

        // Ẩn tất cả các phần tử ngôn ngữ
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
        // Hiển thị ngôn ngữ việt nam
        document.querySelectorAll('.lang-vi').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lang-vi-inline').forEach(el => el.style.display = 'inline');
        // Lưu ngôn ngữ đã chọn vào localStorage
        localStorage.setItem('language', 'lang-vi')
    }
}

// Chang Page

const button = document.getElementById('changePage');
const links = document.querySelectorAll('.navigation');
const spans = document.querySelectorAll('.navigation-span');
button.addEventListener('click', function () {
    // Kiểm tra giá trị hiện tại của nút và chuyển đổi giữa 'open' và 'close'
    if (button.value === 'open') {
        button.value = 'close';
        links.forEach(link => {
            
            link.classList.add('hidden');
        });
        spans.forEach(span => {
            span.classList.add('hidden');
        });
    } else {
        button.value = 'open';
        links.forEach(link => {

            link.classList.remove('hidden');
        });
        spans.forEach(span => {

            span.classList.remove('hidden');
        });
    }
});





