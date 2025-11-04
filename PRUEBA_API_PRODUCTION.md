# 🧪 Guía de Pruebas - API en Producción

Esta guía te muestra cómo probar tu API desplegada en Railway con la URL:
**`https://api-wp-ts-production.up.railway.app`**

---

## 📋 Contenido

1. [Verificar que la API está funcionando](#1-verificar-que-la-api-está-funcionando)
2. [Probar el envío de mensajes](#2-probar-el-envío-de-mensajes)
3. [Herramientas para probar](#3-herramientas-para-probar)
4. [Qué puedes hacer con esta API](#4-qué-puedes-hacer-con-esta-api)

---

## 1. Verificar que la API está funcionando

### Prueba rápida en el navegador

Simplemente abre esta URL en tu navegador:
```
https://api-wp-ts-production.up.railway.app/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "service": "WhatsApp API",
  "timestamp": "2025-01-XX...",
  "uptime": 3600.5
}
```

### Usando cURL (Terminal)

```bash
curl https://api-wp-ts-production.up.railway.app/health
```

### Usando PowerShell (Windows)

```powershell
Invoke-WebRequest -Uri "https://api-wp-ts-production.up.railway.app/health" | ConvertFrom-Json
```

---

## 2. Probar el envío de mensajes

### ⚠️ IMPORTANTE: Conectar WhatsApp primero

Antes de enviar mensajes, necesitas escanear el código QR:

### Verificar Estado y Obtener QR

Primero, verifica el estado de la conexión:

```bash
curl https://api-wp-ts-production.up.railway.app/status
```

**Respuesta cuando hay QR disponible:**
```json
{
  "connected": false,
  "connection": "connecting",
  "qrAvailable": true,
  "qrUrl": "https://api-wp-ts-production.up.railway.app/tmp/qr.svg",
  "message": "Escanea el código QR para conectar WhatsApp"
}
```

### 3 Formas de Obtener el QR:

**Opción 1: Usar el endpoint `/status` (Recomendado)**
```bash
curl https://api-wp-ts-production.up.railway.app/status | jq -r '.qrUrl'
```

**Opción 2: URL Directa**
Abre en tu navegador: `https://api-wp-ts-production.up.railway.app/tmp/qr.svg`

**Opción 3: Logs de Railway**
1. Ve a Railway → Tu proyecto → **Deployments** → **View Logs**
2. Busca el mensaje: `🌐 Accede al QR en: https://...`

### Escanear el QR

1. Abre WhatsApp en tu teléfono
2. Ve a **Configuración** → **Dispositivos vinculados**
3. Toca **Vincular un dispositivo**
4. Escanea el código QR obtenido de cualquiera de las opciones anteriores

### Verificar Conexión

Después de escanear, espera 10-30 segundos y verifica:

```bash
curl https://api-wp-ts-production.up.railway.app/status
```

Deberías ver `"connected": true` cuando WhatsApp esté conectado.

### Método 1: cURL (Terminal/PowerShell)

```bash
curl -X POST https://api-wp-ts-production.up.railway.app/lead \
  -H "Content-Type: application/json" \
  -d "{\"phone\": \"521234567890\", \"message\": \"¡Hola! Mensaje de prueba desde Railway\"}"
```

**PowerShell:**
```powershell
$body = @{
    phone = "521234567890"
    message = "¡Hola! Mensaje de prueba desde Railway"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://api-wp-ts-production.up.railway.app/lead" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body
```

### Método 2: JavaScript (Node.js o Navegador)

```javascript
async function enviarMensaje() {
  const response = await fetch('https://api-wp-ts-production.up.railway.app/lead', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phone: '521234567890',  // Reemplaza con tu número
      message: '¡Hola! Mensaje de prueba desde Railway'
    })
  });
  
  const data = await response.json();
  console.log('Respuesta:', data);
}

enviarMensaje();
```

### Método 3: Python

```python
import requests

url = 'https://api-wp-ts-production.up.railway.app/lead'
data = {
    'phone': '521234567890',  # Reemplaza con tu número
    'message': '¡Hola! Mensaje de prueba desde Railway'
}

response = requests.post(url, json=data)
print(response.json())
```

### Método 4: Postman

1. Abre Postman
2. Crea una nueva petición:
   - **Método:** `POST`
   - **URL:** `https://api-wp-ts-production.up.railway.app/lead`
   - **Headers:**
     - `Content-Type: application/json`
   - **Body (raw JSON):**
```json
{
  "phone": "521234567890",
  "message": "¡Hola! Mensaje de prueba desde Postman"
}
```

3. Click en **Send**

### Método 5: Thunder Client (VS Code)

Si usas VS Code con la extensión Thunder Client:

1. Abre Thunder Client
2. Nueva petición:
   - **Method:** `POST`
   - **URL:** `https://api-wp-ts-production.up.railway.app/lead`
   - **Headers:** `Content-Type: application/json`
   - **Body:** 
```json
{
  "phone": "521234567890",
  "message": "¡Hola desde Thunder Client!"
}
```

---

## 3. Herramientas para probar

### 🧪 Herramientas Recomendadas

1. **Postman** - Interfaz gráfica completa
   - Descarga: https://www.postman.com/downloads/
   - Importa la colección: `postman_collection.json`

2. **Thunder Client** (VS Code) - Extensión para VS Code
   - Instala desde VS Code Extensions
   - Ideal si trabajas en VS Code

3. **cURL** - Terminal/Command Line
   - Ya viene instalado en Mac/Linux
   - Para Windows: viene con Git Bash o PowerShell

4. **Insomnia** - Alternativa a Postman
   - Descarga: https://insomnia.rest/download

5. **HTTPie** - cURL con mejor formato
   - Instala: `pip install httpie`
   - Uso: `http POST https://api-wp-ts-production.up.railway.app/lead phone=521234567890 message="Hola"`

### 🌐 Prueba desde el navegador (JavaScript Console)

Abre cualquier navegador, presiona `F12` para abrir la consola, y pega:

```javascript
fetch('https://api-wp-ts-production.up.railway.app/lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    phone: '521234567890',
    message: 'Probando desde el navegador'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

---

## 4. Qué puedes hacer con esta API

### ✅ Funcionalidades Disponibles

#### 1. **Enviar Mensajes Individuales**
Envía mensajes personalizados a cualquier número de WhatsApp:

```bash
curl -X POST https://api-wp-ts-production.up.railway.app/lead \
  -H "Content-Type: application/json" \
  -d '{"phone": "521234567890", "message": "Tu mensaje aquí"}'
```

#### 2. **Notificaciones Automáticas**
Integra con tus sistemas para enviar:
- ✅ Confirmaciones de pedidos
- ✅ Recordatorios de citas
- ✅ Alertas del sistema
- ✅ Notificaciones de seguridad

**Ejemplo - Notificación de pedido:**
```javascript
// Cuando se crea un pedido en tu sistema
async function notificarPedido(pedido) {
  await fetch('https://api-wp-ts-production.up.railway.app/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: pedido.cliente.telefono,
      message: `✅ Pedido #${pedido.id} confirmado. Total: $${pedido.total}. Gracias por tu compra!`
    })
  });
}
```

#### 3. **Recordatorios Programados**
Envía recordatorios automáticos:

```python
# Ejemplo con Python + schedule
import requests
import schedule
import time

def enviar_recordatorio():
    requests.post(
        'https://api-wp-ts-production.up.railway.app/lead',
        json={
            'phone': '521234567890',
            'message': '📅 Recordatorio: Tienes una cita mañana a las 10:00 AM'
        }
    )

# Programar recordatorio diario
schedule.every().day.at("09:00").do(enviar_recordatorio)

while True:
    schedule.run_pending()
    time.sleep(60)
```

#### 4. **Integración con Webhooks**
Conecta con otros sistemas mediante webhooks:

```javascript
// Tu servidor Express recibiendo webhooks
app.post('/webhook', async (req, res) => {
  const evento = req.body;
  
  if (evento.tipo === 'nuevo_usuario') {
    // Enviar mensaje de bienvenida
    await fetch('https://api-wp-ts-production.up.railway.app/lead', {
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

#### 5. **Monitoreo y Alertas**
Monitorea el estado de tu API y envía alertas:

```bash
#!/bin/bash
# Script de monitoreo

HEALTH=$(curl -s https://api-wp-ts-production.up.railway.app/health)

if [ "$(echo $HEALTH | jq -r '.status')" != "ok" ]; then
  # Enviar alerta si la API está caída
  curl -X POST https://api-wp-ts-production.up.railway.app/lead \
    -H "Content-Type: application/json" \
    -d '{
      "phone": "521234567890",
      "message": "⚠️ La API está caída. Revisa Railway."
    }'
fi
```

### 📊 Monitoreo del Estado

**Ver estado actual:**
```bash
curl https://api-wp-ts-production.up.railway.app/health
```

**Respuesta incluye:**
- `status`: Estado del servicio (`ok` o `error`)
- `service`: Nombre del servicio
- `timestamp`: Fecha y hora actual
- `uptime`: Tiempo que lleva funcionando (en segundos)

---

## 🔍 Verificar Estado de Conexión

### Verificar si WhatsApp está conectado

1. **Revisa los logs en Railway:**
   - Ve a Railway → Tu proyecto → **Deployments** → **View Logs**
   - Busca mensajes como:
     - `✅ LOGIN_SUCCESS` - WhatsApp está conectado
     - `⏳ WAIT_LOGIN` - Esperando conexión
     - `❌ CONNECTION_ERROR` - Error de conexión

2. **Intenta enviar un mensaje de prueba:**
   - Si obtienes `"error": "WAIT_LOGIN"` → WhatsApp no está conectado
   - Si obtienes un `id` en la respuesta → WhatsApp está conectado ✅

### Ejemplo de respuesta cuando está conectado:

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

### Ejemplo de respuesta cuando NO está conectado:

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

---

## 📝 Formato del Número de Teléfono

### ⚠️ IMPORTANTE: Formato correcto

El número debe incluir:
- ✅ Código de país **sin** el símbolo `+`
- ✅ Número completo sin espacios ni guiones

**Ejemplos correctos:**
- México: `521234567890` (no `+521234567890`)
- España: `34612345678`
- Colombia: `573001234567`
- Argentina: `5491123456789`
- Estados Unidos: `15551234567`

**Ejemplos incorrectos:**
- ❌ `+521234567890` (con símbolo +)
- ❌ `1234567890` (sin código de país)
- ❌ `52 123 456 7890` (con espacios)

---

## 🎯 Casos de Uso Prácticos

### 1. E-commerce - Confirmación de Pedido

```javascript
// Cuando un cliente completa una compra
async function confirmarPedido(pedido) {
  const mensaje = `
🛒 Pedido Confirmado #${pedido.id}

📦 Productos:
${pedido.items.map(item => `- ${item.nombre} x${item.cantidad}`).join('\n')}

💰 Total: $${pedido.total}
📅 Fecha de entrega estimada: ${pedido.fechaEntrega}

Gracias por tu compra! 🎉
  `;
  
  await fetch('https://api-wp-ts-production.up.railway.app/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: pedido.cliente.telefono,
      message: mensaje.trim()
    })
  });
}
```

### 2. Sistema de Citas - Recordatorio

```python
def enviar_recordatorio_cita(cita):
    mensaje = f"""
📅 Recordatorio de Cita

👤 Cliente: {cita.cliente_nombre}
📆 Fecha: {cita.fecha}
🕐 Hora: {cita.hora}
📍 Ubicación: {cita.ubicacion}

Te esperamos!
    """
    
    requests.post(
        'https://api-wp-ts-production.up.railway.app/lead',
        json={
            'phone': cita.cliente_telefono,
            'message': mensaje.strip()
        }
    )
```

### 3. Sistema de Autenticación - Código 2FA

```javascript
async function enviarCodigo2FA(telefono, codigo) {
  await fetch('https://api-wp-ts-production.up.railway.app/lead', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: telefono,
      message: `🔐 Tu código de verificación es: ${codigo}\n\nVálido por 5 minutos.`
    })
  });
}
```

---

## 🚨 Solución de Problemas

### Problema: "WAIT_LOGIN" en todas las respuestas

**Solución:**
1. Ve a Railway → Logs
2. Busca el código QR
3. Escanéalo con WhatsApp
4. Espera 30-60 segundos
5. Vuelve a intentar enviar un mensaje

### Problema: El mensaje no llega al destinatario

**Verifica:**
- ✅ Formato del número (con código de país, sin +)
- ✅ El número tiene WhatsApp activo
- ✅ WhatsApp está conectado (revisa logs)
- ✅ El mensaje no viola políticas de WhatsApp

### Problema: Error 404 al hacer peticiones

**Verifica:**
- ✅ La URL es correcta: `https://api-wp-ts-production.up.railway.app/lead`
- ✅ Estás usando `POST` para `/lead` (no `GET`)
- ✅ El servicio está desplegado en Railway

---

## 📚 Recursos Adicionales

- **Documentación completa:** Ver `GUIA_USO_API.md`
- **Colección Postman:** Importa `postman_collection.json`
- **Railway Dashboard:** https://railway.app

---

**¡Listo para probar! 🚀**

Empieza con el endpoint `/health` para verificar que todo funciona, y luego prueba enviar un mensaje a tu propio número de WhatsApp.

