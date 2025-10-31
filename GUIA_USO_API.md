# 📚 Guía Completa de Uso de la API WhatsApp

Esta guía documenta cómo usar la API actualmente y cómo desplegarla en Railway, teniendo en cuenta todas las optimizaciones realizadas en el repositorio.

---

## 📋 Índice

1. [¿Qué es esta API?](#qué-es-esta-api)
2. [Casos de Uso](#casos-de-uso)
3. [Endpoints Disponibles](#endpoints-disponibles)
4. [Cómo Usar la API](#cómo-usar-la-api)
5. [Despliegue en Railway](#despliegue-en-railway)
6. [Configuración](#configuración)
7. [Ejemplos Prácticos](#ejemplos-prácticos)
8. [Solución de Problemas](#solución-de-problemas)

---

## 🎯 ¿Qué es esta API?

Esta es una **API REST para enviar mensajes de WhatsApp** que utiliza:

- **Baileys** (`@whiskeysockets/baileys`) - Librería que se conecta directamente al protocolo de WhatsApp sin necesidad de navegador
- **TypeScript** - Código completamente tipado
- **Arquitectura Limpia** - Separación de responsabilidades (Domain, Application, Infrastructure)
- **Express.js** - Framework web para Node.js

### Características Principales

✅ **Ligera y Rápida**: Usa Baileys, que no requiere Chromium  
✅ **Multi-dispositivo**: Conecta con WhatsApp Web Multi-Device  
✅ **REST API**: Interfaz simple y estándar  
✅ **Persistencia**: Guarda sesiones automáticamente  
✅ **Lista para Producción**: Optimizada para Railway

---

## 💼 Casos de Uso

### 1. **Notificaciones Automáticas**
Enviar mensajes automáticos a clientes, usuarios o usuarios finales:
- Confirmación de pedidos
- Recordatorios de citas
- Alertas de sistema
- Notificaciones de seguridad

### 2. **Chatbots y Atención al Cliente**
Integrar con sistemas de atención:
- Respuestas automáticas
- Asistencia virtual
- Escalamiento a agentes humanos

### 3. **Marketing y Campañas**
Enviar mensajes masivos personalizados:
- Promociones
- Boletines informativos
- Invitaciones a eventos

### 4. **Integración con Aplicaciones**
Conectar sistemas existentes con WhatsApp:
- CRMs (Salesforce, HubSpot)
- ERPs
- Sistemas de facturación
- Plataformas educativas

### 5. **Workflows Automatizados**
Automatizar procesos de negocio:
- Onboarding de clientes
- Encuestas y feedback
- Confirmaciones de transacciones

---

## 🔌 Endpoints Disponibles

### 1. Health Check

**GET** `/health`

Verifica el estado del servicio.

**Respuesta:**
```json
{
  "status": "ok",
  "service": "WhatsApp API",
  "timestamp": "2025-10-31T18:00:00.000Z",
  "uptime": 3600.5
}
```

**Uso:**
```bash
curl https://tu-api.railway.app/health
```

---

### 2. Enviar Mensaje

**POST** `/lead`

Envía un mensaje de WhatsApp a un número específico.

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "phone": "521234567890",
  "message": "¡Hola! Este es tu mensaje"
}
```

**Formato del Teléfono:**
- **IMPORTANTE**: Debe incluir el código de país **sin** el símbolo `+`
- Ejemplos:
  - México: `521234567890` (no `+521234567890`)
  - España: `34612345678`
  - Colombia: `573001234567`
  - Argentina: `5491123456789`

**Respuesta Exitosa:**
```json
{
  "responseDbSave": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "message": "¡Hola! Este es tu mensaje",
    "phone": "521234567890"
  },
  "responseExSave": {
    "id": {
      "fromMe": false,
      "remote": "521234567890@s.whatsapp.net",
      "id": "3EB0...",
      "_serialized": "true_521234567890@s.whatsapp.net_3EB0..."
    }
  }
}
```

**Respuesta de Error (No conectado):**
```json
{
  "responseDbSave": {
    "uuid": "123e4567-e89b-12d3-a456-426614174000",
    "message": "¡Hola! Este es tu mensaje",
    "phone": "521234567890"
  },
  "responseExSave": {
    "error": "WAIT_LOGIN"
  }
}
```

**Códigos de Estado HTTP:**
- `200` - Mensaje enviado exitosamente
- `200` - Mensaje guardado pero no enviado (esperando conexión)
- `400` - Error en los datos enviados
- `404` - Endpoint no encontrado

---

## 📖 Cómo Usar la API

### Opción 1: Usar cURL

```bash
curl -X POST https://tu-api.railway.app/lead \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "521234567890",
    "message": "¡Hola desde la API!"
  }'
```

### Opción 2: Usar JavaScript/Node.js

```javascript
const response = await fetch('https://tu-api.railway.app/lead', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    phone: '521234567890',
    message: '¡Hola desde JavaScript!'
  })
});

const data = await response.json();
console.log(data);
```

### Opción 3: Usar Python

```python
import requests

url = 'https://tu-api.railway.app/lead'
data = {
    'phone': '521234567890',
    'message': '¡Hola desde Python!'
}

response = requests.post(url, json=data)
print(response.json())
```

### Opción 4: Usar Postman

1. Método: `POST`
2. URL: `https://tu-api.railway.app/lead`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON):
```json
{
  "phone": "521234567890",
  "message": "¡Hola desde Postman!"
}
```

---

## 🚀 Despliegue en Railway

### Prerequisitos

- ✅ Cuenta en [Railway](https://railway.app) (gratis)
- ✅ Cuenta en [GitHub](https://github.com)
- ✅ Repositorio del proyecto en GitHub

### Configuración Actual del Proyecto

El proyecto está optimizado para Railway con:

✅ **nixpacks.toml** - Configuración de build optimizada:
- Solo instala Node.js (sin Chromium innecesario)
- Build más rápido (2-4 minutos vs 12+ minutos)
- Comando: `npm ci && npm run build`

✅ **railway.json** - Configuración de Railway:
- Builder: NIXPACKS
- Start command: `npm start`
- Restart policy: ON_FAILURE (5 reintentos)

### Pasos para Desplegar

#### 1. Subir Código a GitHub

Si aún no lo has hecho:

```bash
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

#### 2. Conectar con Railway

1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click en **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Elige tu repositorio

#### 3. Configuración Automática

Railway detectará automáticamente:
- ✅ `railway.json` - Configuración del proyecto
- ✅ `nixpacks.toml` - Dependencias del sistema
- ✅ `package.json` - Dependencias de Node.js

El despliegue comenzará automáticamente y tardará **2-4 minutos**.

#### 4. Configurar Variables de Entorno (Opcional)

1. En Railway, ve a tu servicio
2. Click en **"Variables"**
3. Agrega variables si las necesitas:

```
PORT=3001
SESSION_NAME=mi-sesion
NODE_ENV=production
```

**Nota:** Railway asigna el `PORT` automáticamente, pero puedes configurarlo.

#### 5. Obtener URL Pública

1. En tu servicio, ve a **"Settings"**
2. Busca **"Domains"**
3. Click en **"Generate Domain"**
4. Railway te dará una URL como: `https://tu-proyecto.up.railway.app`

¡Guarda esta URL! La necesitarás para hacer peticiones a tu API.

#### 6. Conectar WhatsApp

1. En Railway, ve a la pestaña **"Deployments"**
2. Click en el deployment más reciente
3. Click en **"View Logs"**
4. Busca el código QR en los logs
5. Escanea el QR con tu WhatsApp

**Tip:** El QR aparece en formato ASCII en los logs. Si es difícil de leer, puedes acceder a `https://tu-api.railway.app/tmp/qr.svg` para ver el QR como imagen.

---

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto (o configúralas en Railway):

```env
# Puerto de la aplicación
PORT=3001

# Nombre de la sesión de WhatsApp (opcional)
SESSION_NAME=default

# URL pública de la aplicación (para Railway)
PUBLIC_URL=https://tu-api.railway.app

# Entorno
NODE_ENV=production
```

### Archivos de Configuración

**railway.json:**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 5
  }
}
```

**nixpacks.toml:**
```toml
[phases.setup]
nixPkgs = ["nodejs"]

[phases.install]
cmds = ["npm ci"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npm start"
```

---

## 💡 Ejemplos Prácticos

### Ejemplo 1: Integración con Sistema de Pedidos

```javascript
// Cuando se crea un pedido
async function notificarPedido(pedido) {
  const response = await fetch('https://tu-api.railway.app/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: pedido.cliente.telefono,
      message: `✅ Pedido #${pedido.id} confirmado. Total: $${pedido.total}`
    })
  });
  
  return await response.json();
}
```

### Ejemplo 2: Recordatorio de Citas

```python
# Sistema de recordatorios
import requests
from datetime import datetime, timedelta

