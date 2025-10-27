# 🚀 Despliegue en Railway - INICIO AHORA

## 📝 Pasos Rápidos (5 minutos)

### 1. Ir a Railway

Abre tu navegador y ve a:
👉 **https://railway.app**

### 2. Iniciar Sesión

- Click en **"Login"** o **"Start a New Project"**
- Selecciona **"Login with GitHub"**
- Autoriza a Railway para acceder a tus repositorios

### 3. Crear Proyecto Nuevo

1. Click en **"New Project"** (botón verde o botón "+")
2. Selecciona **"Deploy from GitHub repo"**
3. Busca tu repositorio: **`Sanhats/api-wp-ts`**
4. Selecciónalo

### 4. ¡Esperar el Build!

Railway comenzará automáticamente:
- ✅ Detectará `railway.json`
- ✅ Detectará `nixpacks.toml`
- ✅ Instalará dependencias (Node.js, Chromium)
- ✅ Compilará el proyecto (`npm run build`)
- ✅ Lo desplegará

**⏱️ Tiempo estimado: 3-5 minutos**

### 5. Ver Logs y Obtener el QR

Una vez que el despliegue termine:

1. En el dashboard de Railway, ve a la pestaña **"Deployments"**
2. Click en el deployment más reciente (debería decir "Active")
3. Click en **"View Logs"**
4. **Busca el código QR** en los logs (verás algo como `████████`)

### 6. Conectar WhatsApp

1. Abre WhatsApp en tu teléfono
2. Ve a **Configuración** → **Dispositivos vinculados**
3. Toca en **"Vincular un dispositivo"**
4. **Escanea el QR** que viste en los logs de Railway

### 7. Obtener tu URL Pública

1. Ve a la pestaña **"Settings"**
2. Busca la sección **"Domains"**
3. Click en **"Generate Domain"**
4. Railway te dará algo como: `https://api-wp-ts-production.up.railway.app`

## 🧪 Probar tu API

Una vez conectado WhatsApp, prueba enviar un mensaje:

### Con cURL
```bash
curl -X POST https://TU-URL.up.railway.app/lead \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "521234567890",
    "message": "¡Hola desde Railway! 🚀"
  }'
```

### O con tu navegador
Abre: `https://TU-URL.up.railway.app/health`

Deberías ver:
```json
{
  "status": "ok",
  "service": "WhatsApp API",
  "timestamp": "...",
  "uptime": 123.456
}
```

## ✅ Checklist

- [ ] Código subido a GitHub
- [ ] Repositorio: `Sanhats/api-wp-ts`
- [ ] Cuenta de Railway creada
- [ ] Proyecto conectado en Railway
- [ ] Build completado exitosamente
- [ ] QR escaneado con WhatsApp
- [ ] Sesión de WhatsApp activa
- [ ] Health check respondiendo
- [ ] Mensaje de prueba enviado

## 🐛 Si algo falla

### Build falla
- Verifica los logs completos
- Asegúrate de que `package.json` esté correcto
- Confirma que Node.js 18+ esté disponible

### No veo el QR
- Espera 2-3 minutos después del deploy
- Refresca los logs
- Busca "QR" o "████" en los logs
- Puede requerir scroll hacia abajo

### "Connection closed"
- Puede ser normal en el plan gratuito
- Escanea el QR nuevamente
- Verifica que WhatsApp esté en línea

### La URL no funciona
- Espera 1-2 minutos después del deploy
- Verifica que el dominio esté generado
- Prueba el endpoint `/health` primero

## 📊 Dashboard de Railway

Después del despliegue podrás ver:

- **📈 Métricas**: CPU, RAM, Red
- **📝 Logs**: En tiempo real
- **⚙️ Variables**: Variables de entorno
- **🌐 Domains**: Tu URL pública
- **🔧 Settings**: Configuración avanzada

## 💡 Tips

1. **Logs en Tiempo Real**: Úsalos para debugging
2. **Variables de Entorno**: Configúralas en Settings → Variables
3. **Auto-Deploy**: Railway redesplegará al hacer `git push`
4. **Persistencia**: La carpeta `tokens/` se mantiene entre deployments

## 🆘 Ayuda

Si necesitas ayuda:
- 📚 Documentación: Ver `RAILWAY_DEPLOY.md` para más detalles
- 💬 Railway Discord: https://discord.gg/railway
- 📧 Support: En el dashboard de Railway

---

**🎉 ¡Éxito! Tu API estará en producción en minutos.**

