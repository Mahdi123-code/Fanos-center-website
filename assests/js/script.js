document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       LOAD NAVBAR
    ========================================================= */

    fetch("../components/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Navbar could not be loaded.");
            }

            return response.text();
        })
        .then(data => {

            const navbar = document.getElementById("navbar");

            if (!navbar) {
                return;
            }

            navbar.innerHTML = data;

            /*
             * Navbar has now been inserted into the page.
             * We can safely initialize navbar-specific JavaScript.
             */
            initializeNavbar();

        })
        .catch(error => {
            console.error("Navbar error:", error);
        });


    /* =========================================================
       LOAD FOOTER
    ========================================================= */

    fetch("../components/footer.html")
        .then(response => {

            if (!response.ok) {
                throw new Error("Footer could not be loaded.");
            }

            return response.text();

        })
        .then(data => {

            const footer = document.getElementById("footer");

            if (!footer) {
                return;
            }

            footer.innerHTML = data;

        })
        .catch(error => {
            console.error("Footer error:", error);
        });


    /* =========================================================
       COURSE CAROUSEL
    ========================================================= */

    initializeCourseCarousel();

});


/* =========================================================
   NAVBAR
========================================================= */

function initializeNavbar() {

    const menuBtn = document.querySelector(".navbar-toggler");

    if (!menuBtn) {
        return;
    }

    const menuIcon = menuBtn.querySelector(".menu-icon");

    if (!menuIcon) {
        return;
    }


    /*
     * Bootstrap changes aria-expanded automatically.
     * We only change the visual icon.
     */

    menuBtn.addEventListener("click", function () {

        setTimeout(function () {

            const isOpen =
                menuBtn.getAttribute("aria-expanded") === "true";

            if (isOpen) {

                menuIcon.classList.add("menu-open");

            } else {

                menuIcon.classList.remove("menu-open");

            }

        }, 50);

    });

}


/* =========================================================
   COURSE CAROUSEL
========================================================= */

