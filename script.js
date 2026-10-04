/* ==========================================
   CONFIG & STATE MANAGEMENT
   ========================================== */
const STORE_CONFIG = {
    whatsappNumber: "6282169942899", // Format internasional tanpa angka 0 di depan
    reportEmail: "callvinlionel50@gmail.com",
    promoStartDate: new Date("2026-10-01T00:00:00"),
    promoEndDate: new Date("2026-10-31T23:59:59"),
    validVouchers: [
        "HAPPYHALLOWEEN2026",
        "RBXSTOREIDOCTOBER",
        "RBXSTOREIDN2026"
    ]
};

// State Pesanan Saat Ini
let currentOrder = {
    name: "",
    price: 0,
    qty: 1,
    baseDiscountPercent: 0,
    voucherDiscountPercent: 0,
    voucherApplied: false,
    finalTotal: 0
};

/* ==========================================
   1. EMAILJS INIT & REPORT FORM HANDLER
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Inisialisasi EmailJS (Ganti Public Key jika sudah mendaftar EmailJS)
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY");
    }

    // Listener Form Laporan
    const reportForm = document.getElementById("report-form");
    if (reportForm) {
        reportForm.addEventListener("submit", handleReportSubmit);
    }

    // Listener Tombol Cart & WA Redirect
    setupProductCardListeners();
    setupCheckoutModalListeners();
});

// Pengiriman Email Laporan
function handleReportSubmit(e) {
    e.preventDefault();
    const statusMsg = document.getElementById("report-status");
    const name = document.getElementById("report-name").value;
    const email = document.getElementById("report-email").value;
    const message = document.getElementById("report-message").value;

    statusMsg.style.color = "#38bdf8";
    statusMsg.innerText = "Mengirim laporan...";

    const templateParams = {
        from_name: name,
        from_email: email,
        to_email: STORE_CONFIG.reportEmail,
        message: message
    };

    // Menggunakan EmailJS atau Fallback Mailto
    if (typeof emailjs !== 'undefined' && emailjs.send) {
        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams)
            .then(() => {
                statusMsg.style.color = "#22c55e";
                statusMsg.innerText = "Laporan berhasil dikirim ke " + STORE_CONFIG.reportEmail;
                reportForm.reset();
            })
            .catch(() => {
                fallbackMailto(name, email, message);
            });
    } else {
        fallbackMailto(name, email, message);
    }
}

function fallbackMailto(name, email, message) {
    const statusMsg = document.getElementById("report-status");
    const mailtoUrl = `mailto:${STORE_CONFIG.reportEmail}?subject=Laporan dari ${encodeURIComponent(name)}&body=${encodeURIComponent("Email: " + email + "\n\nPesan:\n" + message)}`;
    window.location.href = mailtoUrl;
    statusMsg.style.color = "#22c55e";
    statusMsg.innerText = "Membuka aplikasi email untuk mengirim laporan...";
}

/* ==========================================
   2. KATALOG & TOMBOL cart / WA REDIRECT
   ========================================== */
function setupProductCardListeners() {
    // Semua tombol WA & Cart diarahkan ke alur checkout yang sama (Step 2 Preview)
    const productButtons = document.querySelectorAll(".add-to-cart-btn, .trigger-cart-redirect");
    
    productButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const card = e.target.closest(".product-card");
            const name = card.getAttribute("data-name");
            const price = parseInt(card.getAttribute("data-price"), 10);

            openCheckoutModal(name, price);
        });
    });

    const openCartBtn = document.getElementById("open-cart-btn");
    if (openCartBtn) {
        openCartBtn.addEventListener("click", () => {
            if (currentOrder.name) {
                document.getElementById("checkout-modal").style.display = "flex";
            } else {
                alert("Cart masih kosong. Silakan pilih produk terlebih dahulu!");
            }
        });
    }
}

/* ==========================================
   3. MODAL CHECKOUT & HITUNG DISKON (STEP 2)
   ========================================== */
function openCheckoutModal(productName, productPrice) {
    // Reset State Voucher
    currentOrder = {
        name: productName,
        price: productPrice,
        qty: 1,
        baseDiscountPercent: 0,
        voucherDiscountPercent: 0,
        voucherApplied: false,
        finalTotal: productPrice
    };

    // Update Cart Badge
    document.getElementById("cart-count").innerText = "1";

    // Hitung Diskon Bawaan (Pembelian > 30K Diskon 5%)
    if (currentOrder.price > 30000) {
        currentOrder.baseDiscountPercent = 5;
    }

    // Reset Input Voucher UI
    document.getElementById("voucher-code").value = "";
    document.getElementById("voucher-status-msg").innerText = "";

    calculateAndUpdateUI();

    // Tampilkan Modal
    document.getElementById("checkout-modal").style.display = "flex";
}

