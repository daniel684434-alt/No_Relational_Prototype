// =============================================================
//  PROTOTIPO — Modelo Documental tipo Yelp
//  Ejecutar en: mongosh yelp_db --file yelp_prototipo.js
//  O bloque a bloque pegando en mongosh
// =============================================================

use("yelp_db");

// ─────────────────────────────────────────────────────────────
//  0. LIMPIEZA (útil para re-ejecutar el script limpio)
// ─────────────────────────────────────────────────────────────
db.business.drop();
db.user.drop();
db.review.drop();
db.checkin_bucket.drop();

print("\n Colecciones reiniciadas\n");


// =============================================================
//  1. INSERTAR DOCUMENTOS
// =============================================================

// ── 1A. BUSINESS (con LOCATION, HOURS y ATTRIBUTES embebidos) ──
db.business.insertMany([
  {
    business_id: "biz_001",
    name: "El Rincón Paisa",
    is_open: true,
    stars: 4.2,
    review_count: 312,
    categories: ["Restaurante", "Colombiano", "Almuerzo"],
    location: {
      address: "Cra 7 #45-12",
      city: "Bogotá",
      state: "Cundinamarca",
      lat: 4.6097,
      lon: -74.0817
    },
    hours: {
      monday:    "09:00-22:00",
      tuesday:   "09:00-22:00",
      wednesday: "09:00-22:00",
      thursday:  "09:00-22:00",
      friday:    "09:00-23:00",
      saturday:  "10:00-23:00",
      sunday:    null
    },
    attributes: {
      wifi:    "gratis",
      parking: { garage: true, street: false },
      noise:   "moderado",
      price:   2
    }
  },
  {
    business_id: "biz_002",
    name: "Café Literario",
    is_open: true,
    stars: 4.7,
    review_count: 89,
    categories: ["Café", "Librería", "Desayunos"],
    location: {
      address: "Cll 85 #13-09",
      city: "Bogotá",
      state: "Cundinamarca",
      lat: 4.6658,
      lon: -74.0543
    },
    hours: {
      monday:    "08:00-20:00",
      tuesday:   "08:00-20:00",
      wednesday: "08:00-20:00",
      thursday:  "08:00-20:00",
      friday:    "08:00-21:00",
      saturday:  "09:00-21:00",
      sunday:    "10:00-18:00"
    },
    attributes: {
      wifi:    "gratis",
      parking: { garage: false, street: true },
      noise:   "silencioso",
      price:   1
    }
  },
  {
    business_id: "biz_003",
    name: "Sushi Nikkei",
    is_open: false,
    stars: 3.8,
    review_count: 204,
    categories: ["Japonés", "Fusión", "Mariscos"],
    location: {
      address: "Av. El Dorado #68C-61",
      city: "Bogotá",
      state: "Cundinamarca",
      lat: 4.6567,
      lon: -74.1052
    },
    hours: {
      monday:    null,
      tuesday:   "12:00-22:00",
      wednesday: "12:00-22:00",
      thursday:  "12:00-22:00",
      friday:    "12:00-23:30",
      saturday:  "12:00-23:30",
      sunday:    "12:00-21:00"
    },
    attributes: {
      wifi:    "no disponible",
      parking: { garage: true, street: false },
      noise:   "ruidoso",
      price:   3
    }
  }
]);

print(" BUSINESS: 3 documentos insertados");


// ── 1B. USER (con friends como array embebido) ──────────────
db.user.insertMany([
  {
    user_id: "usr_001",
    name: "Carlos Mendoza",
    review_count: 45,
    yelping_since: new Date("2019-06-15"),
    elite: [2021, 2022, 2023],
    average_stars: 3.8,
    friends: ["usr_002", "usr_003"]
  },
  {
    user_id: "usr_002",
    name: "Laura Gómez",
    review_count: 120,
    yelping_since: new Date("2017-03-01"),
    elite: [2020, 2021, 2022, 2023],
    average_stars: 4.1,
    friends: ["usr_001", "usr_003", "usr_004"]
  },
  {
    user_id: "usr_003",
    name: "Andrés Ruiz",
    review_count: 8,
    yelping_since: new Date("2023-01-10"),
    elite: [],
    average_stars: 3.2,
    friends: ["usr_001"]
  },
  {
    user_id: "usr_004",
    name: "Valentina Torres",
    review_count: 67,
    yelping_since: new Date("2020-09-22"),
    elite: [2022, 2023],
    average_stars: 4.5,
    friends: ["usr_002"]
  }
]);

print(" USER: 4 documentos insertados");


