import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu } from 'antd';
import { HomeOutlined, UserOutlined, BarChartOutlined } from '@ant-design/icons';

const { Sider, Content } = AntLayout;

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: '/customers',
      icon: <UserOutlined />,
      label: 'Quản lý khách hàng',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: 'Báo cáo',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  // Get selected key based on current path
  const selectedKey = location.pathname.startsWith('/customers') && location.pathname !== '/customers'
    ? '/customers'
    : location.pathname;

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider
        width={250}
        style={{
          background: '#2b6cae',
        }}
      >
        <div style={{
          padding: '20px',
          color: 'white',
          fontSize: '22px',
          fontWeight: 600,
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '20px',
        }}>
          WB-DS Management
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
          }}
          theme="dark"
        />
      </Sider>
      <Content style={{ padding: '30px', background: '#fefefe' }}>
        {children}
      </Content>
    </AntLayout>
  );
};

export default Layout;
