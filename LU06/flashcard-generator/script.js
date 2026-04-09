async function generate() {
  const subject = document.getElementById("subject").value;

  const res = await fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ subject })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Fetch failed:", res.status, text);
    return;
  }

  const data = await res.json();
  const parsed = JSON.parse(data.result);

  displayCards(parsed.flashcards);
}

function displayCards(cards) {
  const container = document.getElementById("cards");
  container.innerHTML = "";

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <div class="inner">
        <div class="front">${card.question}</div>
        <div class="back">${card.answer}</div>
      </div>
    `;

    div.onclick = () => {
      div.classList.toggle("flip");
    };

    container.appendChild(div);
  });
}