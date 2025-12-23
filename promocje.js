document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("promo-grid");
  if (!grid) return;

  grid.innerHTML = "<p>Wczytuję promocje…</p>";

  fetch("/promocje.json", { cache: "no-store" })
    .then(res => {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    })
    .then(data => {
      if (!Array.isArray(data)) throw new Error("JSON nie jest tablicą");

      grid.innerHTML = "";

      data.forEach(promo => {
        const card = document.createElement("div");
        card.className = "promo-card";

        const title = promo.title || "";
        const desc = promo.description || "";
        const cta = promo.cta || "Sprawdź";
        const link = promo.link || "oferta.html";

        card.innerHTML = `
          <h3>${title}</h3>
          <p>${desc}</p>
          <p style="margin-top:10px;">
            <a href="${link}" class="promo-cta">${cta}</a>
          </p>
        `;

        grid.appendChild(card);
      });

      if (!grid.children.length) {
        grid.innerHTML = "<p>Aktualnie brak promocji.</p>";
      }
    })
    .catch(err => {
      console.error("Błąd wczytywania promocji:", err);
      grid.innerHTML = `<p>Nie udało się wczytać promocji. (${err.message})</p>`;
    });
});
