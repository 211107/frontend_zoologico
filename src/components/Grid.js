
import axios from "axios";
import React from "react";
import { FaEdit, FaPaperPlane, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import styled from "styled-components";
import '../styles/Grid.css';

const Table = styled.table`
  Width: 100%;
  height:100%

  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  font-size: 10px;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody`
`;

export const Tr = styled.tr`
`;


export const Th = styled.th`
  text-align: center;
  border-bottom: inset;
  padding-bottom: 5px;
  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

// text-align: ${(props) => (props.alignCenter ? "center" : "start")};
export const Td = styled.td`
  padding-top: 10px;
  text-align: center;
  width: ${(props) => (props.width ? props.width : "auto")};

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`;

const Grid = ({ users, setUsers, setOnEdit, isFavorite }) => {


  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDeleteFavorite = async (id) => {
    await axios
      .delete("http://localhost:8800/favorites/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  }

  const handleDelete = async (id) => {
    handleDeleteFavorite(id);
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  const redireccionar = async (id) => {
    await axios
      .post("http://localhost:8800/favorites", { id_usuario: id })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  }

  return (
    <div>
      <Table>
        <Thead>
          <Tr>
            {isFavorite && <Th>No. Inv. Nuevo</Th>}
            <Th>Familia</Th>
            <Th>Genero</Th>
            <Th>Especie</Th>
            <Th>No. Inv. Area</Th>
            <Th>Nombre Comun</Th>
            <Th>Ubicacion </Th>
            <Th>Condicion</Th>
            <Th>Fecha De Ingreso </Th>
            <Th>Fecha De Alta Montaje</Th>
            <Th>Fecha De Baja </Th>
            <Th>Observaciones</Th>
            <Th></Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((item) => (
            <Tr key={item.id}>
              {isFavorite && <Td>{item.NoInvNuevo}</Td>}
              <Td width="10%">{item.Familia}</Td>
              <Td width="10%">{item.Genero}</Td>
              <Td width="10%">{item.Especie}</Td>
              <Td width="12%">{item.NoInvArea}</Td>
              <Td width="15%">{item.NombreComun}</Td>
              <Td width="10%">{item.Ubicacion}</Td>
              <Td width="10%">{item.Condicion}</Td>
              <Td width="18%">{item.FechaIngreso}</Td>
              <Td width="18%">{item.FechaDeAltaMontaje}</Td>
              <Td width="18%">{item.FechaDeBaja}</Td>
              <Td width="10%">{item.Observaciones}</Td>
              <Td width="0%" onlyWeb>

              </Td>
              <Td alignCenter width="35%">
                <button type="button" className="btn btn-success">
                  <FaEdit onClick={() => handleEdit(item)} className="pointer" />
                </button>
              </Td>

              {!isFavorite && (
                <>
                  <Td alignCenter width="5%">
                    {/* <button type="button" class="btn btn-danger m-1" data-bs-toggle="modal" data-bs-target="#exampleModal"> */}
                    <button type="button" className="btn btn-danger m-1">
                      <FaTrash onClick={() => handleDelete(item.id)} className="pointer" />
                    </button>
                  </Td>
                  <Td alignCenter width="5%">
                    <button type="button" className="btn btn-primary">
                      <FaPaperPlane onClick={() => redireccionar(item.id)} className="pointer" />
                    </button>
                  </Td>
                </>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <br />
    </div>
  );
};

export default Grid;