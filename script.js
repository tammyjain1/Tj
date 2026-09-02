/* =====================================================
   REGISTER GSAP
===================================================== */

gsap.registerPlugin(ScrollTrigger);


/* =====================================================
   LENIS — SMOOTH SCROLL
===================================================== */

const lenis = new Lenis({
    duration: 1.25,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.8,
    touchMultiplier: 1,
    easing: (t) => 1 - Math.pow(1 - t, 4)
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);


/* =====================================================
   GLOBAL SETTINGS
===================================================== */

const isMobile = window.innerWidth <= 800;

gsap.defaults({
    ease: "power3.out"
});


/* =====================================================
   PRELOADER
===================================================== */

const preloader = document.querySelector(".preloader");
const loaderNumber = document.querySelector("#loaderNumber");
const loaderProgress = document.querySelector(".loader-progress");

function startPreloader() {

    if (!preloader) {
        startAnimations();
        return;
    }

    const loader = {
        value: 0
    };

    gsap.to(loader, {

        value: 100,

        duration: 2.4,

        ease: "power3.inOut",

        onUpdate: () => {

            const value = Math.floor(loader.value);

            if (loaderNumber) {
                loaderNumber.textContent =
                    String(value).padStart(2, "0");
            }

            if (loaderProgress) {
                loaderProgress.style.width =
                    `${value}%`;
            }
        },

        onComplete: () => {

            const intro = gsap.timeline();

            intro

            .to(".preloader-top, .preloader-bottom", {
                opacity: 0,
                duration: .35
            })

            .to(".loader-counter", {
                scale: 1.25,
                opacity: 0,
                duration: .5,
                ease: "power3.in"
            }, "-=.15")

            .to(preloader, {
                yPercent: -100,
                duration: 1.15,
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

}


/* =====================================================
   CUSTOM CURSOR
===================================================== */

const cursor = document.querySelector(".cursor");

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

const cursorPosition = {
    x: mouse.x,
    y: mouse.y
};


if (cursor && !isMobile) {

    window.addEventListener("mousemove", (e) => {

        mouse.x = e.clientX;
        mouse.y = e.clientY;

    });


    function updateCursor() {

        cursorPosition.x +=
            (mouse.x - cursorPosition.x) * 0.16;

        cursorPosition.y +=
            (mouse.y - cursorPosition.y) * 0.16;

        gsap.set(cursor, {
            x: cursorPosition.x,
            y: cursorPosition.y
        });

        requestAnimationFrame(updateCursor);

    }

    updateCursor();

}


/* =====================================================
   MAGNETIC BUTTONS
===================================================== */

if (!isMobile) {

    const magneticElements = document.querySelectorAll(
        ".contact-button, .view-all, .text-link, .menu-button"
    );

    magneticElements.forEach((element) => {

        element.addEventListener("mousemove", (e) => {

            const rect = element.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            gsap.to(element, {

                x: x * 0.13,
                y: y * 0.13,

                duration: .45,

                ease: "power3.out",

                overwrite: true

            });

            cursor?.classList.add("active");

        });


        element.addEventListener("mouseleave", () => {

            gsap.to(element, {

                x: 0,
                y: 0,

                duration: .7,

                ease: "elastic.out(1, .45)",

                overwrite: true

            });

            cursor?.classList.remove("active");

        });

    });

}


/* =====================================================
   CURSOR — PROJECT / WORK CARD
===================================================== */

if (cursor && !isMobile) {

    document
        .querySelectorAll(".project, .work-card")
        .forEach((project) => {

            project.addEventListener("mouseenter", () => {
                cursor.classList.add("active");
            });

            project.addEventListener("mouseleave", () => {
                cursor.classList.remove("active");
            });

        });

}


/* =====================================================
   MAIN ANIMATION
===================================================== */

function startAnimations() {

    /* -------------------------------------------------
       HERO INTRO
    ------------------------------------------------- */

    const heroTimeline = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });


    heroTimeline

        .from(".hero-intro", {

            y: 35,
            opacity: 0,

            duration: 1.1

        })

        .from(".hero-location", {

            y: 25,
            opacity: 0,

            duration: .9

        }, "-=.75");


    /* -------------------------------------------------
       HERO TITLE
    ------------------------------------------------- */

    gsap.from(".reveal-word", {

        yPercent: 125,

        rotationX: 18,

        opacity: 0,

        duration: 1.45,

        stagger: .1,

        ease: "expo.out",

        delay: .1

    });


    /* -------------------------------------------------
       HERO PILLS
    ------------------------------------------------- */

    gsap.from(".hero-pill", {

        scale: .5,

        rotation: 10,

        opacity: 0,

        duration: 1.2,

        stagger: .1,

        ease: "back.out(1.7)",

        delay: .4

    });


    /* -------------------------------------------------
       FLOATING ELEMENTS
    ------------------------------------------------- */

    gsap.from(".floating-element", {

        scale: 0,

        opacity: 0,

        duration: 1.3,

        stagger: .12,

        ease: "back.out(2)",

        delay: .55

    });


    /* -------------------------------------------------
       FLOATING IDLE MOTION
    ------------------------------------------------- */

    if (!isMobile) {

        gsap.to(".float-one", {

            y: -18,

            rotation: 3,

            duration: 3,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });


        gsap.to(".float-two", {

            y: 20,

            rotation: -4,

            duration: 4,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });


        gsap.to(".float-three", {

            y: -14,

            rotation: 4,

            duration: 3.5,

            repeat: -1,

            yoyo: true,

            ease: "sine.inOut"

        });

    }


    /* =================================================
       HERO SCROLL
    ================================================= */

    if (document.querySelector(".hero")) {

        gsap.to(".hero-title", {

            yPercent: -20,

            scale: .87,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom top",

                scrub: 1.5

            }

        });


        gsap.to(".hero-top", {

            yPercent: -60,

            opacity: .2,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "bottom top",

                scrub: 1.2

            }

        });


        gsap.to(".hero-bottom", {

            yPercent: 70,

            opacity: 0,

            ease: "none",

            scrollTrigger: {

                trigger: ".hero",

                start: "top top",

                end: "70% top",

                scrub: 1

            }

        });


        /* FLOATING PARALLAX */

        if (!isMobile) {

            gsap.to(".float-one", {

                xPercent: 70,
                yPercent: -50,

                ease: "none",

                scrollTrigger: {

                    trigger: ".hero",

                    start: "top top",

                    end: "bottom top",

                    scrub: 1.5

                }

            });


            gsap.to(".float-two", {

                xPercent: -70,
                yPercent: 90,

                rotation: 120,

                ease: "none",

                scrollTrigger: {

                    trigger: ".hero",

                    start: "top top",

                    end: "bottom top",

                    scrub: 1.8

                }

            });


            gsap.to(".float-three", {

                xPercent: 45,
                yPercent: -70,

                ease: "none",

                scrollTrigger: {

                    trigger: ".hero",

                    start: "top top",

                    end: "bottom top",

                    scrub: 1.7

                }

            });

        }

    }


    /* =================================================
       STATEMENT
    ================================================= */

    const statementText =
        document.querySelector(".statement-text p");

    if (statementText) {

        gsap.fromTo(statementText,

            {
                y: 120,
                opacity: 0,
                scale: .94
            },

            {
                y: 0,
                opacity: 1,
                scale: 1,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".statement",

                    start: "top 85%",

                    end: "top 25%",

                    scrub: 1.3

                }

            }

        );

    }


    /* =================================================
       CINEMATIC HORIZONTAL WORK
    ================================================= */

    createHorizontalWork();


    /* =================================================
       ABOUT
    ================================================= */

    const aboutHeading =
        document.querySelector(".about-heading h2");

    if (aboutHeading) {

        gsap.fromTo(aboutHeading,

            {
                y: 150,
                opacity: 0,
                rotateX: 20
            },

            {
                y: 0,
                opacity: 1,
                rotateX: 0,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".about-section",

                    start: "top 80%",

                    end: "top 25%",

                    scrub: 1.3

                }

            }

        );

    }


    const aboutCopy =
        document.querySelector(".about-copy");

    if (aboutCopy) {

        gsap.fromTo(aboutCopy,

            {
                y: 100,
                opacity: 0
            },

            {
                y: 0,
                opacity: 1,

                scrollTrigger: {

                    trigger: aboutCopy,

                    start: "top 85%",

                    end: "top 35%",

                    scrub: 1

                }

            }

        );

    }


    /* =================================================
       SERVICES
    ================================================= */

    document
        .querySelectorAll(".service")
        .forEach((service, index) => {

            gsap.fromTo(service,

                {
                    x: index % 2 === 0 ? -100 : 100,
                    opacity: 0
                },

                {
                    x: 0,
                    opacity: 1,

                    scrollTrigger: {

                        trigger: service,

                        start: "top 90%",

                        end: "top 55%",

                        scrub: 1

                    }

                }

            );

        });


    /* =================================================
       PROCESS
    ================================================= */

    document
        .querySelectorAll(".process-item")
        .forEach((item, index) => {

            gsap.fromTo(item,

                {
                    x: 120,
                    opacity: 0,
                    rotate: index % 2 === 0 ? 2 : -2
                },

                {
                    x: 0,
                    opacity: 1,
                    rotate: 0,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: item,

                        start: "top 90%",

                        end: "top 55%",

                        scrub: 1

                    }

                }

            );

        });


    /* =================================================
       CONTACT
    ================================================= */

    const contactHeading =
        document.querySelector(".contact-heading h2");

    if (contactHeading) {

        gsap.fromTo(contactHeading,

            {
                y: 160,
                scale: .86,
                opacity: 0
            },

            {
                y: 0,
                scale: 1,
                opacity: 1,

                ease: "power3.out",

                scrollTrigger: {

                    trigger: ".contact-section",

                    start: "top 80%",

                    end: "top 25%",

                    scrub: 1.4

                }

            }

        );

    }


    /* =================================================
       SERVICE HOVER
    ================================================= */

    if (!isMobile) {

        document
            .querySelectorAll(".service")
            .forEach((service) => {

                const heading =
                    service.querySelector("h3");

                if (!heading) return;


                service.addEventListener("mouseenter", () => {

                    gsap.to(heading, {

                        x: 15,

                        duration: .5,

                        ease: "power3.out"

                    });

                });


                service.addEventListener("mouseleave", () => {

                    gsap.to(heading, {

                        x: 0,

                        duration: .6,

                        ease: "power3.out"

                    });

                });

            });

    }


    /* =================================================
       REFRESH SCROLLTRIGGER
    ================================================= */

    setTimeout(() => {

        ScrollTrigger.refresh();

    }, 800);

}


