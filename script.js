gsap.registerPlugin(ScrollTrigger);

/* =====================================================
   LENIS — SINGLE RAF LOOP
===================================================== */

const lenis = new Lenis({
    duration: 1.35,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.1,
    easing: (t) => 1 - Math.pow(1 - t, 4)
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


/* =====================================================
   PRELOADER
===================================================== */

const preloader = document.querySelector(".preloader");
const loaderNumber = document.querySelector("#loaderNumber");
const loaderProgress = document.querySelector(".loader-progress");

const loader = {
    value: 0
};

gsap.to(loader, {
    value: 100,
    duration: 2.4,
    ease: "power3.inOut",

    onUpdate: () => {

        const value = Math.floor(loader.value);

        loaderNumber.textContent =
            String(value).padStart(2, "0");

        loaderProgress.style.width =
            `${value}%`;
    },

    onComplete: () => {

        const intro = gsap.timeline();

        intro
        .to(".preloader-top, .preloader-bottom", {
            opacity: 0,
            duration: .4
        })

        .to(".loader-counter", {
            scale: 1.3,
            opacity: 0,
            duration: .6,
            ease: "power3.in"
        })

        .to(preloader, {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut"
        })

        .set(preloader, {
            display: "none"
        })

        .add(() => {
            startAnimations();
        });
    }
});


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.querySelector(".cursor");

let mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

let cursorPosition = {
    x: mouse.x,
    y: mouse.y
};

window.addEventListener("mousemove", (e) => {

    mouse.x = e.clientX;
    mouse.y = e.clientY;

});

function updateCursor() {

    cursorPosition.x +=
        (mouse.x - cursorPosition.x) * 0.15;

    cursorPosition.y +=
        (mouse.y - cursorPosition.y) * 0.15;

    gsap.set(cursor, {
        x: cursorPosition.x,
        y: cursorPosition.y
    });

    requestAnimationFrame(updateCursor);
}

updateCursor();


/* =====================================================
   MAGNETIC ELEMENTS
===================================================== */

document
.querySelectorAll(".contact-button, .view-all, .text-link, .menu-button")
.forEach((element) => {

    element.addEventListener("mousemove", (e) => {

        const rect = element.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        gsap.to(element, {
            x: x * .15,
            y: y * .15,
            duration: .5,
            ease: "power3.out"
        });

        cursor.classList.add("active");
    });

    element.addEventListener("mouseleave", () => {

        gsap.to(element, {
            x: 0,
            y: 0,
            duration: .8,
            ease: "elastic.out(1, .4)"
        });

        cursor.classList.remove("active");
    });

});


/* =====================================================
   CURSOR PROJECT INTERACTION
===================================================== */

document
.querySelectorAll(".project")
.forEach((project) => {

    project.addEventListener("mouseenter", () => {
        cursor.classList.add("active");
    });

    project.addEventListener("mouseleave", () => {
        cursor.classList.remove("active");
    });

});


/* =====================================================
   MAIN ANIMATION
===================================================== */

function startAnimations() {


    /* =================================================
       HERO — CINEMATIC REVEAL
    ================================================= */

    const heroTimeline = gsap.timeline();

    heroTimeline

    .from(".hero-intro", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    })

    .from(".hero-location", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    }, "-=.9");


    /* Split-like word animation */

    gsap.from(".reveal-word", {

        yPercent: 130,
        rotationX: 20,
        opacity: 0,

        duration: 1.6,

        stagger: .12,

        ease: "expo.out",

        delay: .15

    });


    /* Pills */

    gsap.from(".hero-pill", {

        scale: .4,
        rotation: 15,
        opacity: 0,

        duration: 1.4,

        stagger: .12,

        ease: "elastic.out(1, .55)",

        delay: .5

    });


    /* Floating objects */

    gsap.from(".floating-element", {

        scale: 0,
        opacity: 0,

        duration: 1.5,

        stagger: .15,

        ease: "back.out(2)",

        delay: .7

    });


    /* =================================================
       HERO SCROLL MOTION
    ================================================= */

    gsap.to(".hero-title", {

        yPercent: -18,
        scale: .88,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1.5

        }

    });


    gsap.to(".hero-top", {

        yPercent: -70,
        opacity: .15,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1.2

        }

    });


    gsap.to(".hero-bottom", {

        yPercent: 80,
        opacity: 0,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "70% top",

            scrub: 1

        }

    });


    /* Floating depth */

    gsap.to(".float-one", {

        xPercent: 100,
        yPercent: -80,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1.5

        }

    });


    gsap.to(".float-two", {

        xPercent: -100,
        yPercent: 120,

        rotation: 180,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 2

        }

    });


    gsap.to(".float-three", {

        xPercent: 60,
        yPercent: -100,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: 1.8

        }

    });


    /* =================================================
       STATEMENT
    ================================================= */

    gsap.from(".statement-text p", {

        y: 160,

        opacity: 0,

        scale: .92,

        scrollTrigger: {

            trigger: ".statement",

            start: "top 85%",

            end: "top 25%",

            scrub: 1.4

        }

    });


    /* =================================================
       WORK TITLE
    ================================================= */

    gsap.from(".work-heading h2", {

        xPercent: -60,

        scale: 1.3,

        opacity: 0,

        scrollTrigger: {

            trigger: ".work-heading",

            start: "top 90%",

            end: "top 20%",

            scrub: 1.5

        }

    });


    gsap.to(".work-shadow", {

        xPercent: 15,

        opacity: 1,

        scrollTrigger: {

            trigger: ".work-heading",

            start: "top bottom",

            end: "bottom top",

            scrub: 1.5

        }

    });


    /* =================================================
       PROJECT VISUALS
    ================================================= */

    document
    .querySelectorAll(".project")
    .forEach((project, index) => {

        const visual =
            project.querySelector(".project-visual");

        const info =
            project.querySelector(".project-info");


        /* Main reveal */

        gsap.fromTo(
            visual,

            {
                clipPath: "inset(15% 15% 15% 15%)",
                scale: 1.18,
                rotation: index % 2 === 0 ? -3 : 3
            },

            {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                rotation: 0,

                scrollTrigger: {

                    trigger: project,

                    start: "top 90%",

                    end: "top 20%",

                    scrub: 1.5

                }
            }
        );


        /* Project image movement */

        gsap.to(visual, {

            yPercent: -12,

            scrollTrigger: {

                trigger: project,

                start: "top bottom",

                end: "bottom top",

                scrub: 1.5

            }

        });


        /* Project information */

        gsap.from(info, {

            x: -120,

            opacity: 0,

            scrollTrigger: {

                trigger: project,

                start: "top 75%",

                end: "top 35%",

                scrub: 1

            }

        });


        /* Number */

        gsap.from(
            project.querySelector(".project-number"),
            {

                y: 50,

                opacity: 0,

                scrollTrigger: {

                    trigger: project,

                    start: "top 80%",

                    end: "top 40%",

                    scrub: 1

                }

            }
        );

    });


    /* =================================================
       ABOUT
    ================================================= */

    gsap.from(".about-heading h2", {

        y: 180,

        opacity: 0,

        rotateX: 25,

        scrollTrigger: {

            trigger: ".about-section",

            start: "top 80%",

            end: "top 25%",

            scrub: 1.5

        }

    });


    gsap.from(".about-copy", {

        y: 120,

        opacity: 0,

        scrollTrigger: {

            trigger: ".about-copy",

            start: "top 85%",

            end: "top 35%",

            scrub: 1.2

        }

    });


    /* =================================================
       SERVICES
    ================================================= */

    document
    .querySelectorAll(".service")
    .forEach((service, index) => {

        gsap.from(service, {

            x: index % 2 === 0 ? -120 : 120,

            opacity: 0,

            duration: 1,

            scrollTrigger: {

                trigger: service,

                start: "top 90%",

                end: "top 55%",

                scrub: 1

            }

        });

    });


    /* =================================================
       PROCESS
    ================================================= */

    document
    .querySelectorAll(".process-item")
    .forEach((item, index) => {

        gsap.from(item, {

            x: 150,

            opacity: 0,

            rotate: index % 2 === 0 ? 2 : -2,

            scrollTrigger: {

                trigger: item,

                start: "top 90%",

                end: "top 55%",

                scrub: 1

            }

        });

    });


    /* =================================================
       CONTACT
    ================================================= */

    gsap.from(".contact-heading h2", {

        y: 180,

        scale: .85,

        opacity: 0,

        scrollTrigger: {

            trigger: ".contact-section",

            start: "top 80%",

            end: "top 25%",

            scrub: 1.5

        }

    });


    /* =================================================
       REFRESH
    ================================================= */

    setTimeout(() => {

        ScrollTrigger.refresh();

    }, 500);

}


