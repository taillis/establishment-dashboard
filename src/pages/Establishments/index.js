import React, { useState, memo } from "react";
import { withRouter } from "react-router-dom";
import {
  Row,
  Layout,
  Typography,
  Col,
  Slider,
  Button,
  Input,
  Empty,
} from "antd";
import { SearchOutlined, HomeOutlined } from "@ant-design/icons";
import Navigation from "../../components/nativagation";
import api from "../../services/api";

import EstablishmentsList from "../Establishments/establishmentsList";
import getCurrentLocation from "../../services/location";

const { Content, Footer } = Layout;
const { Text, Title } = Typography;

const Establishments = ({ ...props }) => {
  const [error, setError] = useState("");

  const [establishments, setEstablishments] = useState([]);
  const [isEstablishmentLoaded, setIsEstablishmentLoaded] = useState(false);

  const [searchName, setSearchName] = useState("");
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [filterDistance, setFilterDistance] = useState(10);

  const [locationLoaded, setLocationLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const handleLocation = (coords) => {
    setLocationLoaded(true);
    setCurrentLocation(coords);
  };

  if (!locationLoaded) getCurrentLocation(handleLocation);

  const getEstablishmentsData = async () => {
    try {
      const response = await api.get("/establishment/filter", {
        params: {
          distance: filterDistance,
          name: searchName,
          ...currentLocation,
        },
      });
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
      <Content className="main-container">
        <Text type="warning">{error && error}</Text>
        <Row>
          <Col span={12}>
            <Text>Selecione o raio da busca</Text>
            <Slider
              min={10}
              max={100}
              onChange={setFilterDistance}
              value={filterDistance}
              tipFormatter={(value) => `${value} Km`}
            />
          </Col>
          <Col span={12}>
            <Input
              size="large"
              placeholder="Busque pelo nome do estabelcimento"
              prefix={<HomeOutlined />}
              onChange={(e) => {
                setSearchName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Button
            loading={loadingSearch}
            onClick={() => {
              setLoadingSearch();
              getEstablishmentsData();
            }}
            block
            type="primary"
            icon={<SearchOutlined />}
          >
            Buscar
          </Button>
        </Row>
        <Title
          style={{
            marginTop: 20,
          }}
          level={5}
        >
          Estabelecimentos perto de voc??
        </Title>
        {establishments.length <= 0 ? (
          <Row justify="space-around" style={{ display: "flex" }}>
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 100,
              }}
              description={
                <span>Nenhum estabelecimento de acordo com seu crit??rio</span>
              }
            >
              <Button
                type="primary"
                onClick={() => {
                  props.history.push("/register");
                }}
              >
                Registre o seu agora
              </Button>
            </Empty>
          </Row>
        ) : (
          <Row justify="space-between" style={{ display: "flex" }}>
            <EstablishmentsList establishments={establishments} />
          </Row>
        )}
      </Content>
      <Footer
        style={{
          textAlign: "center",
          width: "100%",
        }}
      >
        Criado por Taillis Mariquito
      </Footer>
    </Layout>
  );
};

export default withRouter(memo(Establishments));