/* =====================================================
   HORIZONTAL WORK FUNCTION
===================================================== */

function createHorizontalWork() {

    const workPin =
        document.querySelector(".work-pin");

    const workTrack =
        document.querySelector(".work-track");

    const workIntro =
        document.querySelector(".work-intro");

    if (!workPin || !workTrack) return;


    /* -----------------------------------------------
       MOBILE
    ------------------------------------------------ */

    if (window.innerWidth <= 800) {

        return;

    }


    /* -----------------------------------------------
       TOTAL HORIZONTAL DISTANCE
    ------------------------------------------------ */

    const getDistance = () => {

        const introWidth =
            workIntro
                ? workIntro.offsetWidth
                : 0;

        const trackWidth =
            workTrack.scrollWidth;

        return Math.max(

            0,

            introWidth +
            trackWidth -
            window.innerWidth

        );

    };


    /* -----------------------------------------------
       HORIZONTAL SCROLL
    ------------------------------------------------ */

    const horizontalTween = gsap.to(workTrack, {

        x: () => -getDistance(),

        ease: "none",

        scrollTrigger: {

            trigger: workPin,

            start: "top top",

            end: () =>
                `+=${getDistance() + window.innerHeight * .25}`,

            pin: true,

            scrub: 1.3,

            anticipatePin: 1,

            invalidateOnRefresh: true

        }

    });


    /* -----------------------------------------------
       CARD ANIMATIONS
    ------------------------------------------------ */

    const cards =
        gsap.utils.toArray(".work-card");


    cards.forEach((card, index) => {

        const image =
            card.querySelector(".work-image");

        const info =
            card.querySelector(".work-card-info");


        /* IMAGE DEPTH */

        if (image) {

            gsap.fromTo(image,

                {
                    scale: 1.12,
                    rotation: index % 2 === 0 ? -2 : 2
                },

                {
                    scale: 1,
                    rotation: 0,

                    ease: "none",

                    scrollTrigger: {

                        trigger: card,

                        containerAnimation:
                            horizontalTween,

                        start: "left 95%",

                        end: "right 15%",

                        scrub: 1.2

                    }

                }

            );

        }


        /* INFO REVEAL */

        if (info) {

            gsap.fromTo(info,

                {
                    y: 35,
                    opacity: 0
                },

                {
                    y: 0,
                    opacity: 1,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: card,

                        containerAnimation:
                            horizontalTween,

                        start: "left 70%",

                        end: "left 35%",

                        scrub: 1

                    }

                }

            );

        }


        /* CARD DEPTH */

        gsap.fromTo(card,

            {
                y: index % 2 === 0 ? 20 : -20
            },

            {
                y: 0,

                ease: "none",

                scrollTrigger: {

                    trigger: card,

                    containerAnimation:
                        horizontalTween,

                    start: "left 100%",

                    end: "center 50%",

                    scrub: 1.3

                }

            }

        );

    });


    /* -----------------------------------------------
       WORK TITLE PARALLAX
    ------------------------------------------------ */

    const workTitle =
        document.querySelector(".work-big-title");

    if (workTitle) {

        gsap.to(workTitle, {

            xPercent: -18,

            scale: .82,

            ease: "none",

            scrollTrigger: {

                trigger: workPin,

                start: "top top",

                end: () =>
                    `+=${getDistance()}`,

                scrub: 1.5

            }

        });

    }


    /* -----------------------------------------------
       WORK SHADOW
    ------------------------------------------------ */

    const workShadow =
        document.querySelector(".work-shadow");

    if (workShadow) {

        gsap.to(workShadow, {

            xPercent: 15,

            opacity: 1,

            ease: "none",

            scrollTrigger: {

                trigger: workPin,

                start: "top top",

                end: () =>
                    `+=${getDistance()}`,

                scrub: 1.5

            }

        });

    }


    /* -----------------------------------------------
       PROGRESS BAR
    ------------------------------------------------ */

    const progress =
        document.querySelector(".work-progress span");

    if (progress) {

        gsap.fromTo(progress,

            {
                scaleX: 0
            },

            {
                scaleX: 1,

                ease: "none",

                scrollTrigger: {

                    trigger: workPin,

                    start: "top top",

                    end: () =>
                        `+=${getDistance() + window.innerHeight * .25}`,

                    scrub: 1

                }

            }

        );

    }

}


