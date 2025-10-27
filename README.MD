# 🚀 API WhatsApp TypeScript

API REST para enviar mensajes de WhatsApp usando **Baileys** (WhatsApp Web Multi-Device). Ideal para integrar WhatsApp en tus aplicaciones de forma programática.

## 📋 Características

- ✅ **TypeScript**: Código completamente tipado
- ✅ **Arquitectura Limpia**: Separación de capas (Domain, Application, Infrastructure)
- ✅ **Múltiples Proveedores**: Soporte para Baileys, Venom, Twilio, y Meta
- ✅ **Inyección de Dependencias**: Fácil cambio entre proveedores
- ✅ **Docker Ready**: Listo para contenedores
- ✅ **Railway Ready**: Configurado para despliegue en Railway

## 🛠️ Instalación Local

### Requisitos Previos
- Node.js 18 o superior
- npm o pnpm

### Pasos de Instalación

1. **Clona el repositorio**
```bash
git clone <tu-repositorio>
cd api-whatsapp-ts
```

2. **Instala las dependencias**
```bash
npm install
# o
pnpm install
```

3. **Configura las variables de entorno**
```bash
# Copia el archivo de ejemplo
cp env.example .env

# Edita el archivo .env con tus valores
```

4. **Compila el proyecto**
```bash
npm run build
```

5. **Inicia el servidor**
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

El servidor estará corriendo en `http://localhost:3001`

## 📱 Conectar WhatsApp

Al iniciar la aplicación por primera vez, se generará un **código QR** en la terminal. 

1. Abre WhatsApp en tu teléfono
2. Ve a **Configuración** > **Dispositivos vinculados**
3. Toca en **Vincular un dispositivo**
4. Escanea el código QR que aparece en la terminal

¡Tu sesión quedará guardada en la carpeta `tokens/`!

## 🔌 Uso de la API

### Enviar Mensaje

**Endpoint:** `POST /lead`

**Body (JSON):**
```json
{
  "phone": "521234567890",
  "message": "¡Hola! Este es un mensaje de prueba"
}
```

**Formato del teléfono:**
- Incluye el código de país sin el símbolo `+`
- Ejemplo para México: `521234567890`
- Ejemplo para España: `34612345678`

**Respuesta:**
```json
{
  "responseDbSave": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "message": "¡Hola! Este es un mensaje de prueba",
    "phone": "521234567890"
  },
  "responseExSave": {
    "status": 200,
    "message": "Mensaje enviado exitosamente"
  }
}
```

### Ejemplo con cURL

```bash
curl -X POST http://localhost:3001/lead \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "521234567890",
    "message": "Hola desde la API"
  }'
```

### Ejemplo con JavaScript/Fetch

```javascript
fetch('http://localhost:3001/lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: '521234567890',
    message: 'Hola desde JavaScript'
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
```

## 🚂 Desplegar en Railway

### Opción 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <tu-repositorio-github>
git push -u origin main
```

2. **Conecta con Railway**
   - Ve a [railway.app](https://railway.app)
   - Inicia sesión con GitHub
   - Click en **"New Project"**
   - Selecciona **"Deploy from GitHub repo"**
   - Selecciona tu repositorio
   - Railway detectará automáticamente la configuración

3. **Configura las variables de entorno**
   - En el dashboard de Railway, ve a **Variables**
   - Agrega: `PORT=3001` (Railway lo asignará automáticamente)

4. **Obtén tu URL pública**
   - Railway te asignará un dominio automáticamente
   - También puedes configurar un dominio personalizado

### Opción 2: Usando Railway CLI

```bash
# Instala Railway CLI
npm i -g @railway/cli

# Inicia sesión
railway login

# Inicia el proyecto
railway init

# Despliega
railway up
```

## 🐳 Desplegar con Docker

### Construir la imagen

```bash
docker build -t api-whatsapp-ts .
```

### Ejecutar el contenedor

```bash
docker run -d \
  --name whatsapp-api \
  -p 3001:3001 \
  -e PORT=3001 \
  -v $(pwd)/tokens:/app/tokens \
  api-whatsapp-ts
