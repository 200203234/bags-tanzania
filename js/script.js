document.addEventListener("DOMContentLoaded", () => {
    /*** ===== Particles.js Initialization ===== ***/
    const particlesConfig = {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 3, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
            modes: { grab: { distance: 200, line_linked: { opacity: 0.6 } }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    };
    particlesJS("particles-js", particlesConfig);

    /*** ===== Header Scroll Effect ===== ***/
    const header = document.querySelector("header");
    const handleHeaderScroll = () => {
        window.scrollY > 50 ? header.classList.add("scrolled") : header.classList.remove("scrolled");
    };
    window.addEventListener("scroll", handleHeaderScroll);
    handleHeaderScroll(); // Call on load

    /*** ===== Animate Elements on Scroll ===== ***/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add("animated"); });
    }, { root: null, rootMargin: "0px", threshold: 0.1 });
    document.querySelectorAll(".product-card, .feature-card, .about-image, .contact-card, .gallery-item")
        .forEach(el => observer.observe(el));

    /*** ===== Mobile Menu ===== ***/
    const menuBtn = document.querySelector(".menu-btn");
    const closeMenu = document.querySelector(".close-menu");
    const overlay = document.querySelector(".overlay");
    const mobileMenu = document.querySelector(".mobile-menu");
    const body = document.body;

    const openMenu = () => { mobileMenu.classList.add("active"); overlay.classList.add("active"); body.style.overflow = "hidden"; };
    const closeMobileMenu = () => { mobileMenu.classList.remove("active"); overlay.classList.remove("active"); body.style.overflow = ""; };

    menuBtn.addEventListener("click", openMenu);
    closeMenu.addEventListener("click", closeMobileMenu);
    overlay.addEventListener("click", closeMobileMenu);
    document.querySelectorAll(".mobile-nav-links a").forEach(link => link.addEventListener("click", closeMobileMenu));
    document.addEventListener("keydown", e => { if (e.key === "Escape" && mobileMenu.classList.contains("active")) closeMobileMenu(); });

    /*** ===== Product Page View Details ===== ***/
    document.querySelectorAll(".view-details-btn").forEach(button => {
        button.addEventListener("click", () => {
            alert("Product details would be shown here. This can open a modal or navigate to product page.");
        });
    });

    /*** ===== Contact Form Submission ===== ***/
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            if (name && email && subject && message) {
                alert("Thank you for your message! We will get back to you soon.");
                contactForm.reset();
            } else {
                alert("Please fill in all required fields.");
            }
        });
    }

    /*** ===== Gallery Filter ===== ***/
    const filterButtons = document.querySelectorAll(".gallery-filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const filterValue = button.getAttribute("data-filter");
            galleryItems.forEach(item => {
                item.style.display = filterValue === "all" || item.getAttribute("data-category") === filterValue ? "block" : "none";
            });
        });
    });

    /*** ===== Gallery Lightbox ===== ***/
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        const lightboxImage = document.getElementById("lightboxImage");
        const lightboxCaption = document.getElementById("lightboxCaption");
        const closeLightbox = document.getElementById("closeLightbox");
        const prevButton = document.getElementById("prevButton");
        const nextButton = document.getElementById("nextButton");

        let currentImageIndex = 0;
        const images = Array.from(galleryItems);

        const showImage = index => {
            if (index < 0) index = images.length - 1;
            if (index >= images.length) index = 0;
            currentImageIndex = index;
            const image = images[currentImageIndex].querySelector(".gallery-image");
            lightboxImage.src = image.src;
            lightboxCaption.textContent = image.alt;
        };

        images.forEach((item, index) => {
            const image = item.querySelector(".gallery-image");
            const zoom = item.querySelector(".gallery-zoom");
            const openLightbox = () => { currentImageIndex = index; lightboxImage.src = image.src; lightboxCaption.textContent = image.alt; lightbox.classList.add("active"); body.style.overflow = "hidden"; };
            image.addEventListener("click", openLightbox);
            if (zoom) zoom.addEventListener("click", openLightbox);
        });

        closeLightbox.addEventListener("click", () => { lightbox.classList.remove("active"); body.style.overflow = "auto"; });
        lightbox.addEventListener("click", e => { if (e.target === lightbox) { lightbox.classList.remove("active"); body.style.overflow = "auto"; } });
        prevButton?.addEventListener("click", e => { e.stopPropagation(); showImage(currentImageIndex - 1); });
        nextButton?.addEventListener("click", e => { e.stopPropagation(); showImage(currentImageIndex + 1); });
        document.addEventListener("keydown", e => {
            if (lightbox.classList.contains("active")) {
                if (e.key === "Escape") { lightbox.classList.remove("active"); body.style.overflow = "auto"; }
                else if (e.key === "ArrowLeft") showImage(currentImageIndex - 1);
                else if (e.key === "ArrowRight") showImage(currentImageIndex + 1);
            }
        });
    }
});
