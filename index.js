const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// DATA JADWAL SENIN - JUMAT (RENTANG WAKTU)
const jadwal = {
  senin: [
    { mulai: "08:10", selesai: "10:10", mapel: "Agama" },
    { mulai: "10:40", selesai: "15:00", mapel: "Dasar Dasar Akuntansi" }
  ],
  selasa: [
    { mulai: "07:30", selesai: "09:30", mapel: "Pjok" },
    { mulai: "09:30", selesai: "11:20", mapel: "Matematika" },
    { mulai: "11:20", selesai: "15:40", mapel: "Ipas" }
     
  ],
  rabu: [
    { mulai: "07:30", selesai: "08:50", mapel: "Sejarah" },
    { mulai: "08:50", selesai: "13:20", mapel: "Dasar dasar Akuntansi" },
    { mulai: "13:40", selesai: "15:00", mapel: "KKA" },
  ],
  kamis: [
    { mulai: "07:30", selesai: "08:50", mapel: "Bahasa Indonesia" },
    { mulai: "08:50", selesai: "12:00", mapel: "Informatika" },
    { mulai: "12:00", selesai: "15:00", mapel: "Bahasa Inggris" },
    { mulai: "15:00", selesai: "15:40", mapel: "Bk" },
  ],
  jumat: [
    { mulai: "08:10", selesai: "09:30", mapel: "Seni budaya" },
    { mulai: "09:30", selesai: "11:20", mapel: "Pkn" },
    { mulai: "11:20", selesai: "12:40", mapel: "Bahasa Indonesia" },
    { mulai: "11:20", selesai: "14:20", mapel: "Bahasa Bali" },
    { mulai: "14:20", selesai: "15:40", mapel: "Matematika" },
  ]
};

app.post("/webhook", (req, res) => {
  const hari = req.body.queryResult.parameters.hari;
  const waktu = req.body.queryResult.parameters.waktu;

  let jawaban = "";

  if (!jadwal[hari]) {
    jawaban = `Jadwal hari ${hari} tidak tersedia`;
  } else {
    if (waktu) {
      const jamUser = waktu.substring(0, 5);

      const pelajaran = jadwal[hari].find(j =>
        jamUser >= j.mulai && jamUser < j.selesai
      );

      jawaban = pelajaran
        ? `Hari ${hari} jam ${pelajaran.mulai}–${pelajaran.selesai} adalah ${pelajaran.mapel}`
        : `Tidak ada pelajaran di jam tersebut`;
    } else {
      jawaban = `Jadwal pelajaran hari ${hari}:\n`;
      jadwal[hari].forEach(j => {
        jawaban += `${j.mulai}–${j.selesai} : ${j.mapel}\n`;
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