def enviar_recordatorio(cita):
    mensaje = f"📅 Recordatorio: Tienes una cita el {cita.fecha} a las {cita.hora}"
    
    response = requests.post(
        'https://tu-api.railway.app/lead',
        json={
            'phone': cita.cliente.telefono,
            'message': mensaje
        }
    )
    
    return response.json()
```

### Ejemplo 3: Webhook de Notificaciones

```javascript
// Express middleware para webhooks
app.post('/webhook', async (req, res) => {
  const evento = req.body;
  
  if (evento.tipo === 'nuevo_usuario') {
    await fetch('https://tu-api.railway.app/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        phone: evento.usuario.telefono,
        message: `¡Bienvenido ${evento.usuario.nombre}! Gracias por registrarte.`
      })
    });
  }
  
  res.json({ ok: true });
});
```

### Ejemplo 4: Monitoreo y Alertas

```bash
#!/bin/bash
# Script de monitoreo

# Verificar salud de la API
HEALTH=$(curl -s https://tu-api.railway.app/health)

if [ "$(echo $HEALTH | jq -r '.status')" != "ok" ]; then
  # Enviar alerta
  curl -X POST https://tu-api.railway.app/lead \
    -H "Content-Type: application/json" \
    -d '{
      "phone": "521234567890",
      "message": "⚠️ La API está caída. Revisa Railway."
    }'
