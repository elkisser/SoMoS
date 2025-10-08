const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Configuración del transporter de email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

// Función para leer y procesar plantillas HTML
const getEmailTemplate = (templateName, data) => {
  const templatePath = path.join(__dirname, '../../src/templates', `${templateName}.html`);
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Reemplazar variables en la plantilla
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    template = template.replace(regex, data[key]);
  });
  
  return template;
};

// Función para enviar email de confirmación al cliente
const sendConfirmationEmail = async (transporter, clientData) => {
  const htmlContent = getEmailTemplate('email-confirmation', {
    name: clientData.name
  });
  
  const mailOptions = {
    from: `"SoMoS" <${process.env.SMTP_USER}>`,
    to: clientData.email,
    subject: '¡Gracias por contactarnos! - SoMoS',
    html: htmlContent
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
  
  const mailOptions = {
    from: `"SoMoS Contact Form" <${process.env.SMTP_USER}>`,
    to: process.env.TEAM_EMAIL || 'somos.env@gmail.com',
    subject: `Nueva consulta de ${clientData.name} - SoMoS`,
    html: htmlContent
  };
  
  return await transporter.sendMail(mailOptions);
};

exports.handler = async (event, context) => {
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

    // Validar datos requeridos
    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Faltan datos requeridos' })
      };
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Formato de email inválido' })
      };
    }

    // Crear transporter
    const transporter = createTransporter();

    // Preparar datos del cliente
    const clientData = {
      name: name.trim(),
      email: email.trim(),
      message: message.trim()
    };

    // Enviar emails en paralelo
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
