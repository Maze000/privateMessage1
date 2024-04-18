

const jwt = require('jsonwebtoken');


const { scheduleMessage } = require('./messageScheduler'); 
const { User, Message } = require('../config/user.js'); 
const SECRET_KEY = 'Marmor1$';
module.exports = (app, passport) => {


	

  app.post('/schedule-message', (req, res) => {
    const { senderId, receiverId, content, sendDateTime } = req.body;
  
    if (!senderId || !receiverId || !content || !sendDateTime) {
      return res.status(400).send('Todos los campos son obligatorios.');
    }
  
    try {
      scheduleMessage(senderId, receiverId, content, sendDateTime);
      res.json({message:'Mensaje programado con éxito.'});
    } catch (error) {
      console.error('Error al programar el mensaje:', error);
      res.status(500).send('Error al programar el mensaje.');
    }
  });

    app.get('/logout', (req, res) => {
        req.logout(function(err) {
            if (err) { return next(err); }
            console.log('respuesta de logout deberia redireccionar a login')
            
           res.sendStatus(200);
        });
    });

    app.post('/login', (req, res, next) => {
		passport.authenticate('local-login', (err, user, info) => {
			if (err) {
				return next(err);
			}
			if (!user) {

				return res.redirect('/signup');
			}
      const email = user.local.email;
			const token = jwt.sign({ userId: user._id, email :email }, SECRET_KEY, { expiresIn: '5m' });



			res.status(200).json({ token });



		})(req, res, next);
	});

	

	

    app.post('/signup2', (req, res, next) => {
        console.log('entrando a local-signup')
        passport.authenticate('local-signup', (err, user, info) => {
          if (err) {
            return res.status(500).json({ message: 'Error interno del servidor' });
          }
          if (!user) {
            
            return res.status(401).json({ message: 'Autenticación fallida' });
          }
         
          const email = user.local.email;
			const token = jwt.sign({ userId: user._id, email :email }, SECRET_KEY, { expiresIn: '5m' });



         res.status(200).json({ token });
         

        })(req, res, next);
      });
      


    app.get('/users', (req, res) => {
        User.find({})
          .select('_id local.email')
          .then(users => {
            res.status(200).json(users);
          })
          .catch(error => {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send('Error al obtener los usuarios');
          });
      });

   
    app.post('/send-message', (req, res) => {
        const { content, receiverId, senderId } = req.body; 
      
        const message = new Message({
            content,
            sender: senderId,
            receiver: receiverId,
        });
      
        message.save()
            .then(() => res.status(201).json({ message: 'Mensaje enviado.' }))
            .catch(error => res.status(500).json({ message: 'error al enviar mensaje' }));
      });
      
      app.get('/received-messages/:userId', (req, res) => {
        const { userId } = req.params;
      
        Message.find({ receiver: userId })
            .populate('sender')
            .then(messages => {
                res.status(200).json(messages);
            })
            .catch(error => {
                res.status(500).send('Error al recuperar los mensajes.');
            });
      });
      

};
