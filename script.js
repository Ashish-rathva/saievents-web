document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.header__nav a[href^="#"]');

  const smoothScrollTo = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 90;
    window.scrollTo({ top, behavior: "smooth" });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId) return;

      e.preventDefault();
      smoothScrollTo(targetId);
    });
  });

  const scrollButtons = document.querySelectorAll("[data-scroll-target]");
  scrollButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetSelector = btn.getAttribute("data-scroll-target");
      if (!targetSelector) return;
      smoothScrollTo(targetSelector);
    });
  });

  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.querySelector("#name")?.value || "";
      const email = document.querySelector("#email")?.value || "";
      const date = document.querySelector("#date")?.value || "";
      const city = document.querySelector("#city")?.value || "";
      const type = document.querySelector("#type")?.value || "";
      const details = document.querySelector("#details")?.value || "";

      const subject = encodeURIComponent(
        `New event enquiry from ${name || "website visitor"}`
      );

      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        `Event date: ${date}`,
        `City: ${city}`,
        `Event type: ${type}`,
        "",
        "Details:",
        details,
      ];

      const body = encodeURIComponent(bodyLines.join("\n"));
      const mailtoHref = `mailto:saievents00001@gmail.com?subject=${subject}&body=${body}`;

      const messageEl = document.querySelector("#form-message");
      if (messageEl) {
        messageEl.textContent = "Thank You ! we'll reach you Very Soon";
        messageEl.hidden = false;
      }

      window.location.href = mailtoHref;
    });
  }
});
// Mobile hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.header__nav');   // ←←← CHANGE to your actual class

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Optional: animate the hamburger to X
    hamburger.classList.toggle('active');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('carousel-track');
  const container = document.getElementById('carousel-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dotsContainer = document.getElementById('carousel-dots');

  // Get original cards
  let originalSlides = Array.from(track.querySelectorAll('.testimonial-card'));
  const totalOriginal = originalSlides.length;

  // Create infinite loop by cloning first & last cards
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[totalOriginal - 1].cloneNode(true);
  track.appendChild(firstClone);
  track.prepend(lastClone);

  // Now all slides (including clones)
  let slides = track.querySelectorAll('.testimonial-card');
  let currentIndex = 1; // start at first real slide (after the prepended clone)

  // Initial position
  track.style.transform = `translateX(-100%)`;

  // Create dots (only for original slides)
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalOriginal; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    const displayedIndex = (currentIndex - 1 + totalOriginal) % totalOriginal;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === displayedIndex);
    });
  }

  function moveCarousel() {
    track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function resetPosition() {
    track.style.transition = 'none';
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    // Force browser reflow
    track.offsetHeight;
    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  }

  function slideNext() {
    currentIndex++;
    moveCarousel();
    updateDots();

    // If we reached the last clone → reset to first real slide
    if (currentIndex === totalOriginal + 1) {
      setTimeout(() => {
        currentIndex = 1;
        resetPosition();
        updateDots();
      }, 600);
    }
  }

  function slidePrev() {
    currentIndex--;
    moveCarousel();
    updateDots();

    // If we reached the first clone → reset to last real slide
    if (currentIndex === 0) {
      setTimeout(() => {
        currentIndex = totalOriginal;
        resetPosition();
        updateDots();
      }, 600);
    }
  }

  function goToSlide(index) {
    currentIndex = index + 1;
    moveCarousel();
    updateDots();
  }

  // Auto-slide
  let autoInterval;
  function startAutoSlide() {
    autoInterval = setInterval(slideNext, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoInterval);
  }

  // Buttons
  nextBtn.addEventListener('click', () => {
    stopAutoSlide();
    slideNext();
    startAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    stopAutoSlide();
    slidePrev();
    startAutoSlide();
  });

  // Hover pause (desktop only)
  container.addEventListener('mouseenter', stopAutoSlide);
  container.addEventListener('mouseleave', startAutoSlide);

  // Swipe support (mobile)
  let touchStartX = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  });

  container.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) slideNext();
    if (touchEndX - touchStartX > 50) slidePrev();
    startAutoSlide();
  });

  // Initialize everything
  createDots();
  updateDots();
  startAutoSlide();
});

// Number animation for stats
document.addEventListener('DOMContentLoaded', () => {
  const statValues = document.querySelectorAll('.stat__value');
  let hasAnimated = false;

  const animateNumber = (element) => {
    const textContent = element.textContent.trim();
    let targetValue;
    let hasPlus = textContent.includes('+');
    let isDecimal = textContent.includes('.');

    // Extract numeric value
    if (hasPlus) {
      targetValue = parseFloat(textContent.replace('+', ''));
    } else {
      targetValue = parseFloat(textContent);
    }

    const startValue = 0;
    const duration = 1500; // animation duration in ms
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = progress * (targetValue - startValue) + startValue;

      let displayValue;
      if (isDecimal) {
        displayValue = currentValue.toFixed(1);
      } else {
        displayValue = Math.round(currentValue);
      }

      if (hasPlus) {
        element.textContent = displayValue + '+';
      } else {
        element.textContent = displayValue;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // Use Intersection Observer to trigger animation when stats come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statValues.forEach((stat) => {
          animateNumber(stat);
        });
        observer.disconnect();
      }
    });
  }, {
    threshold: 0.3
  });

  const statsContainer = document.querySelector('.hero__stats');
  if (statsContainer) {
    observer.observe(statsContainer);
  }
});
