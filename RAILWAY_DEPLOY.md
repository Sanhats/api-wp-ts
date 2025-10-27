# 🚂 Guía Completa de Despliegue en Railway

Esta guía te llevará paso a paso para desplegar tu API de WhatsApp en Railway.

## 📋 Requisitos Previos

- Cuenta en [Railway](https://railway.app) (gratis)
- Cuenta en [GitHub](https://github.com) (gratis)
- Git instalado en tu computadora

## 🔧 Preparación del Proyecto

### 1. Inicializar Git (si no lo has hecho)

```bash
# En la raíz de tu proyecto
git init
```

### 2. Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Click en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Ponle un nombre (ej: `mi-api-whatsapp`)
5. Selecciona **"Private"** (recomendado para proyectos personales)
6. **NO** marques "Initialize with README" (ya tenemos uno)
7. Click en **"Create repository"**

### 3. Subir código a GitHub

```bash
# Agrega todos los archivos
git add .

# Haz el primer commit
git commit -m "Initial commit - API WhatsApp lista para Railway"

# Agrega el remote (reemplaza con tu URL de GitHub)
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git

# Sube el código
git branch -M main
git push -u origin main
```

## 🚀 Despliegue en Railway

### Paso 1: Crear Proyecto en Railway

1. Ve a [railway.app](https://railway.app)
2. Click en **"Login"** e inicia sesión con GitHub
3. Autoriza a Railway para acceder a tus repositorios
4. Click en **"New Project"**
5. Selecciona **"Deploy from GitHub repo"**
6. Busca y selecciona tu repositorio `mi-api-whatsapp`

### Paso 2: Configuración Automática

Railway detectará automáticamente:
- ✅ `railway.json` - Configuración del proyecto
- ✅ `nixpacks.toml` - Dependencias del sistema (Node.js + Chromium)
- ✅ `package.json` - Dependencias de Node.js

El despliegue comenzará automáticamente. Esto puede tardar 3-5 minutos.

### Paso 3: Configurar Variables de Entorno (Opcional)

1. En el dashboard de Railway, click en tu servicio
2. Ve a la pestaña **"Variables"**
3. Agrega estas variables (opcional):

```
PORT=3001
SESSION_NAME=mi-whatsapp-personal
```

**Nota:** Railway asigna el `PORT` automáticamente, pero es bueno tenerlo configurado.

### Paso 4: Obtener URL Pública

1. En tu servicio, ve a la pestaña **"Settings"**
2. Busca la sección **"Domains"**
3. Click en **"Generate Domain"**
4. Railway te dará una URL como: `https://tu-proyecto.up.railway.app`

¡Guarda esta URL! La necesitarás para hacer peticiones a tu API.

## 📱 Conectar WhatsApp

**⚠️ IMPORTANTE:** Railway no muestra la terminal interactiva por defecto, por lo que necesitas usar una estrategia diferente para obtener el QR.

### Opción 1: Ver Logs y QR (Recomendado)

1. En Railway, ve a la pestaña **"Deployments"**
2. Click en el deployment más reciente
3. Click en **"View Logs"**
4. Busca el código QR en formato ASCII en los logs
5. Escanea el QR con tu WhatsApp

### Opción 2: Endpoint para obtener QR (Requiere modificación)

Si deseas una solución más elegante, puedes crear un endpoint que devuelva el QR como imagen. Esto requiere modificar el código (puedo ayudarte con esto si lo necesitas).

## 🧪 Probar tu API

Una vez desplegada, prueba tu API:

### Con cURL

```bash
curl -X POST https://tu-proyecto.up.railway.app/lead \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "521234567890",
    "message": "¡Hola! Mensaje desde Railway"
  }'
```

### Con Postman

1. Método: `POST`
2. URL: `https://tu-proyecto.up.railway.app/lead`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "phone": "521234567890",
  "message": "¡Hola! Mensaje desde Railway"
}
```

### Con JavaScript

```javascript
fetch('https://tu-proyecto.up.railway.app/lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: '521234567890',
    message: '¡Hola desde Railway!'
  })
})
.then(response => response.json())
.then(data => console.log('Éxito:', data))
.catch(error => console.error('Error:', error));
```

## 🔄 Actualizar el Proyecto

Cuando hagas cambios en tu código:

```bash
# Haz tus cambios en el código
# ...

# Guarda los cambios
git add .
git commit -m "Descripción de los cambios"
git push

