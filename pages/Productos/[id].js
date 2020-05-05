import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Layout from '../layouts/Layout';
import ERROR404 from '../layouts/404';
const Producto = () => {

    //?State del componente
    const [producto, guardarProducto] = useState({})
    const [error, guardarError] = useState(false)

    //?Context de firebase 
    const { firebase } = useContext(FirebaseContext);
    const router = useRouter();
    const { query: { id } } = router;

    useEffect(() => {
        if (id) {
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if (producto.exists) {
                    guardarProducto(producto.data());
                } else {
                    console.log('no existe')
                    guardarError(true);
                }
            }
            obtenerProducto();
        }
    }, [id])

    return (
        <Layout>
            <>
                {error && <ERROR404 />}
            </>
        </Layout>
    )
}

export default Producto;