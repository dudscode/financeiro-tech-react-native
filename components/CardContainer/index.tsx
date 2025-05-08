import React, { FC } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

type CardContainerProps = {
  title?: string;
  children: React.ReactNode;
};
export const CardContainer: FC<CardContainerProps> = ({ title, children }) => {
  return (
    <View style={[styles.view]}>
      <Image
        source={require('@/assets/images/textura.png')}
        style={[styles.imageRotate, { left: 0, top: 0 }]}
      />
      {title && <Text style={[styles.title]}>{title}</Text>}
      {children}
      <Image
        source={require('@/assets/images/ilustration.png')}
        style={{ right: 0, bottom: 0, zIndex: 2 }}
      />
      <Image
        source={require('@/assets/images/textura.png')}
        style={[styles.image, { right: 0, bottom: 0 }]}
      />
    </View>
  );
};

export default CardContainer;
