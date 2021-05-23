import React from "react";
import { Form, Input, Button, Layout } from "antd";

const { Content } = Layout;

const FormProfile = ({
  setCurrentPassword,
  setPassword,
  setPasswordConfirm,
  handleUpdatePassword,
  ...props
}) => {
  return (
    <Content style={{ padding: "0 50px", margin: "10px 0 0 0" }}>
      <Form onFinish={handleUpdatePassword}>
        <Form.Item
          label="Senha atual"
          name="currentPassword"
          rules={[
            { required: true, message: "Por favor, digite sua senha atual!" },
          ]}
        >
          <Input.Password
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Nova senha"
          name="password"
          rules={[
            { required: true, message: "Por favor, digita sua nova senha!" },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Confirme sua nova senha"
          name="passwordConfirm"
          rules={[
            {
              required: true,
              message: "Por favor, digite sua nova senha novamente!",
            },
          ]}
        >
          <Input.Password
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </Form.Item>
        <hr />
        <Form.Item type="flex" justify="center" align="middle">
          <Button type="primary" htmlType="submit">
            Alterar senha
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
};

export default FormProfile;