/* =====================================================
   HERO MOUSE DEPTH
===================================================== */

const hero = document.querySelector(".hero");

if (hero) {

    hero.addEventListener("mousemove", (e) => {

        const x =
            (e.clientX / window.innerWidth - .5);

        const y =
            (e.clientY / window.innerHeight - .5);


        gsap.to(".hero-title", {

            x: x * 18,
            y: y * 10,

            duration: 1.2,

            ease: "power3.out",

            overwrite: "auto"

        });


        gsap.to(".float-one", {

            x: x * 45,
            y: y * 30,

            duration: 1,

            ease: "power3.out",

            overwrite: "auto"

        });


        gsap.to(".float-two", {

            x: x * -70,
            y: y * -40,

            duration: 1.2,

            ease: "power3.out",

            overwrite: "auto"

        });


        gsap.to(".float-three", {

            x: x * 30,
            y: y * -30,

            duration: 1.1,

            ease: "power3.out",

            overwrite: "auto"

        });

    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.querySelector(".footer > div:last-child");

if (backTop) {

    backTop.addEventListener("click", () => {

        lenis.scrollTo(0, {
            duration: 2
        });

    });

}


/* =====================================================
   ANCHOR LINKS
===================================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach((link) => {

    link.addEventListener("click", (e) => {

        const target =
            document.querySelector(
                link.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        lenis.scrollTo(target, {
            duration: 1.6,
            offset: 0
        });

    });

});
