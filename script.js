/* ==================== GLOBAL DATA & STATE ==================== */
const STORE_DATA = {
  whatsappNumber: "082169942899",
  
  // Rangkuman Harga Produk
  products: {
    robux: [
      { id: "rbx-50", name: "50 Robux", price: 11000 },
      { id: "rbx-80", name: "80 Robux", price: 16000 },
      { id: "rbx-150", name: "150 Robux", price: 29000 },
      { id: "rbx-300", name: "300 Robux", price: 53000 },
      { id: "rbx-500", name: "500 Robux", price: 82000 },
      { id: "rbx-750", name: "750 Robux", price: 115500 },
      { id: "rbx-1000", name: "1.000 Robux", price: 160000 },
      { id: "rbx-custom", name: "Custom Robux", isCustom: true, modal: "custom-robux-modal" }
    ],
    stealanegg: [
      { id: "sae-money", name: "x2 Money SAE", price: 45000 },
      { id: "sae-speed", name: "x2 Growth Speed SAE", price: 51000 },
      { id: "sae-egg", name: "Limited Egg SAE", price: 14000 },
      { id: "sae-joki", name: "Joki Speed Steal An Egg", price: 200, isJoki: true, modal: "joki-sae-modal" }
    ],
    ttd: [
      { id: "ttd-10k", name: "10.000 Gems", price: 650 },
      { id: "ttd-100k", name: "100.000 Gems", price: 3000 },
      { id: "ttd-500k", name: "500.000 Gems", price: 10000 },
      { id: "ttd-1m", name: "1.000.000 Gems", price: 17000 }
    ],
    mlbb: [
      { id: "ml-100", name: "100 Diamonds", price: 30000 },
      { id: "ml-300", name: "300 Diamonds", price: 92000 },
      { id: "ml-500", name: "500 Diamonds", price: 165000 },
      { id: "ml-1000", name: "1.000 Diamonds", price: 310000 },
      { id: "ml-custom", name: "Custom Diamonds", isCustom: true, modal: "custom-mlbb-modal" }
    ],
    nightforest: [
      { id: "nf-20", name: "20 Diamonds", price: 15000 },
      { id: "nf-100", name: "100 Diamonds", price: 45000 },
      { id: "nf-250", name: "250 Diamonds", price: 99000 },
      { id: "nf-700", name: "700 Diamonds", price: 269000 }
    ],
    freefire: [
      { id: "ff-70", name: "70 Diamonds", price: 10000 },
      { id: "ff-100", name: "100 Diamonds", price: 14000 },
      { id: "ff-200", name: "200 Diamonds", price: 27000 },
      { id: "ff-310", name: "310 Diamonds", price: 42000 },
      { id: "ff-520", name: "520 Diamonds", price: 67000 },
      { id: "ff-740", name: "740 Diamonds", price: 90000 },
      { id: "ff-1060", name: "1.060 Diamonds", price: 130000 },
      { id: "ff-custom", name: "Custom Diamonds Free Fire", isCustom: true, modal: "custom-ff-modal" }
    ]
  }
};

let state = {
  cart: [],
  currentLang: 'id',
  jokiHours: 1,
  activeCategoryKey: null
};

