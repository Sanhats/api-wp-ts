import "dotenv/config"
import express from "express"
import cors from "cors"
import routes from "./infrastructure/router"
import container from "./infrastructure/ioc"
import * as fs from "fs"
import * as path from "path"

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

// Estado de conexión de WhatsApp
app.get('/status', (req, res) => {
  try {
    const wsTransporter: any = container.get("ws.transporter");
    const connectionState = wsTransporter.connectionState;
    const isConnected = connectionState?.connection === "open";
    const qrExists = fs.existsSync(path.join(process.cwd(), "tmp", "qr.svg"));
    
    const publicUrl = process.env.PUBLIC_URL || process.env.RAILWAY_PUBLIC_DOMAIN || "http://localhost:3001";
    const qrUrl = `${publicUrl}/tmp/qr.svg`;
    
    res.json({
      connected: isConnected,
      connection: connectionState?.connection || "unknown",
      qrAvailable: qrExists,
      qrUrl: qrExists ? qrUrl : null,
      message: isConnected 
        ? "WhatsApp está conectado ✅" 
        : qrExists 
          ? "Escanea el código QR para conectar WhatsApp" 
          : "Esperando código QR..."
    });
  } catch (error: any) {
    res.status(500).json({
      error: "Error al obtener estado",
      message: error.message
    });
  }
})

// Routes
app.use(`/`,routes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    availableEndpoints: [
      'GET /health - Estado del servicio',
      'GET /status - Estado de conexión de WhatsApp',
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
  GET  /status - Estado de conexión de WhatsApp
  POST /lead   - Enviar mensaje

⚠️  IMPORTANTE: Escanea el código QR con WhatsApp
  `)
})