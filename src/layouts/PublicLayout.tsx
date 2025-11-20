import type { JSX } from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

interface Props {
  children?: React.ReactNode;
}

export const PublicLayout = ({ children, ...restProps }: Props): JSX.Element => {
  return (
  <div className='overflow-x-hidden flex flex-col min-h-screen'>
    <Navbar />
    {children}
    <Footer />
  </div>
  );
};

export default PublicLayout;