// ── 1C. REVIEW ───────────────────────────────────────────────
db.review.insertMany([
  {
    review_id: "rev_001",
    business_id: "biz_001",
    user_id: "usr_001",
    stars: 5,
    text: "Increíble bandeja paisa, la mejor de Bogotá. Volveré seguro.",
    date: new Date("2024-01-15"),
    useful: 3, funny: 1, cool: 2
  },
  {
    review_id: "rev_002",
    business_id: "biz_001",
    user_id: "usr_002",
    stars: 4,
    text: "Muy rico pero el servicio tardó bastante. El sancocho excelente.",
    date: new Date("2024-02-20"),
    useful: 5, funny: 0, cool: 1
  },
  {
    review_id: "rev_003",
    business_id: "biz_002",
    user_id: "usr_002",
    stars: 5,
    text: "El mejor café de especialidad. Ambiente perfecto para leer.",
    date: new Date("2024-03-05"),
    useful: 8, funny: 2, cool: 4
  },
  {
    review_id: "rev_004",
    business_id: "biz_003",
    user_id: "usr_003",
    stars: 3,
    text: "El sushi estaba bien pero esperé 45 minutos. No repetiría.",
    date: new Date("2024-03-18"),
    useful: 1, funny: 0, cool: 0
  },
  {
    review_id: "rev_005",
    business_id: "biz_002",
    user_id: "usr_004",
    stars: 5,
    text: "Ambiente acogedor, café delicioso. Lo recomiendo totalmente.",
    date: new Date("2024-04-01"),
    useful: 6, funny: 1, cool: 3
  }
]);

print(" REVIEW: 5 documentos insertados");


// ── 1D. CHECKIN_BUCKET (Bucket Pattern por periodo) ──────────
db.checkin_bucket.insertMany([
  {
    bucket_id: "biz_001_2024Q1",
    business_id: "biz_001",
    period: "2024-Q1",
    total_checkins: 148,
    peak_hours: [12, 13, 20],
    checkin_events: [
      "2024-01-05T12:30", "2024-01-05T13:15",
      "2024-02-14T20:00", "2024-03-01T12:45"
    ]
  },
  {
    bucket_id: "biz_001_2024Q2",
    business_id: "biz_001",
    period: "2024-Q2",
    total_checkins: 201,
    peak_hours: [13, 14, 21],
    checkin_events: [
      "2024-04-10T13:00", "2024-05-20T14:30",
      "2024-06-15T21:00"
    ]
  },
  {
    bucket_id: "biz_002_2024Q1",
    business_id: "biz_002",
    period: "2024-Q1",
    total_checkins: 43,
    peak_hours: [9, 10, 16],
    checkin_events: [
      "2024-01-12T09:00", "2024-02-08T10:30",
      "2024-03-22T16:00"
    ]
  }
]);

print(" CHECKIN_BUCKET: 3 documentos insertados");


// =============================================================
//  2. VER ESTRUCTURA DE COLECCIONES
// =============================================================

print("\n\n══════════════════════════════════════════");
print("  2. ESTRUCTURA DE COLECCIONES");
print("══════════════════════════════════════════\n");

print("── Un documento BUSINESS (con embebidos) ──");
printjson(db.business.findOne({ business_id: "biz_001" }));

print("\n── Un documento USER (con friends array) ──");
printjson(db.user.findOne({ user_id: "usr_002" }));

print("\n── Un documento REVIEW ──");
printjson(db.review.findOne({ review_id: "rev_001" }));

print("\n── Un documento CHECKIN_BUCKET ──");
printjson(db.checkin_bucket.findOne({ bucket_id: "biz_001_2024Q1" }));


// =============================================================
//  3. CONSULTAS Y FILTROS
// =============================================================

print("\n\n══════════════════════════════════════════");
print("  3. CONSULTAS Y FILTROS");
print("══════════════════════════════════════════\n");

// ── Q1: Negocios abiertos con calificación >= 4.0 ────────────
print("── Q1: Negocios abiertos con stars >= 4.0 ──");
printjson(
  db.business.find(
    { is_open: true, stars: { $gte: 4.0 } },
    { name: 1, stars: 1, categories: 1, _id: 0 }
  ).toArray()
);

// ── Q2: Negocios en categoría "Café" ─────────────────────────
print("\n── Q2: Negocios en categoría 'Café' ──");
printjson(
  db.business.find(
    { categories: "Café" },
    { name: 1, stars: 1, "location.city": 1, _id: 0 }
  ).toArray()
);

// ── Q3: Reseñas con 5 estrellas, ordenadas por useful ────────
print("\n── Q3: Reseñas de 5 estrellas, top por 'useful' ──");
printjson(
  db.review.find(
    { stars: 5 },
    { text: 1, stars: 1, useful: 1, user_id: 1, business_id: 1, _id: 0 }
  ).sort({ useful: -1 }).toArray()
);

// ── Q4: Todas las reseñas de un negocio específico ───────────
print("\n── Q4: Todas las reseñas de biz_001 ──");
printjson(
  db.review.find(
    { business_id: "biz_001" },
    { stars: 1, text: 1, user_id: 1, date: 1, _id: 0 }
  ).toArray()
);

// ── Q5: Usuarios elite en 2023 ───────────────────────────────
print("\n── Q5: Usuarios que fueron elite en 2023 ──");
printjson(
  db.user.find(
    { elite: 2023 },
    { name: 1, average_stars: 1, review_count: 1, elite: 1, _id: 0 }
  ).toArray()
);