// MULTI-LANGUAGE TRANSLATION DICTIONARY
const TRANSLATIONS = {
  id: {
    menu: "MENU",
    nav_store: "Toko Utama",
    about_title: "Tentang Kami",
    report_title: "Laporkan Masalah",
    share_store: "Bagikan Toko",
    night_mode: "Night Mode",
    language: "Bahasa",
    promo_badge: "PROMO",
    promo_title: "Diskon 5% Khusus Hari Ini!",
    promo_desc: "Diskon 5% untuk pembelian di atas Rp 30.000!",
    btn_continue: "Lanjutkan ke Toko",
    hero_sub: "Top Up Game Digital Cepat, Murah & Terpercaya",
    catalog_title: "Kategori Produk",
    custom_not_found: "Tidak menemukan produk yang kamu cari?",
    custom_banner_desc: "Kamu dapat mengajukan pembelian item atau kebutuhan game online lainnya melalui RBXSTORE.ID. Hubungi kami untuk mengecek ketersediaan produk dan harga.",
    btn_custom_order: "Ajukan Custom Order",
    btn_back: "Kembali ke Toko",
    custom_subtitle: "PESANAN KHUSUS",
    custom_title: "Custom Pembelian",
    custom_desc: "Pilih game dan masukkan produk atau item yang ingin dibeli. Ketersediaan dan harga akan dikonfirmasi melalui WhatsApp.",
    label_select_game: "Pilih Game",
    label_game_name: "Nama Game:",
    label_order_name: "Nama Pesanan:",
    btn_buy_wa: "Beli langsung via WhatsApp",
    story_subtitle: "CERITA KAMI",
    story_title: "Kisah di Balik RBXSTORE.ID",
    story_p1: "RBXSTORE.ID dimulai pada 30 Juli 2025 dari sebuah ide sederhana yang muncul saat pendirinya sedang berada di sekolah. Ide kecil untuk menjual produk game online kemudian berkembang menjadi sesuatu yang lebih serius.",
    story_p2: "Pada awalnya, RBXSTORE.ID belum memiliki website atau toko digital. Menu produk pertama dibuat menggunakan kertas ketika toko masih dalam tahap pengembangan.",
    story_p3: "Seiring berkembangnya ide tersebut, seorang teman bernama Jesslyn membantu membuat menu produk yang lebih baik menggunakan Canva.",
    story_p4: "Seiring waktu, RBXSTORE.ID terus mengembangkan katalog, menghadirkan promosi dan diskon, serta menambah pilihan produk game untuk pelanggan.",
    story_p5: "Pada Juli 2026, RBXSTORE.ID mencapai tahap baru ketika pendirinya mulai mengembangkan website sendiri. Proyek ini berkembang dari menu berbasis kertas menjadi toko digital yang dibuat menggunakan HTML, CSS, JavaScript, GitHub, dan GitHub Pages.",
    story_p6: "Saat ini, RBXSTORE.ID terus beroperasi dan berkembang dengan tujuan memberikan cara yang sederhana dan nyaman bagi pelanggan untuk membeli produk game digital.",
    story_founded: "Didirikan 30 Juli 2025.",
    support_subtitle: "DUKUNGAN PELANGGAN",
    report_desc: "Mengalami masalah dengan RBXSTORE.ID? Kirim laporan di bawah ini dan berikan informasi yang cukup agar kami dapat memahami masalah kamu.",
    label_name: "Nama",
    label_category: "Kategori Masalah",
    label_explain: "Jelaskan masalah",
    btn_send_report: "Kirim Laporan",
    btn_add_cart: "Tambah ke Keranjang",
    custom_robux_inst: "Masukkan jumlah Robux yang diinginkan. Maksimal 10.000 Robux.",
    max_robux: "Maksimal: 10.000 Robux",
    custom_mlbb_inst: "Masukkan jumlah Diamonds yang diinginkan. Maksimal 10.000 Diamonds.",
    max_diamonds: "Maksimal: 10.000 Diamonds",
    price_waiting: "Harga: Menunggu informasi",
    custom_ff_inst: "Masukkan jumlah Diamonds yang diinginkan. Maksimal 10.000 Diamonds.",
    joki_ask_hours: "Mau joki berapa jam?",
    total_price: "Total Harga:",
    cart_title: "Keranjang Belanja",
    subtotal: "Subtotal",
    discount: "Diskon",
    total: "Total Akhir",
    discount_applied_note: "🎉 Selamat! Kamu mendapatkan diskon 5% untuk pembelian di atas Rp 30.000.",
    btn_checkout_wa: "Lanjutkan Pembelian via WhatsApp",
    footer_tag: "Penyedia Layanan & Top Up Game Digital Terpercaya."
  },
  en: {
    menu: "MENU",
    nav_store: "Main Store",
    about_title: "About Us",
    report_title: "Report an Issue",
    share_store: "Share Store",
    night_mode: "Night Mode",
    language: "Language",
    promo_badge: "PROMO",
    promo_title: "5% Discount Today!",
    promo_desc: "Get 5% off for purchases over Rp 30,000!",
    btn_continue: "Continue to Store",
    hero_sub: "Fast, Cheap & Trusted Digital Game Top Up",
    catalog_title: "Product Categories",
    custom_not_found: "Didn't find what you're looking for?",
    custom_banner_desc: "You can request custom online game items through RBXSTORE.ID. Contact us for availability and prices.",
    btn_custom_order: "Custom Order Request",
    btn_back: "Back to Store",
    custom_subtitle: "SPECIAL ORDER",
    custom_title: "Custom Purchase",
    custom_desc: "Select a game and enter the item you wish to purchase. Availability and pricing will be confirmed via WhatsApp.",
    label_select_game: "Select Game",
    label_game_name: "Game Name:",
    label_order_name: "Order Item Name:",
    btn_buy_wa: "Buy directly via WhatsApp",
    story_subtitle: "OUR STORY",
    story_title: "The Story Behind RBXSTORE.ID",
    story_p1: "RBXSTORE.ID started on July 30, 2025, from a simple idea during school hours.",
    story_p2: "Initially, RBXSTORE.ID had no website. The first menu was created on paper.",
    story_p3: "Later, a friend named Jesslyn helped design a better menu using Canva.",
    story_p4: "Over time, RBXSTORE.ID expanded its catalog, adding discounts and game options.",
    story_p5: "In July 2026, the founder launched the official website built with HTML, CSS, JS, and GitHub Pages.",
    story_p6: "Today, RBXSTORE.ID continues to grow, providing a smooth game product purchasing experience.",
    story_founded: "Founded July 30, 2025.",
    support_subtitle: "CUSTOMER SUPPORT",
    report_desc: "Experiencing an issue? Submit a report below with details.",
    label_name: "Name",
    label_category: "Issue Category",
    label_explain: "Explain the issue",
    btn_send_report: "Send Report",
    btn_add_cart: "Add to Cart",
    custom_robux_inst: "Enter desired Robux amount. Max 10,000 Robux.",
    max_robux: "Maximum: 10,000 Robux",
    custom_mlbb_inst: "Enter desired Diamonds amount. Max 10,000 Diamonds.",
    max_diamonds: "Maximum: 10,000 Diamonds",
    price_waiting: "Price: Awaiting confirmation",
    custom_ff_inst: "Enter desired Diamonds amount. Max 10,000 Diamonds.",
    joki_ask_hours: "How many hours of boosting?",
    total_price: "Total Price:",
    cart_title: "Shopping Cart",
    subtotal: "Subtotal",
    discount: "Discount",
    total: "Final Total",
    discount_applied_note: "🎉 Congrats! You get 5% off for purchases over Rp 30,000.",
    btn_checkout_wa: "Proceed to WhatsApp Checkout",
    footer_tag: "Trusted Digital Game Top Up & Services."
  },
  ph: {
    menu: "MENU",
    nav_store: "Pangunahing Tindahan",
    about_title: "Tungkol sa Amin",
    report_title: "Mag-ulat ng Problema",
    share_store: "Ibahagi ang Tindahan",
    night_mode: "Night Mode",
    language: "Wika",
    promo_badge: "PROMO",
    promo_title: "5% Diskwento Ngayon!",
    promo_desc: "Kumuha ng 5% diskwento sa mga pagbili nang higit sa Rp 30,000!",
    btn_continue: "Magpatuloy sa Tindahan",
    hero_sub: "Mabilis, Mura at Pinagkakatiwalaang Game Top Up",
    catalog_title: "Mga Kategorya ng Produkto",
    custom_not_found: "Hindi mahanap ang hinahanap mo?",
    custom_banner_desc: "Maaari kang humiling ng mga custom na item sa laro sa pamamagitan ng RBXSTORE.ID.",
    btn_custom_order: "Custom Order Request",
    btn_back: "Bumalik sa Tindahan",
    custom_subtitle: "SPECIAL ORDER",
    custom_title: "Custom na Pagbili",
    custom_desc: "Pumili ng laro at ilagay ang item na gusto mong bilhin.",
    label_select_game: "Pumili ng Laro",
    label_game_name: "Pangalan ng Laro:",
    label_order_name: "Pangalan ng Order:",
    btn_buy_wa: "Bumili sa WhatsApp",
    story_subtitle: "AMING KWENTO",
    story_title: "Ang Kwento sa Likod ng RBXSTORE.ID",
    story_p1: "Nagsimula ang RBXSTORE.ID noong Hulyo 30, 2025 mula sa isang simpleng ideya habang nasa paaralan.",
    story_p2: "Sa simula, walang website ang toko. Papel lang ang gamit na menu.",
    story_p3: "Tumulong si Jesslyn na gumawa ng mas magandang menu gamit ang Canva.",
    story_p4: "Lumawak ang katalogo at nagkaroon ng higit pang mga diskwento.",
    story_p5: "Noong Hulyo 2026, inilunsad ang opisyal na website.",
    story_p6: "Patuloy na nagbibigay ang RBXSTORE.ID ng mabilis at madaling serbisyo.",
    story_founded: "Ipinatayo noong Hulyo 30, 2025.",
    support_subtitle: "CUSTOMER SUPPORT",
    report_desc: "May problema? Magpadala ng ulat sa ibaba.",
    label_name: "Pangalan",
    label_category: "Kategorya ng Problema",
    label_explain: "Ipalwanag ang problema",
    btn_send_report: "Ipadala ang Ulat",
    btn_add_cart: "Iragdag sa Cart",
    custom_robux_inst: "Ilagay ang dami ng Robux. Max 10,000 Robux.",
    max_robux: "Pinakamataas: 10,000 Robux",
    custom_mlbb_inst: "Ilagay ang dami ng Diamonds. Max 10,000 Diamonds.",
    max_diamonds: "Pinakamataas: 10,000 Diamonds",
    price_waiting: "Presyo: Naghihintay ng impormasyon",
    custom_ff_inst: "Ilagay ang dami ng Diamonds. Max 10,000 Diamonds.",
    joki_ask_hours: "Ilang oras ng joki?",
    total_price: "Kabuuan Price:",
    cart_title: "Shopping Cart",
    subtotal: "Subtotal",
    discount: "Diskwento",
    total: "Kabuuan",
    discount_applied_note: "🎉 Nakakuha ka ng 5% diskwento sa pagbili ng higit sa Rp 30,000.",
    btn_checkout_wa: "Magpatuloy sa WhatsApp",
    footer_tag: "Pinagkakatiwalaang Serbisyo sa Top Up."
  },
  zh: {
    menu: "菜单",
    nav_store: "主页商店",
    about_title: "关于我们",
    report_title: "报告问题",
    share_store: "分享商店",
    night_mode: "夜间模式",
    language: "语言",
    promo_badge: "促销",
    promo_title: "今日享 5% 折扣！",
    promo_desc: "消费满 Rp 30.000 即可享受 5% 自动折扣！",
    btn_continue: "继续前往商店",
    hero_sub: "快速、实惠且值得信赖的游戏充值平台",
    catalog_title: "产品分类",
    custom_not_found: "没有找到您要找的东西？",
    custom_banner_desc: "您可以提交特殊游戏物品定制申请。联系我们确认库存和价格。",
    btn_custom_order: "申请定制订单",
    btn_back: "返回商店",
    custom_subtitle: "特别订单",
    custom_title: "自定义购买",
    custom_desc: "选择游戏并输入您想要购买的物品。",
    label_select_game: "选择游戏",
    label_game_name: "游戏名称：",
    label_order_name: "订单名称：",
    btn_buy_wa: "通过 WhatsApp 直接购买",
    story_subtitle: "我们的故事",
    story_title: "RBXSTORE.ID 故事",
    story_p1: "RBXSTORE.ID 始于 2025 年 7 月 30 日，灵感源于校园。",
    story_p2: "最初，我们没有网站，第一份菜单是用纸写的。",
    story_p3: "后来，朋友 Jesslyn 使用 Canva 帮助我们制作了更好的菜单。",
    story_p4: "随着时间推移，我们增加了更多产品和优惠促销。",
    story_p5: "2026 年 7 月，创始人推出了由 HTML, CSS, JS 和 GitHub Pages 打造的官方网站。",
    story_p6: "如今，RBXSTORE.ID 持续为玩家提供便捷的充值服务。",
    story_founded: "成立于 2025 年 7 月 30 日。",
    support_subtitle: "客户支持",
    report_desc: "遇到问题？请在下方提交报告。",
    label_name: "姓名",
    label_category: "问题类别",
    label_explain: "描述问题",
    btn_send_report: "发送报告",
    btn_add_cart: "加入购物车",
    custom_robux_inst: "输入需要的 Robux 数量。上限 10,000 Robux。",
    max_robux: "上限：10.000 Robux",
    custom_mlbb_inst: "输入需要的 Diamonds 数量。上限 10,000 Diamonds。",
    max_diamonds: "上限：10.000 Diamonds",
    price_waiting: "价格：等待确认",
    custom_ff_inst: "输入需要的 Diamonds 数量。上限 10,000 Diamonds。",
    joki_ask_hours: "代练多少小时？",
    total_price: "总价：",
    cart_title: "购物车",
    subtotal: "小计",
    discount: "折扣",
    total: "最终总额",
    discount_applied_note: "🎉 恭喜！消费满 Rp 30.000 享 5% 折扣。",
    btn_checkout_wa: "前往 WhatsApp 结算",
    footer_tag: "值得信赖的游戏数字充值服务商。"
  },
  es: {
    menu: "MENÚ",
    nav_store: "Tienda Principal",
    about_title: "Sobre Nosotros",
    report_title: "Reportar Problema",
    share_store: "Compartir Tienda",
    night_mode: "Modo Noche",
    language: "Idioma",
    promo_badge: "PROMO",
    promo_title: "¡5% de Descuento Hoy!",
    promo_desc: "¡Obtén un 5% de descuento en compras superiores a Rp 30.000!",
    btn_continue: "Continuar a la Tienda",
    hero_sub: "Rápido, Barato y Confiable Top Up de Juegos",
    catalog_title: "Categorías de Productos",
    custom_not_found: "¿No encuentras lo que buscas?",
    custom_banner_desc: "Puedes solicitar artículos personalizados. Contáctanos para consultar disponibilidad y precios.",
    btn_custom_order: "Solicitar Pedido Personalizado",
    btn_back: "Volver a la Tienda",
    custom_subtitle: "PEDIDO ESPECIAL",
    custom_title: "Compra Personalizada",
    custom_desc: "Selecciona un juego e ingresa el producto que deseas comprar.",
    label_select_game: "Seleccionar Juego",
    label_game_name: "Nombre del Juego:",
    label_order_name: "Nombre del Producto:",
    btn_buy_wa: "Comprar vía WhatsApp",
    story_subtitle: "NUESTRA HISTORIA",
    story_title: "La Historia detrás de RBXSTORE.ID",
    story_p1: "RBXSTORE.ID comenzó el 30 de julio de 2025 con una idea en la escuela.",
    story_p2: "Al principio, no teníamos sitio web. El menú estaba hecho en papel.",
    story_p3: "Jesslyn nos ayudó a diseñar un mejor menú en Canva.",
    story_p4: "Con el tiempo, expandimos el catálogo y las promociones.",
    story_p5: "En julio de 2026, lanzamos el sitio web oficial en GitHub Pages.",
    story_p6: "Hoy seguimos creciendo para ofrecer la mejor experiencia.",
    story_founded: "Fundado el 30 de julio de 2025.",
    support_subtitle: "SOPORTE AL CLIENTE",
    report_desc: "¿Tienes algún problema? Envíanos un informe a continuación.",
    label_name: "Nombre",
    label_category: "Categoría del Problema",
    label_explain: "Explica el problema",
    btn_send_report: "Enviar Informe",
    btn_add_cart: "Añadir al Carrito",
    custom_robux_inst: "Ingresa la cantidad de Robux. Máximo 10.000 Robux.",
    max_robux: "Máximo: 10.000 Robux",
    custom_mlbb_inst: "Ingresa la cantidad de Diamonds. Máximo 10.000 Diamonds.",
    max_diamonds: "Máximo: 10.000 Diamonds",
    price_waiting: "Precio: Esperando información",
    custom_ff_inst: "Ingresa la cantidad de Diamonds. Máximo 10.000 Diamonds.",
    joki_ask_hours: "¿Cuántas horas de boost?",
    total_price: "Precio Total:",
    cart_title: "Carrito de Compras",
    subtotal: "Subtotal",
    discount: "Descuento",
    total: "Total Final",
    discount_applied_note: "🎉 ¡Felicidades! Obtienes un 5% de descuento en compras de más de Rp 30.000.",
    btn_checkout_wa: "Proceder al Pago en WhatsApp",
    footer_tag: "Servicio de Top Up de Juegos Digitales de Confianza."
  }
};

