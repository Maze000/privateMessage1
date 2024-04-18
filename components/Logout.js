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
                    

                    console.log('el token ha sido borrado'); 
                    localStorage.removeItem('token'); 
                    


                    navigate('/');

                } else {

                    throw new Error('Falló el cierre de sesión');
                }
            })
            .catch(error => {
                console.error('Error al intentar cerrar sesión:', error);
                alert('Error al intentar cerrar sesión');
            });
    };

    return (
        <button className="button7"  onClick={handleLogout}>Cerrar Sesión</button>

    );
}

export default Logout;
