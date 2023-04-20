import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const FormContainer = styled.form`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Input = styled.input`
  width: 128px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit, isFavorite }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const user = ref.current;

      if (isFavorite) { user.NoInvNuevo.value = onEdit.NoInvNuevo; }
      user.Familia.value = onEdit.Familia;
      user.Genero.value = onEdit.Genero;
      user.Especie.value = onEdit.Especie;
      user.NoInvArea.value = onEdit.NoInvArea;
      user.NombreComun.value = onEdit.NombreComun;
      user.Ubicacion.value = onEdit.Ubicacion;
      user.Condicion.value = onEdit.Condicion;
      user.FechaIngreso.value = onEdit.FechaIngreso;
      user.FechaDeAltaMontaje.value = onEdit.FechaDeAltaMontaje;
      user.FechaDeBaja.value = onEdit.FechaDeBaja;
      user.Observaciones.value = onEdit.Observaciones;
    }
  }, [onEdit, isFavorite]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    // if (isFavorite) {
    //   if (
    //     !user.NoInvNuevo.value ||
    //     !user.Familia.value ||
    //     !user.Genero.value ||
    //     !user.Especie.value ||
    //     !user.NoInvArea.value ||
    //     !user.NombreComun.value ||
    //     !user.Ubicacion.value ||
    //     !user.Condicion.value ||
    //     !user.FechaIngreso.value ||
    //     !user.FechaDeAltaMontaje.value ||
    //     !user.FechaDeBaja.value ||
    //     !user.Observaciones.value
    //   ) {
    //     return toast.warn("llena todos los campos!");
    //   }
    //}

    // if (
    //   !user.Familia.value ||
    //   !user.Genero.value ||
    //   !user.Especie.value ||
    //   !user.NoInvArea.value ||
    //   !user.NombreComun.value ||
    //   !user.Ubicacion.value ||
    //   !user.Condicion.value ||
    //   !user.FechaIngreso.value ||
    //   !user.FechaDeAltaMontaje.value ||
    //   !user.FechaDeBaja.value ||
    //   !user.Observaciones.value
    // ) {
    //   return toast.warn("llena todos los campos!");
    // }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/" + onEdit.IdInvMuZool, {
          NoInvNuevo: isFavorite ? user.NoInvNuevo.value : null,
          Familia: user.Familia.value,
          Genero: user.Genero.value,
          Especie: user.Especie.value,
          NoInvArea: user.NoInvArea.value,
          NombreComun: user.NombreComun.value,
          Ubicacion: user.Ubicacion.value,
          Condicion: user.Condicion.value,
          FechaIngreso: user.FechaIngreso.value,
          FechaDeAltaMontaje: user.FechaDeAltaMontaje.value,
          FechaDeBaja: user.FechaDeBaja.value,
          Observaciones: user.Observaciones.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800", {
          NoInvNuevo: isFavorite ? user.NoInvNuevo.value : null,
          Familia: user.Familia.value,
          Genero: user.Genero.value,
          Especie: user.Especie.value,
          NoInvArea: user.NoInvArea.value,
          NombreComun: user.NombreComun.value,
          Ubicacion: user.Ubicacion.value,
          Condicion: user.Condicion.value,
          FechaIngreso: user.FechaIngreso.value,
          FechaDeAltaMontaje: user.FechaDeAltaMontaje.value,
          FechaDeBaja: user.FechaDeBaja.value,
          Observaciones: user.Observaciones.value,

        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
    if (isFavorite) {
      user.NoInvNuevo.value = "";
    }
    user.Familia.value = "";
    user.Genero.value = "";
    user.Especie.value = "";
    user.NoInvArea.value = "";
    user.NombreComun.value = "";
    user.Ubicacion.value = "";
    user.Condicion.value = "";
    user.FechaIngreso.value = "";
    user.FechaDeAltaMontaje.value = "";
    user.FechaDeBaja.value = "";
    user.Observaciones.value = "";

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      {isFavorite && (
        <InputArea>
          <Label>No. Inv. Nuevo</Label>
          <Input name="NoInvNuevo" />
        </InputArea>
      )}
      <InputArea>
        <Label>Familia</Label>
        <Input name="Familia" />
      </InputArea>
      <InputArea>
        <Label>Genero</Label>
        <Input name="Genero" />
      </InputArea>
      <InputArea>
        <Label>Especie </Label>
        <Input name="Especie" />
      </InputArea>
      <InputArea>
        <Label>NoInvArea</Label>
        <Input name="NoInvArea" />
      </InputArea>
      <InputArea>
        <Label>Nombre Comun</Label>
        <Input name="NombreComun" />
      </InputArea>
      <InputArea>
        <Label>Ubicacion</Label>
        <Input name="Ubicacion" />
      </InputArea>
      <InputArea>
        <Label>Condicion</Label>
        <Input name="Condicion" />
      </InputArea>
      <InputArea>
        <Label>Fecha Ingreso</Label>
        <Input name="FechaIngreso" type="date" />
      </InputArea>
      <InputArea>
        <Label>Fecha De Alta Montaje</Label>
        <Input name="FechaDeAltaMontaje" type="date" />
      </InputArea>
      <InputArea>
        <Label>Fecha De Baja</Label>
        <Input name="FechaDeBaja" type="date" />
      </InputArea>
      <InputArea>
        <Label>Observaciones</Label>
        <Input name="Observaciones" />
      </InputArea>

      <Button type="submit">GUARDAR</Button>
    </FormContainer>
  );
};

export default Form;