document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("promo-grid");
  if (!grid) return;

  fetch("/promocje.json")
    .then(res => res.json())
    .then(data => {
      grid.innerHTML = "";

      data.forEach(promo => {
        const card = document.createElement("div");
        card.className = "promo-card";

        card.innerHTML = `
          <h3>${promo.title}</h3>
          <p>${promo.description}</p>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Błąd wczytywania promocji:", err);
      grid.innerHTML = "<p>Aktualnie brak promocji.</p>";
    });
});
