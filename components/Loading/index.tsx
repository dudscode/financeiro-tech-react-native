import React from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

export const Loading = () => {
  const animationValue = new Animated.Value(0);

  Animated.loop(
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(animationValue, {
        toValue: 0,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ])
  ).start();

  const translateY1 = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 6],
  });

  const translateY2 = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [6, -6],
  });

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Animated.View
          style={[
            styles.dot,
            styles.dot1,
            {
              transform: [{ translateY: translateY1 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            styles.dot2,
            {
              transform: [{ translateY: translateY2 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            styles.dot3,
            {
              transform: [{ translateY: translateY1 }],
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 48,
    height: 48,
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    width: 12,
    height: 12,
    position: "relative",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#FFF",
    position: "absolute",
  },
  dot1: {
    left: -18,
  },
  dot2: {
    left: 0,
  },
  dot3: {
    left: 18,
  },
});

export default Loading;
