import styled from '@emotion/styled';

import Layout from '../components/layouts/Layout';
import Producto from '../components/layouts/Producto';
import useProductos from '../hooks/useProductos';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Buscar() {

  const router = useRouter();
  const { query: { q } } = router;
  console.log(q)

  //? todos los productos
  const { productos } = useProductos('creado');
  const [resultado, guardarResultado] = useState([]);


  useEffect(() => {
    const busqueda = q.toLowerCase();
    const filtro = productos.filter(producto => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      )
    });
    guardarResultado(filtro);
    console.log(resultado);
  }, [q, productos])

  return (
    <div className="container">
      <Layout>
        <div className="listado-productos">
          <div className="contenedor">
            <div className="bg-white">
              {resultado.map(producto => (
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

