import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";
import Logo from "../../assets/fortbrasil-logo.png";
import { login, setData } from "../../services/auth";
import Map from "../../components/map";

import api from "../../services/api";

import getCurrentLocation from "../../services/location";

const Register = ({ ...props }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [error, setError] = useState("");

  const [locationLoaded, setLocationLoaded] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const handleLocation = (coords) => {
    console.log({ coords });
    setLocationLoaded(true);
    setCurrentLocation(coords);
  };

  if (!locationLoaded) getCurrentLocation(handleLocation);

  const handleRegister = async (e) => {
    if (!name || !email || !password) {
      setError("Preencha todos os dados para se cadastrar");
    } else {
      try {
        const response = await api.put("/establishment/register", {
          name,
          email,
          password,
          passwordConfirm,
          location,
        });

        login(response.data.token);
        setData(response.data);

        props.history.push("/profile");
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    }
  };

  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "100vh" }}
    >
      <Form onFinish={handleRegister}>
        <img src={Logo} alt="FortBrasil logo" />
        {error && <p>{error}</p>}
        <Form.Item
          label="Nome"
          name="name"
          rules={[
            {
              required: true,
              message: "For favor, digite o nome do estabelecimento",
            },
          ]}
        >
          <Input onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            { required: true, message: "Por favor, digite um e-mail válido!" },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Por favor, digita sua senha!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Confirme sua senha"
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: "Por favor, digite sua senha novamente!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Item>
        <Row>
          <Col
            style={{
              width: "100%",
              height: "300px",
            }}
          >
            <Map
              initialLocation={currentLocation}
              draggable={true}
              setLocation={setLocation}
            ></Map>
          </Col>
        </Row>
        <hr />
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Cadastrar
          </Button>
        </Form.Item>
        <hr />
        <Link to="/login">Fazer login</Link>
      </Form>
    </Row>
  );
};

export default withRouter(Register);
