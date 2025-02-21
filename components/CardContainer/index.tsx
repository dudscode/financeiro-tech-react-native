import React, { FC } from "react";
import { View, Text, Image } from "react-native";
import styled, { css } from "styled-components";
import DeviceInfo from "react-native-device-info";

type CardContainerProps = {
  title?: string;
  children: React.ReactNode;
};
export const CardContainer: FC<CardContainerProps> = ({ title, children }) => {
  let isTablet = DeviceInfo.isTablet();
  return (
    <ViewUI>
      {isTablet}
      <ImageUI
        source={require("@/assets/images/textura.png")}
        style={{ left: 0, top: 0, zIndex: 0 }}
        rotate={true}
      />
      {title && <Title>{title}</Title>}
      {children}
      <Image
        source={require("@/assets/images/ilustration.png")}
        style={{ right: 0, bottom: 0, zIndex: 2 }}
      />
      <ImageUI
        source={require("@/assets/images/textura.png")}
        style={{ right: 0, bottom: 0, zIndex: 0 }}
      />
    </ViewUI>
  );
};

type ImageProps = {
  rotate?: boolean;
};

export default CardContainer;

const ImageUI = styled(Image)<ImageProps>`
  ${({ rotate }) => css`
    position: absolute;
    pointer-events: none;
    z-index: 1;
    ${rotate &&
    css`
      transform: rotate(180deg);
    `}
  `}
`;

const ViewUI = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  position: relative;
  background-color: #cbcbcb;
  width: 100%;
  padding: 32px 16px 27px 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const Title = styled(Text)`
  font-size: 25px;
  font-weight: bold;
  color: #dee9ea;
`;
