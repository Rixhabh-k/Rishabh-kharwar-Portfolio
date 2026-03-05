console.log("script start");
console.log(gsap)
console.log(ScrollTrigger)
gsap.registerPlugin(ScrollTrigger);

const percent = document.querySelector(".percent");
const loader = document.querySelector("#loader");

let progress = { value: 0 };

gsap.to(progress, {
  value: 100,
  duration: 3,
  ease: "power2.in",

  onUpdate: () => {
    let num = Math.floor(progress.value);

    percent.innerText = num + "%";

    /* glitch effect */

    if (Math.random() > 0.8) {
      percent.style.transform = `translate(${Math.random() * 10 - 5}px,${Math.random() * 10 - 5}px)`;
    } else {
      percent.style.transform = "translate(0,0)";
    }

    /* blur reduce */

    percent.style.filter = `blur(${10 - num / 10}px)`;
  },

  onComplete: reveal,
});

function reveal() {
  gsap.to(".percent", {
    opacity: 0,
    duration: 0.3,
  });

  gsap.to(loader, {
    scaleY: 0,
    duration: 1.4,
    ease: "power4.inOut",
    delay: 0.2,
    onComplete: () => {
      loader.style.pointerEvents = "none";

      
    },
  });
}

// cursor 

const ring = document.querySelector(".cursor-ring");
const dot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // dot follows instantly
  gsap.set(dot, {
    x: mouseX,
    y: mouseY
  });

  // ring follows with smooth delay
  gsap.to(ring, {
    x: mouseX,
    y: mouseY,
    duration: 0.4,
    ease: "power3.out"
  });
});

// smooth scroll 
gsap.registerPlugin(ScrollTrigger);

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  multiplier: 1,
  lerp: 0.08
});

locoScroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },

  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },

  pinType: document.querySelector("#main").style.transform
    ? "transform"
    : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();
// smooth scroll 

const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 1;

const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);

const geometry = new THREE.PlaneGeometry(2, 2);

const material = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 0 },
  },

  fragmentShader: `

uniform float time;

void main(){

vec2 uv = gl_FragCoord.xy/vec2(1920.0,1080.0);

float wave = sin(uv.x*10.0 + time)*0.1;

gl_FragColor = vec4(vec3(0.05 + wave),1.0);

}
`,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

function animate() {
  requestAnimationFrame(animate);

  material.uniforms.time.value += 0.02;

  renderer.render(scene, camera);
}

animate();



// loder ends here

// menu
const menuBtn = document.querySelector(".menu-btn");
const panel = document.querySelector(".menu-panel");
const navItems = document.querySelectorAll(".nav a");

console.log("menu code starting");

const tl = gsap.timeline({ paused: true });

tl.to(panel, {
  x: "-100%",
  duration: 0.7,
  ease: "power3.inOut",
})

  .to(
    navItems,
    {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.4,
    },
    "-=0.2",
  );

let menuOpen = false;

menuBtn.addEventListener("click", () => {
  if (!menuOpen) {
    tl.play();
    menuOpen = true;
  } else {
    tl.reverse();
    menuOpen = false;
  }
});

// about – parallax scroll reveal

const tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".about",
    start: "top 85%",
    end: "top 35%",
    scrub: 1
  }
});

tl2.to(".hero", {
  opacity: 0,
  scale: 0.96
}, 0)
.to(".about", {
  y: 0
}, 0);


// ======== Services Section Animations ========

// Container reveal – animate FROM hidden TO natural CSS state
gsap.from(".services-card", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".services-card",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

// Inner elements sequenced timeline
const servicesTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".services-card",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// Title slides up with de-skew
servicesTl.from(".services-title", {
  y: "100%",
  skewY: 4,
  duration: 0.9,
  ease: "power4.out",
});

// Divider grows from left
servicesTl.from(".services-divider", {
  scaleX: 0,
  duration: 0.7,
  ease: "power2.inOut",
}, "-=0.4");

// Description fades in
servicesTl.from(".services-desc", {
  opacity: 0,
  y: 20,
  duration: 0.6,
  ease: "power2.out",
}, "-=0.3");

// Service cards stagger reveal
servicesTl.from(".service-card", {
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.12,
  ease: "power3.out",
}, "-=0.2");


// ======== Work Section Animations ========

// Container reveal
gsap.from(".work-card", {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".work-card",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

// Inner elements timeline
const workTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".work-card",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// Title slides up with de-skew
workTl.from(".work-title", {
  y: "100%",
  skewY: 4,
  duration: 0.9,
  ease: "power4.out",
});

// Divider grows from left
workTl.from(".work-divider", {
  scaleX: 0,
  duration: 0.7,
  ease: "power2.inOut",
}, "-=0.4");

// Work cards stagger reveal
workTl.from(".work-item", {
  opacity: 0,
  y: 50,
  duration: 0.7,
  stagger: 0.15,
  ease: "power3.out",
}, "-=0.3");


// ======== 3D Tilt on Work Cards ========
document.querySelectorAll("[data-tilt]").forEach((card) => {
  const tiltStrength = 8; // degrees

  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -tiltStrength;
    const rotateY = ((x - centerX) / centerX) * tiltStrength;

    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  });
});


// ======== Skills Section ========

// Randomize skill box positions (shuffle the 3 empty cards among the 15 filled ones)
(function shuffleSkillGrid() {
  const grid = document.querySelector(".skills-grid");
  const boxes = Array.from(grid.children);
  // Fisher-Yates shuffle
  for (let i = boxes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [boxes[i], boxes[j]] = [boxes[j], boxes[i]];
  }
  boxes.forEach(box => grid.appendChild(box));
})();

// Header reveal
gsap.from(".skills-header", {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".skills-section",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

// Skill boxes stagger reveal
gsap.from(".skill-box", {
  opacity: 0,
  y: 40,
  duration: 0.5,
  stagger: 0.06,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".skills-grid",
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

// Subtle floating on empty boxes
gsap.utils.toArray(".skill-box.empty").forEach((box, i) => {
  gsap.to(box, {
    y: -6,
    duration: 2 + i * 0.4,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
  });
});


// ======== Contact Section Animations ========

const contactTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".contact-section",
    start: "top 75%",
    toggleActions: "play none none none",
  },
});

// Label fades in
contactTl.from(".contact-label", {
  opacity: 0,
  y: 20,
  duration: 0.5,
  ease: "power2.out",
});

// Heading slides up
contactTl.from(".contact-heading", {
  opacity: 0,
  y: 60,
  duration: 0.8,
  ease: "power4.out",
}, "-=0.2");

// Subtitle appears
contactTl.from(".contact-sub", {
  opacity: 0,
  y: 30,
  duration: 0.6,
  ease: "power2.out",
}, "-=0.4");

// Card slides up
contactTl.from(".contact-card", {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "power3.out",
}, "-=0.3");

// Contact items stagger
contactTl.from(".contact-item", {
  opacity: 0,
  x: -30,
  duration: 0.5,
  stagger: 0.12,
  ease: "power3.out",
}, "-=0.4");

// Footer
contactTl.from(".contact-footer", {
  opacity: 0,
  duration: 0.5,
  ease: "power2.out",
}, "-=0.2");
