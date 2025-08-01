// Data dummy antrian treatment
const dummyAntrianData = [
  {
    id: 1,
    name: "Vina Yuliani",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-15T09:37:20.351987",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878885-407c329b80eb",
      },
    ],
    description: "Upper suede terkena noda kopi, perlu deep cleaning.",
  },
  {
    id: 2,
    name: "Teguh Irawan",
    item: {
      name: "Adidas UltraBoost",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-10T09:37:20.352009",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Midsole kotor membandel, perlu pembersihan intensif.",
  },
  {
    id: 3,
    name: "Siska Amalia",
    item: {
      name: "Puma Suede Classic",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next Day",
    due_date: "2025-06-11T09:37:20.352017",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1578314921455-34dd4626b38d",
      },
    ],
    description: "Warna upper memudar, perlu repaint.",
  },
  {
    id: 4,
    name: "Nina Zulfa",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-13T09:37:20.352024",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 5,
    name: "Lia Novita",
    item: {
      name: "Adidas UltraBoost",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Regular",
    due_date: "2025-06-09T09:37:20.352032",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878885-407c329b80eb",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 6,
    name: "Yusuf Aditya",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-10T09:37:20.352039",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1676821666381-c0456feeeb07",
      },
    ],
    description: "Bahan mesh sobek, perlu dijahit kembali.",
  },
  {
    id: 7,
    name: "Joko Susilo",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-11T09:37:20.352046",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Outsole terlepas sebagian, perlu lem ulang.",
  },
  {
    id: 8,
    name: "Novi Andriani",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next day",
    due_date: "2025-06-09T09:37:20.352056",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1676821666381-c0456feeeb07",
      },
    ],
    description: "Warna upper memudar, perlu repaint.",
  },
  {
    id: 9,
    name: "Novi Andriani",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-12T09:37:20.352066",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Tali sepatu aus, direkomendasikan penggantian.",
  },
  {
    id: 10,
    name: "Febri Setia",
    item: {
      name: "Nike Air Max 97",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next day",
    due_date: "2025-06-14T09:37:20.352074",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738959142469-f32cfac8233d",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 11,
    name: "Citra Dewi",
    item: {
      name: "Puma Suede Classic",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-10T09:37:20.352081",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Warna upper memudar, perlu repaint.",
  },
  {
    id: 12,
    name: "Citra Dewi",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next day",
    due_date: "2025-06-11T09:37:20.352088",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26",
      },
    ],
    description: "Bahan mesh sobek, perlu dijahit kembali.",
  },
  {
    id: 13,
    name: "Vina Yuliani",
    item: {
      name: "Adidas UltraBoost",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-15T09:37:20.352096",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Sole tergores, perlu pengecatan ulang.",
  },
  {
    id: 14,
    name: "Arman Hidayat",
    item: {
      name: "Converse Chuck Taylor",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next day",
    due_date: "2025-06-15T09:37:20.352103",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738959142469-f32cfac8233d",
      },
    ],
    description: "Tali sepatu aus, direkomendasikan penggantian.",
  },
  {
    id: 15,
    name: "Dwi Yuliana",
    item: {
      name: "Converse Chuck Taylor",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-15T09:37:20.352114",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Bahan mesh sobek, perlu dijahit kembali.",
  },
  {
    id: 16,
    name: "Fina Rahma",
    item: {
      name: "Converse Chuck Taylor",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next day",
    due_date: "2025-06-12T09:37:20.352125",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 17,
    name: "Rian Nugraha",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-11T09:37:20.352137",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26",
      },
    ],
    description: "Bahan mesh sobek, perlu dijahit kembali.",
  },
  {
    id: 18,
    name: "Dwi Yuliana",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-11T09:37:20.352149",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878885-407c329b80eb",
      },
    ],
    description: "Midsole kotor membandel, perlu pembersihan intensif.",
  },
  {
    id: 19,
    name: "Rika Nuraini",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-11T09:37:20.352156",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Outsole terlepas sebagian, perlu lem ulang.",
  },
  {
    id: 20,
    name: "Galih Saputra",
    item: {
      name: "Converse Chuck Taylor",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Regular",
    due_date: "2025-06-09T09:37:20.352163",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878885-407c329b80eb",
      },
    ],
    description: "Sole tergores, perlu pengecatan ulang.",
  },
  {
    id: 21,
    name: "Hendra Wijaya",
    item: {
      name: "Puma Suede Classic",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Regular",
    due_date: "2025-06-12T09:37:20.352170",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1586268150522-f6235b308a04",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 22,
    name: "Agus Haryanto",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next day",
    due_date: "2025-06-11T09:37:20.352177",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Tali sepatu aus, direkomendasikan penggantian.",
  },
  {
    id: 23,
    name: "Ardiansyah Putra",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-09T09:37:20.352187",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1680204101678-01741d4d4a2a",
      },
    ],
    description: "Logo pudar, direkomendasikan repaint.",
  },
  {
    id: 24,
    name: "Andra Kurniawan",
    item: {
      name: "Puma Suede Classic",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next day",
    due_date: "2025-06-14T09:37:20.352198",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1578314921455-34dd4626b38d",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 25,
    name: "Lia Novita",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-14T09:37:20.352209",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1578314921455-34dd4626b38d",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 26,
    name: "Siska Amalia",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-12T09:37:20.352218",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1680204101678-01741d4d4a2a",
      },
    ],
    description: "Warna upper memudar, perlu repaint.",
  },
  {
    id: 27,
    name: "Andra Kurniawan",
    item: {
      name: "Vans Old Skool",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-15T09:37:20.352225",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Midsole kotor membandel, perlu pembersihan intensif.",
  },
  {
    id: 28,
    name: "Wawan Setiawan",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-13T09:37:20.352234",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1680204101678-01741d4d4a2a",
      },
    ],
    description: "Logo pudar, direkomendasikan repaint.",
  },
  {
    id: 29,
    name: "Teguh Irawan",
    item: {
      name: "Reebok Classic Leather",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-10T09:37:20.352244",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 30,
    name: "Arman Hidayat",
    item: {
      name: "Converse Chuck Taylor",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next day",
    due_date: "2025-06-11T09:37:20.352262",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Sole tergores, perlu pengecatan ulang.",
  },
  {
    id: 31,
    name: "Yoga Firmansyah",
    item: {
      name: "Adidas UltraBoost",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-11T09:37:20.352269",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26",
      },
    ],
    description: "Bahan mesh sobek, perlu dijahit kembali.",
  },
  {
    id: 32,
    name: "Yusuf Aditya",
    item: {
      name: "Nike Air Max 97",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next day",
    due_date: "2025-06-12T09:37:20.352276",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1586268150522-f6235b308a04",
      },
    ],
    description: "Outsole terlepas sebagian, perlu lem ulang.",
  },
  {
    id: 33,
    name: "Teguh Irawan",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-10T09:37:20.352282",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 34,
    name: "Bayu Fajar",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-14T09:37:20.352289",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Outsole terlepas sebagian, perlu lem ulang.",
  },
  {
    id: 35,
    name: "Yuni Rahmawati",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next day",
    due_date: "2025-06-15T09:37:20.352296",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 36,
    name: "Rizky Maulana",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Regular",
    due_date: "2025-06-10T09:37:20.352302",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1688468069415-ffb6336656f9",
      },
    ],
    description: "Lapisan dalam kotor parah, perlu deep clean.",
  },
  {
    id: 37,
    name: "Febri Setia",
    item: {
      name: "Puma Suede Classic",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-15T09:37:20.352309",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Tali sepatu aus, direkomendasikan penggantian.",
  },
  {
    id: 38,
    name: "Febri Setia",
    item: {
      name: "Reebok Classic Leather",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Same Day",
    due_date: "2025-06-15T09:37:20.352315",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1688468069415-ffb6336656f9",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 39,
    name: "Galih Saputra",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Regular",
    due_date: "2025-06-15T09:37:20.352321",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1658043521335-998c9fae1a03",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 40,
    name: "Novi Andriani",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Regular",
    due_date: "2025-06-09T09:37:20.352327",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1578314921455-34dd4626b38d",
      },
    ],
    description: "Bahan mesh sobek, perlu dijahit kembali.",
  },
  {
    id: 41,
    name: "Fina Rahma",
    item: {
      name: "Puma Suede Classic",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-09T09:37:20.352333",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738959142469-f32cfac8233d",
      },
    ],
    description: "Warna upper memudar, perlu repaint.",
  },
  {
    id: 42,
    name: "Rian Nugraha",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next Day",
    due_date: "2025-06-14T09:37:20.352340",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26",
      },
    ],
    description: "Outsole terlepas sebagian, perlu lem ulang.",
  },
  {
    id: 43,
    name: "Lilis Marlina",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-12T09:37:20.352346",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Upper suede terkena noda kopi, perlu deep cleaning.",
  },
  {
    id: 44,
    name: "Dina Anggraini",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Same Day",
    due_date: "2025-06-14T09:37:20.352484",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738951878919-a4484dc75adc",
      },
    ],
    description: "Sole tergores, perlu pengecatan ulang.",
  },
  {
    id: 45,
    name: "Sari Meilani",
    item: {
      name: "Reebok Classic Leather",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Regular",
    due_date: "2025-06-11T09:37:20.352493",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Tali sepatu aus, direkomendasikan penggantian.",
  },
  {
    id: 46,
    name: "Rina Marlina",
    item: {
      name: "Compass Gazelle Low",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next Day",
    due_date: "2025-06-11T09:37:20.352507",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 47,
    name: "Dwi Yuliana",
    item: {
      name: "New Balance 574",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next Day",
    due_date: "2025-06-14T09:37:20.352518",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Warna upper memudar, perlu repaint.",
  },
  {
    id: 48,
    name: "Teguh Irawan",
    item: {
      name: "Converse Chuck Taylor",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next Day",
    due_date: "2025-06-09T09:37:20.352530",
    shoes_photos: [
      {
        url_photo:
          "https://plus.unsplash.com/premium_photo-1705554330163-2e0ccc1808e2",
      },
    ],
    description: "Sole tergores, perlu pengecatan ulang.",
  },
  {
    id: 49,
    name: "Anisa Wulandari",
    item: {
      name: "Nike Air Max 97",
    },
    treatment: {
      name: "Cleaning",
    },
    process_time: "Next Day",
    due_date: "2025-06-12T09:37:20.352541",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1738959142469-f32cfac8233d",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
  {
    id: 50,
    name: "Andi Pratama",
    item: {
      name: "Nike Air Max 97",
    },
    treatment: {
      name: "Repair",
    },
    process_time: "Next Day",
    due_date: "2025-06-11T09:37:20.352556",
    shoes_photos: [
      {
        url_photo:
          "https://images.unsplash.com/photo-1638609348722-aa2a3a67db26",
      },
    ],
    description: "Toe box lecet karena gesekan, perlu perbaikan.",
  },
];
export default dummyAntrianData;
