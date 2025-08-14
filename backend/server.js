const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const DATA_PATH = path.join(__dirname, "db.json");

// ensure db.json exists
if (!fs.existsSync(DATA_PATH)) fs.writeFileSync(DATA_PATH, "[]", "utf-8");

const readBookings = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const writeBookings = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/bookings", (_req, res) => {
  res.json(readBookings());
});

app.post("/api/bookings", (req, res) => {
  const { name, phone, date, time, guests } = req.body || {};
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const bookings = readBookings();
  const booking = {
    id: Date.now(),
    name,
    phone,
    date,
    time,
    guests: Number(guests)
  };
  bookings.push(booking);
  writeBookings(bookings);
  res.json({ message: "Booking confirmed!", booking });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
