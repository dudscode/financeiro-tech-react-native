import React from 'react';
import { View, Animated, Easing } from 'react-native';
import { styles } from './styles';

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

export default Loading;
