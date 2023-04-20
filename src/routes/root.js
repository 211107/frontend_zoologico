import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './../styles/App.css';
import GlobalStyle from "./../styles/global";


export default function Root() {
  return (
    <div>
      <div className='div-botones'>
        <Link className='boton-tabla' to={'usuarios'}>USUARIOS</Link>
        <Link className='boton-tabla' to={'favoritos'}>FAVORITOS</Link>
      </div>
      <Outlet />
      <GlobalStyle />
    </div>
  )
}
