// js/admin.js

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#bookingTable tbody");

  // Fetch bookings from backend
  fetch("http://localhost:5000/api/bookings")
    .then(res => res.json())
    .then(data => {
      if (data.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='6'>No bookings found</td></tr>";
        return;
      }

      data.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${booking.name}</td>
          <td>${booking.email}</td>
          <td>${booking.phone}</td>
          <td>${booking.date}</td>
          <td>${booking.time}</td>
          <td>${booking.guests}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error fetching bookings:", err);
      tableBody.innerHTML = "<tr><td colspan='6'>Error loading bookings</td></tr>";
    });
});