function calculateAndUpdateUI() {
    const rawTotal = currentOrder.price * currentOrder.qty;
    
    // Total Persentase Diskon (5% otomatis >30K, atau 10% jika voucher di-claim)
    let activeDiscountPercent = currentOrder.baseDiscountPercent;
    if (currentOrder.voucherApplied) {
        activeDiscountPercent = 10; // Sesudah claim voucher jadi total 10%
    }

    const discountAmount = rawTotal * (activeDiscountPercent / 100);
    currentOrder.finalTotal = rawTotal - discountAmount;

    // Render UI Text
    document.getElementById("summary-name").innerText = currentOrder.name;
    document.getElementById("summary-qty").innerText = currentOrder.qty;
    document.getElementById("summary-price").innerText = formatRupiah(currentOrder.price);
    
    // Teks Diskon & Catatan
    const discountElement = document.getElementById("summary-discount");
    const noteElement = document.getElementById("discount-note");
    
    discountElement.innerText = activeDiscountPercent + "%";
    if (currentOrder.voucherApplied) {
        noteElement.innerText = " (Voucher Klaim 10%)";
        noteElement.style.color = "#22c55e";
    } else if (currentOrder.baseDiscountPercent > 0) {
        noteElement.innerText = " (karena pembelanjaan di atas 30K)";
        noteElement.style.color = "#38bdf8";
    } else {
        noteElement.innerText = "";
    }

    document.getElementById("summary-total").innerText = formatRupiah(currentOrder.finalTotal);
}

/* ==========================================
   4. KLAIM VOUCHER & VALIDASI TANGGAL/CAPS
   ========================================== */
function setupCheckoutModalListeners() {
    const modal = document.getElementById("checkout-modal");
    const closeBtn = document.querySelector(".close-modal");
    const claimBtn = document.getElementById("claim-voucher-btn");
    const proceedWaBtn = document.getElementById("proceed-to-wa-btn");

    // Close Modal
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });

    // Claim Voucher Event
    claimBtn.addEventListener("click", handleVoucherClaim);

    // Lanjut ke WhatsApp
    proceedWaBtn.addEventListener("click", handleProceedToWhatsApp);
}

function handleVoucherClaim() {
    const inputField = document.getElementById("voucher-code");
    const inputCode = inputField.value.trim();
    const statusMsg = document.getElementById("voucher-status-msg");

    const currentDate = new Date(); // Hari ini: 4 Oktober 2026

    // Validasi Masa Berlaku Promo (1 OKTOBER 2026 - 31 OKTOBER 2026)
    if (currentDate < STORE_CONFIG.promoStartDate || currentDate > STORE_CONFIG.promoEndDate) {
        statusMsg.style.color = "#ef4444";
        statusMsg.innerText = "Kode voucher sudah expired!";
        return;
    }

    // Validasi Harus Wajib CAPS (Huruf Kapital Semua)
    if (inputCode !== inputCode.toUpperCase() || inputCode === "") {
        statusMsg.style.color = "#ef4444";
        statusMsg.innerText = "Klaim gagal! Kode voucher wajib huruf KAPITAL (CAPS) semua.";
        return;
    }

    // Validasi Kesesuaian Kode Voucher
    if (STORE_CONFIG.validVouchers.includes(inputCode)) {
        currentOrder.voucherApplied = true;
        statusMsg.style.color = "#22c55e";
        statusMsg.innerText = "Berhasil! Kode voucher diterapkan (Diskon 10%).";
        
        calculateAndUpdateUI();
    } else {
        statusMsg.style.color = "#ef4444";
        statusMsg.innerText = "Kode voucher tidak valid!";
    }
}

/* ==========================================
   5. FORMAT PESAN WA & REDIRECT VIA WA
   ========================================== */
function handleProceedToWhatsApp() {
    // Ambil Pilihan Pembayaran yang Dipilih
    const selectedPayment = document.querySelector('input[name="payment_method"]:checked').value;
    
    // Tentukan Persentase Diskon Teks
    let discountText = "0%";
    if (currentOrder.voucherApplied) {
        discountText = "10%";
    } else if (currentOrder.baseDiscountPercent > 0) {
        discountText = "5%";
    }

    // Format Template Pesan Sesuai Format
    const waText = 
`nama pesanan : ${currentOrder.name}
jumlah : ${currentOrder.qty}
harga : ${formatRupiah(currentOrder.price)}
diskon : ${discountText}
total : ${formatRupiah(currentOrder.finalTotal)}
pembayaran : ${selectedPayment.toLowerCase()}`;

    // Encode URL & Redirect ke WA
    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodedText}`;

    window.open(waUrl, "_blank");
}

/* ==========================================
   HELPER FUNCTIONS
   ========================================== */
function formatRupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID") + ",-";
}