/* ==================== INITIALIZATION ==================== */
document.addEventListener("DOMContentLoaded", () => {
  initIntroScreen();
});

// INTRO ANIMATION SEQUENCE
function initIntroScreen() {
  const introScreen = document.getElementById("intro-screen");
  const introText = document.getElementById("intro-text");

  // 1. Setelah 0.3s -> Muncul Teks
  setTimeout(() => {
    introText.classList.add("show");

    // 2. Teks tampil selama 2s
    setTimeout(() => {
      // 3. Fade out teks selama 0.3s
      introText.classList.add("fade-out");

      setTimeout(() => {
        // 4. Background bergeser ke samping
        introScreen.classList.add("slide-out");

        setTimeout(() => {
          introScreen.style.display = "none";
          // 5. Tampilkan Modal Promo
          document.getElementById("promo-modal").classList.add("active");
        }, 600);

      }, 300);

    }, 2000);

  }, 300);
}

/* ==================== NAVIGATION & PAGES ==================== */
function showPage(pageId) {
  document.querySelectorAll(".page-section").forEach(section => {
    section.classList.remove("active");
  });

  const targetPage = document.getElementById(`page-${pageId}`);
  if (targetPage) {
    targetPage.classList.add("active");
  }

  // Scroll back to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function navigateTo(pageId) {
  toggleSidebar();
  showPage(pageId);
}

