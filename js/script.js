document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("main section[id]");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const faqItems = document.querySelectorAll(".faq-item");
    const openMenu = () => {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.add("active");
        navMenu.classList.add("active");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    };


    const closeMenu = () => {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };


    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.contains("active");

            if (isOpen) {
                closeMenu();
            } else {
                openMenu();
            }

        });


        const menuLinks = navMenu.querySelectorAll("a");

        menuLinks.forEach((link) => {

            link.addEventListener("click", () => {
                closeMenu();
            });

        });


        document.addEventListener("keydown", (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

    }

    const updateThemeIcon = (isDark) => {

        if (!themeIcon || !themeToggle) return;

        if (isDark) {

            themeIcon.classList.remove("fa-moon");
            themeIcon.classList.add("fa-sun");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to light mode"
            );

        } else {

            themeIcon.classList.remove("fa-sun");
            themeIcon.classList.add("fa-moon");

            themeToggle.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

            themeToggle.setAttribute(
                "title",
                "Switch to dark mode"
            );

        }

    };


    const savedTheme = localStorage.getItem("internnova-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");
        updateThemeIcon(true);

    } else {

        document.body.classList.remove("dark-mode");
        updateThemeIcon(false);

    }


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            const isDark =
                document.body.classList.toggle("dark-mode");

            localStorage.setItem(
                "internnova-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon(isDark);

        });

    }

    faqItems.forEach((item) => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");

        if (!question || !answer) return;

        question.setAttribute("aria-expanded", "false");

        question.addEventListener("click", () => {

            const isActive = item.classList.contains("active");


            faqItems.forEach((otherItem) => {

                const otherQuestion =
                    otherItem.querySelector(".faq-question");

                const otherAnswer =
                    otherItem.querySelector(".faq-answer");

                otherItem.classList.remove("active");

                if (otherQuestion) {
                    otherQuestion.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }

                if (otherAnswer) {
                    otherAnswer.style.maxHeight = null;
                }

            });


            if (!isActive) {

                item.classList.add("active");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;

            }

        });

    });

    const updateActiveNav = () => {

        const scrollPosition = window.scrollY + 180;

        let currentSection = "home";


        sections.forEach((section) => {

            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection = sectionId;

            }

        });


        navLinks.forEach((link) => {

            const href = link.getAttribute("href");

            link.classList.toggle(
                "active",
                href === `#${currentSection}`
            );

        });

    };


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();

    window.addEventListener("resize", () => {

        if (window.innerWidth > 900) {
            closeMenu();
        }


        faqItems.forEach((item) => {

            const answer =
                item.querySelector(".faq-answer");

            if (
                item.classList.contains("active") &&
                answer
            ) {

                answer.style.maxHeight =
                    `${answer.scrollHeight}px`;

            }

        });

    });

    const staffLogin =
        document.querySelector(".staff-login");

    if (staffLogin) {

        staffLogin.addEventListener("click", (event) => {

            if (staffLogin.getAttribute("href") === "#") {
                event.preventDefault();
            }

        });

    }

});