```

**Importante:** El flag `--privileged` puede ser necesario para Puppeteer/Chromium en algunos entornos:

```bash
docker run -d --privileged \
  --name whatsapp-api \
  -p 3001:3001 \
  -e PORT=3001 \
  -v $(pwd)/tokens:/app/tokens \
  api-whatsapp-ts
```

### Ver el QR Code

```bash
docker logs whatsapp-api
```

## 🔄 Cambiar de Proveedor de WhatsApp

El proyecto soporta múltiples proveedores. Para cambiar, edita `src/infrastructure/ioc.ts`:

### Usar Baileys (Por defecto - Gratis)
```typescript
container.register("ws.transporter", BaileysTransporter);
```

### Usar Venom (Gratis)
```typescript
container.register("ws.transporter", VenomTransporter);
```

### Usar Twilio (Pago)
```typescript
container.register("ws.transporter", TwilioService);
```

### Usar Meta/Facebook (Pago)
```typescript
container.register("ws.transporter", MetaRepository);
```

## 📁 Estructura del Proyecto

```
api-whatsapp-ts/
├── src/
│   ├── domain/              # Entidades y contratos
│   │   ├── lead.ts
│   │   ├── lead.repository.ts
│   │   └── lead-external.repository.ts
│   ├── application/         # Casos de uso
│   │   └── lead.create.ts
│   ├── infrastructure/      # Implementaciones
│   │   ├── controller/
│   │   │   └── lead.ctrl.ts
│   │   ├── repositories/
│   │   │   ├── baileys.repository.ts
│   │   │   ├── venom.repository.ts
│   │   │   ├── twilio.repository.ts
│   │   │   ├── meta.repository.ts
│   │   │   └── mock.repository.ts
│   │   ├── router/
│   │   │   ├── index.ts
│   │   │   └── lead.route.ts
│   │   └── ioc.ts          # Inyección de dependencias
│   └── app.ts              # Punto de entrada
├── tokens/                  # Sesiones de WhatsApp (git ignored)
├── tmp/                     # Archivos temporales
├── Dockerfile
├── railway.json            # Configuración de Railway
├── nixpacks.toml          # Configuración de build
└── package.json
```

## ⚙️ Variables de Entorno

| Variable | Descripción | Por Defecto |
|----------|-------------|-------------|
| `PORT` | Puerto del servidor | `3001` |
| `SESSION_NAME` | Nombre de la sesión de WhatsApp | `default` |
| `PUBLIC_URL` | URL pública de la app (para Railway) | - |

## 🔒 Seguridad

**⚠️ Importante:**
- Nunca subas la carpeta `tokens/` a Git (contiene tu sesión de WhatsApp)
- Nunca compartas tu archivo `.env`
- En producción, usa variables de entorno seguras
- Considera implementar autenticación en los endpoints

## 🐛 Problemas Comunes

### El QR no aparece
- Asegúrate de que el puerto no esté en uso
- Verifica que las dependencias estén instaladas correctamente
- En Docker, usa el flag `--privileged`

### "Connection closed"
- Puede que la sesión haya expirado
- Elimina la carpeta `tokens/` y vuelve a escanear el QR

### Error en Railway
- Asegúrate de que el `PORT` sea asignado por Railway (no hardcodeado)
- Verifica que Chromium esté disponible (está en el `nixpacks.toml`)

## 📝 Próximas Mejoras

- [ ] Implementar base de datos real (PostgreSQL/MongoDB)
- [ ] Agregar autenticación JWT
- [ ] Implementar webhooks para mensajes recibidos
- [ ] Panel de administración web
- [ ] Soporte para enviar imágenes/archivos
- [ ] Rate limiting
- [ ] Logs estructurados

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es un fork de [api-whatsapp-ts](https://github.com/leifermendez/api-whatsapp-ts) de @leifermendez.

## 🙏 Créditos

- Proyecto original: [@leifermendez](https://github.com/leifermendez)
- Baileys: [@WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)

---

**Hecho con ❤️ para facilitar la integración de WhatsApp en tus proyectos**