function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

/* ==================== PROMO MODAL ==================== */
function closePromoModal() {
  document.getElementById("promo-modal").classList.remove("active");
}

/* ==================== CATEGORY & POPUP LOGIC ==================== */
function openCategoryModal(categoryKey) {
  state.activeCategoryKey = categoryKey;
  const modal = document.getElementById("category-modal");
  const titleEl = document.getElementById("cat-modal-title");
  const bodyEl = document.getElementById("cat-modal-body");

  const categoryTitles = {
    robux: "Robux - Roblox",
    stealanegg: "Steal An Egg - Roblox",
    ttd: "Toilet Tower Defense - Roblox",
    mlbb: "Mobile Legends",
    nightforest: "99 Night In The Forest - Roblox",
    freefire: "Free Fire"
  };

  titleEl.innerText = categoryTitles[categoryKey] || "Produk";
  bodyEl.innerHTML = "";

  const products = STORE_DATA.products[categoryKey] || [];

  products.forEach(prod => {
    const row = document.createElement("div");
    row.className = "product-item-row";

    if (prod.isCustom) {
      row.innerHTML = `
        <div class="product-item-info">
          <h4>${prod.name}</h4>
          <p class="text-muted">Klik untuk memilih jumlah</p>
        </div>
        <div class="product-item-actions">
          <button class="btn btn-primary" onclick="openCustomModal('${prod.modal}')">Pilih</button>
        </div>
      `;
    } else if (prod.isJoki) {
      row.innerHTML = `
        <div class="product-item-info">
          <h4>${prod.name}</h4>
          <p>Rp 200 / Jam</p>
        </div>
        <div class="product-item-actions">
          <button class="btn btn-primary" onclick="openJokiModal()">Pilih Jam</button>
        </div>
      `;
    } else {
      row.innerHTML = `
        <div class="product-item-info">
          <h4>${prod.name}</h4>
          <p>Rp ${formatRupiah(prod.price)}</p>
        </div>
        <div class="product-item-actions">
          <button class="btn-icon-action btn-secondary" title="Tambah ke Keranjang" onclick="addToCart('${prod.id}', '${prod.name}', ${prod.price})">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
          <button class="btn-icon-action btn-wa" title="Beli Direct WhatsApp" onclick="buyDirectWA('${prod.name}', ${prod.price})">
            <i class="fa-brands fa-whatsapp"></i>
          </button>
        </div>
      `;
    }

    bodyEl.appendChild(row);
  });

  modal.classList.add("active");
}

