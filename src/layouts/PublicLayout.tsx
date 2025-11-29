import type { JSX } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import FadeInWrapper from '../components/FadeInWrapper/FadeInWrapper';

interface Props {
  children?: React.ReactNode;
}

export const PublicLayout = ({ children }: Props): JSX.Element => {
  return (
    <FadeInWrapper>
      <div className="relative flex flex-col w-full h-screen overflow-hidden h-[100dvh]">
        {/* Navbar stays at top */}
        <Navbar />

        {/* Main scrollable area */}
        <main className="flex-1 overflow-y-auto overscroll-contain">
          {children}
          <Footer />
        </main>
      </div>
    </FadeInWrapper>
  );
};


export default PublicLayout;
