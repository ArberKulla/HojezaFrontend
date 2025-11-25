import { useState, useEffect } from "react";

/**
 * Hook to check if the screen width matches a max-width (media query).
 * @param maxWidth - The maximum width in pixels
 * @returns boolean - true if the screen is smaller than maxWidth
 */
export const useMediaQuery = (maxWidth: number): boolean => {
  const [matches, setMatches] = useState(
    typeof window !== "undefined" ? window.innerWidth <= maxWidth : false
  );

  useEffect(() => {
    const handleResize = () => setMatches(window.innerWidth <= maxWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [maxWidth]);

  return matches;
};
