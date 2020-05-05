import React, { useState, useEffect } from 'react';


const useValidation = (stateinitial, validar, fn) => {
    const [valores, guardarValores] = useState(stateinitial);
    const [errores, guardarErrores] = useState({});
    const [submitForm, guardarsubmitForm] = useState(false);

    useEffect(() => {
        if (submitForm) {
            const noErrores = Object.keys(errores).length === 0;

            if (noErrores) {
                fn(); //?Igual a la funcion que se ejecute en cl componente
            }
            guardarsubmitForm(false);
        }
    }, [errores])

    //? Funcion que se ejecuta conforme el usuario escribe algo

    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name]: e.target.value
        });
    }
    //? FUncion que se ejecute cuando el usuario hace submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion)
        guardarsubmitForm(true);
        fn();
    }

    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion)
    }
    return {
        //?Retornas los states
        valores,
        errores,
        submitForm,
        //?Retornar las funciones
        handleSubmit,
        handleChange,
        handleBlur
    }
}

export default useValidation;