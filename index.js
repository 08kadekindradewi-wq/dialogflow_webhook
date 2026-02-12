const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// DATA JADWAL
const jadwal = {
  senin: [
    { waktu: "08:10", mapel: "Agama" },
    { waktu: "08:50", mapel: "agama" },
    { waktu: "09:30", mapel: "agama" },
    { waktu: "10:40", mapel: "dasar dasar akuntansi" },
    { waktu: "11:20", mapel: "dasar dasar akuntansi" }
    { waktu: "12:00", mapel: "dasar dasar akuntansi" }
    { waktu: "12:40", mapel: "dasar dasar akuntansi" }
    { waktu: "13:40", mapel: "dasar dasar akuntansi" }
    { waktu: "14:20", mapel: "dasar dasar akuntansi" }
    { waktu: "15:00", mapel: "dasar dasar akuntansi" }
    
  ],
  selasa: [
    { waktu: "07:30", mapel: "pjok" }
    { waktu: "08:10", mapel: "pjok" }
    { waktu: "08:50", mapel: "pjok" } 
    { waktu: "09:30", mapel: "matematika" }
    { waktu: "10:40", mapel: "matematika" }
    { waktu: "11:20", mapel: "ipas" }
    { waktu: "12:00", mapel: "ipas" }
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

  
    
