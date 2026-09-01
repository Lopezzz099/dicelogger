# DiceLogger (proyecto-dnd)

Monorepo unificado de `frontend` (Next.js, deployado en Vercel) y `backend`
(Go + MySQL, servido con Docker). Cada carpeta conserva el historial de
commits de su repo original vía `git subtree`.

## Por qué se caía la página

`proyecto-dnd.vercel.app` es el frontend. Sus rutas API (`src/app/api/**`)
corren como funciones serverless en Vercel y hacen `fetch(BACKEND_URL + ...)`
contra el backend en Go, que vivía en otro servicio (Railway/Render/VPS).
Ese servicio dejó de responder — probablemente se apagó por inactividad — y
las funciones de Vercel se quedaban esperando la respuesta hasta el
timeout, devolviendo el 504.

## Qué se corrigió en esta migración

- **Contraseña de Gmail hardcodeada** en `backend/pkg/email/sendEmail.go` →
  ahora sale de `EMAIL_SENDER` / `EMAIL_APP_PASSWORD`. La contraseña vieja
  quedó expuesta en el historial del repo público anterior: **hay que
  revocarla desde la cuenta de Google**, cambiar el código no alcanza.
- **Credenciales de AWS con prefijo `NEXT_PUBLIC_`** en
  `frontend/src/services/s3Upload.ts` → esas variables se empaquetaban en
  el JS que baja al navegador, exponiendo la Secret Key de AWS a cualquier
  visitante. Se movió la subida real a `frontend/src/app/api/upload/route.ts`
  (server-side), y `s3Upload.ts` ahora solo llama a esa ruta. Si esas
  credenciales llegaron a estar seteadas en producción alguna vez, también
  conviene rotarlas desde IAM.
- `main.go` cortaba la ejecución (`log.Fatal`) si no encontraba un archivo
  `.env` — rompía en cualquier plataforma que inyecte variables directo
  (Railway, Render, Fly). Ahora solo loguea un aviso y sigue.
- El puerto estaba hardcodeado en `8080`. Ahora lee `PORT` del entorno
  (con fallback a 8080 en local), como requieren Railway/Render.
- Se agregó `frontend/Dockerfile` (no existía) y un `docker-compose.yml`
  en la raíz para levantar MySQL + backend + frontend con un solo comando
  y probar la conexión antes de tocar producción.

## Correr todo en local

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080/api/v1
- MySQL: localhost:3306 (user/pass `dicelogger`/`dicelogger`)

Copiá `backend/.env.example` → `backend/.env` y
`frontend/.env.example` → `frontend/.env` y completá los valores reales
para desarrollo sin Docker (`npm run dev` / `go run ./cmd/server`).

## Base de datos: schema.sql

El repo original nunca versionó el esquema de la base — se armó a mano en
su momento y se perdió junto con el resto. `backend/schema.sql` lo
reconstruye completo (36 tablas) a partir de las structs de
`internal/domain` y las columnas reales que usan las queries del código.
Se probó de punta a punta contra un MySQL/MariaDB real, incluyendo
inserts que replican exactamente lo que hace el backend (personaje, arma
equipada, sesión, tirada de dados, etc.).

**Hay que correrlo una sola vez** contra la base de Railway (o cualquier
MySQL vacío) antes de que el backend funcione de verdad — si no, cada
endpoint va a fallar con "Table '...' doesn't exist".

Formas de correrlo contra Railway:
- Desde la caja MySQL en Railway → pestaña "Data" → ahí suele haber un
  editor SQL donde podés pegar el contenido de `schema.sql` directo.
- O con el cliente `mysql` desde tu máquina: Railway → caja MySQL →
  "Connect" te da un comando tipo
  `mysql -h <host> -u <user> -p<pass> -P <port> <db>` — copialo, corré
  ese comando, y una vez adentro pegá el contenido de `schema.sql` (o
  hacé `source schema.sql;` si lo tenés como archivo local).

Dos inconsistencias reales del código original que quedaron documentadas
como comentarios en el propio `schema.sql`: la tabla `user_campaign`
tiene su clave primaria llamada literalmente `user_campaign` (no
`user_campaign_id`), y lo mismo con `character_attack_event` →
`character_event`. No son errores de este esquema, es cómo el código
existente ya las consulta.

