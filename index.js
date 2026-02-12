const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// DATA JADWAL
const jadwal = {
  senin: [
    { waktu: "07:00", mapel: "Matematika" },
    { waktu: "09:00", mapel: "Bahasa Indonesia" }
  ],
  selasa: [
    { waktu: "07:00", mapel: "IPA" }
  ],
  rabu: [
    { waktu: "10:00", mapel: "IPS" }
  ]
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;
  const waktu = req.body.queryResult.parameters.waktu;

  let jawaban = "";

  if (!jadwal[hari]) {
    jawaban = `Tidak ada jadwal untuk hari ${hari}`;
  } else {
    if (waktu) {
      const jam = waktu.substring(0,5);
      const data = jadwal[hari].find(j => j.waktu === jam);

      jawaban = data
        ? `Hari ${hari} jam ${jam} mata pelajarannya ${data.mapel}`
        : `Tidak ada pelajaran di jam tersebut`;
    } else {
      jawaban = `Jadwal hari ${hari}:\n`;
      jadwal[hari].forEach(j => {
        jawaban += `${j.waktu} - ${j.mapel}\n`;
      });
    }
  }

  res.json({
    fulfillmentText: jawaban
  });
});

app.listen(3000, () => {
  console.log("Webhook aktif");
});

  
    
