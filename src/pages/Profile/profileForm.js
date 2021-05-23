import React from "react";
import { Form, Input, Button, Row, Col, Layout } from "antd";
import Map from "../../components/map";

const { Content } = Layout;

const FormProfile = ({
  establishment,
  setName,
  setEmail,
  setLocation,
  handleUpdate,
  handleDelete,
  ...props
}) => {
  console.log(establishment?.location);
  return (
    <Content style={{ padding: "0 50px", margin: "10px 0 0 0" }}>
      <p>{establishment.email}</p>
      <Form onFinish={handleUpdate}>
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
            {
              required: true,
              message: "Por favor, digite um e-mail válido!",
            },
          ]}
        >
          <Input
            value={establishment.email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Row>
          <Col
            style={{
              width: "100%",
              height: "400px",
            }}
          >
            <Map
              initialLocation={{
                lat: establishment?.location?.coordinates[1],
                lng: establishment?.location?.coordinates[0],
              }}
              draggable={true}
              setLocation={setLocation}
            ></Map>
          </Col>
        </Row>
        <hr />
        <Form.Item type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit">
            Alterar dados cadastrais
          </Button>
          <Button type="danger" htmlType="button" onClick={handleDelete}>
            Remover seu cadastro
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default FormProfile;
