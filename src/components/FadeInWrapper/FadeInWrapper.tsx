// File: FadeInWrapper.tsx
import React, { useEffect, useState } from 'react';

interface FadeInWrapperProps {
  children: React.ReactNode;
  duration?: number; // animation duration in ms
}

const FadeInWrapper: React.FC<FadeInWrapperProps> = ({ children, duration = 500 }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
        style={{
        opacity: loaded ? 1 : 0,
        transition: `opacity ${duration}ms ease-in-out`,
        }}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;
