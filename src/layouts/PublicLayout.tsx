import type { JSX } from 'react';
import { Layout } from 'antd';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FadeInWrapper from '../components/FadeInWrapper/FadeInWrapper';

interface Props {
  children?: React.ReactNode;
}

export const PublicLayout = ({ children, ...restProps }: Props): JSX.Element => {
  return (
    <FadeInWrapper>
      <div className='relative overflow-x-hidden flex flex-col min-h-screen'>
        <Navbar />
        {children}
        <Footer />
      </div>
    </FadeInWrapper>
  );
};

export default PublicLayout;
