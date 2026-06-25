window.Index = function () {
    return `
     <section id="carousel">
        <div id="demo" class="carousel slide" data-ride="carousel" data-interval="3000">
            <!-- Indicators -->
            <ul class="carousel-indicators">
                <li data-target="#demo" data-slide-to="0" class="active"></li>
                <li data-target="#demo" data-slide-to="1"></li>
                <li data-target="#demo" data-slide-to="2"></li>
                <li data-target="#demo" data-slide-to="3"></li>
            </ul>
            <!-- The slideshow -->
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <div class="overlay"></div>
                    <div class="container-fluid">
                        <div class="carousel-caption lang lang-vi">
                            <h3>Phong Tục</h3>
                            <a href="#/phongtuc"> <i class="las la-paper-plane"></i>
                            </a>
                        </div>
                        <div class="carousel-caption lang lang-eng" style="display:none;">
                            <h3>Customs</h3>
                            <a href="#/phongtuc"> <i class="las la-paper-plane"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="overlay"></div>
                    <div class="container-fluid">
                        <div class="carousel-caption ml-fix  lang lang-vi">
                            <h3>Tín Ngưỡng</h3>
                            <a href="#/tinnguong"> <i class="las la-paper-plane"></i></a>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="carousel-caption ml-fix  lang lang-eng" style="display:none;">
                            <h3>Beliefs</h3>
                            <a href="#/tinnguong"> <i class="las la-paper-plane"></i></a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="overlay"> </div>
                    <div class="container-fluid">
                        <div class="carousel-caption lang lang-vi">
                            <h3>Nghệ Thuật</h3>
                            <a href="#/nghethuat"> <i class="las la-paper-plane"></i></a>
                        </div>
                        <div class="carousel-caption lang lang-eng" style="display:none;">
                            <h3>Art</h3>
                            <a href="#/nghethuat"> <i class="las la-paper-plane"></i></a>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="overlay"> </div>
                    <div class="container-fluid">
                        <div class="carousel-caption ml-fix lang lang-vi">
                            <h3>Giáo Dục</h3>
                            <a href="#/giaoduc"> <i class="las la-paper-plane"></i></a>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="carousel-caption ml-fix lang lang-eng" style="display:none;">
                            <h3>Education</h3>
                            <a href="#/giaoduc"> <i class="las la-paper-plane"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;
};