import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import Map from "../../components/map";

const FormProfile = ({
  establishment,
  setName,
  setEmail,
  setLocation,
  handleUpdate,
  handleDelete,
  ...props
}) => {
  return (
    <Form initialValues={establishment} onFinish={handleUpdate}>
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
          }}
        >
          <p>
            Utilize o marcador para selecionar a localização do seu
            estabelecimento
          </p>
        </Col>
      </Row>
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
  );
};

export default FormProfile;