fi
```

---

## 🔧 Solución de Problemas

### Problema 1: El mensaje no se envía

**Síntomas:**
```json
{
  "responseExSave": {
    "error": "WAIT_LOGIN"
  }
}
```

**Solución:**
1. Verifica que hayas escaneado el QR con WhatsApp
2. Revisa los logs en Railway para ver el estado de la conexión
3. Espera a que aparezca "LOGIN_SUCCESS" en los logs

### Problema 2: Error "WAIT_LOGIN" después de escanear el QR

**Síntomas:**
- Escaneaste el QR pero sigue apareciendo "WAIT_LOGIN"

**Solución:**
1. Verifica que la sesión esté guardada (revisa la carpeta `tokens/` en Railway)
2. Espera 30-60 segundos para que la conexión se establezca
3. Si persiste, elimina la carpeta `tokens/` y vuelve a escanear el QR

### Problema 3: Build falla en Railway

**Síntomas:**
- El deployment falla con errores de build

**Soluciones:**
1. Verifica que `package.json` tenga todas las dependencias necesarias
2. Asegúrate de que `nixpacks.toml` esté correcto
3. Revisa los logs de build en Railway para ver el error específico

### Problema 4: El QR no aparece en los logs

**Síntomas:**
- No ves el código QR en los logs de Railway

**Soluciones:**
1. Espera 1-2 minutos después del despliegue
2. Busca "QR" o "████" en los logs
3. Accede a `https://tu-api.railway.app/tmp/qr.svg` directamente
4. Si usas Baileys, el QR aparece en la terminal con `printQRInTerminal: true`

