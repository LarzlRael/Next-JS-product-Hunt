import styled from '@emotion/styled';

import Layout from './layouts/Layout';
import { useEffect, useState, useContext } from 'react';
import { FirebaseContext } from '../firebase';
import Producto from './layouts/Producto';

const Home = () => {
  const [productos, guardarProductos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const obtenerProductos = () => {
      firebase.db.collection('productos').orderBy('creado', 'desc').onSnapshot(manejarSnapshot)
    }

    obtenerProductos();
  }, [])

  function manejarSnapshot(snapshot) {
    const productos = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    guardarProductos(productos);
    console.log('mostrando los productos ', productos)
  }
  return (
    <div className="container">
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map(producto => (
                <Producto
                  key={producto.pd}
                  producto={producto}
                />

              ))}
            </div>
          </div>
        </div>
      </Layout>

    </div>
  )
}

export default Home;