import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import '../styles/Usuarios.css';
import GlobalStyle from "./../styles/global";
import Form from './Form';
import Grid from './Grid';

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

export default function Usuarios() {
  const [onEdit, setOnEdit] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [users, setUsers] = useState([]);
  const [tablaUsuarios, setTablaUsers] = useState([]);


  const peticionGet = async () => {
    await axios.get("http://localhost:8800")
      .then(response => {
        setUsers(response.data);
        setTablaUsers(response.data);
      }).catch(error => {
        console.log(error);
      })
  }

  const handleChange = e => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }
  const filtrar = (terminoBusqueda) => {
    let resultadosBusqueda = tablaUsuarios.filter((elemento) => {
      if (elemento.Familia.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())

      ) {
        return elemento;
      }
    });
    setUsers(resultadosBusqueda);
  }

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  useEffect(() => {
    peticionGet();
  }, [])

  return (
    <div>
      <CSVLink data={users} filename={"TablaZoologico.csv"}>
        <button className="btn btn-success">Exportar a CSV</button>
      </CSVLink>
      <div className="div-input-search">
        <input
          className="form-control inputBuscar"
          value={busqueda}
          placeholder="Búsqueda por familia"
          onChange={handleChange}
        />
        <button className="btn btn-success">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <Container>
        <Title>Inventario</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </div>
  )
}
