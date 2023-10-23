import parse from 'html-react-parser';
import ReactDOMServer from "react-dom/server";


import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


import {MainPages, SubPages, AllPages, PagesComponents} from './pages_config'; // Assicurati che il percorso sia corretto
import htmlDomParser from 'html-dom-parser';

const { Header, Content, Sider } = Layout;



const items1 = Array.from(MainPages.values()).map((label) => ({
  label,
  key: label,
}));

const items2 = Array.from(MainPages.keys()).map((mainKey) => ({
  key: `sub${mainKey}`,
  label: MainPages.get(mainKey),
  children: Array.from(SubPages.entries())
    .filter(([subKey, mainValue]) => mainValue === mainKey)
    .map(([subKey]) => ({
      key: subKey,
      label: subKey,
    })),
}));

const Navbar: React.FC = () => {
  const {token: { colorBgContainer },} = theme.useToken();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);


  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('');

  console.log(selectedMenuItem);

  return (
    <Layout>
      <Header className='main_menu' style={{ display: 'block', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu theme="dark" className='app_menu' mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={[selectedMenuItem]}
            onSelect={({ key }) => setSelectedMenuItem(key)}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}>
            
            {PagesComponents.map((Component, index) => (
              <div key={1}>
                <Component />
              </div>
            ))}

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Navbar;