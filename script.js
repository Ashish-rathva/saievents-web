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