/* =====================================================
   HERO MOUSE DEPTH
===================================================== */

/*
   IMPORTANT:
   Mouse effect ONLY controls X.
   This prevents conflict with ScrollTrigger Y/scale.
*/

if (!isMobile) {

    const hero =
        document.querySelector(".hero");

    if (hero) {

        let mouseX = 0;

        hero.addEventListener("mousemove", (e) => {

            mouseX =
                (e.clientX / window.innerWidth - .5);


            gsap.to(".hero-title", {

                x: mouseX * 15,

                duration: 1.1,

                ease: "power3.out",

                overwrite: "auto"

            });


            gsap.to(".float-one", {

                x: mouseX * 30,

                duration: 1.2,

                ease: "power3.out",

                overwrite: "auto"

            });


            gsap.to(".float-two", {

                x: mouseX * -45,

                duration: 1.3,

                ease: "power3.out",

                overwrite: "auto"

            });


            gsap.to(".float-three", {

                x: mouseX * 25,

                duration: 1.1,

                ease: "power3.out",

                overwrite: "auto"

            });

        });

    }

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.querySelector(".footer > div:last-child");

if (backTop) {

    backTop.addEventListener("click", () => {

        lenis.scrollTo(0, {

            duration: 1.8,

            easing: (t) =>
                1 - Math.pow(1 - t, 4)

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

            const href =
                link.getAttribute("href");

            const target =
                document.querySelector(href);

            if (!target) return;

            e.preventDefault();

            lenis.scrollTo(target, {

                duration: 1.5,

                offset: 0

            });

        });

    });


/* =====================================================
   RESIZE
===================================================== */

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        ScrollTrigger.refresh();

    }, 250);

});


/* =====================================================
   START
===================================================== */

startPreloader();
