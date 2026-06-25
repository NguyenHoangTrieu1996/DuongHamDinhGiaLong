window.ChuyenDeKhac = function () {
  return `
    <section>
       <div class="document ">
        <h2 class="lang lang-vi">Danh sách chuyên đề</h2>
        <h2 class="lang lang-eng" style="display: none;">List of exhibitions</h2>
        
        <div class="document-scroll">
            <ul >
                <li class="lang lang-vi"><a href="./public/vanhoa-main/index.html">📄 VĂN HÓA</a></li>
                <li class="lang lang-eng" style="display: none;"><a href="./public/vanhoa-main/index.html">📄 CULTURE</a></li>
                <li class="lang lang-vi"><a href="./public/kinhte-merge/index.html">📄 KINH TẾ</a></li>
                <li class="lang lang-eng" style="display: none;"><a href="./public/kinhte-merge/index.html">📄 ECONEMIC</a></li>
                <li class="lang lang-vi"><a href="./public/songnuoc-doc/page2.html">📄 SÔNG NGÒI KÊNH RẠCH</a></li>
                <li class="lang lang-eng" style="display: none;"><a href="./public/songnuoc-doc/page2.html">📄 RIVER</a></li>
                
                <model-viewer src="./public/3d/kenhrach.glb" id="mv" camera-controls disable-pan shadow-intensity="1"
            interaction-prompt="none" exposure="1" alt="3D Model" camera-target="6m 0.2m 0m"
            camera-orbit="360deg 90deg 20m" min-camera-orbit="auto auto 1m" max-camera-orbit="auto auto 3m">
        </model-viewer>
                
            </ul>

            
        </div>
    </div>
    </section>
  `;
};