function initializeCourseCarousel() {

    const viewport =
        document.querySelector(".courses-viewport");

    const track =
        document.querySelector(".courses-track");

    const nextButton =
        document.querySelector(".next-btn");

    const prevButton =
        document.querySelector(".prev-btn");

    const cards =
        document.querySelectorAll(".course-card");


    /*
     * Important:
     * If this page doesn't contain the course carousel,
     * simply stop this function.
     */

    if (
        !viewport ||
        !track ||
        !nextButton ||
        !prevButton ||
        cards.length === 0
    ) {
        return;
    }


    let currentIndex = 0;


    /* =================================
       GET VISIBLE CARD COUNT
    ================================= */

    function getVisibleCards() {

        if (window.innerWidth <= 575) {
            return 1;
        }

        if (window.innerWidth <= 991) {
            return 2;
        }

        return 3;

    }


    /* =================================
       GET CARD MOVEMENT
    ================================= */

    function getMoveAmount() {

        const card = cards[0];

        const cardWidth =
            card.offsetWidth;

        const styles =
            window.getComputedStyle(track);

        const gap =
            parseFloat(styles.columnGap) || 0;

        return cardWidth + gap;

    }


    /* =================================
       MOVE CAROUSEL
    ================================= */

    function updateCarousel() {

        /*
         * Mobile uses native horizontal scrolling.
         */

        if (window.innerWidth <= 575) {
            return;
        }

        const moveAmount =
            getMoveAmount();

        track.style.transform =
            `translateX(-${currentIndex * moveAmount}px)`;

    }


    /* =================================
       NEXT
    ================================= */

    nextButton.addEventListener("click", function () {

        const visibleCards =
            getVisibleCards();

        const maxIndex =
            cards.length - visibleCards;


        if (currentIndex < maxIndex) {

            currentIndex++;

            updateCarousel();

        }

    });


    /* =================================
       PREVIOUS
    ================================= */

    prevButton.addEventListener("click", function () {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    /* =================================
       RESIZE
    ================================= */

    window.addEventListener("resize", function () {

        currentIndex = 0;

        track.style.transform =
            "translateX(0)";

    });

}


/* =========================================================
   GLOBAL LOGIN MODAL
   Works on every page
   Navbar is dynamically loaded
========================================================= */

(function () {


    /* =====================================================
       LOGIN MODAL HTML
    ===================================================== */

    const loginModalHTML = `

        <div
            class="login-overlay"
            id="loginModal"
            aria-hidden="true"
        >

            <div
                class="login-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="loginTitle"
            >

                <button
                    type="button"
                    class="login-close"
                    id="loginClose"
                    aria-label="بستن"
                >
                    <i class="bx bx-x"></i>
                </button>


                <!-- VISUAL SIDE -->

                <div class="login-visual">

                    <div class="login-visual-content">

                        <div class="login-visual-logo">

                            <img
                                src="../assests/images/logo.jpg"
                                alt="مجتمع علمی فرهنگی فانوس"
                            >

                        </div>

                        <h3>
                            مجتمع علمی فرهنگی فانوس
                        </h3>

                        <p>
                            محیطی برای یادگیری، رشد و ارتباط
                        </p>

                    </div>

                </div>


                <!-- FORM SIDE -->

                <div class="login-form-area">

                    <div class="login-form-content">


                        <div class="login-heading">

                            <span class="login-eyebrow">
                                خوش آمدید
                            </span>

                            <h2 id="loginTitle">
                                ورود به حساب کاربری
                            </h2>

                            <p>
                                برای ادامه وارد حساب خود شوید
                            </p>

                        </div>


                        <form
                            id="loginForm"
                            novalidate
                        >


                            <!-- EMAIL -->

                            <div class="login-field">

                                <label for="loginEmail">
                                    ایمیل
                                </label>

                                <div class="login-input-wrapper">

                                    <i class="bx bx-envelope"></i>

                                    <input
                                        type="email"
                                        id="loginEmail"
                                        name="email"
                                        placeholder="ایمیل خود را وارد کنید"
                                        autocomplete="email"
                                        required
                                    >

                                </div>

                                <small
                                    class="login-error"
                                    id="emailError"
                                ></small>

                            </div>


                            <!-- PASSWORD -->

                            <div class="login-field">

                                <div class="login-label-row">

                                    <label for="loginPassword">
                                        رمز عبور
                                    </label>

                                    <a
                                        href="#"
                                        class="forgot-password"
                                        id="forgotPassword"
                                    >
                                        رمز عبور را فراموش کرده اید؟
                                    </a>

                                </div>


                                <div class="login-input-wrapper">

                                    <i class="bx bx-lock-alt"></i>

                                    <input
                                        type="password"
                                        id="loginPassword"
                                        name="password"
                                        placeholder="رمز عبور خود را وارد کنید"
                                        autocomplete="current-password"
                                        required
                                    >


                                    <button
                                        type="button"
                                        class="password-toggle"
                                        id="passwordToggle"
                                        aria-label="نمایش رمز عبور"
                                    >

                                        <i class="bx bx-show"></i>

                                    </button>

                                </div>


                                <small
                                    class="login-error"
                                    id="passwordError"
                                ></small>

                            </div>


                            <!-- REMEMBER -->

                            <div class="login-options">

                                <label class="remember-login">

                                    <input
                                        type="checkbox"
                                        id="rememberLogin"
                                    >

                                    <span>
                                        مرا به خاطر بسپار
                                    </span>

                                </label>

                            </div>


                            <!-- SUBMIT -->

                            <button
                                type="submit"
                                class="login-submit"
                                id="loginSubmit"
                            >

                                <span>
                                    ورود به حساب
                                </span>

                                <i class="bx bx-left-arrow-alt"></i>

                            </button>


                            <!-- REGISTER -->

                            <div class="login-register">

                                <span>
                                    حساب کاربری ندارید؟
                                </span>

                                <a href="#">
                                    ثبت نام کنید
                                </a>

                            </div>


                        </form>

                    </div>

                </div>

            </div>

        </div>

    `;


    /* =====================================================
       CREATE MODAL
    ===================================================== */

    function createLoginModal() {

        if (document.getElementById("loginModal")) {
            return;
        }

        document.body.insertAdjacentHTML(
            "beforeend",
            loginModalHTML
        );

        setupLoginEvents();

    }


    /* =====================================================
       OPEN
    ===================================================== */

    function openLoginModal() {

        createLoginModal();

        const modal =
            document.getElementById("loginModal");


        modal.classList.add("is-open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "login-modal-open"
        );


        setTimeout(function () {

            const email =
                document.getElementById("loginEmail");

            if (email) {
                email.focus();
            }

        }, 300);

    }


    /* =====================================================
       CLOSE
    ===================================================== */

    function closeLoginModal() {

        const modal =
            document.getElementById("loginModal");

        if (!modal) {
            return;
        }


        modal.classList.remove("is-open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "login-modal-open"
        );

    }


    /* =====================================================
       LOGIN EVENTS
    ===================================================== */

    function setupLoginEvents() {

        const modal =
            document.getElementById("loginModal");

        const closeButton =
            document.getElementById("loginClose");

        const passwordToggle =
            document.getElementById("passwordToggle");

        const password =
            document.getElementById("loginPassword");

        const form =
            document.getElementById("loginForm");


        /* CLOSE BUTTON */

        closeButton.addEventListener(
            "click",
            closeLoginModal
        );


        /* CLICK OUTSIDE */

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {

                    closeLoginModal();

                }

            }
        );


        /* ESCAPE */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    modal.classList.contains("is-open")
                ) {

                    closeLoginModal();

                }

            }
        );


        /* PASSWORD TOGGLE */

        passwordToggle.addEventListener(
            "click",
            function () {

                const icon =
                    passwordToggle.querySelector("i");


                if (password.type === "password") {

                    password.type = "text";

                    icon.classList.remove(
                        "bx-show"
                    );

                    icon.classList.add(
                        "bx-hide"
                    );

                    passwordToggle.setAttribute(
                        "aria-label",
                        "مخفی کردن رمز عبور"
                    );

                } else {

                    password.type = "password";

                    icon.classList.remove(
                        "bx-hide"
                    );

                    icon.classList.add(
                        "bx-show"
                    );

                    passwordToggle.setAttribute(
                        "aria-label",
                        "نمایش رمز عبور"
                    );

                }

            }
        );


        /* FORM */

        form.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                handleLogin();

            }
        );


        /* FORGOT PASSWORD */

        const forgotPassword =
            document.getElementById("forgotPassword");


        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "Forgot password clicked"
                );

            }
        );

    }


    /* =====================================================
       LOGIN VALIDATION
    ===================================================== */

    function handleLogin() {

        const email =
            document.getElementById("loginEmail");

        const password =
            document.getElementById("loginPassword");

        const emailError =
            document.getElementById("emailError");

        const passwordError =
            document.getElementById("passwordError");


        emailError.textContent = "";

        passwordError.textContent = "";


        let valid = true;


        /* EMAIL */

        if (!email.value.trim()) {

            emailError.textContent =
                "لطفاً ایمیل خود را وارد کنید.";

            valid = false;

        } else if (!email.validity.valid) {

            emailError.textContent =
                "لطفاً یک ایمیل معتبر وارد کنید.";

            valid = false;

        }


        /* PASSWORD */

        if (!password.value.trim()) {

            passwordError.textContent =
                "لطفاً رمز عبور خود را وارد کنید.";

            valid = false;

        }


        if (!valid) {
            return;
        }


        /*
         * Backend will be connected here later.
         */

        console.log(
            "Login data ready:",
            {
                email: email.value,
                password: password.value
            }
        );

    }


    /* =====================================================
       GLOBAL CLICK DELEGATION
       This is the important part.
    ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            const loginButton =
                event.target.closest("#loginBtn");


            if (!loginButton) {
                return;
            }


            event.preventDefault();

            openLoginModal();

        }
    );


})();





document.addEventListener("DOMContentLoaded", () => {
    
    // ۱. انیمیشن آبشاری (Staggered) برای المان‌های متنی سمت راست
    const textItems = document.querySelectorAll('.animate-item');
    
    textItems.forEach((item, index) => {
        // ایجاد تأخیر زمانی منظم برای ایجاد ورود پله‌ای و زیبا
        setTimeout(() => {
            item.classList.add('is-visible');
        }, index * 150); // فاصله ۱۵۰ میلی‌ثانیه‌ای بین ورود هر المان
    });

    // ۲. انیمیشن ورود فریم تصویر اصلی سمت چپ (Scale-down افکت)
    const imageFrame = document.getElementById('heroImageFrame');
    if (imageFrame) {
        setTimeout(() => {
            imageFrame.classList.add('is-visible');
        }, 300); // همزمان با لود تیتر اصلی وارد می‌شود
    }

    // ۳. انیمیشن ورود نشان شناور (Floating Badge) با تأخیر ثانویه
    const floatingBadge = document.getElementById('heroBadge');
    if (floatingBadge) {
        setTimeout(() => {
            floatingBadge.classList.add('is-visible');
        }, 850); // بعد از لود کامل تصویر ظاهر می‌شود
    }
});


// ==========================================================================
// انیمیشن اسکرول بخش Who We Are با استفاده از Intersection Observer
// ==========================================================================
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    root: null,
    threshold: 0.12,
    rootMargin: "0px 0px -20px 0px"
});

// مانیتور کردن تمامی آیتم‌های بخش جدید برای انیمیشن ورود آبشاری هنگام اسکرول
document.querySelectorAll('.reveal-scroll, .reveal-img-scroll, .reveal-img-delayed-scroll').forEach(item => {
    scrollObserver.observe(item);
});


// ==========================================================================
// منطق تعاملی رشد خط محوری تایم‌لاین بر اساس میزان اسکرول واقعی کاربر
// ==========================================================================
window.addEventListener('scroll', () => {
    const timelineSection = document.getElementById('storyTimelineSection');
    const progressFill = document.getElementById('timelineProgress');
    
    if (timelineSection && progressFill) {
        const sectionRect = timelineSection.getBoundingClientRect();
        const viewHeight = window.innerHeight;
        
        // محاسبه میزان ورود بخش تایم‌لاین به درون قاب مرورگر کاربر
        const sectionHeight = sectionRect.height;
        const startThreshold = viewHeight * 0.7; // نقطه شروع متوازن فعال‌سازی انیمیشن
        
        const scrolledInSection = startThreshold - sectionRect.top;
        
        // تبدیل به درصد خط پیشرفت مستقل (محدود بین ۰ تا ۱۰۰)
        let progressPercent = (scrolledInSection / (sectionHeight - 150)) * 100;
        progressPercent = Math.max(0, Math.min(100, progressPercent));
        
        progressFill.style.height = `${progressPercent}%`;
    }
});

// مانیتور کردن کارت‌های تایم‌لاین جهت ورود آبشاری توسط Intersection Observer موجود
document.querySelectorAll('.reveal-timeline-card').forEach(card => {
    if (typeof scrollObserver !== 'undefined') {
        scrollObserver.observe(card);
    }
});


// ==========================================================================
// منطق تعاملی فیلتر گالری و لایت‌باکس هوشمند آکادمیک (RTL)
// ==========================================================================

// آرایه متناظر اطلاعات تصاویر گالری برای لایت‌باکس (قابل مدیریت آسان)
const galleryData = [
    { tag: "کتابخانه", caption: "تمرکز و آرامش در تالار مطالعه کتابخانه", src: "https://unsplash.com" },
    { tag: "آموزشی", caption: "کارگاه‌های تعاملی توسعه مهارت‌های علمی فردی", src: "https://unsplash.com" },
    { tag: "فرهنگی", caption: "نشست‌های صمیمی گفتگو، نقد کتاب و اندیشه اعضا", src: "https://unsplash.com" },
    { tag: "رویدادها", caption: "مسابقات منظم و کارگاه‌های مشارکتی سالن همایش", src: "https://unsplash.com" },
    { tag: "کتابخانه", caption: "دسترسی به منابع دیجیتال مدرن و سیستم اینترنت مجتمع", src: "https://unsplash.com" }
];

let currentLightboxIndex = 0;

// ۱. مدیریت فیلترهای گالری
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // تغییر دکمه فعال
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        document.querySelectorAll('.gallery-item').forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.classList.remove('is-hidden');
            } else {
                item.classList.add('is-hidden');
            }
        });
    });
});

// ۲. توابع اصلی مدیریت لایت‌باکس
function openLightbox(index) {
    currentLightboxIndex = index;
    const lightbox = document.getElementById('galleryLightbox');
    updateLightboxContent();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // قفل کردن اسکرول اصلی صفحه
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function updateLightboxContent() {
    const data = galleryData[currentLightboxIndex];
    document.getElementById('lightboxMainImg').src = data.src;
    document.getElementById('lightboxCategory').innerText = data.tag;
    document.getElementById('lightboxCaption').innerText = data.caption;
    
    // تبدیل شمارنده به اعداد فارسی بومی بوسیله متد تعویض محلی
    const faIndex = (currentLightboxIndex + 1).toLocaleString('fa-IR');
    const faTotal = galleryData.length.toLocaleString('fa-IR');
    document.getElementById('lightboxCounter').innerText = `${faIndex} / ${faTotal}`;
}

function changeLightboxImage(direction) {
    // ناوبری چرخشی روی کل تصاویر آرایه گالری
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= galleryData.length) currentLightboxIndex = 0;
    if (currentLightboxIndex < 0) currentLightboxIndex = galleryData.length - 1;
    updateLightboxContent();
}

// ۳. پشتیبانی کامل از کلیدهای کیبورد مرورگر جهت دسترسی‌پذیری عالی (Accessibility)
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('galleryLightbox');
    if (lightbox && lightbox.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') changeLightboxImage(-1); // در فارسی پیکان راست تصویر قبلی را میاورد
        if (e.key === 'ArrowLeft') changeLightboxImage(1);  // پیکان چپ تصویر بعدی را میاورد
    }
});
