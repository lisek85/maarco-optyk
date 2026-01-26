document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");

  if (!btn || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const open = !nav.classList.contains("is-open");
    setOpen(open);
  });

  // Zamknij po kliknięciu linku
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => setOpen(false));
  });

  // Zamknij po kliknięciu poza menu
  document.addEventListener("click", (e) => {
    if (!nav.classList.contains("is-open")) return;
    if (e.target.closest(".menu-toggle") || e.target.closest("#site-nav")) return;
    setOpen(false);
  });

  // Zamknij Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });
});
