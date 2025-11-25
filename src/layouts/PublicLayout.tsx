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
    <FadeInWrapper duration={1000}>
      <div className="relative flex flex-col min-h-[100vh] w-full">
        {/* Navbar stays at top */}
        <Navbar />

        {/* Main content grows to take available space */}
        <main className="flex-1 w-full">
          {children}
        </main>

        {/* Footer always at the bottom */}
        <Footer />
      </div>
    </FadeInWrapper>
  );
};


export default PublicLayout;
