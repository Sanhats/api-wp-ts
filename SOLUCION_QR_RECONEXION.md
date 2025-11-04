# 🔧 Solución: Problema de QR y Reconexión en Railway

## Problema Identificado

1. **"Reconnecting..." constante**: La conexión se está cerrando inmediatamente después de iniciarse
2. **QR no accesible**: El código QR solo se mostraba en los logs, no como archivo accesible vía HTTP

## Soluciones Implementadas

### ✅ Cambios Realizados

1. **Generación de QR como archivo SVG**
   - El QR ahora se guarda automáticamente en `tmp/qr.svg`
   - Accesible vía HTTP en: `https://tu-url.up.railway.app/tmp/qr.svg`

2. **Mejor manejo de reconexión**
   - Detecta cuando la sesión expira (error 401)
   - Limpia los tokens automáticamente cuando es necesario
   - Evita reconexiones infinitas innecesarias

3. **Nuevo endpoint `/status`**
   - Verifica el estado de conexión de WhatsApp
   - Indica si hay un QR disponible
   - Proporciona la URL del QR automáticamente

## 📋 Pasos para Solucionar

### 1. Desplegar los Cambios

```bash
# Compilar el proyecto
npm run build

# Hacer commit y push
git add .
git commit -m "Fix: Generar QR accesible y mejorar manejo de conexión"
git push origin main
```

Railway detectará automáticamente los cambios y desplegará la nueva versión.

### 2. Configurar Variable de Entorno (Opcional pero Recomendado)

En Railway, ve a tu proyecto → **Variables** y agrega:

```
PUBLIC_URL=https://api-wp-ts-production.up.railway.app
```

Esto asegura que la URL del QR sea correcta.

### 3. Verificar el Estado

Una vez desplegado, verifica el estado:

```bash
curl https://api-wp-ts-production.up.railway.app/status
```

**Respuesta esperada cuando hay QR disponible:**
```json
{
  "connected": false,
  "connection": "connecting",
  "qrAvailable": true,
  "qrUrl": "https://api-wp-ts-production.up.railway.app/tmp/qr.svg",
  "message": "Escanea el código QR para conectar WhatsApp"
}
```

### 4. Acceder al QR

Tienes **3 formas** de obtener el QR:

#### Opción 1: Endpoint `/status` (Recomendado)
```bash
curl https://api-wp-ts-production.up.railway.app/status
```
La respuesta incluye la URL del QR en `qrUrl`.

#### Opción 2: URL Directa
Abre en tu navegador:
```
https://api-wp-ts-production.up.railway.app/tmp/qr.svg
```

#### Opción 3: Logs de Railway
1. Ve a Railway → Tu proyecto → **Deployments** → **View Logs**
2. Busca el mensaje: `🌐 Accede al QR en: https://...`

### 5. Escanear el QR

1. Abre WhatsApp en tu teléfono
2. Ve a **Configuración** → **Dispositivos vinculados**
3. Toca **Vincular un dispositivo**
4. Escanea el código QR (de cualquiera de las 3 opciones anteriores)

### 6. Verificar Conexión

Después de escanear, espera 10-30 segundos y verifica:

```bash
curl https://api-wp-ts-production.up.railway.app/status
```

**Respuesta cuando está conectado:**
```json
{
  "connected": true,
  "connection": "open",
  "qrAvailable": false,
  "qrUrl": null,
  "message": "WhatsApp está conectado ✅"
}
```

También puedes revisar los logs en Railway. Deberías ver:
```
✅ WhatsApp conectado exitosamente!
```

## 🔍 Verificación de Logs

En Railway → **View Logs**, deberías ver:

### ✅ Logs Correctos (cuando funciona):

```
📱 Código QR generado. Escanea con WhatsApp.
📱 QR guardado en: /app/tmp/qr.svg
🌐 Accede al QR en: https://api-wp-ts-production.up.railway.app/tmp/qr.svg
✅ WhatsApp conectado exitosamente!
```

### ❌ Logs Problemáticos:

Si ves solo:
```
Reconnecting...
Reconnecting...
Reconnecting...
```

Esto significa que:
1. La sesión anterior expiró o está corrupta
2. Necesitas eliminar los tokens manualmente (ver solución abajo)

## 🛠️ Solución Manual si Persiste el Problema

Si después de desplegar sigues viendo "Reconnecting..." constante:

### Opción 1: Usar Railway CLI (Recomendado)

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Conectar al proyecto
railway link

# Eliminar carpeta tokens
railway run rm -rf tokens/
```

### Opción 2: Agregar Variable de Entorno

En Railway → **Variables**, agrega temporalmente:

```
SESSION_NAME=nueva_sesion
```

Esto forzará una nueva sesión.

### Opción 3: Redeploy Manual

1. Ve a Railway → Tu proyecto → **Settings**
2. Busca **"Redeploy"** o **"Restart"**
3. Esto reiniciará el servicio y generará un nuevo QR

## 📊 Endpoints Disponibles

### 1. Health Check
```bash
GET /health
```
Verifica que el servidor esté funcionando.

### 2. Estado de WhatsApp
```bash
GET /status
```
Verifica el estado de conexión y obtiene la URL del QR.

### 3. Enviar Mensaje
```bash
POST /lead
Body: { "phone": "521234567890", "message": "Hola" }
```

## 🎯 Próximos Pasos

1. ✅ Desplegar los cambios
2. ✅ Configurar `PUBLIC_URL` (opcional)
3. ✅ Verificar `/status` para obtener el QR
4. ✅ Escanear el QR con WhatsApp
5. ✅ Verificar conexión con `/status`
6. ✅ Probar enviar un mensaje con `/lead`

## 💡 Tips

- El QR se actualiza cada minuto. Si expira, simplemente refresca la página `/tmp/qr.svg`
- Una vez conectado, la sesión se guarda en `tokens/` y no necesitarás escanear nuevamente
- Si la sesión expira (después de días sin usar), el sistema automáticamente limpia los tokens y genera un nuevo QR

## 🆘 Si Aún Tienes Problemas

1. Revisa los logs en Railway para ver errores específicos
2. Verifica que `PUBLIC_URL` esté configurado correctamente
3. Asegúrate de que Railway tenga permisos de escritura en la carpeta `tmp`
4. Intenta eliminar manualmente la carpeta `tokens` y redeploy

---

**Última actualización:** Con los cambios implementados, el QR debería aparecer automáticamente y ser accesible vía HTTP.

