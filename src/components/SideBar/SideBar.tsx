import React, { useState } from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  EditOutlined,
  ClusterOutlined,
  BellOutlined,
  UndoOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './SideBar.scss';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('dashboard'); 

  const menuItems = [
    { key: 'dashboard', icon: <AppstoreOutlined style={{ fontSize: '20px' }} />, label: 'Dashboard' },
    { key: 'edit', icon: <EditOutlined style={{ fontSize: '20px', strokeWidth: '1.5' }} />, label: 'Editar' },
    { key: 'team', icon: <ClusterOutlined style={{ fontSize: '20px' }} />, label: 'Equipe' },
    { key: 'notifications', icon: <BellOutlined style={{ fontSize: '20px' }} />, label: 'Notificações' },
    { key: 'revert', icon: <UndoOutlined style={{ fontSize: '20px' }} />, label: 'Reverter' },
    { key: 'user', icon: <UserOutlined style={{ fontSize: '20px' }} />, label: 'Usuário' },
  ];

  const handleMenuClick = (key: string) => {
    setSelectedKey(key); 
    if (key === 'edit') {
      navigate('/'); 
    } else {
      navigate('/upcoming-pages'); 
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top-bar" />
      <Menu
        mode="vertical"
        theme="light"
        className="sidebar__menu"
        selectedKeys={[selectedKey]} 
        items={menuItems.map((item) => ({
          key: item.key,
          icon: <div className="sidebar__icon">{item.icon}</div>,
          label: item.label,
        }))}
        onClick={({ key }) => handleMenuClick(key)}
      />
    </div>
  );
};

export default SideBar;
