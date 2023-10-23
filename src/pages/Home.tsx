import React from 'react';
import { Anchor } from 'antd';
import { Layout, Space } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const getCurrentAnchor = () => '#components-anchor-demo-static';

const siderStyle: React.CSSProperties = {
    textAlign: 'left',
    lineHeight: '40px',
    color: '#3ba0e9',
    backgroundColor: '#fff',
  };

const contentStyle: React.CSSProperties = {
    textAlign: 'left',
    minHeight: 120,
    lineHeight: '20px',
    color: '#3ba0e9',
    backgroundColor: '#fff',
};

const IndexComp: React.FC = () => (
    <Anchor
      affix={false}
      getCurrentAnchor={getCurrentAnchor}
      items={[
        {
          key: '1',
          href: '#components-anchor-demo-basic',
          title: 'Basic demo',
        },
        {
          key: '2',
          href: '#components-anchor-demo-static',
          title: 'Static demo',
        },
        {
          key: '3',
          href: '#api',
          title: 'API',
          children: [
            {
              key: '4',
              href: '#anchor-props',
              title: 'Anchor Props',
            },
            {
              key: '5',
              href: '#link-props',
              title: 'Link Props',
            },
          ],
        },
      ]}
    />
  );


const PagHome: React.FC = () => {

    return (
        <div>
        <h1>Home page</h1>
        
        <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>

            <Layout>
                <Sider style={siderStyle}>
                    <IndexComp />
                </Sider>
                <Layout>
                    <Content style={contentStyle}>
                        <p>This is just a sample page i created to use layout and index components</p>
                    </Content>
                </Layout>
            </Layout>
            </Space>
        

        </div>
    )
}


export default PagHome;