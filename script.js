/* =========================================
   REGISTER GSAP
========================================= */

gsap.registerPlugin(ScrollTrigger);


/* =========================================
   PRELOADER
========================================= */

const preloader = document.querySelector(".preloader");
const loaderNumber = document.querySelector("#loaderNumber");
const loaderProgress = document.querySelector(".loader-progress");

let loaderObject = {
    value: 0
};

const loaderAnimation = gsap.to(loaderObject, {

    value: 100,

    duration: 2.6,

    ease: "power2.inOut",

    onUpdate: () => {

        loaderNumber.textContent =
            String(Math.floor(loaderObject.value))
                .padStart(2, "0");

        loaderProgress.style.width =
            `${loaderObject.value}%`;

    },

    onComplete: () => {

        gsap.to(preloader, {

            yPercent: -100,

            duration: 1.2,

            ease: "power4.inOut",

            onComplete: () => {

                preloader.style.display = "none";

                document.body.classList.add("loaded");

                startWebsiteAnimations();

            }

        });

    }

});


/* =========================================
   LENIS SMOOTH SCROLL
========================================= */

const lenis = new Lenis({

    duration: 1.2,

    smoothWheel: true,

    touchMultiplier: 1.5

});


function raf(time) {

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);


/* Connect Lenis + ScrollTrigger */

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {

    lenis.raf(time * 1000);

});

gsap.ticker.lagSmoothing(0);


/* =========================================
   CUSTOM CURSOR
========================================= */

const cursor = document.querySelector(".cursor");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});

function cursorAnimation() {

    cursorX += (mouseX - cursorX) * 0.12;

    cursorY += (mouseY - cursorY) * 0.12;

    cursor.style.left = `${cursorX}px`;
    cursor.style.top = `${cursorY}px`;

    requestAnimationFrame(cursorAnimation);

}

cursorAnimation();


/* Hover cursor */

document.querySelectorAll("a, button, .project, .service")
.forEach(element => {

    element.addEventListener("mouseenter", () => {

        cursor.classList.add("active");

    });

    element.addEventListener("mouseleave", () => {

        cursor.classList.remove("active");

    });

});


/* =========================================
   WEBSITE ANIMATIONS
========================================= */

