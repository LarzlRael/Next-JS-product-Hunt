export default function validarCrearCuenta(valores) {
    let errores = {};
    //?Validaciond de usuario

    if (!valores.nombre) {
        errores.nombre = 'EL nombre es obligatorio';
    }

    //?Validar la url
    if (!valores.url) {
        errores.url = 'La URL del producto es obligatorio';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "URL mal formateada o no válida"
    }
    //?Validar la descripcion

    if (!valores.descripcion) {
        errores.descripcion = 'Agrega una descripcion de tu producto';
    }





    return errores;
}

