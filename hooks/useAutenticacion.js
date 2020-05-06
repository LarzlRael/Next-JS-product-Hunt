import React, { useState, useEffect } from 'react';
import firebase from '../firebase';

function useAutenticacion() {
    const [usuarioautenticado, guardarUsuarioautenticado] = useState(null);

    useEffect(() => {
        const unsuscribe = firebase.auth.onAuthStateChanged(user => {
            if (user) {
                guardarUsuarioautenticado(user);
            } else {
                guardarUsuarioautenticado(null)
            }
        })
        return () => {
            unsuscribe();
        }
    }, [])
    return usuarioautenticado;
}

export default useAutenticacion;