# Railway detectará los cambios y redesplegará automáticamente
```

## 📊 Monitoreo

### Ver Logs en Tiempo Real

1. Ve a tu proyecto en Railway
2. Click en la pestaña **"Deployments"**
3. Selecciona el deployment actual
4. Los logs se actualizan en tiempo real

### Métricas

Railway te muestra:
- **CPU Usage**: Uso de CPU
- **Memory Usage**: Uso de memoria RAM
- **Network**: Tráfico de red

## ⚙️ Configuraciones Avanzadas

### Escalar Recursos

El plan gratuito de Railway incluye:
- **$5 USD** de crédito mensual gratis
- **512 MB RAM**
- **1 vCPU**
- **100 GB de transferencia**

Si necesitas más recursos:
1. Ve a **"Settings"** > **"Resources"**
2. Ajusta CPU/RAM según necesites
3. Railway te cobrará según el uso

### Dominio Personalizado

1. Ve a **"Settings"** > **"Domains"**
2. Click en **"Custom Domain"**
3. Ingresa tu dominio (ej: `api.midominio.com`)
4. Configura el DNS según las instrucciones

### Variables de Entorno Adicionales

Para agregar más variables:
1. Ve a **"Variables"**
2. Click en **"+ New Variable"**
3. Agrega nombre y valor
4. Click en **"Add"**

Ejemplo de variables útiles:
```
NODE_ENV=production
MAX_RETRIES=3
TIMEOUT=30000
```

## 🐛 Solución de Problemas

### El despliegue falla

**Problema:** Build fails o deploy fails

**Solución:**
1. Revisa los logs en **"Deployments"** > **"View Logs"**
2. Asegúrate de que `package.json` tenga todas las dependencias
3. Verifica que `npm install` funcione localmente
4. Revisa que no haya errores de TypeScript

### El QR no aparece

**Problema:** No veo el QR en los logs

**Solución:**
1. Espera 2-3 minutos después del despliegue
2. Refresca los logs
3. Busca "QR" o "████" en los logs
4. Si no aparece, puede que Baileys necesite configuración adicional

### "Connection closed"

**Problema:** WhatsApp se desconecta constantemente

**Solución:**
1. La sesión puede perderse en Railway (contenedores efímeros)
2. Necesitas implementar persistencia (volumen o base de datos)
3. Considera usar una base de datos para guardar la sesión

### La aplicación se detiene

**Problema:** La app se apaga después de un tiempo sin uso

**Solución:**
Railway puede apagar apps inactivas en el plan gratuito:
1. Actualiza a un plan de pago para mantenerla siempre activa
2. O implementa un "keep-alive" (hacer ping cada 5 minutos)

## 💡 Consejos Pro

### 1. Health Check Endpoint

Agrega un endpoint para verificar que la API esté viva:

```typescript
// En tu app.ts
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});
```

### 2. Mantener la App Activa

Crea un cronjob que haga ping cada 5 minutos:

```javascript
// Usando cron-job.org o similar
// URL: https://tu-proyecto.up.railway.app/health
// Intervalo: cada 5 minutos
```

### 3. Logs Estructurados

Railway indexa mejor los logs en formato JSON:

```typescript
console.log(JSON.stringify({
  level: 'info',
  message: 'Mensaje enviado',
  phone: phone,
  timestamp: new Date().toISOString()
}));
```

### 4. Alertas

Configura alertas en Railway:
1. Ve a **"Settings"** > **"Webhooks"**
2. Agrega un webhook para notificaciones
3. Usa Discord, Slack o email

## 💰 Costos

### Plan Gratuito ($0/mes)
- $5 USD de crédito mensual incluido
- Suficiente para proyectos pequeños
- Apps se pausan si excedes el crédito

### Plan de Pago (desde $5/mes)
- $5 USD de crédito incluido + pago por uso
- Sin pausa automática
- Mejor para producción

**Estimado de uso:**
- API pequeña (~100 req/día): **Gratis**
- API mediana (~1000 req/día): **~$3-5/mes**
- API grande (>5000 req/día): **~$10-20/mes**

## 🎯 Próximos Pasos

Una vez desplegado exitosamente:

1. **Implementa autenticación** para proteger tu API
2. **Agrega persistencia** para las sesiones de WhatsApp
3. **Configura un dominio** personalizado
4. **Implementa webhooks** para recibir mensajes
5. **Agrega monitoreo** y alertas

## 🆘 Soporte

Si tienes problemas:

1. **Documentación de Railway:** https://docs.railway.app
2. **Discord de Railway:** https://discord.gg/railway
3. **GitHub Issues:** Abre un issue en tu repositorio

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Código subido a GitHub
- [ ] Proyecto creado en Railway
- [ ] Build exitoso
- [ ] URL pública generada
- [ ] QR escaneado (sesión de WhatsApp activa)
- [ ] Prueba exitosa de envío de mensaje
- [ ] Logs revisados (sin errores)
- [ ] Variables de entorno configuradas

¡Felicidades! 🎉 Tu API de WhatsApp está en producción.

---

**¿Necesitas ayuda adicional?** Revisa el `README.MD` principal o abre un issue en el repositorio.

