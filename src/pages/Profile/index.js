import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Row, Col, Tabs, Layout, Typography } from "antd";
import { logout } from "../../services/auth";
import Navigation from "../../components/nativagation";
import ProfileForm from "../Profile/profileForm";
import SecurityForm from "../Profile/securityForm";
import api from "../../services/api";

const { TabPane } = Tabs;
const { Content, Footer } = Layout;
const { Text } = Typography;

const Profile = ({ ...props }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [location, setLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  const [establishment, setEstablishment] = useState({});
  const [isEstablishmentLoaded, setIsEstablishmentLoaded] = useState(false);

  const handleUpdate = async (e) => {
    if (!name || !email) {
      this.setError("Preencha todos os dados para atualizar seu cadastro");
    } else {
      try {
        const response = await api.post("/establishment", {
          name,
          email,
          password,
          passwordConfirm,
          location,
        });

        setSuccess(response?.data?.message);

        props.history.push("/profile");
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    }
  };

  const handleUpdatePassword = async (e) => {
    if (!currentPassword || !password || !passwordConfirm) {
      this.setError("Preencha todos os dados para atualizar sua senha");
    } else {
      try {
        const response = await api.post("/establishment/password", {
          password,
          passwordConfirm,
          currentPassword,
        });

        setSuccess(response?.data?.message);

        props.history.push("/profile");
      } catch (err) {
        setError(err?.response?.data?.message);
      }
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete("/establishment");

      logout();

      props.history.push("/profile");
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  const getEstablishmentData = async () => {
    try {
      const response = await api.get("/establishment");
      setEstablishment(response?.data);
      setIsEstablishmentLoaded(true);
    } catch (err) {
      setError(err?.response?.data?.message);
    }
  };

  if (!isEstablishmentLoaded) getEstablishmentData();

  return (
    <Layout>
      <Navigation props={props} />
      <Content style={{ padding: "0 50px", margin: "10px 0 0 0" }}>
        <Row>
          <Col style={{ width: "100%" }}>
            <Tabs defaultActiveKey="1">
              <Text type="success">{success && success}</Text>
              <Text type="warning">{error && error}</Text>

              <TabPane tab="Perfil" key="1">
                <ProfileForm
                  establishment={establishment}
                  setName={setName}
                  setEmail={setEmail}
                  setLocation={setLocation}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                />
              </TabPane>
              <TabPane tab="Segurança" key="2">
                <SecurityForm
                  setPassword={setPassword}
                  setPasswordConfirm={setPasswordConfirm}
                  setCurrentPassword={setCurrentPassword}
                  handleUpdatePassword={handleUpdatePassword}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Criado por Taillis Mariquito
      </Footer>
    </Layout>
  );
};

export default withRouter(Profile);
