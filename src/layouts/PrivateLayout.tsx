import { Layout, theme } from 'antd';
import styles from './Layouts.module.css';

import type { JSX } from 'react';
const { Header, Content, Footer, Sider } = Layout;

interface PrivateLayoutPropsType {
  children: React.ReactNode;
}

export const PrivateLayout = ({ children, ...restProps }: PrivateLayoutPropsType): JSX.Element => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.container} hasSider>
      <Sider width={250} collapsible collapsedWidth="100" theme="dark" className={styles.sider}>
        {/* side menu if exists*/}
      </Sider>

      <Layout className={styles.layout}>
        <Header className={styles.header} style={{ background: colorBgContainer }}>
          {/* header component if exists */}
        </Header>

        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
