import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Layout, Typography } from "antd";
import Navigation from "../../components/nativagation";
import api from "../../services/api";

import EstablishmentsList from "../Establishments/establishmentsList";

const { Content, Footer } = Layout;
const { Text, Title } = Typography;

const Establishments = ({ ...props }) => {
  const [error, setError] = useState("");

  const [establishments, setEstablishments] = useState([]);
  const [isEstablishmentLoaded, setIsEstablishmentLoaded] = useState(false);

  const getEstablishmentsData = async () => {
    try {
      const response = await api.get("/establishment/filter");
      setIsEstablishmentLoaded(true);
      setEstablishments(response?.data);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  if (!isEstablishmentLoaded) getEstablishmentsData();

  return (
    <Layout>
      <Navigation props={props} />
      <Content style={{ padding: "0 50px", margin: "10px 0 0 0" }}>
        <Text type="warning">{error && error}</Text>
        <Title level={5}>Estabelecimentos perto de você</Title>
        <Row justify="space-around" style={{ display: "flex" }}>
          <EstablishmentsList establishments={establishments} />
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Criado por Taillis Mariquito
      </Footer>
    </Layout>
  );
};

export default withRouter(Establishments);