## Datos base: seed_data.sql

Las tablas de catálogo (razas, clases, trasfondos, habilidades) tampoco
tenían datos — la pantalla de crear personaje pide esas listas y explota
del lado del cliente (`Cannot read properties of null`) si vienen
vacías. `backend/seed_data.sql` carga contenido abierto del SRD de D&D
5e (9 razas, 12 clases, 8 trasfondos, 18 habilidades, y sus relaciones).
Se prueba igual que `schema.sql` — corré ese primero, y después este,
pegándolo en la misma consola de `mysql` en Railway.

Todavía faltan armas, armaduras, objetos y hechizos — se agregan en una
pasada aparte si el flujo de creación de personaje los termina pidiendo
más adelante.

## Cuentas nuevas que hay que crear (todo bajo tu control)

El proyecto dependía de cuentas de gente que ya no tenés forma de contactar
(Firebase, el Gmail de envío de emails, y potencialmente el bucket de AWS).
Todo el código ya está parametrizado por variables de entorno — no queda
ningún ID de proyecto ni nombre de bucket hardcodeado — así que solo hace
falta dar de alta cuentas nuevas y completar los `.env`:

1. **Firebase** (auth de usuarios): proyecto nuevo en
   [console.firebase.google.com](https://console.firebase.google.com),
   activar Authentication (Email/Password), y generar una clave de cuenta
   de servicio en Configuración del proyecto → Cuentas de servicio. Con
   eso completás `FIREBASE_PROJECT_ID`, `FIREBASE_STORAGE_BUCKET` (backend
   y frontend) y bajás el `serviceAccountKey.json` nuevo (backend, no se
   versiona).
2. **Gmail** para envío de emails: una cuenta nueva (o una que ya tengas),
   activar verificación en dos pasos, y generar una "contraseña de
   aplicación" en myaccount.google.com/apppasswords → `EMAIL_SENDER` +
   `EMAIL_APP_PASSWORD`.
3. **Cloudinary** (subida de imágenes, reemplaza al AWS S3 original — no
   pide tarjeta en el free tier): cuenta nueva en
   [cloudinary.com](https://cloudinary.com), y del dashboard principal
   sacás `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` y
   `CLOUDINARY_API_SECRET` (van solo en el frontend, la subida corre en
   `src/app/api/upload/route.ts`). El paquete `pkg/s3` del backend se
   eliminó — era código muerto, nunca se llamaba desde ningún handler.
4. **Stripe** (si van a seguir cobrando suscripciones): cuenta nueva →
   `STRIPE_API_KEY`, `STRIPE_WEBHOOK_SECRET`.

**Pendiente de contenido (no bloquea el deploy):** las imágenes de
ejemplo de personajes y campañas (`campaignTemplates.ts`,
`charactersTemplates/route.tsx`) todavía apuntan al bucket S3 viejo. Van a
dejar de cargar cuando esa cuenta se dé de baja — hay que resubirlas a
Cloudinary y actualizar esas URLs cuando haya tiempo.

## Plan de reconexión en producción

1. **Elegí hosting para el backend.** Recomendado: Railway (deploya el
   Dockerfile tal cual, tiene plugin de MySQL con un click, variables de
   entorno fáciles de setear, tier gratuito/hobby razonable).
2. En Railway: `New Project → Deploy from GitHub repo` apuntando a
   `/backend` de este monorepo (root directory), agregar un plugin MySQL
   al mismo proyecto, y setear las variables de `backend/.env.example`
   (Railway te da `DB_HOST`/`DB_PORT`/etc. del plugin, solo hay que
   copiarlas). Subir `serviceAccountKey.json` nuevo de Firebase también.
3. Una vez el backend tenga una URL pública de Railway, actualizarla en
   Vercel: `Settings → Environment Variables → BACKEND_URL`.
4. Redeploy del frontend en Vercel para que tome la nueva `BACKEND_URL`.
5. Probar `https://<tu-backend>.up.railway.app/api/v1/character` directo
   en el navegador antes de probar el frontend, para aislar si un
   problema es del backend o de la conexión frontend↔backend.
