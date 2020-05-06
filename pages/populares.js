
import Layout from '../components/layouts/Layout';
import { useEffect, useState, useContext } from 'react';
import Producto from '../components/layouts/Producto';
import useProductos from '../hooks/useProductos';

const Populares = () => {

  const { productos } = useProductos('votos');


  return (
    <div className="container">
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {productos.map(producto => (
                <Producto
                  key={producto.id}
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

export default Populares;