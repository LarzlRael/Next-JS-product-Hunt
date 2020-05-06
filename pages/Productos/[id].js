import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Layout from '../../components/layouts/Layout';

import ERROR404 from '../../components/layouts/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale'
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';



const ContenedorProducto = styled.div`
    @media (min-width:768px){
        display:grid;
        grid-template-columns: 2fr 1fr;
        column-gap:2rem;
    }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color:#DA552F;
    color:#fff;
    text-transform:uppercase;
    font-weight:bold;
    display:inline-block;
    text-align:center;
`;


const Producto = () => {

    //?State del componente
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)
    const [comentario, guardarComentario] = useState({});
    const [consultarDB, guardarConsultarDB] = useState(true);

    //?Context de firebase 
    const { firebase, usuario } = useContext(FirebaseContext);
    const router = useRouter();
    const { query: { id } } = router;

    useEffect(() => {
        if (id && consultarDB) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data());
                    guardarConsultarDB(false)
                } else {
                    guardarError(true);
                    guardarConsultarDB(false)
                }
            }
            obtenerProducto();
        }
    }, [id]);

    if (Object.keys(producto).length === 0 && !error) return 'cargando';

    const { nombre, creado, comentarios, descripcion, empresa, creador, url, urlImagen, votos, haVotado } = producto;
    const votarProducto = async () => {
        if (!usuario) {
            return router.push('/login');
        }
        //? Obtener y summar votos
        const nuevoTotal = votos + 1;

        //?Veriricar si el usuario actual ha votado
        if (haVotado.includes(usuario.uid)) return;

        //?Guardar el ID del usuario actual que ha votado
        const nuevoHaVotado = [...haVotado, usuario.uid];


        //Actualizar en la DB
        await firebase.db.collection('productos').doc(id).update({
            votos: nuevoTotal,
            haVotado: nuevoHaVotado
        });
        //Actualizar sl state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })
        //?Hay un voto, por lo tanto consultar a la DB
        guardarConsultarDB(true);
    }
    //?FUnciones para craer comentarios

    const comentarioChange = (e) => {
        guardarComentario({
            ...comentario,
            [e.target.name]: e.target.value
        })
    }
    const agregarComentario = (e) => {
        e.preventDefault();
        if (!usuario) {
            return router.push('/');
        }
        //? Informaicin extra al comentario
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        //?Tomar copia de comntario sy agregarlos al arreglo

        const nuevosComentarios = [...comentarios, comentario];

        //?Actualizar la DB
        firebase.db.collection('productos').doc(id).update({
            comentarios: nuevosComentarios
        })
        //? Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        })
        guardarConsultarDB(true);
    }

    //?Identifica si el comentario es del creador del producto
    const esCreador = (id) => {
        if (creador.id === id) {
            return true;
        }
    }
    //?Funcion que revisa que el creador del producto sea el mism que esta autenteticado

    const puedeBorrar = (id) => {
        if (!usuario) return false;
        if (creador.id === usuario.uid) {
            return true;
        }
    }
    //? Eliminar un producto de la DB
    const eliminarProducto = async () => {
        console.log('eliminar eel producto')
        if (!usuario) {
            console.log(' no hay usuario')
            return router.push('/');
        }
        if (creador.id !== usuario.uid) {
            console.log('hay un error de verificacion')
            return router.push('/')
        }
        try {
            await firebase.db.collection('productos').doc(id).delete();
            console.log('deberia haberse borardo el producto')
            router.push('/');

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <>
                {error ? <ERROR404 error='Pagina no encontrada' /> : (


                    <div className="contenedor">
                        <h1 css={css`
                            text-align : center;
                            margin-top:5rem;
                        `}
                        >{nombre}</h1>
                        <ContenedorProducto>
                            <div className="">
                                <p>Publicado hace :{formatDistanceToNow(new Date(creado),
                                    { locale: es }
                                )}</p>
                                <p>Por: {creador.nombre} de :{empresa}</p>
                                <img src={urlImagen} alt="" />
                                <p>{descripcion}</p>

                                {
                                    usuario && (
                                        <>
                                            <h2>Agrega tu comentario</h2>
                                            <form onSubmit={agregarComentario}>
                                                <Campo>
                                                    <input
                                                        type="text"
                                                        name="mensaje"
                                                        onChange={comentarioChange}
                                                    />
                                                </Campo>
                                                <InputSubmit
                                                    type="submit"
                                                    value="Agregar un Comentario"
                                                />
                                            </form>
                                        </>
                                    )
                                }
                                <h2
                                    css={css`
                                    margin:2rem 0;
                                `}
                                >Comentarios</h2>
                                {comentarios.length === 0 ? 'Aún no hay comentarios ' :
                                    (<ul>
                                        {comentarios.map((comentario, i) => (
                                            <li
                                                key={`${comentarios.usuarioId}-${i}`}
                                                css={css`
                                                border: 1px solid #e1e1e1;
                                                padding:2rem;
                                            `}
                                            >
                                                <p>{comentario.mensaje}</p>
                                                <p>Escrito por : {' '}
                                                    <span css={css`
                                                        font-weight:bold;
                                                        `}>
                                                        {comentario.usuarioNombre}
                                                    </span>
                                                </p>
                                                {esCreador(comentario.usuarioId) &&
                                                    <CreadorProducto>Es Creador </CreadorProducto>
                                                }
                                            </li>
                                        ))}
                                    </ul>)
                                }
                            </div>

                            <aside>

                                <Boton
                                    target="_blank"
                                    bgColor="true"
                                    href={url}
                                >Visitar URL</Boton>

                                <p
                                    css={css`
                                    text-align:center;`
                                    }
                                >{votos}
                                </p>
                                {
                                    usuario && (
                                        <Boton
                                            onClick={votarProducto}
                                        >
                                            Votar
                                        </Boton>
                                    )
                                }
                            </aside>
                            {puedeBorrar() &&
                                <Boton
                                    onClick={eliminarProducto}
                                >ELiminar Producto</Boton>
                            }
                        </ContenedorProducto>
                    </div>
                )}
            </>
        </Layout >
    )
}

export default Producto;