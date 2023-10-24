import parse from 'html-react-parser';
import ReactDOMServer from "react-dom/server";


import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';


import {MainPages, SubPages, AllPages, PagesComponents} from './pages_config'; // Assicurati che il percorso sia corretto
import htmlDomParser from 'html-dom-parser';

const { Header, Content, Sider } = Layout;



const uniqueSections = Array.from(new Set(AllPages.map((page) => page.p_section)));

const items1 = uniqueSections.map((section) => ({
  label: section,
  key: section,
}));

const items2 = Array.from(new Set(AllPages.map((page) => page.p_section))).map((mainKey) => ({
  key: `sub${mainKey}`,
  label: mainKey,
  children: AllPages
    .filter((page) => page.p_section === mainKey)
    .map((page) => ({
      key: page.p_name,
      label: page.p_name,
    })),
}));





const Navbar: React.FC = () => {
  const {token: { colorBgContainer },} = theme.useToken();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);


  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('Home');

  const [selectedSection, setSelectedSection] = useState<string>('App');
  
  const selectedComponent: React.FC<{}> | null = selectedMenuItem
  ? (AllPages.find((page) => page.p_name === selectedMenuItem) || {}).p_component || null
  : null;

  

  return (
    <Layout>
      <Header className='main_menu' style={{ display: 'block', alignItems: 'center' }}>
        <div className="demo-logo">Francesco's App</div>
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
            
            onSelect={({ key }) => {
              setSelectedMenuItem(key)
              const selectedPageName = key;
          
              const selectedPage = AllPages.find((page) => page.p_name === selectedPageName);
          
              if (selectedPage) {
                setSelectedSection(selectedPage.p_section);
              }
              
            }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            {selectedSection && <Breadcrumb.Item>{selectedSection}</Breadcrumb.Item>}
            {selectedMenuItem && <Breadcrumb.Item>{selectedMenuItem}</Breadcrumb.Item>}
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}>
            
            {selectedComponent && React.createElement(selectedComponent)}


          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Navbar;