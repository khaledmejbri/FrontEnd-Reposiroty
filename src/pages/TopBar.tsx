import { 
  FieldTimeOutlined, 
  FileTextOutlined, 
  HomeOutlined, 
  InteractionOutlined, 
  SettingOutlined, 
  UserOutlined, 
  LogoutOutlined 
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";

export type TopBarProps = {
  onLogout?: () => void; // Callback for handling logout
};

const TopBar = ({ onLogout }: TopBarProps) => {
  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo or Brand Name */}
        <div className="logo" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          My Application
        </div>

        {/* Navigation Menu */}
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ flex: 1 }}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link to="/personnel">Gestion du Personnel</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<InteractionOutlined />}>
            <Link to="/activite">Gestion d'Activité</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<FileTextOutlined />}>
            <Link to="/documents">Gestion des Documents</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<FieldTimeOutlined />}>
            <Link to="/conge">Gestion de Temps</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<SettingOutlined />}>
            <Link to="/parammetre">Paramètres</Link>
          </Menu.Item>
        </Menu>

        {/* Logout Button */}
        {onLogout && (
          <Button 
            type="primary" 
            icon={<LogoutOutlined />} 
            onClick={onLogout}
            style={{ marginLeft: '16px' ,color:'#6195d4',backgroundColor:'#ffff'}}
          >
            Logout
          </Button>
        )}
      </Header>
    </Layout>
  );
};

export default TopBar;
