import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import DeliveryTable from "@/components/DeliveryTable";
import styled from "styled-components";

export default function FilterableDeliveryTable({ deliveries, role }) {
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
        role={role}
      />
      <DeliveryTable
        deliveries={deliveries}
        filterText={filterText}
        inPending={inPending}
        role={role}
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
