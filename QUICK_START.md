# ⚡ Inicio Rápido - 5 Minutos

Guía express para tener tu API de WhatsApp funcionando en menos de 5 minutos.

## 🚀 Opción 1: Local (Desarrollo)

```bash
# 1. Clonar e instalar
git clone <tu-repo>
cd api-whatsapp-ts
npm install

# 2. Configurar (opcional, usa valores por defecto)
cp env.example .env

# 3. Compilar y ejecutar
npm run build
npm start
```

**¡Escanea el QR que aparece en la terminal con WhatsApp!**

## 🧪 Probar la API

```bash
# Enviar mensaje de prueba
curl -X POST http://localhost:3001/lead \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "521234567890",
    "message": "¡Hola desde la API!"
  }'
```

## ☁️ Opción 2: Railway (Producción)

```bash
# 1. Subir a GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <tu-repo-github>
git push -u origin main

# 2. Desplegar en Railway
# - Ve a railway.app
# - Login con GitHub
# - New Project -> Deploy from GitHub
# - Selecciona tu repositorio
# ¡Listo! Railway lo despliega automáticamente
```

## 📱 Formato del Teléfono

**Importante:** El número debe incluir código de país sin `+`

- ✅ Correcto: `521234567890` (México)
- ✅ Correcto: `34612345678` (España)
- ✅ Correcto: `573001234567` (Colombia)
- ❌ Incorrecto: `+521234567890` (no incluir +)
- ❌ Incorrecto: `1234567890` (falta código de país)

## 🔑 Variables de Entorno (Opcional)

Crea un archivo `.env`:

```bash
PORT=3001
SESSION_NAME=mi-sesion
```

Si no lo creas, usa los valores por defecto.

## 📚 Documentación Completa

- **Instalación completa:** Ver `README.MD`
- **Despliegue en Railway:** Ver `RAILWAY_DEPLOY.md`
- **Problemas comunes:** Ver sección en `README.MD`

## 🆘 Problemas Comunes

### No aparece el QR
```bash
# Solución: Reinicia el servidor
npm start
```

### Error "port already in use"
```bash
# Solución: Cambia el puerto
PORT=3002 npm start
```

### Mensaje no se envía
- Verifica que escaneaste el QR
- Revisa el formato del teléfono (código de país)
- Verifica que el número esté en WhatsApp

## 🎯 Siguiente Paso

Una vez funcionando localmente, despliega en Railway siguiendo `RAILWAY_DEPLOY.md`

---

**¿Listo en menos de 5 minutos?** 🎉