function closeCategoryModal() {
  document.getElementById("category-modal").classList.remove("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

function openCustomModal(modalId) {
  closeCategoryModal();
  document.getElementById(modalId).classList.add("active");
}

/* ==================== INPUT VALIDATION ==================== */
function validateDigits(input, maxVal) {
  // Hanya angka yang diperbolehkan
  input.value = input.value.replace(/[^0-9]/g, '');
  if (parseInt(input.value) > maxVal) {
    input.value = maxVal;
  }
}

/* ==================== JOKI SPEED COUNTER ==================== */
function openJokiModal() {
  closeCategoryModal();
  state.jokiHours = 1;
  updateJokiUI();
  document.getElementById("joki-sae-modal").classList.add("active");
}

function updateJokiHours(delta) {
  state.jokiHours += delta;
  if (state.jokiHours < 1) state.jokiHours = 1;
  if (state.jokiHours > 1000) state.jokiHours = 1000;
  updateJokiUI();
}

function updateJokiUI() {
  const price = state.jokiHours * 200;
  document.getElementById("joki-hours-display").innerText = state.jokiHours;
  document.getElementById("joki-price-display").innerText = `Rp ${formatRupiah(price)}`;
}

function addJokiToCart() {
  const price = state.jokiHours * 200;
  addToCart(`joki-sae-${state.jokiHours}h`, `Joki Speed Steal An Egg (${state.jokiHours} Jam)`, price);
  closeModal("joki-sae-modal");
}

function buyJokiWA() {
  const price = state.jokiHours * 200;
  sendWhatsAppDirect(`Joki Speed Steal An Egg (${state.jokiHours} Jam)`, price);
}

/* ==================== CUSTOM PRODUCTS HANDLERS ==================== */
// Custom Robux
function addCustomRobuxToCart() {
  const qty = document.getElementById("input-custom-robux").value;
  if (!qty || qty < 1) return alert("Masukkan jumlah Robux!");
  addToCart(`custom-rbx-${qty}`, `Custom Robux (${qty} Robux)`, 0, true);
  closeModal("custom-robux-modal");
}

function buyCustomRobuxWA() {
  const qty = document.getElementById("input-custom-robux").value;
  if (!qty || qty < 1) return alert("Masukkan jumlah Robux!");
  sendCustomWA("Robux - Roblox", `${qty} Robux`);
}

// Custom MLBB
function addCustomMlbbToCart() {
  const qty = document.getElementById("input-custom-mlbb").value;
  if (!qty || qty < 1) return alert("Masukkan jumlah Diamonds!");
  addToCart(`custom-ml-${qty}`, `Custom Diamonds MLBB (${qty} Diamonds)`, 0, true);
  closeModal("custom-mlbb-modal");
}

function buyCustomMlbbWA() {
  const qty = document.getElementById("input-custom-mlbb").value;
  if (!qty || qty < 1) return alert("Masukkan jumlah Diamonds!");
  sendCustomWA("Mobile Legends", `${qty} Diamonds`);
}

// Custom Free Fire
function addCustomFFToCart() {
  const qty = document.getElementById("input-custom-ff").value;
  if (!qty || qty < 1) return alert("Masukkan jumlah Diamonds!");
  addToCart(`custom-ff-${qty}`, `Custom Diamonds Free Fire (${qty} Diamonds)`, 0, true);
  closeModal("custom-ff-modal");
}

function buyCustomFFWA() {
  const qty = document.getElementById("input-custom-ff").value;
  if (!qty || qty < 1) return alert("Masukkan jumlah Diamonds!");
  sendCustomWA("Free Fire", `${qty} Diamonds`);
}

/* ==================== CUSTOM PURCHASE PAGE ==================== */
function toggleCustomOtherInput() {
  const select = document.getElementById("custom-game-select");
  const otherGroup = document.getElementById("custom-other-game-group");
  if (select.value === "Other") {
    otherGroup.classList.remove("hidden");
    document.getElementById("custom-other-game").required = true;
  } else {
    otherGroup.classList.add("hidden");
    document.getElementById("custom-other-game").required = false;
  }
}

function handleCustomOrder(e) {
  e.preventDefault();
  const select = document.getElementById("custom-game-select").value;
  const item = document.getElementById("custom-item-name").value;
  let gameName = select;

  if (select === "Other") {
    gameName = document.getElementById("custom-other-game").value;
  }

  sendCustomWA(gameName, item);
}

/* ==================== SHOPPING CART SYSTEM ==================== */
function addToCart(id, name, price, isCustom = false) {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ id, name, price, qty: 1, isCustom });
  }
  updateCartUI();
  
  // Quick notification
  alert(`${name} telah ditambahkan ke keranjang!`);
}

