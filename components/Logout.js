import React from 'react';                                                                                                          
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {

        fetch('/logout', {
            method: 'GET',
            credentials: 'include',
        })
            .then(response => {
                if (response.ok) {
                    
                    localStorage.removeItem('token'); 

                    navigate('/');

                } else {

                    throw new Error('Erro logout');
                }
            })
            .catch(error => {
                console.error('Error logut:', error);
                alert('Error al intentar cerrar sesión');
            });
    };

    return (
        <button className="button7"  onClick={handleLogout}>Sign off</button>

    );
}

export default Logout;
