import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/customers', label: 'Quản lý khách hàng' },
    { path: '/reports', label: 'Báo cáo' }
  ];

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>WB-DS Management</h1>
        </div>
        <nav>
          <ul className="sidebar-nav">
            {menuItems.map((item) => (
              <li
                key={item.path}
                className={`sidebar-nav-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
