/* ============================================================
   Matrix Automatic Parking — MULTI-PAGE (nested folders)
   Freshstraws-style chrome: floating pill nav (logo · centered
   menu · search + VI/EN), floating bottom CTA pills, Chat/Zalo.
   Header/footer/floating injected from this single file.

   PORTABLE PATHS: every page sets
     <body data-page="parentKey" data-sub="subKey" data-base="PREFIX">
   where PREFIX is "" for root pages and "../" for pages one folder
   deep. All injected links are BASE + relative, so the site works
   at the domain root OR inside a subfolder (e.g. GitHub project
   pages: username.github.io/matrix-parking/).
   ============================================================ */
(function () {
  "use strict";

  var BASE = document.body.getAttribute("data-base");
  if (BASE == null) BASE = "";
  var P = function (rel) { return BASE + rel; };   // prefix a relative path

  var CO = {
    name: "Công ty CP Đầu tư và Xây dựng Thiên Sứ",
    phone: "(028) 3866 3582",
    phoneRaw: "02838663582",
    email: "info@thiensu.com.vn",       // TODO: xác nhận email chính thức
    website: "thiensu.com.vn",
    address: "15 Kinh Dương Vương, Phường Phú Lâm, TP. Hồ Chí Minh",
    mst: "0308295645",
    zalo: "0918222474",                  // Mr. Tuấn - Phó Giám đốc Kinh doanh
    catalogue: "bao-gia/"                // TODO: thay bằng link file catalogue PDF khi có
  };

  // hrefs are RELATIVE (no leading slash); P() adds the base prefix.
  var MENU = [
    { page: "home", label: "Trang chủ", href: "index.html" },
    { page: "about", label: "Giới thiệu", href: "ve-chung-toi/" },
    { page: "product", label: "Sản phẩm", href: "san-pham/", children: [
      { sub: "bai-do-thong-minh", label: "Bãi đỗ xe thông minh", href: "san-pham/bai-do-xe-thong-minh.html" },
      { sub: "cau-nang", label: "Cầu nâng đỗ xe 2 tầng", href: "san-pham/cau-nang.html" },
      { sub: "cong-kiem-soat", label: "Cổng kiểm soát xe ra vào", href: "san-pham/cong-kiem-soat.html" }
    ]},
    { page: "pricing", label: "Báo giá", href: "bao-gia/", children: [
      { sub: "bang-gia", label: "Bảng giá dự án", href: "bao-gia/bang-gia.html" },
      { sub: "quy-trinh", label: "Quy trình triển khai", href: "bao-gia/quy-trinh.html" }
    ]},
    { page: "news", label: "Tin tức", href: "tin-tuc/" },
    { page: "contact", label: "Liên hệ", href: "lien-he/" }
  ];

  var INDEX = [
    { t: "Trang chủ", s: "Tổng quan giải pháp bãi đỗ xe thông minh", u: "index.html", k: "trang chu home tong quan" },
    { t: "Giới thiệu", s: "Thiên Sứ · 17 năm · 100+ dự án · năng lực ELV + M&E", u: "ve-chung-toi/", k: "gioi thieu cong ty thien su lich su nang luc" },
    { t: "Năng lực Công ty", s: "Đối tác ELV + M&E, vốn 100 tỷ", u: "ve-chung-toi/#nang-luc", k: "nang luc doi tac hikvision aruba viettel fpt" },
    { t: "Bãi đỗ xe thông minh", s: "Bãi đỗ tự động Matrix — vấn đề, giải pháp, cấu tạo, đối tượng, so sánh", u: "san-pham/bai-do-xe-thong-minh.html", k: "bai do xe thong minh matrix xep hinh thang nang pallet van de giai phap cau tao doi tuong so sanh tang ham" },
    { t: "Cầu nâng đỗ xe 2 tầng", s: "Gấp đôi chỗ đỗ trên cùng vị trí", u: "san-pham/cau-nang.html", k: "cau nang do xe 2 tang car lift nha pho showroom garage thuy luc" },
    { t: "Cổng kiểm soát xe ra vào", s: "Barrier tự động + LPR nhận diện biển số", u: "san-pham/cong-kiem-soat.html", k: "cong kiem soat ra vao barrier lpr nhan dien bien so tinh phi" },
    { t: "Bảng giá dự án", s: "3 gói dịch vụ + bảng giá theo quy mô", u: "bao-gia/bang-gia.html", k: "bao gia bang gia goi dich vu epc" },
    { t: "Quy trình triển khai", s: "5 bước từ tư vấn đến vận hành", u: "bao-gia/quy-trinh.html", k: "quy trinh trien khai 5 buoc" },
    { t: "Tin tức", s: "Bài viết & dự án mới nhất", u: "tin-tuc/", k: "tin tuc bai viet du an" },
    { t: "Liên hệ", s: "Hotline, email, địa chỉ, form tư vấn", u: "lien-he/", k: "lien he hotline email dia chi form" }
  ];

  var current = document.body.getAttribute("data-page") || "home";
  var currentSub = document.body.getAttribute("data-sub") || "";
  function norm(s){ return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d"); }

  function buildHeader() {
    var items = MENU.map(function (m) {
      var active = m.page === current ? " active" : "";
      if (m.children) {
        var dd = m.children.map(function (c) {
          var sa = c.sub === currentSub ? ' class="dd-active"' : "";
          return '<li><a href="' + P(c.href) + '"' + sa + '><span>' + c.label + '</span></a></li>';
        }).join("");
        return '<li class="nav-item has-dropdown' + active + '">' +
          '<a class="nav-link" href="' + P(m.href) + '">' + m.label + ' <span class="caret">▾</span></a>' +
          '<ul class="dropdown">' + dd + '</ul></li>';
      }
      return '<li class="nav-item' + active + '"><a class="nav-link" href="' + P(m.href) + '">' + m.label + '</a></li>';
    }).join("");

    return '<nav class="navbar"><div class="nav-pill">' +
      '<a class="nav-brand" href="' + P("index.html") + '">' +
        '<img src="' + P("assets/img/logo.png") + '" alt="Logo Thiên Sứ">' +
        '<span class="nav-brand-text"><b>THIÊN SỨ</b><small>Matrix Parking</small></span>' +
      '</a>' +
      '<ul class="nav-menu">' + items +
        '<li class="nav-item nav-cta-li"><a class="nav-cta" href="' + P("lien-he/") + '">Nhận tư vấn</a></li>' +
      '</ul>' +
      '<div class="nav-actions">' +
        '<button class="nav-search-btn" aria-label="Tìm kiếm">🔍</button>' +
        '<div class="lang-toggle"><button class="lang-btn active" data-lang="vi">VI</button><button class="lang-btn" data-lang="en">EN</button></div>' +
        '<button class="nav-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
      '</div>' +
    '</div></nav>';
  }

  function buildFooter() {
    var quick = MENU.map(function (m) { return '<li><a href="' + P(m.href) + '">' + m.label + '</a></li>'; }).join("");
    var prod = MENU.find(function (m) { return m.page === "product"; }).children
      .map(function (c) { return '<li><a href="' + P(c.href) + '">' + c.label + '</a></li>'; }).join("");
    return '<footer class="site-footer"><div class="footer-grid">' +
      '<div class="footer-col footer-brand">' +
        '<img src="' + P("assets/img/logo.png") + '" alt="Logo Thiên Sứ">' +
        '<p>' + CO.name + ' — đơn vị tư vấn, thiết kế và thi công hệ thống bãi đỗ xe tự động thông minh Matrix Automatic Parking.</p>' +
        '<p style="margin-top:10px;">MST: ' + CO.mst + '</p>' +
      '</div>' +
      '<div class="footer-col"><h5>Liên kết</h5><ul>' + quick + '</ul></div>' +
      '<div class="footer-col"><h5>Sản phẩm</h5><ul>' + prod + '</ul></div>' +
      '<div class="footer-col"><h5>Liên hệ</h5>' +
        '<div class="footer-contact-row"><span class="fi">📍</span><span>' + CO.address + '</span></div>' +
        '<div class="footer-contact-row"><span class="fi">📞</span><a href="tel:' + CO.phoneRaw + '">' + CO.phone + '</a></div>' +
        '<div class="footer-contact-row"><span class="fi">✉️</span><a href="mailto:' + CO.email + '">' + CO.email + '</a></div>' +
        '<div class="footer-contact-row"><span class="fi">🌐</span><a href="https://' + CO.website + '" target="_blank" rel="noopener">' + CO.website + '</a></div>' +
      '</div>' +
    '</div>' +
    '<div class="footer-bottom">' +
      '<span>© ' + new Date().getFullYear() + ' ' + CO.name + '. Bảo lưu mọi quyền.</span>' +
      '<span>Thiết kế website · Matrix Automatic Parking</span>' +
    '</div></footer>';
  }

  function buildFloating() {
    return '' +
    '<div class="floating-cta">' +
      '<a class="fcta primary" href="' + P("lien-he/") + '">Nhận báo giá <span class="arw">→</span></a>' +
      '<a class="fcta ghost" href="' + P("san-pham/") + '">Xem sản phẩm <span class="arw">→</span></a>' +
      '<a class="fcta ghost" href="' + P(CO.catalogue) + '">Tải catalogue <span class="arw">→</span></a>' +
    '</div>' +
    '<a class="chat-fab" href="https://zalo.me/' + CO.zalo + '" target="_blank" rel="noopener"><span class="dot"></span> Chat Zalo</a>' +
    '<div class="search-overlay" id="search-overlay"><div class="search-box">' +
      '<input type="text" id="search-input" placeholder="Tìm nội dung: giải pháp, báo giá, năng lực..." autocomplete="off">' +
      '<div class="search-results" id="search-results"></div>' +
    '</div></div>' +
    '<div class="toast" id="site-toast"></div>';
  }

  var mount = function (id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; };
  mount("site-header", buildHeader());
  mount("site-footer", buildFooter());
  var fl = document.getElementById("site-floating");
  if (!fl) { fl = document.createElement("div"); fl.id = "site-floating"; document.body.appendChild(fl); }
  fl.innerHTML = buildFloating();

  // ─── Mobile menu ────────────────────────────────────────────
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".nav-menu");
  var isMobile = function () { return window.matchMedia("(max-width: 980px)").matches; };
  function closeMobile() { if (toggle) toggle.classList.remove("open"); if (menu) menu.classList.remove("open"); }
  if (toggle && menu) {
    toggle.addEventListener("click", function () { toggle.classList.toggle("open"); menu.classList.toggle("open"); });
  }
  document.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      if (isMobile()) { e.preventDefault(); link.parentElement.classList.toggle("open"); }
    });
  });

  // ─── VI/EN toggle ───────────────────────────────────────────
  function toast(msg) {
    var t = document.getElementById("site-toast");
    if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._t); t._t = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }
  document.querySelectorAll(".lang-btn").forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.dataset.lang === "en") { toast("Phiên bản tiếng Anh đang được cập nhật."); return; }
      document.querySelectorAll(".lang-btn").forEach(function (x) { x.classList.remove("active"); });
      b.classList.add("active");
    });
  });

  // ─── Search ─────────────────────────────────────────────────
  var overlay = document.getElementById("search-overlay");
  var input = document.getElementById("search-input");
  var results = document.getElementById("search-results");
  function openSearch() { overlay.classList.add("open"); setTimeout(function () { input.focus(); }, 50); renderResults(""); }
  function closeSearch() { overlay.classList.remove("open"); }
  function renderResults(q) {
    var nq = norm(q.trim());
    var list = !nq ? INDEX : INDEX.filter(function (r) { return norm(r.t + " " + r.s + " " + r.k).indexOf(nq) > -1; });
    if (!list.length) { results.innerHTML = '<div class="sr-empty">Không tìm thấy kết quả cho “' + q + '”.</div>'; return; }
    results.innerHTML = list.map(function (r) {
      return '<a href="' + P(r.u) + '"><div class="sr-title">' + r.t + '</div><div class="sr-sub">' + r.s + '</div></a>';
    }).join("");
  }
  var searchBtn = document.querySelector(".nav-search-btn");
  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  if (input) input.addEventListener("input", function () { renderResults(input.value); });
  if (overlay) overlay.addEventListener("click", function (e) { if (e.target === overlay) closeSearch(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeSearch(); });
})();
