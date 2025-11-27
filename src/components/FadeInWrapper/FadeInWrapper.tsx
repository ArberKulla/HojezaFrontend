// File: FadeInWrapper.tsx
import React, { useEffect, useState } from 'react';

interface FadeInWrapperProps {
  children: React.ReactNode;
}

const FadeInWrapper: React.FC<FadeInWrapperProps> = ({ children}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
        style={{
        opacity: loaded ? 1 : 0,
        transition: `opacity 1000ms ease-in-out`,
        }}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;
