import React from 'react'
//?utlizando el router que viene con el link
import Header from './Header';

import Head from 'next/head';

import { css, Global } from '@emotion/core';

const Layout = (props) => {
    return (
        <>
            <Global styles={css`
                :root{
                    --gris: #3d3d3d;
                    --gri2: #6f6f6f;
                    --gris3:#e1e1e1;
                    --naranja:#da552f;
                }
                html{
                    font-size:62.5%;
                    box-sizing :border-box;
                }
                *,*:before,*:after{
                    box-sizing : inherit;
                }
                body{
                    font-size:1.6rem;
                    line-height:1.5;
                    font-family:'Roboto',serif
                    h1,h2,h3{
                        margin: 0.0 2rem 0;
                        line-height:1.5;

                    }
                    h1,h2{
                        font-family:'Roboto', serif;
                        font-weight:700;
                    }
                    h4{
                        font-family:'Pt Sans',serif
                    }
                    ul{
                        list-style:none;
                        margin:0;
                        padding:0;
                    }
                    a{
                        text-decoration:none
                    }
                    img{
                        max-width:100%;
                    }
                    p{
                        font-family:'Roboto'
                    }
                }
            `}
            />
            <Header />
            {/* Usando el componente header */}
            <Head>
                
                <title>Product Hunt Firebase y next</title>
                {/* Normalize */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css.map" />
                {/* Fuentes de google */}
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@1,700&display=swap" rel="stylesheet" />
                {/* Hoja de estilos personalizado */}
                <link rel="stylesheet" href="/css/styles.css" />
            </Head>
            <main>
                {props.children}
            </main>
        </>
    )
}

export default Layout
