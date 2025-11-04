import * as Baileys from "@whiskeysockets/baileys";
import * as fs from "fs";
import * as path from "path";
import { image as imageQr } from "qr-image";

import LeadExternal from "../../domain/lead-external.repository";

//Silent mode
import pino from "pino";

export class BaileysTransporter implements LeadExternal {
  private sessionName: string = "tokens/default";
  public connection: Baileys.WASocket | null = null;
  public connectionState: Partial<Baileys.ConnectionState> | null = null;
  private isEnd: boolean = false;
  private closedMessage: string = "Connection closed";
  private onReady: Array<(connection: Baileys.WASocket) => void> = [];

  constructor(sessionName: string = "default", private baileys: typeof Baileys = Baileys) {
    this.sessionName = `tokens/${sessionName}`;
    this.start();
  }

  private async getAuth(): Promise<any> {
    try {
      return await this.baileys.useMultiFileAuthState(this.sessionName);
    } catch (error) {
      console.log(error);
    }
  }

  set onready(cb: (conection: Baileys.WASocket) => void) {
    if (this.connectionState?.connection == "open") cb(this.connection!);
    this.onReady.push(cb);
  }

  async start(socketConfig: Baileys.UserFacingSocketConfig = {} as any) {
    try {
      console.log("🚀 Iniciando conexión de WhatsApp...");
      const { saveCreds, state } = await this.getAuth();
      
      // Si hay tokens guardados, informar
      if (state && state.creds) {
        console.log("🔑 Tokens de autenticación encontrados. Intentando reconectar...");
      } else {
        console.log("📱 No hay tokens guardados. Se generará un nuevo código QR.");
      }

      this.connection = this.baileys.makeWASocket({
        printQRInTerminal: true,
        browser: this.baileys.Browsers.macOS("Desktop"),
        //@ts-ignore
        logger: pino({ level: "silent" }),
        ...socketConfig,
        auth: socketConfig.auth || state,
      });
      
      this.connection.ev.on("creds.update", saveCreds);
      
      // Capturar y guardar el QR
      this.connection.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect, qr } = update;
        
        // Log para debugging
        console.log(`🔍 Connection update: ${connection || 'unknown'}, QR: ${qr ? 'available' : 'not available'}`);
        
        // Generar archivo QR si está disponible
        if (qr) {
          console.log("📱 Código QR generado. Escanea con WhatsApp.");
          this.generateQRImage(qr);
        }
        
        // Manejar estado de conexión
        if (connection === "open") {
          console.log("✅ WhatsApp conectado exitosamente!");
          this.onReady.forEach((cb) => cb(this.connection!));
        }
        
        if (connection === "close") {
          const statusCode = (lastDisconnect?.error as any)?.output?.statusCode;
          const shouldReconnect = statusCode !== 401;
          
          console.log(`🔌 Conexión cerrada. Status code: ${statusCode || 'unknown'}`);
          
          if (this.isEnd) {
            console.log(this.closedMessage);
            return;
          }
          
          if (shouldReconnect) {
            console.log("🔄 Reconectando...");
            setTimeout(() => this.reconnect(), 2000);
          } else {
            console.log("❌ Sesión expirada (401). Limpiando tokens y generando nuevo QR...");
            // Eliminar tokens para forzar nuevo login
            this.clearAuthState();
            setTimeout(() => this.reconnect(), 2000);
          }
        }
        
        this.connectionState = update;
      });
    } catch (error) {
      console.error("Error al iniciar conexión:", error);
    }
  }

  private generateQRImage(qr: string): void {
    try {
      const tmpDir = path.join(process.cwd(), "tmp");
      
      // Asegurar que la carpeta tmp existe
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      
      const qrPath = path.join(tmpDir, "qr.svg");
      const qrSvg = imageQr(qr, { type: "svg", margin: 4 });
      
      const writeStream = fs.createWriteStream(qrPath);
      qrSvg.pipe(writeStream);
      
      writeStream.on("finish", () => {
        const publicUrl = process.env.PUBLIC_URL || process.env.RAILWAY_PUBLIC_DOMAIN || "http://localhost:3001";
        const qrUrl = `${publicUrl}/tmp/qr.svg`;
        console.log(`📱 QR guardado en: ${qrPath}`);
        console.log(`🌐 Accede al QR en: ${qrUrl}`);
      });
      
      writeStream.on("error", (err) => {
        console.error("Error al guardar QR:", err);
      });
    } catch (error) {
      console.error("Error al generar QR:", error);
    }
  }

  private clearAuthState(): void {
    try {
      const authDir = path.join(process.cwd(), this.sessionName);
      if (fs.existsSync(authDir)) {
        fs.rmSync(authDir, { recursive: true, force: true });
        console.log("🗑️  Tokens de autenticación eliminados");
      }
    } catch (error) {
      console.error("Error al limpiar tokens:", error);
    }
  }

  end() {
    this.isEnd = true;
    this.connection?.end(undefined);
  }

  private reconnect(socketConfig: Baileys.UserFacingSocketConfig = {} as any) {
    this.start(socketConfig);
    console.log("Reconnecting...");
  }

  async sendMsg({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }): Promise<any> {
    try {
      const response = await this.connection?.sendMessage(phone + "@c.us", {
        text: message,
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
