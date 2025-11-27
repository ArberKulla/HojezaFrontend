import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";

export function useSmartNavigate() {
  const navigate = useNavigate();
  const [fadeKey, setFadeKey] = useState(0);

  const smartNavigate = useCallback(
    (path: string) => {
      // Navigate
      navigate(path);

      // Scroll to top
      window.scrollTo({top: 0});

      // Force FadeInWrapper to re-mount
      setFadeKey((prev) => prev + 1);
    },
    [navigate]
  );

  return { smartNavigate, fadeKey };
}
