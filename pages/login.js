import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Layout from './layouts/Layout';
const Heading = styled.h1`
  color:red;
`


import { Formulario, Campo, InputSubmit, Error } from './ui/Formulario';

//? iportando el error
import Router from 'next/router';

//? validacion para usar en firebase 
import validarIniciarSesion from '../validators/validarIniciarSesion';

//?Importando nuestro hook personalizado
import useValidation from './hooks/useValidation';

//? modulo de firebase 
import firebase from "../firebase";
import { useState } from 'react';

const STATE_INITIAL = {

  email: '',
  password: ''
}

export default function Login() {

  const [error, guardarError] = useState(false)

  const {
    valores,
    errores,
    submitForm,
    //?Retornar las funciones
    handleSubmit,
    handleChange,
    handleBlur
  } = useValidation(STATE_INITIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;


  async function iniciarSesion() {
    try {
      const usuario = await firebase.Login(email, password);
      console.log(usuario);
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
          >Iniciar Sesion</h1>

          <Formulario onSubmit={handleSubmit}>

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
              type="submit" value="Iniciar Sesion" />
          </Formulario>
        </>
      </Layout>
    </div>
  )
}

