
const cron = require('node-cron');
const mongoose = require('mongoose');
const { Message } = require('../config/user.js'); 


if (mongoose.connection.readyState === 0) {
  mongoose.connect('tu_cadena_de_conexión_a_mongodb', { useNewUrlParser: true, useUnifiedTopology: true });
}

const scheduleMessage = (senderId, receiverId, content, sendDateTime) => {
  
  const sendDate = new Date(sendDateTime);

  
  const now = new Date();
  if (sendDate <= now) {
    throw new Error("La fecha de envío debe ser en el futuro.");
  }

  
  cron.schedule(`${sendDate.getSeconds()} ${sendDate.getMinutes()} ${sendDate.getHours()} ${sendDate.getDate()} ${sendDate.getMonth() + 1} *`, () => {
    const newMessage = new Message({
      content,
      sender: mongoose.Types.ObjectId(senderId),
      receiver: mongoose.Types.ObjectId(receiverId),
      timestamp: new Date()
    });

    newMessage.save()
      .then(() => console.log("Mensaje enviado y guardado en la base de datos."))
      .catch(err => console.error("Error al guardar el mensaje:", err));
  }, {
    scheduled: true,
    timezone: "America/New_York" 
  });
};

module.exports = { scheduleMessage };
