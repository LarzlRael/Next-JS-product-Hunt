import styled from '@emotion/styled';

import { css } from '@emotion/core'

import Layout from '../components/layouts/Layout';
import { Formulario, Campo, InputSubmit, Error } from '../components/ui/formulario';

//? iportando el error
import Router from 'next/router';

//? validacion para usar en firebase 
import validarCrearCuenta from '../validators/validarCrearCuenta';

//?Importando nuestro hook personalizado
import useValidation from '../hooks/useValidation';

//? modulo de firebase 
import firebase from "../firebase";
import { useState } from 'react';

const Heading = styled.h1`
  color:red;
`;

const STATE_INITIAL = {
  nombre: '',
  email: '',
  password: ''
}

const CrearCuenta = () => {

  const [error, guardarError] = useState(false)

  const {
    valores,
    errores,
    submitForm,
    //?Retornar las funciones
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(STATE_INITIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;


  async function crearCuenta() {
    console.log('esto va crear la cuenta')
    try {
      await firebase.registrar(nombre, email, password);
      Router.push('/');
    } catch (error) {
      console.log(error.message);
      guardarError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
            text-align:center;
            margin-top:5rem;
          `}
          >Crear cuenta</h1>

          <Formulario onSubmit={handleSubmit}>
            <Campo>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.nombre && <Error> {errores.nombre}</Error>}
            <Campo>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.email && <Error> {errores.email}</Error>}
            <Campo>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Campo>
            {errores.password && <Error> {errores.password}</Error>}
            {error && <Error>{error}</Error>}
            <InputSubmit
              type="submit" value="Crear Cuenta" />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}


export default CrearCuenta;