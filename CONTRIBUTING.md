# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Toda ayuda es bienvenida.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Proceso de Desarrollo](#proceso-de-desarrollo)
- [Guía de Estilo](#guía-de-estilo)
- [Commit Messages](#commit-messages)

## 📜 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas un ambiente respetuoso y profesional.

## 🎯 ¿Cómo puedo contribuir?

### Reportar Bugs

Si encuentras un bug:

1. Verifica que no haya sido reportado previamente en [Issues](../../issues)
2. Abre un nuevo issue con el template de bug
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs actual
   - Screenshots (si aplica)
   - Versión de Node.js y sistema operativo

### Sugerir Mejoras

Para nuevas características:

1. Abre un issue con el template de feature request
2. Describe el problema que resuelve
3. Propón una solución
4. Discute alternativas consideradas

### Pull Requests

1. Fork el repositorio
2. Crea una rama desde `main`
3. Realiza tus cambios
4. Asegúrate de que el código compila sin errores
5. Actualiza la documentación si es necesario
6. Abre un Pull Request

## ⚙️ Configuración del Entorno

### Requisitos

- Node.js 18+
- npm o pnpm
- Git

### Instalación

```bash
# Clonar tu fork
git clone https://github.com/TU-USUARIO/api-whatsapp-ts.git
cd api-whatsapp-ts

# Instalar dependencias
npm install

# Compilar
npm run build

# Ejecutar en modo desarrollo
npm run dev
```

## 🔨 Proceso de Desarrollo

### 1. Crear una Rama

```bash
git checkout -b tipo/nombre-descriptivo
```

Tipos de rama:
- `feature/` - Nueva característica
- `fix/` - Corrección de bug
- `docs/` - Cambios en documentación
- `refactor/` - Refactorización
- `test/` - Añadir o modificar tests

Ejemplo: `feature/agregar-endpoint-imagenes`

### 2. Hacer Cambios

- Sigue la estructura del proyecto
- Mantén la arquitectura limpia
- Comenta código complejo
- Actualiza la documentación

### 3. Compilar y Probar

```bash
# Compilar
npm run build

# Ejecutar
npm start

# Verificar que no hay errores de TypeScript
npx tsc --noEmit
```

### 4. Commit

Sigue el formato de [Conventional Commits](#commit-messages)

### 5. Push y Pull Request

```bash
git push origin tipo/nombre-descriptivo
```

Luego abre un Pull Request en GitHub.

## 🎨 Guía de Estilo

### TypeScript

- Usa TypeScript estricto
- Define tipos explícitos
- Evita `any`
- Usa interfaces sobre types cuando sea posible

```typescript
// ✅ Bien
interface Usuario {
  id: string;
  nombre: string;
  telefono: string;
}

// ❌ Evitar
const usuario: any = {...}
```

### Nombres

- **Clases**: PascalCase (`LeadController`)
- **Interfaces**: PascalCase (`LeadRepository`)
- **Funciones/Métodos**: camelCase (`sendMessage`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_RETRIES`)
- **Archivos**: kebab-case (`lead.controller.ts`)

### Estructura de Archivos

Mantén la arquitectura limpia:

```
src/
├── domain/           # Entidades y contratos (interfaces)
├── application/      # Casos de uso (lógica de negocio)
└── infrastructure/   # Implementaciones (controllers, repositories)
```

### Imports

Ordena los imports:

```typescript
// 1. Node.js built-ins
import { readFileSync } from 'fs';

// 2. External packages
import express from 'express';
import axios from 'axios';

// 3. Internal modules
import { LeadRepository } from '../domain/lead.repository';
import { LeadCreate } from '../application/lead.create';
```

## 📝 Commit Messages

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(alcance): descripción breve

[cuerpo opcional]

[footer opcional]
```

### Tipos

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formato (sin cambios de código)
- `refactor`: Refactorización
- `test`: Añadir o modificar tests
- `chore`: Mantenimiento

### Ejemplos

```bash
feat(api): agregar endpoint para enviar imágenes

fix(baileys): corregir reconexión automática

docs(readme): actualizar instrucciones de instalación

refactor(lead): simplificar lógica de guardado
```

## 🧪 Testing

Aunque actualmente no hay tests, al agregar:

```bash
# Ejecutar tests
npm test

# Con coverage
npm run test:coverage
```

## 📚 Documentación

Al agregar una nueva característica:

1. Actualiza el `README.MD`
2. Agrega ejemplos de uso
3. Documenta en código con JSDoc si es complejo
4. Actualiza el `CHANGELOG.md`

Ejemplo JSDoc:

```typescript
/**
 * Envía un mensaje de WhatsApp
 * @param phone - Número de teléfono con código de país
 * @param message - Texto del mensaje
 * @returns Promise con la respuesta del envío
 */
async sendMessage(phone: string, message: string): Promise<Response> {
  // ...
}
```

## 🔍 Checklist para Pull Request

Antes de enviar un PR, verifica:

- [ ] El código compila sin errores (`npm run build`)
- [ ] Sigue la guía de estilo
- [ ] Has actualizado la documentación
- [ ] Los commits siguen Conventional Commits
- [ ] Has probado los cambios localmente
- [ ] No hay console.logs olvidados (usa un logger apropiado)
- [ ] Has actualizado el CHANGELOG.md

## 📞 ¿Dudas?

Si tienes dudas:

1. Revisa la documentación existente
2. Busca en Issues cerrados
3. Abre un nuevo Issue con tu pregunta

## 🙏 Agradecimientos

¡Toda contribución es valiosa! Ya sea código, documentación, reportes de bugs o sugerencias.

---

**¡Gracias por contribuir!** 🎉