### Problema 5: El número de teléfono está mal formateado

**Síntomas:**
- El mensaje no llega al destinatario

**Soluciones:**
1. Verifica que el número incluya el código de país **sin** el símbolo `+`
2. Ejemplo correcto: `521234567890` (México)
3. Ejemplo incorrecto: `+521234567890` o `1234567890`

### Problema 6: La API está lenta

**Síntomas:**
- Las peticiones tardan mucho en responder

**Soluciones:**
1. Verifica el plan de Railway (el plan gratuito tiene límites)
2. Revisa los logs para ver si hay errores
3. Considera actualizar a un plan de pago si necesitas más recursos

---

## 📊 Monitoreo y Métricas

### Ver Logs en Tiempo Real

1. Ve a tu proyecto en Railway
2. Click en **"Deployments"**
3. Selecciona el deployment actual
4. Click en **"View Logs"**
5. Los logs se actualizan en tiempo real

### Métricas Disponibles

Railway muestra:
- **CPU Usage** - Uso de CPU
- **Memory Usage** - Uso de memoria RAM
- **Network** - Tráfico de red

### Health Check Endpoint

Usa el endpoint `/health` para monitorear:

```bash
# Verificar estado
curl https://tu-api.railway.app/health

# Integrar con sistema de monitoreo
watch -n 60 curl -s https://tu-api.railway.app/health
```

---

## 🔐 Seguridad y Buenas Prácticas

### 1. **Validación de Entrada**
Siempre valida los datos antes de enviar:
- Verifica que el número de teléfono tenga el formato correcto
- Valida que el mensaje no esté vacío
- Limita la longitud del mensaje

### 2. **Rate Limiting**
Implementa límites de velocidad para evitar abuso:
```javascript
// Ejemplo con express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // 100 peticiones por IP
});

app.use('/lead', limiter);
```

### 3. **Autenticación**
Protege tu API con tokens:
```javascript
// Ejemplo con API key
const API_KEY = process.env.API_KEY;

app.use('/lead', (req, res, next) => {
  if (req.headers['x-api-key'] !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

### 4. **Variables de Entorno**
Nunca expongas información sensible en el código:
- Usa variables de entorno para secrets
- Configura las variables en Railway, no en el código

---

## 📝 Notas Importantes

### ⚠️ Limitaciones de WhatsApp

1. **ToS de WhatsApp**: Asegúrate de cumplir con los Términos de Servicio de WhatsApp
2. **Límites de Mensajes**: WhatsApp puede limitar el número de mensajes si detecta spam
3. **Sesiones**: Mantén la sesión activa para evitar desconexiones

### 💡 Recomendaciones

1. **Usa Baileys** (actual): Es más ligero y rápido que otras opciones
2. **Guarda las sesiones**: Las sesiones se guardan automáticamente en `tokens/`
3. **Monitorea los logs**: Revisa regularmente los logs para detectar problemas
4. **Implementa retry logic**: Si un mensaje falla, intenta nuevamente después de unos segundos

---

## 🆘 Soporte

Si tienes problemas:

1. **Revisa esta guía** primero
2. **Consulta los logs** en Railway
3. **Revisa la documentación** de [Baileys](https://github.com/WhiskeySockets/Baileys)
4. **Abre un issue** en el repositorio de GitHub

---

## 📚 Recursos Adicionales

- **Documentación de Baileys**: https://github.com/WhiskeySockets/Baileys
- **Documentación de Railway**: https://docs.railway.app
- **API REST Best Practices**: https://restfulapi.net/
- **WhatsApp Business API**: https://www.whatsapp.com/business/api

---

**Última actualización:** Octubre 2025  
**Versión de la API:** 1.0.0  
**Proveedor actual:** Baileys (@whiskeysockets/baileys)

