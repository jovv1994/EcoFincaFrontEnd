import React from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({
  onFilterTextChange,
  onInPendingChange,
  role,
  filterText,
  inPending,
}) {
  function handleFilterTextChange(e) {
    onFilterTextChange(e.target.value);
  }

  function handleInPendingChange(e) {
    onInPendingChange(e.target.checked);
  }

  return (
    <Form>
      <StyledSearchIcon />
      {role === "finca" ? (
        <>
          <Input
            type="text"
            placeholder="Buscar por centro de acopio..."
            value={filterText}
            onChange={handleFilterTextChange}
          />
          <P>
            <input
              type="checkbox"
              checked={inPending}
              onChange={handleInPendingChange}
            />{" "}
            Mostrar solo entregas pendientes
          </P>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Buscar por finca..."
            value={filterText}
            onChange={handleFilterTextChange}
          />
          <P>
            <input
              type="checkbox"
              checked={inPending}
              onChange={handleInPendingChange}
            />{" "}
            Mostrar solo entregas recolectadas
          </P>
        </>
      )}
    </Form>
  );
}

const Form = styled.form`
  display: grid;
  grid-template-columns: 24px auto;
  grid-template-rows: auto auto;
  background: #74c69d;
  width: 100%;
  padding: 15px;
  justify-content: center;
  align-content: center;
`;

const Input = styled.input`
  border-radius: 0 5px 5px 0;
  border-right: 2px solid #40916c;
  border-left: 0;
  border-top: 2px solid #40916c;
  border-bottom: 2px solid #40916c;
  padding: 0;
  outline: none;
  width: 300px;
`;

const P = styled.p`
  grid-column: 1 / span 2;
  text-align: center;
  color: #1b4332;
  background: #74c69d;
  margin: 0;
  padding: 5px;
  font-weight: bold;
`;

const StyledSearchIcon = styled(SearchIcon)`
  margin: 0;
  background: #ffffff;
  height: 19px;
  border-radius: 5px 0 0 5px;
  border-left: 2px solid #40916c;
  border-top: 2px solid #40916c;
  border-bottom: 2px solid #40916c;
`;
