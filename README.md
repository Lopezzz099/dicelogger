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
