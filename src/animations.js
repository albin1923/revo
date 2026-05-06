import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(heroApi) {
  // ─── Hero Entrance ───
  const heroTl = gsap.timeline({ delay: 0.3 });

  heroTl
    .to('.hero-title .char', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out',
    })
    .to('.hero-tagline', {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power2.out',
    }, '-=0.3')
    .to('.hero-cta-group', {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3')
    .to('.scroll-indicator', {
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out',
    }, '-=0.2');

  // ─── Hero Video Scroll ───
  if (heroApi) {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        heroApi.updateScroll(self.progress);
      },
    });

    // Fade out hero content on scroll
    gsap.to('.hero-overlay', {
      opacity: 0,
      scrollTrigger: {
        trigger: '#hero',
        start: '15% top',
        end: '40% top',
        scrub: true,
      },
    });

    // Zoom into video and fade it out smoothly into the next page
    gsap.to('.hero-video-bg', {
      scale: 2.5,
      filter: 'blur(10px) brightness(0.2)',
      opacity: 0,
      scrollTrigger: {
        trigger: '#hero',
        start: '60% top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ─── Section Labels ───
  gsap.utils.toArray('.section-label').forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ─── Reveal Text (Section Titles) ───
  gsap.utils.toArray('.reveal-text').forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ─── Reveal Up (Cards, Images, etc.) ───
  gsap.utils.toArray('.reveal-up').forEach((el, i) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.7,
      delay: (i % 4) * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // ─── Menu Cards Stagger ───
  ScrollTrigger.create({
    trigger: '#menu-grid',
    start: 'top 80%',
    onEnter: () => {
      gsap.to('#menu-grid .glass-card', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    },
    once: true,
  });

  // ─── Stats Counter Animation ───
  gsap.utils.toArray('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate() {
            if (target >= 1000) {
              el.textContent = Math.floor(obj.val).toLocaleString() + '+';
            } else {
              el.textContent = Math.floor(obj.val);
            }
          },
        });
      },
      once: true,
    });
  });

  // ─── Parallax background for experience section ───
  const expBg = document.querySelector('.experience-bg img');
  if (expBg) {
    gsap.to(expBg, {
      y: '-15%',
      scrollTrigger: {
        trigger: '#experience',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // ─── Navbar scroll state ───
  ScrollTrigger.create({
    start: 100,
    onUpdate: (self) => {
      const navbar = document.getElementById('navbar');
      if (self.scroll() > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    },
  });
}