function updateCartQty(id, delta) {
  const item = state.cart.find(item => item.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(id);
      return;
    }
  }
  updateCartUI();
}

function removeFromCart(id) {
  state.cart = state.cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  const cartCountEl = document.getElementById("cart-count");
  const itemsContainer = document.getElementById("cart-items-list");
  
  const totalItems = state.cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountEl.innerText = totalItems;

  itemsContainer.innerHTML = "";

  if (state.cart.length === 0) {
    itemsContainer.innerHTML = `<p class="text-muted align-center" style="padding:20px;">Keranjang kamu masih kosong.</p>`;
    document.getElementById("cart-subtotal").innerText = "Rp 0";
    document.getElementById("cart-total").innerText = "Rp 0";
    document.getElementById("cart-discount-row").classList.add("hidden");
    document.getElementById("cart-discount-note").classList.add("hidden");
    return;
  }

  let subtotal = 0;
  let hasEligibleDiscountItems = false;

  state.cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <div>
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">${item.isCustom ? 'Harga Konfirmasi WA' : 'Rp ' + formatRupiah(item.price)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
        <span>${item.qty}</span>
        <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
        <button class="delete-btn" onclick="removeFromCart('${item.id}')"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    itemsContainer.appendChild(row);
  });

  // Sistem Diskon 5% untuk total di atas Rp 30.000
  let discount = 0;
  if (subtotal > 30000) {
    discount = subtotal * 0.05;
    document.getElementById("cart-discount-row").classList.remove("hidden");
    document.getElementById("cart-discount-note").classList.remove("hidden");
  } else {
    document.getElementById("cart-discount-row").classList.add("hidden");
    document.getElementById("cart-discount-note").classList.add("hidden");
  }

  const finalTotal = subtotal - discount;

  document.getElementById("cart-subtotal").innerText = `Rp ${formatRupiah(subtotal)}`;
  document.getElementById("cart-discount").innerText = `-Rp ${formatRupiah(discount)}`;
  document.getElementById("cart-total").innerText = `Rp ${formatRupiah(finalTotal)}`;
}

