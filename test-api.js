#!/usr/bin/env node
/**
 * Script de prueba para la API de WhatsApp en Railway
 * 
 * Uso:
 *   node test-api.js
 *   node test-api.js --send "Tu mensaje aquí"
 */

const API_URL = 'https://api-wp-ts-production.up.railway.app';

// Colores para la terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Función para verificar el estado de la API
async function checkHealth() {
  try {
    log('\n🔍 Verificando estado de la API...', 'cyan');
    const response = await fetch(`${API_URL}/health`);
    const data = await response.json();
    
    if (data.status === 'ok') {
      log('✅ API está funcionando correctamente!', 'green');
      log(`   Servicio: ${data.service}`, 'blue');
      log(`   Tiempo activo: ${Math.floor(data.uptime / 60)} minutos`, 'blue');
      log(`   Timestamp: ${data.timestamp}`, 'blue');
      return true;
    } else {
      log('❌ API no está funcionando correctamente', 'red');
      return false;
    }
  } catch (error) {
    log('❌ Error al conectar con la API:', 'red');
    log(`   ${error.message}`, 'red');
    return false;
  }
}

// Función para enviar un mensaje de prueba
async function sendTestMessage(phone, message) {
  try {
    log('\n📤 Enviando mensaje...', 'cyan');
    log(`   Teléfono: ${phone}`, 'blue');
    log(`   Mensaje: ${message}`, 'blue');
    
    const response = await fetch(`${API_URL}/lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone: phone,
        message: message
      })
    });
    
    const data = await response.json();
    
    if (data.responseExSave?.error === 'WAIT_LOGIN') {
      log('\n⚠️  WhatsApp no está conectado aún', 'yellow');
      log('   Pasos para conectar:', 'yellow');
      log('   1. Ve a Railway → Tu proyecto → Deployments → View Logs', 'yellow');
      log('   2. Busca el código QR en los logs', 'yellow');
      log('   3. Escanéalo con WhatsApp (Configuración → Dispositivos vinculados)', 'yellow');
      log('   4. Espera 30-60 segundos y vuelve a intentar', 'yellow');
      log('\n   El mensaje se guardó y se enviará cuando WhatsApp esté conectado.', 'blue');
    } else if (data.responseExSave?.id) {
      log('\n✅ Mensaje enviado exitosamente!', 'green');
      log(`   ID del mensaje: ${data.responseExSave.id._serialized}`, 'blue');
    } else {
      log('\n⚠️  Respuesta inesperada:', 'yellow');
      console.log(JSON.stringify(data, null, 2));
    }
    
    return data;
  } catch (error) {
    log('\n❌ Error al enviar mensaje:', 'red');
    log(`   ${error.message}`, 'red');
    return null;
  }
}

// Función principal
async function main() {
  log('\n╔═══════════════════════════════════════════════╗', 'cyan');
  log('║   🧪 Prueba de API WhatsApp en Railway       ║', 'cyan');
  log('║   URL: ' + API_URL.padEnd(37) + '║', 'cyan');
  log('╚═══════════════════════════════════════════════╝', 'cyan');
  
  // Verificar salud primero
  const isHealthy = await checkHealth();
  
  if (!isHealthy) {
    log('\n❌ No se puede continuar. La API no está disponible.', 'red');
    process.exit(1);
  }
  
  // Verificar si se pasó un mensaje como argumento
  const args = process.argv.slice(2);
  const sendIndex = args.indexOf('--send');
  
  if (sendIndex !== -1) {
    const phone = args[sendIndex + 1] || '521234567890';
    const message = args[sendIndex + 2] || 'Mensaje de prueba desde script';
    
    await sendTestMessage(phone, message);
  } else {
    log('\n💡 Para enviar un mensaje de prueba, usa:', 'yellow');
    log('   node test-api.js --send <telefono> <mensaje>', 'yellow');
    log('\n   Ejemplo:', 'yellow');
    log('   node test-api.js --send 521234567890 "Hola desde Railway!"', 'yellow');
  }
  
  log('\n✨ Prueba completada!\n', 'green');
}

// Ejecutar
main().catch(error => {
  log('\n❌ Error fatal:', 'red');
  log(error.message, 'red');
  process.exit(1);
});