// ── Q6: Buscar amigos de usr_002 (array embebido) ────────────
print("\n── Q6: Amigos de usr_002 ──");
const laura = db.user.findOne({ user_id: "usr_002" }, { friends: 1, _id: 0 });
printjson(
  db.user.find(
    { user_id: { $in: laura.friends } },
    { name: 1, user_id: 1, average_stars: 1, _id: 0 }
  ).toArray()
);

// ── Q7: Negocios con precio bajo y wifi gratis ───────────────
print("\n── Q7: Negocios con precio <= 2 y wifi gratis ──");
printjson(
  db.business.find(
    { "attributes.price": { $lte: 2 }, "attributes.wifi": "gratis" },
    { name: 1, "attributes.price": 1, "attributes.wifi": 1, _id: 0 }
  ).toArray()
);

// ── Q8: Check-ins totales por negocio (aggregation) ──────────
print("\n── Q8: Total de check-ins por negocio ──");
printjson(
  db.checkin_bucket.aggregate([
    {
      $group: {
        _id: "$business_id",
        total_checkins_all_periods: { $sum: "$total_checkins" },
        periodos: { $push: "$period" }
      }
    },
    { $sort: { total_checkins_all_periods: -1 } }
  ]).toArray()
);


// =============================================================
//  4. ACTUALIZAR DOCUMENTOS
// =============================================================

print("\n\n══════════════════════════════════════════");
print("  4. ACTUALIZAR DOCUMENTOS");
print("══════════════════════════════════════════\n");

// ── U1: Actualizar stars y review_count de un negocio ────────
print("── U1: Nueva reseña llega → actualizar stars y review_count en biz_001 ──");
db.business.updateOne(
  { business_id: "biz_001" },
  {
    $set:  { stars: 4.3 },
    $inc:  { review_count: 1 }
  }
);
printjson(
  db.business.findOne(
    { business_id: "biz_001" },
    { name: 1, stars: 1, review_count: 1, _id: 0 }
  )
);

// ── U2: Cerrar un negocio ────────────────────────────────────
print("\n── U2: Cerrar biz_001 (is_open = false) ──");
db.business.updateOne(
  { business_id: "biz_001" },
  { $set: { is_open: false } }
);
printjson(
  db.business.findOne(
    { business_id: "biz_001" },
    { name: 1, is_open: 1, _id: 0 }
  )
);

// ── U3: Agregar un amigo al array embebido ───────────────────
print("\n── U3: usr_003 agrega a usr_004 como amigo ──");
db.user.updateOne(
  { user_id: "usr_003" },
  { $addToSet: { friends: "usr_004" } }   // addToSet evita duplicados
);
printjson(
  db.user.findOne(
    { user_id: "usr_003" },
    { name: 1, friends: 1, _id: 0 }
  )
);

// ── U4: Agregar año elite a un usuario ───────────────────────
print("\n── U4: Agregar año 2024 al array elite de usr_003 ──");
db.user.updateOne(
  { user_id: "usr_003" },
  { $addToSet: { elite: 2024 } }
);
printjson(
  db.user.findOne(
    { user_id: "usr_003" },
    { name: 1, elite: 1, _id: 0 }
  )
);

// ── U5: Actualizar atributo anidado (wifi del negocio) ───────
print("\n── U5: Cambiar wifi de biz_002 a 'pago' ──");
db.business.updateOne(
  { business_id: "biz_002" },
  { $set: { "attributes.wifi": "pago" } }
);
printjson(
  db.business.findOne(
    { business_id: "biz_002" },
    { name: 1, "attributes.wifi": 1, _id: 0 }
  )
);

// ── U6: Acumular check-in en bucket existente ────────────────
print("\n── U6: Registrar nuevo check-in en bucket biz_001_2024Q2 ──");
db.checkin_bucket.updateOne(
  { bucket_id: "biz_001_2024Q2" },
  {
    $inc:  { total_checkins: 1 },
    $push: { checkin_events: "2024-06-30T19:00" }
  }
);
printjson(
  db.checkin_bucket.findOne(
    { bucket_id: "biz_001_2024Q2" },
    { period: 1, total_checkins: 1, checkin_events: 1, _id: 0 }
  )
);


// =============================================================
//  5. ÍNDICES RECOMENDADOS
// =============================================================

print("\n\n══════════════════════════════════════════");
print("  5. ÍNDICES RECOMENDADOS");
print("══════════════════════════════════════════\n");

db.business.createIndex({ stars: -1 });
db.business.createIndex({ categories: 1 });
db.business.createIndex({ "location.city": 1 });
db.review.createIndex({ business_id: 1 });
db.review.createIndex({ user_id: 1 });
db.review.createIndex({ business_id: 1, stars: -1 });
db.checkin_bucket.createIndex({ business_id: 1, period: 1 }, { unique: true });

print("Índices creados en business, review y checkin_bucket");
print("\n── Índices en la colección BUSINESS ──");
printjson(db.business.getIndexes());


print("\n\n PROTOTIPO COMPLETO — yelp_db lista para explorar\n");
