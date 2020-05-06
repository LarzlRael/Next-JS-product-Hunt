import styled from '@emotion/styled';

import Layout from '../components/layouts/Layout';

import Producto from '../components/layouts/Producto';
import useProductos from '../hooks/useProductos';


const Home = () => {
  const { productos } = useProductos('creado');

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

export default Home;