export default function validarCrearCuenta(valores) {
    let errores = {};
    //Validaciond de usuario

    if (!valores.nombre) {
        errores.nombre = 'EL nombre es obligatorio';
    }

    //Validar el email
    if (!valores.email) {
        errores.email = "El email es obligatorio";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
        errores.email = "Email no valido"
    }

    if (!valores.password) {
        errores.password = "El passoword es obligatorio";
    } else if (valores.password.length < 6) {
        errores.password = 'EL password debe ser de al menos de 6 caracteres';
    }
    return errores;
}


// // validar email

// !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

// // validar URL

// !/^(ftp|http|https):\/\/[^ "]+$/