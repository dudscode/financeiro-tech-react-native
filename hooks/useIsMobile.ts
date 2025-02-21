import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = Dimensions.get("window").width;
      setIsMobile(screenWidth <= 768); // Defina o valor conforme necessário
    };

    handleResize();
    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  return isMobile;
};
