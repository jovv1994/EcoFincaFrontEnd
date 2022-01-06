import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DeliveryTable from "@/components/DeliveryTable";
import styled from "styled-components";

export default function FilterableDeliveryTable(props) {
  const [filterText, setFilterText] = useState("");
  const [inPending, setInPending] = useState(false);

  function handleFilterTextChange(filterText) {
    setFilterText(filterText);
  }

  function handleInPendingChange(inPending) {
    setInPending(inPending);
  }

  return (
    <Container>
      <SearchBar
        filterText={filterText}
        inPending={inPending}
        onFilterTextChange={handleFilterTextChange}
        onInPendingChange={handleInPendingChange}
      />
      <DeliveryTable
        deliveries={props.deliveries}
        filterText={filterText}
        inPending={inPending}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  background: #74c69d;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  padding-bottom: 15px;
`;
