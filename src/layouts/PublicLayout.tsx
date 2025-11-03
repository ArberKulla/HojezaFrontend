import type { JSX } from 'react';
import { Layout } from 'antd';

interface Props {
  children?: React.ReactNode;
}

export const PublicLayout = ({ children, ...restProps }: Props): JSX.Element => {
  return <Layout style={{ minHeight: '100vh' }}>{children}</Layout>;
};

export default PublicLayout;
