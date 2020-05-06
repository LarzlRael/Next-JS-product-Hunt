
import { css } from '@emotion/core'

import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/formulario';

//? iportando el error
import Router, { useRouter } from 'next/router';

//? validacion para usar en firebase 
import validarCrearProducto from '../validators/validarCrearProducto';

//?Importando nuestro hook personalizado
import useValidation from '../hooks/useValidation';

//? modulo de firebase 
import firebase, { FirebaseContext } from "../firebase";
import FileUploader from 'react-firebase-file-uploader';

import { useState, useContext } from 'react';
import ERROR404 from '../components/layouts/404';

const STATE_INITIAL = {
  nombre: '',
  email: '',
  imagen: '',
  url: '',
  descripcion: ''
}

export default function NuevoProducto() {


  const [error, guardarError] = useState(false)
  const [nombreImagen, guardarNombre] = useState('');
  const [subiendoImagen, guardarSubiendo] = useState(false);
  const [progresoImagen, guardarProgreso] = useState(0);
  const [urlImagen, guardarUrlImagen] = useState('');

  const {
    valores,
    errores,
    submitForm,
    //?Retornar las funciones
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(STATE_INITIAL, validarCrearProducto, crearProducto);

  const { nombre, empresa, imagen, url, descripcion } = valores;

  //?Context con las operacion crud de firebase
  const { usuario, firebase } = useContext(FirebaseContext);



  //? Hook de routing para redireccionar 
  const router = useRouter();
  async function crearProducto() {
    if (!usuario) {
      return router.push('/');
    }

    const producto = {
      nombre,
      empresa,
      urlImagen,
      url,
      descripcion,
      votos: 0,
      comentarios: [],
      creado: Date.now(),
      creador: {
        id: usuario.uid,
        nombre: usuario.displayName
      },
      haVotado: []
    }
    //?Insertando la bae de datos
    firebase.db.collection('productos').add(producto);
    console.log('redireccionando xd')
    return router.push('/');
  }

  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  }
  const handleProgress = progreso => guardarProgreso({ progreso });

  const handleUploadError = (error) => {
    guardarSubiendo(error);
    console.log(error);
  }
  const handleUploadSuccess = nombre => {
    guardarProgreso(100);
    guardarSubiendo(false);
    guardarNombre(nombre)
    firebase
      .storage
      .ref('productos')
      .child(nombre)
      .getDownloadURL()
      .then(url => {
        console.log(url);
        guardarUrlImagen(url);
      });
  }


  return (
    <div>
      <Layout>
        {!usuario ? <ERROR404 error="Iniciar Seesion" /> : (
          <>
            <h1
              css={css`
                text-align:center;
                 margin-top:5rem;
        `}
            >Nuevo Producto</h1>

            <Formulario onSubmit={handleSubmit}>
              <fieldset>
                <legend>Informacion General</legend>
                <Campo>
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={nombre}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.nombre && <Error> {errores.nombre}</Error>}

                <Campo>
                  <label htmlFor="empresa">Empresa</label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    placeholder="Nombre Empresa o compañia"
                    value={empresa}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>
                {errores.nombre && <Error> {errores.nombre}</Error>}

                <Campo>
                  <label htmlFor="imagen">Imagen</label>
                  <FileUploader
                    accepc="image/*"
                    type="file"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("productos")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}

                  />
                </Campo>
                {errores.imagen && <Error> {errores.imagen}</Error>}
                <Campo>
                  <label htmlFor="url">URL</label>
                  <input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="URL de tu producto"
                    value={url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Campo>

                {errores.url && <Error> {errores.url}</Error>}
              </fieldset>

              <fieldset>
                <legend>Sobre tu producto</legend>

                <Campo>
                  <label htmlFor="descripcion">Descripcion</label>
                  <textarea

                    id="descripcion"
                    name="descripcion"
                    value={descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  ></textarea>

                </Campo>
                {errores.descripcion && <Error> {errores.descripcion}</Error>}
              </fieldset>

              <InputSubmit
                type="submit" value="Crear Producto" />
            </Formulario>
          </>
        )}
      </Layout>
    </div>
  )

}

