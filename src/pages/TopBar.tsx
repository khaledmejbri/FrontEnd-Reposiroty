import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
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
                <Link to="/profile">l'employé</Link>
              </Menu.Item>
              <Menu.Item key="3" icon={<UserOutlined />}>
                <Link to="/documents">Documents</Link>
              </Menu.Item>
              <Menu.Item key="4" icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      );
}
export default TopBar;