import React from "react";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import withAuth from "@/hocs/withAuth";
import HomeCenter from "@/components/HomeCenter";
import HomeFarm from "@/components/HomeFarm";
import styled from "styled-components";

const Homes = ({ data }) => {
  console.log(data);
  const router = useRouter();
  const { role } = router.query;

  return (
    <Layout>
      {role === "finca" ? (
        <>
          <Title>Historial de entregas</Title>
          <HomeFarm role="finca" />
        </>
      ) : (
        <>
          <Title>Historial de recolecciones</Title>
          <HomeCenter role="acopio" />
        </>
      )}
    </Layout>
  );
};

export default withAuth(Homes);

const Title = styled.h1`
  text-align: center;
  color: #1b4332;
  background: #74c69d;
  margin: 0;
  padding: 5px;
`;
