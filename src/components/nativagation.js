import { Menu } from "antd";
import {
  HomeOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import Logo from "../assets/fortbrasil-logo.png";
import { logout, isAuthenticated } from "../services/auth";

const Navigation = ({ props }) => {
  const { current } = {};
  return (
    <Menu
      onClick={false}
      selectedKeys={[current]}
      mode="horizontal"
      theme="light"
    >
      <Menu.Item key="logo">
        <Link to="/login">
          <img height={50} src={Logo} alt="FortBrasil logo" />
        </Link>
      </Menu.Item>
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Página inicial</Link>
      </Menu.Item>
      {isAuthenticated() ? (
        <>
          <Menu.Item key="profile" icon={<UnorderedListOutlined />}>
            <Link to="/profile">Meu perfil</Link>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              logout(() => {
                props.history.push("/login");
              });
            }}
            key="logout"
            icon={<LogoutOutlined />}
          >
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item key="register" icon={<UnorderedListOutlined />}>
            <Link to="/register">Cadastrar meu estabelecimento</Link>
          </Menu.Item>
          <Menu.Item key="login" icon={<LoginOutlined />}>
            <Link to="/login">Entrar</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default Navigation;
