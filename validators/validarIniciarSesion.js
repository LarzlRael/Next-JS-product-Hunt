export default function validarIniciarSesion(valores) {
    let errores = {};
    //?Validacion de usuario


    //?Validar el email
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
