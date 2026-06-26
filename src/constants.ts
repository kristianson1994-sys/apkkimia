import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;
export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const chemistryData = {
  grades: {
    X: {
      title: "Kelas X (Fase E)",
      chapters: [
        {
          id: "green-chemistry",
          title: "Kimia Hijau",
          topics: ["Prinsip Kimia Hijau", "Dampak Lingkungan", "Solusi Berkelanjutan"],
          mission: "Menstabilkan Ekosistem Sungai",
          story: "Kisah Penjaga Sungai Biru",
          pbl: "Limbah Tekstil di Pemukiman",
          content: {
            "Materi Biasa": `
# KIMIA HIJAU

## A. Pengertian Kimia Hijau
Kimia hijau merupakan suatu pendekatan terhadap perancangan, proses pembuatan, dan pemanfaatan produk kimia dengan cara mengurangi atau bahkan menghilangkan dampak berbahaya yang disebabkan oleh zat kimia terhadap lingkungan dan manusia.

Dikutip dari artikel ilmiah yang berjudul *Penerapan Kimia Hijau untuk Menjamin Keamanan Pangan* yang ditulis oleh Dina Mustafa, konsep kimia hijau juga dikenal sebagai kimia berkelanjutan. Hal ini mencakup ide dan implementasi kimia serta teknologi yang berinteraksi dengan disiplin ilmu lain, seperti fisika dan biologi.

## B. Tujuan Kimia Hijau
Tujuan utama dalam kimia hijau ialah menciptakan senyawa kimia yang lebih baik dan aman. Menurut jurnal yang berjudul *Kimia Hijau dan Pembangunan Kesehatan yang Berkelanjutan di Perkotaan* oleh Dina Mustafa, pendekatan ini berusaha secara selektif menentukan cara sintesis yang paling aman and efisien untuk zat-zat tersebut. Tujuannya mengurangi limbah kimia yang dihasilkan.

Dalam konteks penghilangan dampak negatif, upaya tersebut dimulai sejak tahap perancangan. Pencegahan risiko pada proses pembuatan zat kimia diharapkan memberikan manfaat signifikan bagi kesehatan manusia dan lingkungan.

Prinsip utama pendekatan kimia hijau tercermin dalam moto: **"Lebih baik, lebih mudah, dan lebih murah untuk merancang dan mengembangkan proses-proses dan senyawa yang ramah lingkungan daripada mengatasi akibat buruk dari proses dan produk kimia yang berbahaya bagi lingkungan."** Moto tersebut menekankan pentingnya mencegah polusi lingkungan yang disebabkan oleh proses dan produk kimia berbahaya daripada mengatasi konsekuensi buruk setelahnya.

Konsep kimia hijau berkembang sebagai tanggapan terhadap pengembangan dan penggunaan zat kimia tanpa kontrol yang dapat menjadi kontaminan di lingkungan. Zat-zat tersebut dapat meresap ke dalam tubuh manusia dan makhluk hidup lainnya melalui tanah, air, debu, dan udara.

## C. 12 Prinsip Kimia Hijau
Dua belas prinsip kimia hijau menjadi dasar penting bagi perubahan paradigma dalam dunia kimia. Konsep ini telah menjadi pendorong revolusi dalam cara kita memahami, merencanakan, dan melaksanakan reaksi kimia serta proses industri.

Paul Anastas dan John Warner mengajukan 12 Prinsip Kimia Hijau sebagai berikut:
1. **Pencegahan polusi atom.** Mendesain proses kimia agar menghasilkan produk dengan limbah minimal.
2. **Efisiensi atom.** Memaksimalkan penggunaan semua bahan dalam reaksi kimia dan mengurangi limbah.
3. **Sintesis yang lebih aman.** Menggunakan reagen dan bahan kimia yang kurang atau tidak berbahaya.
4. **Penggunaan pelarut yang aman.** Memilih pelarut berbasis air atau pelarut ramah lingkungan.
5. **Energi yang efisien.** Menggunakan kondisi reaksi yang membutuhkan energi lebih sedikit.
6. **Menghindari bahan baku berbahaya.** Menghindari semua bahan baku yang beracun.
7. **Menggunakan katalis ramah lingkungan.** Meningkatkan penggunaan katalis untuk mempercepat reaksi.
8. **Desain produk ramah lingkungan.** Mendesain produk agar dapat diuraikan atau didaur ulang.
9. **Mengurangi derivatisasi.** Menghindari penggunaan pengganti yang tidak perlu dalam proses sintesis.
10. **Minimalisasi solvent.** Meminimalkan penggunaan pelarut organik berbahaya.
11. **Analisis kimia secara seketika.** Menggunakan metode analisis cepat untuk memonitor reaksi secara langsung.
12. **Preventif dalam desain kimia.** Memasukkan pertimbangan kimia hijau pada tahap awal perencanaan.

## D. Contoh Penerapan Kimia Hijau dalam Kehidupan Sehari-hari
1. **Pembersihan rumah tangga:** Menggunakan cuka dan baking soda.
2. **Produk pribadi:** Sabun dan sampo organik.
3. **Pertanian organik:** Mengurangi penggunaan pestisida.
4. **Pengelolaan limbah:** Mendaur ulang kertas, plastik, dan kaca.
5. **Energi terbarukan:** Panel surya atau turbin angin.
6. **Transportasi berkelanjutan:** Bersepeda atau kendaraan listrik.
7. **Pengolahan makanan:** Bahan makanan lokal dan organik.
8. **Pertanian perkotaan:** Tanpa pestisida kimia sintetis.
9. **Industri makanan:** Menggunakan metode produksi berkelanjutan.
10. **Pendidikan:** Mengedukasi diri tentang prinsip kimia hijau.

## E. Kegiatan yang Mendukung Prinsip Kimia Hijau
* **Menggunakan Sumber Energi Terbarukan:** Seperti kendaraan listrik.
* **Mengurangi Penggunaan Plastik:** Menggunakan tote bag sebagai pengganti plastik.
* **Menggalakan Penggunaan Pupuk Organik:** Menjaga kesuburan tanah.
* **Mengurangi Detergen Unbiodegradable:** Menggunakan jenis biodegradable yang mudah terurai.
* **Menghentikan Pembuangan Limbah Minyak Goreng:** Diolah menjadi biodiesel.

## F. Kegiatan yang Tidak Mendukung Prinsip Kimia Hijau
* **Penggunaan Plastik:** Limbah polimer yang sulit terurai.
* **Penggunaan Bahan Bakar Fosil:** Menghasilkan polusi udara.
* **Pembuangan Limbah Cair Rumah Tangga:** Detergen yang mencemari air.
* **Pupuk Kimia Berlebihan:** Merusak tekstur tanah dan mikroorganisme.
* **Penyalahgunaan Pestisida:** Membunuh mikroorganisme bermanfaat.

## G. Peran Kimia Hijau dalam Pembangunan Berkelanjutan
Kimia hijau mendukung *Sustainable Development Goals* (SDGs) dengan menjaga kesejahteraan ekonomi, sosial, dan kualitas lingkungan hidup dari satu generasi ke generasi berikutnya.

[LATIHAN_KIMIA_HIJAU]
            `
          }
        },
        {
          id: "global-warming",
          title: "Pemanasan Global",
          topics: ["Efek Rumah Kaca", "Gas Penyebab", "Mitigasi"],
          mission: "Menyelamatkan Kutub Utara",
          story: "Petualangan Beruang Es Terakhir",
          pbl: "Kenaikan Permukaan Air Laut",
          content: {
            "Materi Biasa": `
# PEMANASAN GLOBAL

## A. PENGERTIAN PEMANASAN GLOBAL
Pemanasan global adalah suatu bentuk ketidakseimbangan ekosistem di bumi akibat terjadinya proses peningkatan suhu rata-rata atmosfer, laut, dan daratan di bumi. Peningkatan suhu permukaan bumi ini dihasilkan oleh adanya radiasi sinar matahari menuju ke atmosfer bumi, kemudian sebagian sinar ini berubah menjadi energi panas dalam bentuk sinar infra merah diserap oleh udara dan permukaan bumi.

## B. PENYEBAB PEMANASAN GLOBAL
Berikut beberapa hal yang dianggap menjadi penyebab fenomena pemanasan global tersebut:
1. **Polusi Udara**: Udara yang tercemar oleh gas-gas buangan memiliki andil cukup besar dalam peningkatan suhu bumi. Gas-gas tersebut antara lain CFC yang berasal dari AC, karbon dioksida yang berasal dari kendaraan bermotor dan metana dari pertanian serta perkebunan. Selain itu, gas buangan dari aktivitas produksi pabrik juga menjadi salah satu penyebabnya.
2. **Efek Rumah Kaca**: Faktor penyebab pemanasan global juga datang dari efek rumah kaca yang berlebihan. Dikatakan berlebihan karena efek rumah kaca memang memiliki manfaat untuk menghangatkan bumi. Hanya saja, kalau panas yang dipantulkan ke permukaan bumi sudah melebihi batas maka akan mempengaruhi keseimbangan suhu.
3. **Pembabatan Hutan**: Hutan yang terus menerus dibabat tanpa adanya kontrol akan menghabiskan pepohonan. Padahal peran pohon sangat penting untuk menyerap gas karbon dioksida. Pembabatan hutan juga biasanya dilakukan dengan cara dibakar, yang mengakibatkan polusi udara.
4. **Proses Pembakaran Sampah dan Hasil Alam**: Pembakaran hasil alam seperti batu bara dan minyak bumi menjadi faktor yang menyebabkan global warming. Selain itu, pembakaran sampah rumah tangga juga turut andil karena gas akan terlepas bebas ke atmosfer.

## C. DAMPAK PEMANASAN GLOBAL
Beberapa dampak yang ditimbulkan oleh pemanasan global antara lain:
* Peralihan musim terganggu sehingga menjadi tidak beraturan.
* Kondisi cuaca yang perubahannya sering tidak bisa diprediksi.
* Musim kemarau berlangsung lebih panjang dari kondisi normal.
* Ekosistem alam mengalami ketidakseimbangan dan terancam rusak.
* Es di dua kutub bumi lama kelamaan mencair sehingga permukaan air laut meninggi.
* Risiko bencana alam seperti banjir, puting beliung, tsunami dan kekeringan akan meningkat.
* Terumbu karang dan biota laut terancam mati karena sulit beradaptasi dengan suhu bumi yang meningkat.
* Para petani terancam mengalami gagal panen akibat cuaca yang ekstrem.

## D. PROSES PEMANASAN GLOBAL
Secara singkat, proses pemanasan global bermula dari penyerapan cahaya matahari oleh bumi. Sinar matahari yang terserap hanya yang dibutuhkan saja untuk menghangatkan bumi. Sayangnya sisa cahaya yang seharusnya keluar justru terkungkung dalam lapisan udara dalam bumi. Hal tersebut disebabkan oleh pencemaran udara oleh gas-gas seperti karbon dioksida, sulfur dioksida, CFC dan metana. Lapisan ozon yang bertugas sebagai filter pun tidak bekerja secara maksimal.

[ANIMASI_PROSES_PEMANASAN_GLOBAL]

## E. CARA MENGATASI PEMANASAN GLOBAL
Berikut 10 upaya menanggulangi pemanasan global:
1. Mengurangi penggunaan bahan bakar fosil dan mulai menggantinya dengan energi alternatif.
2. Mengurangi penggunaan kendaraan bermotor dan menggunakan sepeda atau berjalan kaki.
3. Menghindari pemborosan energi listrik.
4. Melestarikan hutan dan tidak melakukan penebangan liar.
5. Menanam tanaman hijau di pekarangan rumah.
6. Menggerakkan program reboisasi.
7. Menghindari pembakaran sampah.
8. Menghindari pemakaian peralatan yang mengandung gas CFC.
9. Mengaplikasikan cara budidaya ramah lingkungan.
10. Menerapkan prinsip **Reduce, Reuse, dan Recycle (3R)**.
            `
          }
        },
        {
          id: "atomic-structure",
          title: "Struktur Atom",
          topics: ["Model Atom", "Konfigurasi Elektron", "SPU"],
          mission: "Menstabilkan Molekul Karbon",
          story: "Kerajaan Proton & Elektron",
          pbl: "Penemuan Unsur Baru"
        },
        {
          id: "chemical-bonding",
          title: "Ikatan Kimia",
          topics: ["Ionik", "Kovalen", "Logam"],
          mission: "Membangun Kristal Berlian",
          story: "Pesta Pernikahan Atom",
          pbl: "Material Super Kuat"
        },
        {
          id: "basic-laws",
          title: "Hukum Dasar Kimia",
          topics: ["Lavoisier", "Proust", "Dalton", "Gay-Lussac", "Avogadro"],
          mission: "Menyeimbangkan Timbangan Alkemis",
          story: "Rahasia Lab Tua Lavoisier",
          pbl: "Efisiensi Produksi Pupuk",
          content: {
            "Materi Biasa": `
# MATERI: HUKUM-HUKUM DASAR KIMIA — VISUAL & INTERAKTIF

Selamat datang di modul interaktif hukum-hukum dasar kimia. Materi ini akan membantu Anda memahami dasar perhitungan kimia melalui simulasi dan visualisasi.

---

## 1. Hukum Kekekalan Massa (Hukum Lavoisier)
**"Massa zat sebelum reaksi sama dengan massa zat sesudah reaksi."**
Dalam sistem tertutup, tidak ada massa yang hilang atau bertambah meskipun terjadi perubahan kimia.

[SIMULASI_LAVOISIER]

### Latihan soal hukum kekekalan massa
Magnesium 24 g dibakar menghasilkan MgO 40 g. Berapakah massa O₂ yang bereaksi?
[LATIHAN_LAVOISIER]

[KLIK_CONTOH_SOAL]

---

## 2. Hukum Perbandingan Tetap (Hukum Proust)
**"Senyawa selalu memiliki perbandingan massa yang tetap."**
Contoh: Air (H₂O) selalu memiliki perbandingan massa Hidrogen : Oksigen = 1 : 8.

[SIMULASI_PROUST]

### Latihan Interaktif Proust
Perbandingan Mg : O = 3 : 2. Jika tersedia 6 g Magnesium, berapa Oksigen yang dibutuhkan?
[LATIHAN_PROUST]

[KLIK_CONTOH_SOAL]

---

## 3. Hukum Perbandingan Berganda (Hukum Dalton)
**"Jika dua unsur membentuk lebih dari satu senyawa, maka perbandingan massa salah satu unsur terhadap unsur lain adalah bilangan bulat sederhana."**

[SIMULASI_DALTON]

[KLIK_CONTOH_SOAL]

---

## 4. Hukum Perbandingan Volume (Hukum Gay-Lussac)
**"Volume gas-gas yang bereaksi dan volume gas-gas hasil reaksi bila diukur pada suhu dan tekanan yang sama, akan berbanding sebagai bilangan bulat dan sederhana."**

[SIMULASI_GAYLUSSAC]

[KLIK_CONTOH_SOAL]

---

## 5. Hipotesis Avogadro
**"Pada suhu dan tekanan yang sama, gas-gas yang volumenya sama mengandung jumlah molekul yang sama pula."**

[SIMULASI_AVOGADRO]

[KLIK_CONTOH_SOAL]

---

### Quiz Akhir Capaian Pembelajaran
Uji pemahaman Anda tentang seluruh hukum dasar kimia di sini.
[QUIZ_HUKUM_DASAR]
`
          }
        },
        {
          id: "nanotechnology",
          title: "Nanoteknologi",
          topics: ["Konsep Nano", "Penerapan", "Manfaat"],
          mission: "Misi Miniaturisasi Medis",
          story: "Perjalanan ke Dalam Sel",
          pbl: "Pengobatan Kanker Presisi"
        }
      ]
    },
    XI: {
      title: "Kelas XI",
      chapters: [
        {
          id: "hydrocarbons",
          title: "Hidrokarbon & Minyak Bumi",
          topics: ["Alkana", "Alkena", "Alkuna", "Fraksi Minyak"],
          mission: "Kilang Minyak Masa Depan",
          story: "Emas Hitam dari Perut Bumi",
          pbl: "Alternatif Bahan Bakar Fosil"
        },
        {
          id: "thermochemistry",
          title: "Termokimia",
          topics: ["Entalpi", "Eksoterm", "Endoterm"],
          mission: "Pembangkit Listrik Termal",
          story: "Tarian Energi Panas",
          pbl: "Desain Kompres Dingin Instan"
        },
        {
          id: "reaction-rates",
          title: "Laju Reaksi",
          topics: ["Faktor Laju", "Orde Reaksi"],
          mission: "Mempercepat Produksi Amonia",
          story: "Balapan Partikel",
          pbl: "Pengawetan Makanan Alami"
        },
        {
          id: "acid-base",
          title: "Asam Basa",
          topics: ["pH", "Indikator", "Titrasi"],
          mission: "Menetralkan Limbah Pabrik",
          story: "Pertempuran pH",
          pbl: "Hujan Asam di Hutan Tropis"
        },
        {
          id: "equilibrium",
          title: "Kesetimbangan Kimia",
          topics: ["Tetapan Kesetimbangan", "Le Chatelier"],
          mission: "Menjaga Tekanan Reaktor",
          story: "Jungkat-Jungkit Molekul",
          pbl: "Sintesis Industri Skala Besar"
        }
      ]
    },
    XII: {
      title: "Kelas XII",
      chapters: [
        {
          id: "colligative",
          title: "Sifat Koligatif",
          topics: ["Titik Didih", "Titik Beku", "Osmosis"],
          mission: "Mencairkan Jalanan Bersalju",
          story: "Keajaiban Garam di Musim Dinigin",
          pbl: "Desalinasi Air Laut"
        },
        {
          id: "electrochemistry",
          title: "Redoks & Elektrokimia",
          topics: ["Sel Volta", "Elektrolisis", "Korosi"],
          mission: "Baterai Mobil Listrik Terkuat",
          story: "Aliran Elektron Ajaib",
          pbl: "Pencegahan Karat Jembatan"
        },
        {
          id: "colloids",
          title: "Koloid",
          topics: ["Sifat Koloid", "Jenis Koloid"],
          mission: "Membuat Kabut Buatan",
          story: "Dunia di Antara Campuran",
          pbl: "Penjernihan Air Sungai"
        },
        {
          id: "carbon-compounds",
          title: "Senyawa Karbon",
          topics: ["Alkohol", "Eter", "Aldehid", "Keton"],
          mission: "Sintesis Obat Baru",
          story: "Arsitek Rantai Karbon",
          pbl: "Plastik Biodegradable"
        }
      ]
    }
  },
  models: [
    { id: 'vca', name: 'Virtual Adventure', icon: 'Gamepad2', desc: 'Game-Based Learning' },
    { id: 'vlab', name: 'Virtual Lab', icon: 'FlaskConical', desc: 'Laboratorium Digital' },
    { id: 'story', name: 'ChemStory', icon: 'BookOpen', desc: 'Storytelling' },
    { id: 'ar', name: 'AR Learning', icon: 'Box', desc: 'Augmented Reality' },
    { id: 'battle', name: 'Chem Battle', icon: 'Swords', desc: 'Mode Kompetisi' },
    { id: 'pbl', name: 'PBL Digital', icon: 'Lightbulb', desc: 'Problem-Based Learning' },
    { id: 'puzzle', name: 'ChemPuzzle', icon: 'Puzzle', desc: 'Drag & Drop' },
    { id: 'video', name: 'Video Branching', icon: 'PlayCircle', desc: 'Video Interaktif' },
    { id: 'inquiry', name: 'Guided Inquiry', icon: 'Search', desc: 'Investigasi Ilmiah' },
    { id: 'ai', name: 'ChemAI Tutor', icon: 'Bot', desc: 'Asisten AI' }
  ],
  glossary: [
    { term: "Atom", definition: "Unit terkecil dari suatu unsur kimia." },
    { term: "Molekul", definition: "Sekelompok atom yang terikat bersama." },
    { term: "Reaksi Eksoterm", definition: "Reaksi yang melepaskan kalor ke lingkungan." },
    { term: "Reaksi Endoterm", definition: "Reaksi yang menyerap kalor dari lingkungan." },
    { term: "Stoikiometri", definition: "Ilmu yang mempelajari hubungan kuantitatif zat dalam reaksi kimia." },
    { term: "Valensi", definition: "Kemampuan suatu atom untuk berikatan dengan atom lain." }
  ]
};
