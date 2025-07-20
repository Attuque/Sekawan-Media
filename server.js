const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/submit-booking', (req, res) => {
  const { paket } = req.body;
  const time = new Date().toLocaleString();
  const logData = `[${time}] Booking: ${paket}\n`;
  fs.appendFileSync('booking_log.txt', logData);
  fs.writeFileSync('dslrbooth_trigger.txt', `Booking: ${paket}\nWaktu: ${time}`);
  res.send(`<h1>Booking Berhasil</h1><p>Paket: ${paket}</p><a href='/'>Kembali</a>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
