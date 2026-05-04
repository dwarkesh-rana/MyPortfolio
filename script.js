function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
function loadingAnimation() {
  var tl = gsap.timeline();
  tl.from(".line h1", {
    y: 150,
    stagger: 0.25,
    duration: 0.4,
    delay: 0.5,
  });
  tl.from("#line1-part1", {
    opacity: 0,
    onStart: function () {
      var h5timer = document.querySelector("#line1-part1 h5");
      var grow = 0;
      setInterval(function () {
        if (grow < 100) {
          h5timer.innerHTML = grow++;
        } else {
          h5timer.innerHTML = grow;
        }
      }, 27);
    },
  });
  tl.to(".line h2", {
    animationName: "loaderAnime",
    opacity: 1,
  });
  tl.to("#loader", {
    opacity: 0,
    duration: 0.2,
    delay: 2.6,
  });
  tl.from("#page1", {
    delay: 0.1,
    y: 1600,
    duration: 0.5,
    ease: Power4,
  });
  tl.to("#loader", {
    display: "none",
  });
  tl.from("#nav", {
    opacity: 0,
  });
  tl.from("#hero1 h1,#hero2 h1,#hero3 h2,#hero4 h1", {
    y: 140,
    stagger: 0.2,
  });
  tl.from(".hero-profile", {
    opacity: 0,
    x: 200,
    duration: 0.8,
  });
  tl.from(".hero-badge", {
    opacity: 0,
    y: 50,
    duration: 0.6,
  }, "-=0.4");
  tl.from(
    "#hero1, #page2",
    {
      opacity: 0,
    },
    "-=1.2"
  );
}
function cursorAnimation() {
  // Enhanced cursor with custom styling
  Shery.mouseFollower({
    skew: true,
    ease: "cubic-bezier(0.19, 1, 0.22, 1)",
    duration: 0.8,
  });
  Shery.makeMagnet("#nav-part2 h4");

  // Cursor interactions with different elements
  const mousefollower = document.querySelector(".mousefollower");
  
  // Buttons and links
  document.querySelectorAll("button, a, .material-btn, .submit-btn, .repo-link").forEach(el => {
    el.addEventListener("mouseenter", function() {
      gsap.to(mousefollower, {
        scale: 2.5,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 0 30px rgba(255, 166, 61, 0.6)"
      });
    });
    el.addEventListener("mouseleave", function() {
      gsap.to(mousefollower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        boxShadow: "0 0 0px rgba(255, 166, 61, 0)"
      });
    });
  });

  // Video container
  var videoContainer = document.querySelector("#video-container");
  if (videoContainer) {
    videoContainer.addEventListener("mouseenter", function () {
      gsap.to(".mousefollower", {
        opacity: 0,
        duration: 0.3
      });
    });
    videoContainer.addEventListener("mouseleave", function () {
      gsap.to(".mousefollower", {
        opacity: 1,
        duration: 0.3
      });
    });
  }

  // Cards and interactive elements
  document.querySelectorAll(".material-card, .repo-card, .cert-card, .tech-item, .stat-card, .contact-item").forEach(card => {
    card.addEventListener("mouseenter", function() {
      gsap.to(mousefollower, {
        scale: 1.8,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    card.addEventListener("mouseleave", function() {
      gsap.to(mousefollower, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}
function sheryAnimation() {
  Shery.imageEffect(".image-div", {
    style: 5,
    gooey: true,
    // debug:true,
    config:{"a":{"value":2,"range":[0,30]},"b":{"value":0.75,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7241195453907675},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":true},"maskVal":{"value":1.23,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":0},"noise_speed":{"value":0.5,"range":[0,10]},"metaball":{"value":0.33,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0.01,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}}
  });
}
function flagAnimation() {

  document.addEventListener("mousemove", function (dets) {
    gsap.to(".hero-profile", {
      x: dets.x - 500,
      y: dets.y - 300
    })
  })
  document.querySelector("#hero3").addEventListener("mouseenter", function () {
    gsap.to(".hero-profile", {
      opacity: 1
    })
  })
  document.querySelector("#hero3").addEventListener("mouseleave", function () {
    gsap.to(".hero-profile", {
      opacity: 0
    })
  })

}
function footerAnimation() {

  var clutter = ""
  var clutter2 = ""
  document.querySelector("#footer h1").textContent.split("").forEach(function (elem) {
    clutter += `<span>${elem}</span>`
  })
  document.querySelector("#footer h1").innerHTML = clutter
  document.querySelector("#footer h2").textContent.split("").forEach(function (elem) {
    clutter2 += `<span>${elem}</span>`
  })
  document.querySelector("#footer h2").innerHTML = clutter2


  document.querySelector("#footer-text").addEventListener("mouseenter", function () {
    gsap.to("#footer h1 span", {
      opacity: 0,
      stagger: 0.05
    })
    gsap.to("#footer h2 span", {
      delay: 0.35,
      opacity: 1,
      stagger: 0.1
    })
  })
  document.querySelector("#footer-text").addEventListener("mouseleave", function () {
    gsap.to("#footer h1 span", {
      opacity: 1,
      stagger: 0.1,
      delay: 0.35,

    })
    gsap.to("#footer h2 span", {
      opacity: 0,
      stagger: 0.05
    })
  })
}

function contactFormAnimation() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Simulate form submission (you can replace this with actual API call)
      const submitBtn = document.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call delay
      setTimeout(() => {
        alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you soon!`);
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

function materialCardAnimations() {
  // Add hover animations for material cards with scroll trigger
  gsap.utils.toArray('.material-card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.1
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.4,
        ease: "power2.out",
        transform: "translateY(-10px) scale(1.02)"
      });
      gsap.to(card.querySelector('.material-icon'), {
        scale: 1.3,
        rotation: 10,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.4,
        ease: "power2.out",
        transform: "translateY(0px) scale(1)"
      });
      gsap.to(card.querySelector('.material-icon'), {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
}

function repoCardAnimations() {
  // Add hover animations for repository cards with scroll trigger
  gsap.utils.toArray('.repo-card').forEach((card, index) => {
    gsap.from(card, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.15
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        y: -15,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 20px 50px rgba(255, 166, 61, 0.3)"
      });
      gsap.to(card.querySelector('.repo-header h3'), {
        color: "#FF8C42",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        boxShadow: "0 10px 30px rgba(255, 166, 61, 0)"
      });
      gsap.to(card.querySelector('.repo-header h3'), {
        color: "#FFA63D",
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
}

function techStackAnimations() {
  // Add hover animations for tech stack items with scroll trigger
  gsap.utils.toArray('.tech-item').forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      ease: "back.out",
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      delay: (index % 4) * 0.1
    });

    item.addEventListener('mouseenter', () => {
      gsap.to(item, {
        duration: 0.4,
        ease: "power2.out",
        transform: "translateY(-8px) scale(1.1)"
      });
      gsap.to(item.querySelector('img'), {
        scale: 1.3,
        rotation: 5,
        duration: 0.4,
        ease: "power2.out"
      });
    });
    
    item.addEventListener('mouseleave', () => {
      gsap.to(item, {
        duration: 0.4,
        ease: "power2.out",
        transform: "translateY(0px) scale(1)"
      });
      gsap.to(item.querySelector('img'), {
        scale: 1,
        rotation: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    });
  });
}

function timelineAnimations() {
  // Animate timeline items on scroll
  gsap.utils.toArray('.timeline-item').forEach((item, index) => {
    gsap.from(item, {
      opacity: 0,
      x: -50,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.15
    });
    
    gsap.from(item.querySelector('.timeline-dot'), {
      scale: 0,
      duration: 0.6,
      ease: "back.out",
      scrollTrigger: {
        trigger: item,
        start: "top 85%",
        toggleActions: "play none none reverse"
      },
      delay: index * 0.15 + 0.2
    });
  });
}

function statsCounterAnimation() {\n  // Animate statistics counters with scroll trigger\n  gsap.utils.toArray('.stat-card').forEach((card, index) => {\n    gsap.from(card, {\n      opacity: 0,\n      scale: 0.8,\n      duration: 0.7,\n      ease: \"back.out\",\n      scrollTrigger: {\n        trigger: card,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      },\n      delay: index * 0.1\n    });\n  });\n\n  gsap.utils.toArray('.stat-number').forEach(counter => {\n    const target = parseInt(counter.textContent.replace(/[^\\d]/g, ''));\n    \n    gsap.from(counter, {\n      textContent: 0,\n      duration: 2.5,\n      ease: \"power3.out\",\n      snap: { textContent: 1 },\n      scrollTrigger: {\n        trigger: counter,\n        start: \"top 80%\",\n        toggleActions: \"play none none reverse\"\n      },\n      onUpdate: function() {\n        counter.textContent = Math.ceil(gsap.getProperty(counter, \"textContent\"));\n      }\n    });\n  });\n}\n\nfunction certCardAnimations() {\n  // Animate certification cards on scroll\n  gsap.utils.toArray('.cert-card').forEach((card, index) => {\n    gsap.from(card, {\n      opacity: 0,\n      rotateY: -90,\n      duration: 0.8,\n      ease: \"power3.out\",\n      scrollTrigger: {\n        trigger: card,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      },\n      delay: index * 0.12\n    });\n\n    card.addEventListener('mouseenter', () => {\n      gsap.to(card, {\n        y: -15,\n        duration: 0.4,\n        ease: \"power2.out\"\n      });\n      gsap.to(card.querySelector('.cert-icon'), {\n        scale: 1.3,\n        rotation: 15,\n        duration: 0.4,\n        ease: \"power2.out\"\n      });\n    });\n    \n    card.addEventListener('mouseleave', () => {\n      gsap.to(card, {\n        y: 0,\n        duration: 0.4,\n        ease: \"power2.out\"\n      });\n      gsap.to(card.querySelector('.cert-icon'), {\n        scale: 1,\n        rotation: 0,\n        duration: 0.4,\n        ease: \"power2.out\"\n      });\n    });\n  });\n}\n\nfunction pageHeadingAnimations() {\n  // Animate page headings and underlines\n  gsap.utils.toArray('h1').forEach(heading => {\n    gsap.from(heading, {\n      opacity: 0,\n      y: 50,\n      duration: 0.8,\n      ease: \"power3.out\",\n      scrollTrigger: {\n        trigger: heading,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      }\n    });\n  });\n\n  gsap.utils.toArray('.underline').forEach(line => {\n    gsap.from(line, {\n      width: 0,\n      duration: 1,\n      ease: \"power3.out\",\n      scrollTrigger: {\n        trigger: line,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      }\n    });\n  });\n}\n\nfunction contactFormAnimations() {\n  // Animate contact form elements\n  const contactForm = document.querySelector('.contact-form');\n  const contactInfo = document.querySelectorAll('.contact-item');\n\n  if (contactForm) {\n    gsap.from(contactForm, {\n      opacity: 0,\n      x: -50,\n      duration: 0.8,\n      ease: \"power3.out\",\n      scrollTrigger: {\n        trigger: contactForm,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      }\n    });\n  }\n\n  contactInfo.forEach((item, index) => {\n    gsap.from(item, {\n      opacity: 0,\n      x: 50,\n      duration: 0.8,\n      ease: \"power3.out\",\n      scrollTrigger: {\n        trigger: item,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      },\n      delay: index * 0.1\n    });\n\n    item.addEventListener('mouseenter', () => {\n      gsap.to(item, {\n        x: 20,\n        duration: 0.3,\n        ease: \"power2.out\"\n      });\n      gsap.to(item.querySelector('.contact-icon'), {\n        scale: 1.3,\n        rotation: 10,\n        duration: 0.3,\n        ease: \"power2.out\"\n      });\n    });\n    \n    item.addEventListener('mouseleave', () => {\n      gsap.to(item, {\n        x: 0,\n        duration: 0.3,\n        ease: \"power2.out\"\n      });\n      gsap.to(item.querySelector('.contact-icon'), {\n        scale: 1,\n        rotation: 0,\n        duration: 0.3,\n        ease: \"power2.out\"\n      });\n    });\n  });\n}\n\nfunction textParallaxAnimations() {\n  // Parallax effect on text elements\n  gsap.utils.toArray('p').forEach(para => {\n    gsap.from(para, {\n      opacity: 0,\n      y: 30,\n      duration: 0.8,\n      ease: \"power3.out\",\n      scrollTrigger: {\n        trigger: para,\n        start: \"top 85%\",\n        toggleActions: \"play none none reverse\"\n      }\n    });\n  });\n}"

loadingAnimation();
cursorAnimation();
locomotiveAnimation();
sheryAnimation();
flagAnimation();
footerAnimation();
contactFormAnimation();
materialCardAnimations();
repoCardAnimations();
techStackAnimations();
timelineAnimations();
statsCounterAnimation();
certCardAnimations();
pageHeadingAnimations();
contactFormAnimations();
textParallaxAnimations();