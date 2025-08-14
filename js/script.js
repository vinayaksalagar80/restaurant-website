document.addEventListener("DOMContentLoaded", () => {
  // Handle booking form submit
  const form = document.getElementById("bookingForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const payload = {
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        guests: document.getElementById("guests").value
      };

      if (!payload.name || !payload.phone || !payload.date || !payload.time || !payload.guests) {
        return showMsg("Please fill all fields.", true);
      }

      try {
        const res = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json();
        if (!res.ok) return showMsg(data.message || "Something went wrong.", true);

        showMsg(data.message);
        form.reset();
      } catch (err) {
        showMsg("Cannot reach server. Is the backend running?", true);
      }
    });
  }

  // Simple menu search
  const search = document.getElementById("search");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.toLowerCase();
      document.querySelectorAll("#menu-grid .card").forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? "" : "none";
      });
    });
  }
});

function showMsg(text, error = false) {
  const el = document.getElementById("responseMsg");
  if (!el) return;
  el.textContent = text;
  el.style.color = error ? "crimson" : "green";
}
