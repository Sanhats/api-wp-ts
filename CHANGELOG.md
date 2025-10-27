# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

## [1.0.0] - 2025-10-27

### ✨ Preparado para Railway y Producción

#### Añadido
- ✅ Configuración completa para despliegue en Railway
- ✅ Archivo `railway.json` con configuración de build y deploy
- ✅ Archivo `nixpacks.toml` para dependencias del sistema
- ✅ Health check endpoint (`GET /health`)
- ✅ Handler 404 con información de endpoints disponibles
- ✅ Archivo `.gitignore` completo para proteger archivos sensibles
- ✅ Archivo `.dockerignore` para optimizar builds de Docker
- ✅ Archivo `env.example` con todas las variables de entorno
- ✅ Colección de Postman (`postman_collection.json`)
- ✅ Archivo `.gitkeep` en carpeta `tmp/`

#### Mejorado
- 📝 README.MD completamente reescrito en español
- 📝 Guía detallada de despliegue en Railway (`RAILWAY_DEPLOY.md`)
- 📝 Guía de inicio rápido (`QUICK_START.md`)
- 🎨 Mejora en los mensajes de consola al iniciar el servidor
- 🔧 `package.json` actualizado con engines y metadata
- 🏗️ Mejor estructura de documentación

#### Documentación
- 📚 README completo con ejemplos de uso
- 📚 Guía paso a paso para Railway
- 📚 Guía de inicio rápido (5 minutos)
- 📚 Ejemplos con cURL, JavaScript y Postman
- 📚 Solución de problemas comunes
- 📚 Información sobre costos de Railway

### 🎯 Proyecto Base

#### Características Heredadas
- ✅ API REST con Express + TypeScript
- ✅ Integración con WhatsApp mediante Baileys
- ✅ Arquitectura limpia (Domain, Application, Infrastructure)
- ✅ Sistema de inyección de dependencias
- ✅ Soporte para múltiples proveedores (Baileys, Venom, Twilio, Meta)
- ✅ Dockerfile para contenedores
- ✅ Endpoint para enviar mensajes (`POST /lead`)

## [Próximas Versiones]

### Planificado para v1.1.0
- [ ] Base de datos real (PostgreSQL)
- [ ] Persistencia de sesiones de WhatsApp
- [ ] Autenticación JWT
- [ ] Rate limiting

### Planificado para v1.2.0
- [ ] Webhooks para mensajes recibidos
- [ ] Endpoint para enviar imágenes
- [ ] Endpoint para enviar archivos
- [ ] Panel de administración web

### Planificado para v2.0.0
- [ ] Soporte para múltiples números de WhatsApp
- [ ] Sistema de colas (Bull/BullMQ)
- [ ] Análisis y métricas
- [ ] API para gestionar contactos

---

## Formato del Changelog

- **Añadido**: Nuevas características
- **Cambiado**: Cambios en funcionalidad existente
- **Obsoleto**: Características que se eliminarán pronto
- **Eliminado**: Características eliminadas
- **Corregido**: Corrección de bugs
- **Seguridad**: Parches de seguridad

---

Basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)

