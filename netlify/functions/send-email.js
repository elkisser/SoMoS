const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configuración del transporter de email usando DSN
const createTransporter = () => {
  // Usar MAILER_DSN si está disponible
  if (process.env.MAILER_DSN) {
    // nodemailer acepta DSN como string
    try {
      return nodemailer.createTransport(process.env.MAILER_DSN);
    } catch (err) {
      console.warn('MAILER_DSN inválido, intentando fallback SMTP:', err.message);
    }
  }

  // Fallback a configuración SMTP tradicional (si están presentes)
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
      secure: process.env.SMTP_SECURE === 'true' || false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  // Si no hay configuración, lanzar error para que caller lo capture
  throw new Error('No MAILER_DSN ni credenciales SMTP configuradas (SMTP_USER/SMTP_PASS).');
};

// Función para leer y procesar plantillas HTML
const getEmailTemplate = (templateName, data) => {
  try {
    // Intentar múltiples rutas posibles para las plantillas
    const possiblePaths = [
      path.join(process.cwd(), 'src', 'templates', `${templateName}.html`),
      path.join(__dirname, '..', '..', 'src', 'templates', `${templateName}.html`),
      path.join('/opt/build/repo/src/templates', `${templateName}.html`)
    ];
    
    let template = null;
    for (const templatePath of possiblePaths) {
      try {
        if (fs.existsSync(templatePath)) {
          template = fs.readFileSync(templatePath, 'utf8');
          console.log(`Template encontrado en: ${templatePath}`);
          break;
        }
      } catch (err) {
        console.log(`No se pudo leer template en: ${templatePath}`);
      }
    }
    
    // Si no se encuentra la plantilla, usar una plantilla básica
    if (!template) {
      console.warn(`Template ${templateName} no encontrado, usando plantilla básica`);
      if (templateName === 'email-confirmation') {
        template = `
          <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #4F46E5;">¡Gracias por contactarnos, {{name}}!</h2>
              <p>Hemos recibido tu mensaje y te contactaremos dentro de las próximas 24 horas.</p>
              <p>Saludos,<br>El equipo de SoMoS</p>
            </body>
          </html>
        `;
      } else {
        template = `
          <html>
            <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #4F46E5;">Nueva consulta de {{name}}</h2>
              <p><strong>Email:</strong> {{email}}</p>
              <p><strong>Mensaje:</strong></p>
              <p>{{message}}</p>
              <p><strong>Fecha:</strong> {{timestamp}}</p>
            </body>
          </html>
        `;
      }
    }
    
    // Reemplazar variables en la plantilla
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      template = template.replace(regex, data[key] || '');
    });
    
    return template;
  } catch (error) {
    console.error('Error procesando template:', error);
    // Plantilla de emergencia muy básica
    return `<html><body><h2>Mensaje de SoMoS</h2><p>Datos: ${JSON.stringify(data)}</p></body></html>`;
  }
};

// Función para enviar email de confirmación al cliente
const sendConfirmationEmail = async (transporter, clientData) => {
  const htmlContent = getEmailTemplate('email-confirmation', {
    name: clientData.name
  });
  
  const mailOptions = {
    from: process.env.SMTP_USER, // Email simple sin alias
    replyTo: process.env.SMTP_USER,
    to: clientData.email,
    subject: 'Gracias por contactarnos - SoMoS',
    html: htmlContent,
    text: `Hola ${clientData.name},\n\nGracias por contactarnos. Hemos recibido tu mensaje y te responderemos dentro de las próximas 24 horas.\n\nSaludos,\nEquipo SoMoS`,
    headers: {
      'X-Mailer': 'SoMoS Contact System',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'Importance': 'Normal'
    }
  };
  
  return await transporter.sendMail(mailOptions);
};

// Función para enviar notificación al equipo
const sendNotificationEmail = async (transporter, clientData) => {
  const htmlContent = getEmailTemplate('email-notification', {
    name: clientData.name,
    email: clientData.email,
    message: clientData.message,
    timestamp: new Date().toLocaleString('es-ES', {
      timeZone: 'America/Argentina/Buenos_Aires',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  });
  
  const textContent = `Nueva consulta recibida:

Nombre: ${clientData.name}
Email: ${clientData.email}
Mensaje: ${clientData.message}

Fecha: ${new Date().toLocaleString('es-ES', {
    timeZone: 'America/Argentina/Buenos_Aires',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`;
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    replyTo: clientData.email, // Importante: permite responder directamente al cliente
    to: process.env.TEAM_EMAIL || 'somos.env@gmail.com',
    subject: `Nueva consulta de ${clientData.name}`,
    html: htmlContent,
    text: textContent,
    headers: {
      'X-Mailer': 'SoMoS Contact System',
      'X-Priority': '3',
      'X-MSMail-Priority': 'Normal',
      'Importance': 'Normal'
    }
  };
  
  return await transporter.sendMail(mailOptions);
};

exports.handler = async (event, context) => {
  console.log('=== INICIO FUNCIÓN SEND-EMAIL ===');
  console.log('Método HTTP:', event.httpMethod);
  console.log('Variables de entorno disponibles:', {
    MAILER_DSN: !!process.env.MAILER_DSN,
    SMTP_USER: !!process.env.SMTP_USER,
    SMTP_PASS: !!process.env.SMTP_PASS,
    SMTP_HOST: process.env.SMTP_HOST,
    TEAM_EMAIL: process.env.TEAM_EMAIL
  });

  // Solo permitir métodos POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' })
    };
  }

  try {
    // Parsear los datos del formulario
    const formData = JSON.parse(event.body);
    const { name, email, message } = formData;
    console.log('Datos recibidos:', { name, email, messageLength: message?.length });

    // Validar datos requeridos
    if (!name || !email || !message) {
      console.log('Error: Faltan datos requeridos');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan datos requeridos' })
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Error: Formato de email inválido');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Formato de email inválido' })
      };
    }

    // Crear transporter
    console.log('Creando transporter...');
    const transporter = createTransporter();
    console.log('Transporter creado exitosamente');

    // Preparar datos del cliente
    const clientData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    };

    // Enviar emails en paralelo
    console.log('Enviando emails...');
    const [confirmationResult, notificationResult] = await Promise.all([
      sendConfirmationEmail(transporter, clientData),
      sendNotificationEmail(transporter, clientData)
    ]);

    console.log('Emails enviados exitosamente:', {
      confirmation: confirmationResult.messageId,
      notification: notificationResult.messageId
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        success: true,
        message: 'Emails enviados exitosamente',
        messageIds: {
          confirmation: confirmationResult.messageId,
          notification: notificationResult.messageId
        }
      })
    };

  } catch (error) {
    console.error('Error enviando emails:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({
        error: 'Error interno del servidor',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    };
  }
};
