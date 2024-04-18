import React, { useState, useEffect } from 'react';

import Logout from './Logout';
import { jwtDecode } from 'jwt-decode'; 
import './consola.css'

const Consola = () => {
    const [users, setUsers] = useState([]);
    const [receiverId, setReceiverId] = useState({id: '', user : ''});
    const [messageContent, setMessageContent] = useState('');
    const [mensajes, setDataContet] = useState([]);
    const [sendDateTime, setSendDateTime] = useState('');

    const token = localStorage.getItem('token');
    let userId = null;
    let userEmail = null;
    if (token) {
        const decoded = jwtDecode(token);
        userId = decoded.userId;
        userEmail = decoded.email;
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error loading users:', error));
    };

    
    const handleSendMessage = () => {
        if (!receiverId.id || !messageContent.trim()) {
            alert('Please, select a user and write a message.');
            return;
        }

        if (sendDateTime) {
            
            const formattedDateTime = new Date(sendDateTime).toISOString();
            fetch('/schedule-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: userId,
                    receiverId : receiverId.id,
                    content: messageContent,
                    sendDateTime: formattedDateTime,
                }),
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data.message);
                    setMessageContent('');
                    setSendDateTime('');
                    alert('Message scheduled successfully');
                })
                .catch(error => {
                    console.error('Error scheduling the message', error);
                    alert('Error scheduling the message');
                });
        } else {
            
            fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senderId: userId,receiverId : receiverId.id, content: messageContent }),
            })
                .then(response => response.json())
                .then(() => {
                    setMessageContent('');
                    alert('Message sent successfully');
                })
                .catch(error => {
                    console.error('Error scheduling the message', error);
                    alert('Error scheduling the message');
                });
        }
    };

    const handleSelectUser = (userId, user) => setReceiverId(prevState => ({ ...prevState, id: userId, user: user }));

    const fetchMessages = () => {
        fetch(`/received-messages/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        })
            .then(response => response.json())
            .then(data => setDataContet(data))
            .catch(error => console.error('Error scheduling the message:', error));
    };


    const predefinedMessages = {
        festivities: [
            "Merry Christmas",
            "Happy New Year",
            "Happy Student's Day"
        ],
        love: [
            "I love you",
            "You are the best thing that has happened to me",
            "My heart is yours"
        ],
        motivation: [
            "Never give up",
            "Follow your dreams",
            "Believe in yourself"
        ]
    };
    

    return (
        <div className="container">
            <h1>Private Messenger</h1>

            <div className="section">

                <div>
            <h2>Select Users</h2>
            <div className="user-list">
                {users.map((user) => (
                    <div key={user._id} className="user-item">
                        <button className="button1" onClick={() => handleSelectUser(user._id, user.local.email)}>
                        {user.local.email} 
                            
                        </button>
                        {user.local.email === receiverId.user? 'SELECTED': ''}
                    </div>
                ))}
            </div></div>
            <div>
            {userEmail}
            <button className="button2" onClick={fetchMessages}>Box</button>
            <div className="message-list">
                {mensajes.map((message, index) => (
                    <div key={index} className="message-item">
                        <p className="message-content">Message: {message.content}</p>
                        <p className="message-details">From: {message.sender.local.email}</p>
                        <p className="message-details">Sent: {new Date(message.timestamp).toLocaleString()}</p>
                    </div>
                ))}
            </div></div>

            </div>
            <h2>Phrases</h2>
            <div className="category-list">
                {Object.entries(predefinedMessages).map(([categoria, mensajes]) => (
                    <div key={categoria} className="category-item">
                        <h3 className="category-title">{categoria}</h3>
                        {mensajes.map((mensaje, index) => (
                            <button className="button3" key={index} onClick={() => setMessageContent(mensaje)}>
                                {mensaje}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
            <h2>Select and send your message</h2>
            
            FOR {receiverId.user}


            <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Write your message here"
            />
            <button className="button4" onClick={handleSendMessage}>
                {receiverId.user ?   'Send Message': 'No User Selected'}
            </button>
            <h3>Schedule your message (optional)</h3>
            <input
                type="datetime-local"
                value={sendDateTime}
                onChange={(e) => setSendDateTime(e.target.value)}
                placeholder="Fecha y Hora de Envío"
            />
            
            
            
            <div  className="logout-container">
                <Logout />
            </div>
        </div>
    );
};

export default Consola;