function toggleCartModal() {
  document.getElementById("cart-modal").classList.toggle("active");
}

/* ==================== WHATSAPP CHECKOUT ENGINE ==================== */
function checkoutCartWA() {
  if (state.cart.length === 0) return alert("Keranjang kamu kosong!");

  let subtotal = 0;
  let orderList = "";

  state.cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    orderList += `${index + 1}. ${item.name} x${item.qty} ${item.isCustom ? '(Harga Custom)' : '- Rp ' + formatRupiah(itemTotal)}\n`;
  });

  let text = `Halo RBXSTORE.ID, saya ingin membeli:\n\n${orderList}\n`;

  if (subtotal > 30000) {
    const discount = subtotal * 0.05;
    const finalTotal = subtotal - discount;
    text += `Subtotal: Rp ${formatRupiah(subtotal)}\n`;
    text += `Diskon: 5%\n`;
    text += `Total setelah diskon: Rp ${formatRupiah(finalTotal)}`;
  } else {
    text += `Total: Rp ${formatRupiah(subtotal)}`;
  }

  openWhatsApp(text);
}

function sendWhatsAppDirect(productName, price) {
  let text = `Halo RBXSTORE.ID, saya ingin membeli:\n`;
  text += `Produk: ${productName}\n`;
  text += `Harga: Rp ${formatRupiah(price)}\n`;

  if (price > 30000) {
    const discount = price * 0.05;
    const finalTotal = price - discount;
    text += `Diskon: 5%\n`;
    text += `Total setelah diskon: Rp ${formatRupiah(finalTotal)}`;
  }

  openWhatsApp(text);
}

