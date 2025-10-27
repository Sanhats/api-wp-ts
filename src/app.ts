import "dotenv/config"
import express from "express"
import cors from "cors"
import routes from "./infrastructure/router"

const port = process.env.PORT || 3001
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.static('tmp'))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    service: 'WhatsApp API',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// Routes
app.use(`/`,routes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /health - Estado del servicio',
      'POST /lead - Enviar mensaje de WhatsApp'
    ]
  })
})

// Start server
app.listen(port, () => {
  console.log(`
╔═══════════════════════════════════════╗
║   🚀 WhatsApp API Server             ║
║   📡 Port: ${port}                      ║
║   🌍 Environment: ${process.env.NODE_ENV || 'development'}        ║
║   ✅ Status: Ready                    ║
╚═══════════════════════════════════════╝

Endpoints disponibles:
  GET  /health - Estado del servicio
  POST /lead   - Enviar mensaje

⚠️  IMPORTANTE: Escanea el código QR con WhatsApp
  `)
})