function startWebsiteAnimations() {


    /* -------------------------------------
       HERO WORD REVEAL
    ------------------------------------- */

    const heroWords =
        document.querySelectorAll(".reveal-word");

    gsap.from(heroWords, {

        yPercent: 120,

        opacity: 0,

        duration: 1.5,

        stagger: .15,

        ease: "power4.out"

    });


    /* -------------------------------------
       HERO PILLS
    ------------------------------------- */

    gsap.from(".hero-pill", {

        scale: 0,

        opacity: 0,

        rotation: 30,

        duration: 1,

        delay: .5,

        stagger: .2,

        ease: "back.out(1.7)"

    });


    /* -------------------------------------
       HERO FLOATING ELEMENTS
    ------------------------------------- */

    gsap.from(".floating-element", {

        scale: 0,

        opacity: 0,

        duration: 1,

        delay: .8,

        stagger: .2,

        ease: "back.out(2)"

    });


    /* -------------------------------------
       FLOATING MOTION
    ------------------------------------- */

    gsap.to(".float-one", {

        y: -20,

        rotation: -4,

        duration: 2.5,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });


    gsap.to(".float-two", {

        y: 25,

        rotation: 20,

        duration: 3,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });


    gsap.to(".float-three", {

        y: -15,

        duration: 2,

        repeat: -1,

        yoyo: true,

        ease: "sine.inOut"

    });


    /* -------------------------------------
       HERO PARALLAX
    ------------------------------------- */

    gsap.to(".hero-title", {

        yPercent: -15,

        scrollTrigger: {

            trigger: ".hero",

            start: "top top",

            end: "bottom top",

            scrub: true

        }

    });


    /* -------------------------------------
       STATEMENT REVEAL
    ------------------------------------- */

    gsap.from(".statement-text p", {

        y: 100,

        opacity: 0,

        scrollTrigger: {

            trigger: ".statement",

            start: "top 75%",

            end: "top 30%",

            scrub: 1

        }

    });


    /* -------------------------------------
       WORK TITLE
    ------------------------------------- */

    gsap.from(".work-heading h2", {

        xPercent: -30,

        opacity: 0,

        scrollTrigger: {

            trigger: ".work-heading",

            start: "top 80%",

            end: "top 30%",

            scrub: 1

        }

    });


    gsap.to(".work-shadow", {

        xPercent: 8,

        scrollTrigger: {

            trigger: ".work-heading",

            start: "top bottom",

            end: "bottom top",

            scrub: true

        }

    });


    /* -------------------------------------
       PROJECTS
    ------------------------------------- */

    document.querySelectorAll(".project").forEach(project => {

        const image =
            project.querySelector(".project-visual");

        const info =
            project.querySelector(".project-info");


        gsap.from(image, {

            scale: .75,

            opacity: 0,

            rotation: gsap.utils.random(-8, 8),

            scrollTrigger: {

                trigger: project,

                start: "top 85%",

                end: "top 35%",

                scrub: 1

            }

        });


        gsap.from(info, {

            x: -80,

            opacity: 0,

            scrollTrigger: {

                trigger: project,

                start: "top 75%",

                end: "top 40%",

                scrub: 1

            }

        });


        /* Image parallax */

        gsap.to(image, {

            yPercent: -8,

            scrollTrigger: {

                trigger: project,

                start: "top bottom",

                end: "bottom top",

                scrub: true

            }

        });

    });


    /* -------------------------------------
       ABOUT
    ------------------------------------- */

    gsap.from(".about-heading h2", {

        y: 100,

        opacity: 0,

        scrollTrigger: {

            trigger: ".about-section",

            start: "top 75%",

            end: "top 30%",

            scrub: 1

        }

    });


    gsap.from(".about-copy", {

        y: 100,

        opacity: 0,

        scrollTrigger: {

            trigger: ".about-copy",

            start: "top 80%",

            end: "top 40%",

            scrub: 1

        }

    });


    /* -------------------------------------
       SERVICES
    ------------------------------------- */

    gsap.from(".service", {

        x: -100,

        opacity: 0,

        stagger: .12,

        scrollTrigger: {

            trigger: ".services-list",

            start: "top 80%",

            end: "top 30%",

            scrub: 1

        }

    });


    /* -------------------------------------
       PROCESS
    ------------------------------------- */

    gsap.from(".process-item", {

        x: 100,

        opacity: 0,

        stagger: .15,

        scrollTrigger: {

            trigger: ".process-list",

            start: "top 80%",

            end: "top 25%",

            scrub: 1

        }

    });


    /* -------------------------------------
       CONTACT
    ------------------------------------- */

    gsap.from(".contact-heading h2", {

        y: 150,

        opacity: 0,

        scrollTrigger: {

            trigger: ".contact-section",

            start: "top 75%",

            end: "top 30%",

            scrub: 1

        }

    });


}


/* =========================================
   MOUSE PARALLAX
========================================= */

const hero = document.querySelector(".hero");

hero.addEventListener("mousemove", (e) => {

    const x =
        (e.clientX / window.innerWidth - .5);

    const y =
        (e.clientY / window.innerHeight - .5);


    gsap.to(".float-one", {

        x: x * 30,

        y: y * 30,

        duration: .7,

        ease: "power2.out"

    });


    gsap.to(".float-two", {

        x: x * -45,

        y: y * -30,

        duration: .8,

        ease: "power2.out"

    });


    gsap.to(".float-three", {

        x: x * 20,

        y: y * -20,

        duration: .9,

        ease: "power2.out"

    });

});


/* =========================================
   SMOOTH ANCHOR SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener("click", (e) => {

        const target =
            document.querySelector(
                anchor.getAttribute("href")
            );

        if (!target) return;

        e.preventDefault();

        lenis.scrollTo(target, {

            offset: 0,

            duration: 1.5

        });

    });

});


/* =========================================
   BACK TO TOP
========================================= */

document.querySelector(".footer > div:last-child")
.addEventListener("click", () => {

    lenis.scrollTo(0, {

        duration: 1.5

    });

});
