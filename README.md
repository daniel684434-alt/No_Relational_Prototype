# Prototipo NoSQL — Modelo Documental tipo Yelp

Este repositorio contiene un prototipo de modelo no relacional documental desarrollado en MongoDB Shell sobre datos de prueba generados para el dominio. El objetivo es construir y validar una base de datos documental funcional que sirva como base de práctica para talleres de modelado no relacional.

---

## Contexto del proyecto

El proceso de negocio modelado es una plataforma de recomendación local tipo Yelp. El modelo representa negocios, usuarios, reseñas e indicadores de popularidad en una estructura flexible orientada a documentos.

El diseño sigue un enfoque no relacional documental basado en dos decisiones principales: embebido para información que se consulta de manera conjunta y tiene cardinalidad 1:1, y referencia para entidades de alta cardinalidad como reseñas y relaciones entre usuarios. El grano de la colección de reseñas es una opinión individual emitida por un usuario sobre un negocio en una fecha determinada.

---

## Modelo documental

El esquema está compuesto por cuatro colecciones principales.

**BUSINESS** es la colección central del modelo. Almacena el identificador, nombre, estado operativo, calificación, conteo de reseñas y categorías del negocio. Integra como subdocumentos embebidos las entidades LOCATION, con dirección, ciudad, estado y coordenadas geográficas; HOURS, con los horarios de apertura por día de la semana; y ATTRIBUTES, con características variables del establecimiento como wifi, parqueadero, nivel de ruido y rango de precios.

**USER** representa a los usuarios de la plataforma con identificador, nombre, conteo de reseñas, fecha de ingreso, años con estado elite y promedio de calificaciones otorgadas. La red social entre usuarios se modela como un array embebido `friends` dentro del propio documento, eliminando la necesidad de una colección intermedia de tipo relacional.

**REVIEW** es una colección separada que almacena las reseñas individuales. La separación se justifica por alta cardinalidad. Cada documento referencia su negocio y usuario mediante `business_id` y `user_id`, e incluye calificación, texto, fecha y métricas de interacción useful, funny y cool.

**CHECKIN_BUCKET** implementa el patrón Bucket, agrupando los eventos de check-in por negocio y periodo trimestral. Almacena el total de check-ins, las horas pico y los eventos individuales dentro del mismo documento, permitiendo análisis de popularidad temporal sin documentos individuales por evento.


## Requisitos

- MongoDB Community Server 8.2 o superior
- MongoDB Shell (mongosh) 2.8 o superior

Descarga MongoDB Community Server desde https://www.mongodb.com/try/download/community y mongosh desde https://www.mongodb.com/try/download/shell. En Windows, una vez instalados, verificar disponibilidad con:

```bash
mongosh --version
```

---

## Cómo ejecutar

Clona el repositorio y navega a la carpeta del proyecto. Luego ejecuta el script directamente con mongosh:

```bash
mongosh yelp_db --file yelp_prototipo.js
```

En Windows con PowerShell, si mongosh no está en el PATH:

```powershell
& "C:\Program Files\MongoDB\Server\8.2\bin\mongosh.exe" yelp_db --file yelp_prototipo.js
```

Al terminar, la base de datos queda disponible en MongoDB como `yelp_db`. Puede explorarse con MongoDB Compass o directamente desde mongosh con `use("yelp_db")`.

---

## Dataset fuente

Datos de prueba generados sintéticamente para el dominio de la plataforma. El modelo está inspirado en el dataset público de Yelp Open Dataset, disponible en https://www.yelp.com/dataset, que contiene reseñas, negocios y usuarios reales de múltiples ciudades de Estados Unidos y Canadá.
