import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
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
export default function Favoritos() {
  const [favorites, setFavorites] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getFavorites = async () => {
    try {
      const res = await axios.get("http://localhost:8800/favorites");
      setFavorites(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getFavorites();
  }, [setFavorites]);

  return (
    <>
      <CSVLink data={favorites} filename={"TablaZoologico.csv"}>
        <button className="btn btn-success">Exportar a CSV</button>
      </CSVLink>
      <Container>
        <Title>Inv Semarnat</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getFavorites} isFavorite={true} />
        <Grid setOnEdit={setOnEdit} users={favorites} setUsers={setFavorites} isFavorite={true} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  )
}
