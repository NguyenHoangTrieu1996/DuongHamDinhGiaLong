if (localStorage.getItem('language')) {
    const storedData = localStorage.getItem('language');
    switch (storedData) {
        case 'lang-eng':
            // Ẩn tất cả các phần tử ngôn ngữ
            document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
            // Hiển thị các phần tử theo ngôn ngữ đã chọn
            document.querySelectorAll('.lang-eng').forEach(el => el.style.display = 'inline');
            document.querySelectorAll('.lang-eng-block').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.lang-eng-flex').forEach(el => el.style.display = 'flex');
            var themedark = document.getElementById("lang_vi");
            var themeswitchdark = document.getElementById("lang-vi");
            if (themedark) {
                themedark.id = 'lang_eng';
            }
            if (themeswitchdark) {
                themeswitchdark.id = 'lang-eng';
            }

            break;
        case 'lang-vi':
            // Ẩn tất cả các phần tử ngôn ngữ
            document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');

            // Hiển thị các phần tử theo ngôn ngữ đã chọn
            document.querySelectorAll('.lang-vi').forEach(el => el.style.display = 'inline');
            document.querySelectorAll('.lang-vi-block').forEach(el => el.style.display = 'block');
            document.querySelectorAll('.lang-vi-flex').forEach(el => el.style.display = 'flex');
            var themelight = document.getElementById("lang_eng");
            var themeswitchlight = document.getElementById("lang-eng");
            if (themelight) {
                themelight.id = 'lang_vi';
            }
            if (themeswitchlight) {
                themeswitchlight.id = 'lang-vi';
            }


            break;
        default:
            break;
    }
}
// Theme-light-dark
document.getElementById("lang_switch").onclick = function () {
    var themedark = document.getElementById("lang_vi")
    var themelight = document.getElementById("lang_eng")
    if (themedark) {
        themedark.id = "lang_eng"
    } else {
        themelight.id = "lang_vi"
    }

    var themeswitchdark = document.getElementById("lang-vi")
    var themeswitchlight = document.getElementById("lang-eng")
    if (themeswitchdark) {
        themeswitchdark.id = "lang-eng";

        // Ẩn tất cả các phần tử ngôn ngữ
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');

        // Hiển thị các phần tử theo ngôn ngữ đã chọn
        document.querySelectorAll('.lang-eng').forEach(el => el.style.display = 'inline');
        document.querySelectorAll('.lang-eng-block').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lang-eng-flex').forEach(el => el.style.display = 'flex');
        localStorage.setItem('language', 'lang-eng')
    } else {
        themeswitchlight.id = "lang-vi";

        // Ẩn tất cả các phần tử ngôn ngữ
        document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');

        // Hiển thị các phần tử theo ngôn ngữ đã chọn
        document.querySelectorAll('.lang-vi').forEach(el => el.style.display = 'inline');
        document.querySelectorAll('.lang-vi-block').forEach(el => el.style.display = 'block');
        document.querySelectorAll('.lang-vi-flex').forEach(el => el.style.display = 'flex');
        localStorage.setItem('language', 'lang-vi')
    }
}

// window.addEventListener("scroll", handeScrolled);
// var header = document.getElementById("header");
// function handeScrolled(e) {
//     if (scrollY >= 80) {
//         header.classList.add("nav-fix");
//     } else {
//         header.classList.remove("nav-fix");
//     }
// }

// const defaultPage=()=>{
//    window.location.replace('file:///C:/Users/Admin/Desktop/Museum/index.html')
// }
// const defaultPageInterval = setInterval(defaultPage, 10000);


