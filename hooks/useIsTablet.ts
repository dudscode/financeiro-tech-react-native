import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = Dimensions.get("window").width;
      setIsTablet(screenWidth > 768 && screenWidth <= 1024);
    };

    handleResize();
    const subscription = Dimensions.addEventListener("change", handleResize);

    return () => {
      subscription?.remove();
    };
  }, []);

  return isTablet;
};
