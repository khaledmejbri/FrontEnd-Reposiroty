import { FieldTimeOutlined, FileTextOutlined, HomeOutlined, InteractionOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";






const TopBar = () => {

    return (
        <Layout>
          <Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UserOutlined />}>
                <Link to="/personnel">Gestion du personnel</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<InteractionOutlined />}>
                <Link to="/activite">Gestion d'activité</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<FileTextOutlined />}>
                <Link to="/documents">Gestion des Documents</Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<FieldTimeOutlined />}>
                <Link to="/Conge">Gestion de Temps</Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<SettingOutlined />}>
                <Link to="/Parammetre">Parammetre</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      );
}
export default TopBar;