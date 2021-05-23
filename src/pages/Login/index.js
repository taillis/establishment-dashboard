import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Form, Input, Button, Row } from "antd";

import Logo from "../../assets/fortbrasil-logo.png";
import api from "../../services/api";
import { login, setData } from "../../services/auth";

const Login = ({ ...props }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    if (!email || !password) {
      setError("Preencha e-mail e senha para continuar!");
    } else {
      try {
        const response = await api.post("/auth/login", { email, password });

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
      <Form onFinish={handleLogin}>
        <img src={Logo} alt="FortBrasil logo" />
        {error && <p>{error}</p>}
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
          rules={[{ required: true, message: "Por favor, digite sua senha!" }]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Entrar
          </Button>
        </Form.Item>
        <hr />
        <Link to="/register">Crie uma conta grátis</Link>
      </Form>
    </Row>
  );
};

export default withRouter(Login);