function sendCustomWA(gameName, itemOrQty) {
  let text = `Halo RBXSTORE.ID, saya ingin mengajukan Pembelian Custom:\n`;
  text += `Game: ${gameName}\n`;
  text += `Pesanan / Detail: ${itemOrQty}\n`;
  text += `Mohon info ketersediaan dan harganya. Terima kasih!`;

  openWhatsApp(text);
}

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${STORE_DATA.whatsappNumber}?text=${encodedMessage}`;
  window.open(url, '_blank');
}

/* ==================== REPORT ISSUE & GMAIL ==================== */
function handleReportSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("report-name").value;
  const category = document.getElementById("report-category").value;
  const detail = document.getElementById("report-detail").value;

  const subject = encodeURIComponent(`[Laporan Masalah - ${category}] dari ${name}`);
  const body = encodeURIComponent(`Nama Pelanggan: ${name}\nKategori Masalah: ${category}\n\nDetail Masalah:\n${detail}`);
  
  // Mengarahkan ke mailto Gmail callvinlionel50@gmail.com
  const mailtoUrl = `mailto:callvinlionel50@gmail.com?subject=${subject}&body=${body}`;
  window.location.href = mailtoUrl;
}

/* ==================== SHARE STORE ==================== */
function shareStore() {
  const shareData = {
    title: 'RBXSTORE.ID',
    text: 'Beli Robux, Gamepass, dan Top Up Game Murah & Terpercaya di RBXSTORE.ID!',
    url: window.location.href.includes('rbxstoreid') ? window.location.href : 'https://rbxstoreid.github.io'
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    navigator.clipboard.writeText(shareData.url);
    alert('Link toko berhasil disalin ke clipboard!');
  }
}

/* ==================== NIGHT MODE TOGGLE ==================== */
function toggleNightMode() {
  const isDark = document.getElementById("night-mode-toggle").checked;
  if (isDark) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

/* ==================== MULTI-LANGUAGE TRANSLATOR ==================== */
function changeLanguage(langCode) {
  state.currentLang = langCode;
  const langDict = TRANSLATIONS[langCode] || TRANSLATIONS.id;

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (langDict[key]) {
      el.innerText = langDict[key];
    }
  });
}

/* ==================== HELPER FUNCTIONS ==================== */
function formatRupiah(number) {
  return new Intl.NumberFormat('id-ID').format(number);
}
